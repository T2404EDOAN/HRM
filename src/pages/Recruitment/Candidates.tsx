import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import CandidatesOne from "../../components/recruitment/CandidatesOne";

export default function Candidates() {
  return (
    <>
      <PageMeta
        title="Attendance"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Missing Attendance Tables" />
      <div className="space-y-6">
        <ComponentCard title="Missing Attendance">
          <CandidatesOne />
        </ComponentCard>
      </div>
    </>
  );
}
