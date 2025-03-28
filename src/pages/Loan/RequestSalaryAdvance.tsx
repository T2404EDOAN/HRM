import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import RequestSalaryAdvanceOne from "../../components/salaryadvance/RequestSalaryAdvanceOne";

export default function RequestSalaryAdvance() {
  return (
    <>
      <PageMeta
        title="Award List"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Award" />
      <div className="space-y-6">
        <ComponentCard title="Award List">
          <RequestSalaryAdvanceOne />
        </ComponentCard>
      </div>
    </>
  );
}
