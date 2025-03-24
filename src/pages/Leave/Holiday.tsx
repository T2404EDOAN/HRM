import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import MissingAttendanceOne from "../../components/attendance/MissingAttendanceOne";
import PositionOne from "../../components/employee/PositionOne";
import HolidayOne from "../../components/leave/HolidayOne";

export default function Holiday() {
  return (
    <>
      <PageMeta
        title="Attendance"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Missing Attendance Tables" />
      <div className="space-y-6">
        <ComponentCard title="Missing Attendance">
          <HolidayOne />
        </ComponentCard>
      </div>
    </>
  );
}
