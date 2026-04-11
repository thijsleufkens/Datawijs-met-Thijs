import { WizardProgressWrapper } from "@/components/wizard-progress-wrapper";

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <WizardProgressWrapper />
      {children}
    </div>
  );
}
