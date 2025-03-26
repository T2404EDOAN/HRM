import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Select from "../form/Select";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../icons";
import { BiSearch } from "react-icons/bi"; // Add this import
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";
import "flatpickr/dist/plugins/monthSelect/style.css";
import Label from "../form/Label";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Attendance {
  id: number;
  employee: {
    id: string;
    image: string;
    name: string;
    role: string;
  };
  month: string;
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  leave: number;
  dailyRecords: DailyAttendance[];
}

// Add new interface for daily attendance
interface DailyAttendance {
  date: string;
  timeIn: string;
  timeOut: string;
  status: string;
  notes: string;
}

const tableData: Attendance[] = [
  {
    id: 1,
    employee: {
      id: "EMP001",
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    month: "03/2024",
    totalDays: 22,
    present: 18,
    absent: 2,
    late: 1,
    leave: 1,
    dailyRecords: [
      {
        date: "2024-03-01",
        timeIn: "08:00",
        timeOut: "17:00",
        status: "Present",
        notes: "On time"
      },
      {
        date: "2024-03-02",
        timeIn: "08:30",
        timeOut: "17:00",
        status: "Late",
        notes: "30 minutes late"
      },
      // Add more daily records as needed
    ]
  },
  // ...more attendance data
];

// Add new interfaces for filters
interface Department {
  value: string;
  label: string;
}

interface Employee {
  value: string;
  label: string;
  department: string;
}

// Add mock data for filters
const departments: Department[] = [
  { value: "it", label: "IT Department" },
  { value: "hr", label: "HR Department" },
  { value: "marketing", label: "Marketing" },
];

const employees: Employee[] = [
  { value: "1", label: "John Doe", department: "it" },
  { value: "2", label: "Jane Smith", department: "hr" },
  // Add more employees as needed
];

const attendanceStatuses = [
  { value: "all", label: "All" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
];

export default function MonthlyAttendanceOne() {
  // Update selectedDate state to string type
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Attendance | null>(null);

  // Update date change handler
  const handleDateChange = (date: Date[]) => {
    // Format to MM/YYYY
    const formattedDate = date[0].toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric'
    });
    setSelectedDate(formattedDate);
  };

  const handleViewDetails = (record: Attendance) => {
    setSelectedRecord(record);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-xl border border-gray-200 dark:border-white/[0.05] dark:bg-white/[0.03] md:grid-cols-2 lg:grid-cols-4">
        {/* Date Picker */}
        <div>
          <Label htmlFor="datePicker">Select Month & Year</Label>
          <div className="relative w-full flatpickr-wrapper">
            <Flatpickr
              value={selectedDate}
              onChange={handleDateChange}
              options={{
                plugins: [
                  monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "m/Y",
                    altFormat: "F Y"
                  })
                ],
                static: true
              }}
              placeholder="MM/YYYY"
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <CalenderIcon className="size-6" />
            </span>
          </div>
        </div>

        {/* Department Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Department
          </label>
          <Select
            options={departments}
            value={selectedDepartment}
            onChange={(value) => setSelectedDepartment(value)}
            placeholder="Select department"
          />
        </div>

        {/* Employee Dropdown */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Employee
          </label>
          <Select
            options={employees.filter(
              (emp) => !selectedDepartment || emp.department === selectedDepartment
            )}
            value={selectedEmployee}
            onChange={(value) => setSelectedEmployee(value)}
            placeholder="Select employee"
            isSearchable
          />
        </div>

        {/* Status Select - Replace the buttons section */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Attendance Status
          </label>
          <Select
            options={attendanceStatuses}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
            placeholder="Select status"
          />
        </div>
      </div>

      {/* Table Component */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Employee ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Month/Year
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total Days
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Present
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Absent
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Late
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Leave
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={record.employee.image}
                          alt={record.employee.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {record.employee.id}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {record.employee.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.month}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.totalDays}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.present}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.absent}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.late}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.leave}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <button 
                      className="p-2 text-brand-500 hover:text-brand-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      title="View Details"
                      onClick={() => handleViewDetails(record)}
                    >
                      <BiSearch className="size-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Updated Modal Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full rounded-xl bg-white dark:bg-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                Daily Attendance Details - {selectedRecord?.employee.name}
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Date
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Time In
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Time Out
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Status
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Notes
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {selectedRecord?.dailyRecords.map((day, index) => (
                      <TableRow key={index}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {day.date}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {day.timeIn}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {day.timeOut}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <Badge
                            size="sm"
                            color={
                              day.status === "Present"
                                ? "success"
                                : day.status === "Late"
                                ? "warning"
                                : "error"
                            }
                          >
                            {day.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {day.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
