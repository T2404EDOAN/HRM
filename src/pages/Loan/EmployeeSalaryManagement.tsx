import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";

import EmployeeSalaryManagementOne from "../../components/salaryadvance/EmployeeSalaryManagementOne";

export default function EmployeeSalaryManagement() {
  return (
    <>
      <PageMeta
        title="Award List"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Award" />
      <div className="space-y-6">
        <ComponentCard title="Award List">
          <EmployeeSalaryManagementOne/>
        </ComponentCard>
      </div>
    </>
  );
}
