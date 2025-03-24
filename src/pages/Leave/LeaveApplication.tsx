import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import MonthlyAttendanceOne from "../../components/attendance/MonthlyAttendanceOne";
import EmployeePerformanceOne from "../../components/employee/EmployeePerformanceOne";
import LeaveApplicationOne from "../../components/leave/LeaveApplicationOne";

export default function LeaveApplication() {
  return (
    <>
      <PageMeta
        title="Attendance"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Monthly Attendance Tables" />
      <div className="space-y-6">
        <ComponentCard title="Monthly Attendance">
          <LeaveApplicationOne />
        </ComponentCard>
      </div>
    </>
  );
}
