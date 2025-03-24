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
import LoanList from "./pages/Loan/LoanList";

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

               {/* Loan */}
            <Route path="/loan-list" element={<LoanList />} />

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
