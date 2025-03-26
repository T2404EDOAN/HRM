import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { TimeIcon } from "../../icons";
import ComponentCard from "../common/ComponentCard";

interface AttendanceRecord {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  workHours: string;
}

const attendanceData: AttendanceRecord[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    date: "2024-02-01",
    checkIn: "08:30 AM",
    checkOut: "05:30 PM",
    workHours: "9h",
    status: "Present",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    date: "2024-02-01",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    workHours: "9h",
    status: "Late",
  },
];

export default function RequestOne() {
  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    timeIn: "",
    timeOut: "",
    status: "",
    notes: "",
  });

  const statusOptions = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "late", label: "Late" },
  ];

  const employeeOptions = [
    { value: "1", label: "Lindsey Curtis" },
    { value: "2", label: "Kaiya George" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <ComponentCard title="Attendance Management">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Employee Select */}
          <div>
            <Label>Employee</Label>
            <Select
              options={employeeOptions}
              placeholder="Select employee"
              onChange={(value) => handleInputChange("employee", value)}
              className="dark:bg-dark-900"
            />
          </div>

          {/* Date Input */}
          <div>
            <Label htmlFor="date">Date</Label>
            <Input 
              type="date" 
              id="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>

          {/* Time In */}
          <div>
            <Label htmlFor="timeIn">Time In</Label>
            <div className="relative">
              <Input
                type="time"
                id="timeIn"
                value={formData.timeIn}
                onChange={(e) => handleInputChange("timeIn", e.target.value)}
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon className="size-6" />
              </span>
            </div>
          </div>

          {/* Time Out */}
          <div>
            <Label htmlFor="timeOut">Time Out</Label>
            <div className="relative">
              <Input
                type="time"
                id="timeOut"
                value={formData.timeOut}
                onChange={(e) => handleInputChange("timeOut", e.target.value)}
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <TimeIcon className="size-6" />
              </span>
            </div>
          </div>

          {/* Status Select */}
          <div>
            <Label>Status</Label>
            <Select
              options={statusOptions}
              placeholder="Select status"
              onChange={(value) => handleInputChange("status", value)}
              className="dark:bg-dark-900"
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input
              type="text"
              id="notes"
              placeholder="Enter reason if needed"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons - Fix closing div */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <button className="rounded-lg border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-500 hover:text-white">
            Delete
          </button>
          <button className="rounded-lg bg-brand-500 px-4 py-2 text-white transition hover:bg-brand-600">
            Save
          </button>
        </div>
      </ComponentCard>

      {/* Table Section - Fix TableRow structure */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  User
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Date
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Check In
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Check Out
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Work Hours
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={record.user.image}
                          alt={record.user.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {record.user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {record.user.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.date}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.checkIn}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.checkOut}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {record.workHours}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        record.status === "Present"
                          ? "success"
                          : record.status === "Late"
                          ? "warning"
                          : "error"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
