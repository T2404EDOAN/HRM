import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AttendanceForm from "./pages/Attendance/AttendanceForm";
import MissingAttendance from "./pages/Attendance/MissingAttendace";
import MonthlyAttendance from "./pages/Attendance/MonthlyAttendance";
import AwardList from "./pages/Award/AwardList";
import Department from "./pages/Department/Department";
import SubDepartment from "./pages/Department/SubDepartment";
import Position from "./pages/Employee/Position";
import Employee from "./pages/Employee/Emloyee";
import EmployeePerformance from "./pages/Employee/EmployeePerformance";
import WeeklyHodiday from "./pages/Leave/WeeklyHodiday";
import Holiday from "./pages/Leave/Holiday";
import LeaveApplication from "./pages/Leave/LeaveApplication";
import LoanList from "./pages/Loan/RequestSalaryAdvance";
import SalaryAdvance from "./pages/Payroll/SalaryAdvance";
import SalaryGenerate from "./pages/Payroll/SalaryGenerate";
import ManageEmployeeSalary from "./pages/Payroll/ManageEmployeeSalary";
import Request from "./pages/Procurement/Request";
import Quotation from "./pages/Procurement/Quotation";
import BidAnlalysis from "./pages/Procurement/BidAnlalysis";
import PurchaseOder from "./pages/Procurement/PurchaseOder";
import GoodsRecevied from "./pages/Procurement/GoodsRecevied";
import Vendors from "./pages/Procurement/Vendors";
import Committees from "./pages/Procurement/Committees";
import Units from "./pages/Procurement/Units";
import Clients from "./pages/ProjectManagement/Clients";
import Projects from "./pages/ProjectManagement/ProjectsOne";
import ManageTask from "./pages/ProjectManagement/ManageTask";
import Reports from "./pages/ProjectManagement/Reports";
import TeamMembers from "./pages/ProjectManagement/TeamMembers";
import Candidates from "./pages/Recruitment/Candidates";
import CandidateShortlists from "./pages/Recruitment/CandidateShortlists";
import Interview from "./pages/Recruitment/Interview";
import CandidateSelection from "./pages/Recruitment/CandidateSelection";
import AttendanceReport from "./pages/Reports/AttendanceReport";
import LeaveReport from "./pages/Reports/LeaveReport";
import EmployeeReports from "./pages/Reports/EmployeeReports";
import Payroll from "./pages/Reports/Payroll";
import AdhocReport from "./pages/Reports/AdhocReport";
import PointSettings from "./pages/Rewardpoints/PointSettings";
import PointCategories from "./pages/Rewardpoints/PointCategories";
import ManagementPoints from "./pages/Rewardpoints/ManagementPoints";
import CollaborativePoints from "./pages/Rewardpoints/CollaborativePoints";
import AttendancePoints from "./pages/Rewardpoints/AttendancePoints";
import EmployeePoints from "./pages/Rewardpoints/EmployeePoints";
import Rules from "./pages/SetupsRules/Rules";
import LeaveApprovalOne from "./components/leave/LeaveApprovalOne";
import LeaveApproval from "./pages/Leave/LeaveApproval";
import RequestSalaryAdvance from "./pages/Loan/RequestSalaryAdvance";
import ApproveSalaryAdvance from "./pages/Loan/ApproveSalaryAdvance";
import EmployeeSalaryManagement from "./pages/Loan/EmployeeSalaryManagement";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

             {/* Attendance */}
             <Route path="/attendance-form" element={<AttendanceForm />} />
             <Route path="/attendance-monthly" element={<MonthlyAttendance />} />
             <Route path="/attendance-missing" element={<MissingAttendance />} />

              {/* Award */}
            <Route path="/award-list" element={<AwardList />} />

             {/* Department*/}
             <Route path="/department" element={<Department />} />
             <Route path="/sub-department" element={<SubDepartment />} />
       
              {/* Employee */}
             <Route path="/position" element={<Position />} />
             <Route path="/employee" element={<Employee />} />
             <Route path="/employee-performance" element={<EmployeePerformance />} />

              {/* Leave */}
              <Route path="/weekly-holiday" element={<WeeklyHodiday />} />
             <Route path="/holiday" element={<Holiday />} />
             <Route path="/leave-application" element={<LeaveApplication />} />
             <Route path="/leave-approval" element={<LeaveApproval />} />

               {/* Loan */}
            <Route path="/request-salary-advance" element={<RequestSalaryAdvance />} />
            <Route path="/approve-salary-advance" element={<ApproveSalaryAdvance />} />
            <Route path="/employee-salary-management" element={<EmployeeSalaryManagement />} />

             {/* Payroll */}
             <Route path="/salary-advance" element={<SalaryAdvance />} />
             <Route path="/salary-generate" element={<SalaryGenerate />} />
             <Route path="/manage-employee-salary" element={<ManageEmployeeSalary />} />

             {/* Procurement */}
            <Route path="/request" element={<Request />} />
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/bid-analysis" element={<BidAnlalysis />} />
            <Route path="/purchase-oder" element={<PurchaseOder />} />
            <Route path="/gooods-received" element={<GoodsRecevied />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/units" element={<Units />} />

            {/* Project management */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/manage-tasks" element={<ManageTask />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/team-members" element={<TeamMembers />} />

             {/* Recruitment */}
             <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidate-shortlists" element={<CandidateShortlists />} />
            <Route path="/interviews" element={<Interview />} />
            <Route path="/candidate_selection" element={<CandidateSelection />} />

             {/* Report */}
             <Route path="/attendance-reports" element={<AttendanceReport />} />
            <Route path="/leave-reports" element={<LeaveReport />} />
            <Route path="/employee-reports" element={<EmployeeReports />} />
            <Route path="/payroll-reports" element={<Payroll />} />
            <Route path="/adhoc-reports" element={<AdhocReport />} />

             {/* Report */}
             <Route path="/point-settings" element={<PointSettings />} />
            <Route path="/point-categories" element={<PointCategories />} />
            <Route path="/management-points" element={<ManagementPoints />} />
            <Route path="/collaborative-points" element={<CollaborativePoints />} />
            <Route path="/attendance-points" element={<AttendancePoints />} />
            <Route path="/employee-points" element={<EmployeePoints />} />

             {/* Tables */}
             <Route path="/rules" element={<Rules />} />
      

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
