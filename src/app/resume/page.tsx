import { ResumeViewer } from "@/components/ResumeViewer";
import { Suspense } from "react";

export const metadata = {
  title: "Resume",
  description:
    "Live resume viewer — JavaScript / .NET / Java full-stack variants. Print or download.",
};

export default function ResumePage() {
  return (
    <Suspense fallback={null}>
      <ResumeViewer />
    </Suspense>
  );
}
