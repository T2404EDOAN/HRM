import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AttendanceFormOne from "../../components/attendance/AttendanceFormOne";
import AttendanceFormAdmin from "../../components/attendance/AttendanceFormAdmin";
import AwardListOne from "../../components/award/AwardListOne";

export default function AwardList() {
  return (
    <>
      <PageMeta
        title="Award List"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Award" />
      <div className="space-y-6">
        <ComponentCard title="Award List">
          <AwardListOne />
        </ComponentCard>
      </div>
    </>
  );
}
