#!/usr/bin/env python3
"""Eenmalig: NPM access-list "hypothese-demo" + proxy-host hypothese.datawijs.nl (+ cert).

Leest NPM_URL/NPM_USER/NPM_PASS en CONTAINER_IP uit de env (~/.config/strongbad/npm.env) en de
demo-login uit DEMO_USER/DEMO_PASS (~/.config/strongbad/hypothese-demo.env).
Idempotent: bestaande access-list of host wordt hergebruikt, niet dubbel gemaakt.

Gebruik (op de VPS):
  set -a; . ~/.config/strongbad/npm.env; . ~/.config/strongbad/hypothese-demo.env; set +a
  python3 setup_npm.py
"""
import json
import os
import sys
import urllib.request

BASE = os.environ.get("NPM_URL")
USER = os.environ.get("NPM_USER")
PASS = os.environ.get("NPM_PASS")
DEMO_USER = os.environ.get("DEMO_USER")
DEMO_PASS = os.environ.get("DEMO_PASS")
DOMAIN = "hypothese.datawijs.nl"
ACL_NAME = "hypothese-demo"
FWD_HOST = os.environ.get("CONTAINER_IP")
FWD_PORT = 8906

if not (BASE and USER and PASS and FWD_HOST and DEMO_USER and DEMO_PASS):
    sys.exit("Zet NPM_URL, NPM_USER, NPM_PASS, CONTAINER_IP, DEMO_USER en DEMO_PASS in de env (zie docstring)")


def api(method, path, token=None, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(BASE + path, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            raw = r.read().decode()
            return r.status, (json.loads(raw) if raw else None)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


# 1. token
st, tok = api("POST", "/api/tokens", body={"identity": USER, "secret": PASS})
if st != 200:
    sys.exit(f"Auth mislukt ({st}): {tok}")
token = tok["token"]
print("Auth OK")

# 2. access-list: hergebruiken of aanmaken
_, lists = api("GET", "/api/nginx/access-lists", token=token)
acl = next((a["id"] for a in lists or [] if a.get("name") == ACL_NAME), None)
if acl:
    print(f"Access-list {ACL_NAME!r} bestaat al (id {acl})")
else:
    st, res = api("POST", "/api/nginx/access-lists", token=token, body={
        "name": ACL_NAME,
        "satisfy_any": True,  # zonder clients-regels eist False een allow -> alles 403
        "pass_auth": False,
        "items": [{"username": DEMO_USER, "password": DEMO_PASS}],
        "clients": [],
    })
    if st not in (200, 201):
        sys.exit(f"Access-list aanmaken mislukt ({st}): {res}")
    acl = res["id"]
    print(f"Access-list {ACL_NAME!r} aangemaakt (id {acl})")

# 3. proxy-host (eerst zonder cert)
_, hosts = api("GET", "/api/nginx/proxy-hosts", token=token)
host = next((h for h in hosts or [] if DOMAIN in h.get("domain_names", [])), None)
payload = {
    "domain_names": [DOMAIN],
    "forward_scheme": "http",
    "forward_host": FWD_HOST,
    "forward_port": FWD_PORT,
    "access_list_id": acl,
    "caching_enabled": False,
    "block_exploits": True,
    "allow_websocket_upgrade": True,
    "http2_support": False,
    # screenshots uploaden: NPM's default van 1 MB is te krap
    "advanced_config": "client_max_body_size 25m;",
    "locations": [],
    "ssl_forced": False,
    "certificate_id": 0,
    "hsts_enabled": False,
    "hsts_subdomains": False,
    "meta": {"letsencrypt_agree": False, "dns_challenge": False},
}
if host:
    hid = host["id"]
    print(f"Proxy-host bestaat al (id {hid})")
    if host.get("certificate_id"):
        sys.exit("Heeft al een cert. Klaar.")
else:
    st, host = api("POST", "/api/nginx/proxy-hosts", token=token, body=payload)
    if st not in (200, 201):
        sys.exit(f"Host aanmaken mislukt ({st}): {host}")
    hid = host["id"]
    print(f"Proxy-host aangemaakt (id {hid}) -> {FWD_HOST}:{FWD_PORT}, access-list {acl}")

# 4. inline Let's Encrypt cert via PUT op de host (DNS moet er al zijn)
put = dict(payload)
put.update({
    "certificate_id": "new",
    "ssl_forced": True,
    "http2_support": True,
    "hsts_enabled": True,
    "meta": {"letsencrypt_email": USER, "letsencrypt_agree": True, "dns_challenge": False},
})
st, res = api("PUT", f"/api/nginx/proxy-hosts/{hid}", token=token, body=put)
if st != 200:
    sys.exit(f"Cert/PUT mislukt ({st}): {res}\nHost bestaat wel (id {hid}); later opnieuw draaien.")
print(f"SSL geforceerd + Let's Encrypt-cert voor {DOMAIN}. Test: https://{DOMAIN}")
