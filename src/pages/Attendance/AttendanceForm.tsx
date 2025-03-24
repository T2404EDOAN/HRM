import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import AttendanceFormOne from "../../components/attendance/AttendanceFormOne";
import AttendanceFormAdmin from "../../components/attendance/AttendanceFormAdmin";

export default function AttendanceForm() {
  return (
    <>
      <PageMeta
        title="Attendance"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Take Attendance" />
      <div className="space-y-6">
        <ComponentCard title="Attendance Form">
          <AttendanceFormOne />
          <AttendanceFormAdmin />
        </ComponentCard>
      </div>
    </>
  );
}
