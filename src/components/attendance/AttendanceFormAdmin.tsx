import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { TimeIcon } from "../../icons";
import ComponentCard from "../common/ComponentCard";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
  notes: string;
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
    notes: "Regular attendance"
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
    notes: "Late due to traffic"
  },
];

export default function AttendanceFormAdmin() {
  const [formData, setFormData] = useState({
    employee: "",   
    date: "",
    timeIn: "",
    timeOut: "",
    status: "",
    notes: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  const statusOptions = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "late", label: "Late" },
  ];

  const employeeOptions = [
    { value: "1", label: "Lindsey Curtis" },
    { value: "2", label: "Kaiya George" },
  ];

  const timeInOptions = [
    { value: "07:30 AM", label: "07:30 AM" },
    { value: "08:00 AM", label: "08:00 AM" },
    { value: "08:30 AM", label: "08:30 AM" },
    { value: "09:00 AM", label: "09:00 AM" },
    { value: "09:30 AM", label: "09:30 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "10:30 AM", label: "10:30 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
  ];

  const timeOutOptions = [
    { value: "04:00 PM", label: "04:00 PM" },
    { value: "04:30 PM", label: "04:30 PM" },
    { value: "05:00 PM", label: "05:00 PM" },
    { value: "05:30 PM", label: "05:30 PM" },
    { value: "06:00 PM", label: "06:00 PM" },
    { value: "06:30 PM", label: "06:30 PM" },
    { value: "07:00 PM", label: "07:00 PM" },
    { value: "07:30 PM", label: "07:30 PM" },
    { value: "08:00 PM", label: "08:00 PM" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleViewDetails = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsOpen(true);
  };

  return (
    <div>
      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  No.
                </TableCell>
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
                  Notes
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {attendanceData.map((record, index) => (
                <TableRow key={record.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {index + 1}
                  </TableCell>
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
                        <span classNameNo="block text-gray-500 text-theme-xs dark:text-gray-400">
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
                    {record.notes}
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
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                   
                      <button 
                        onClick={() => handleViewDetails(record)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                   
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialog with Form */}
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
                Edit Attendance - {selectedRecord?.user.name}
              </Dialog.Title>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <div className="space-y-6">
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
                    <Select
                      options={timeInOptions}
                      placeholder="Select time in"
                      onChange={(value) => handleInputChange("timeIn", value)}
                      className="dark:bg-dark-900"
                      value={formData.timeIn}
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
                    <Select
                      options={timeOutOptions}
                      placeholder="Select time out"
                      onChange={(value) => handleInputChange("timeOut", value)}
                      className="dark:bg-dark-900"
                      value={formData.timeOut}
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

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button className="rounded-lg bg-brand-500 px-4 py-2 text-white transition hover:bg-brand-600">
                  Save Changes
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
