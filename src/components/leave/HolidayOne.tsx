import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { TimeIcon } from "../../icons";

interface AttendanceState {
  isCheckedIn: boolean;
  checkInTime?: string;
  checkOutTime?: string;
}

export default function HolidayOne() {
  const [attendance, setAttendance] = useState<AttendanceState>({
    isCheckedIn: false
  });

  const handleCheckIn = () => {
    setAttendance({
      isCheckedIn: true,
      checkInTime: new Date().toLocaleTimeString()
    });
  };

  const handleCheckOut = () => {
    setAttendance(prev => ({
      ...prev,
      isCheckedIn: false,
      checkOutTime: new Date().toLocaleTimeString()
    }));
  };

  return (
    <ComponentCard title="Daily Attendance">
      <div className="space-y-6">
        {/* Employee Info */}
        <div>
          <Label>Employee Name</Label>
          <Input 
            type="text" 
            value="Nguyễn Văn A"
            disabled
            className="bg-gray-100"
          />
        </div>

        {/* Current Date */}
        <div>
          <Label>Current Date</Label>
          <Input 
            type="text"
            value={new Date().toLocaleDateString()}
            disabled
            className="bg-gray-100"
          />
        </div>

        {/* Check In Time */}
        <div>
          <Label>Check In Time</Label>
          <div className="relative">
            <Input
              type="text"
              value={attendance.checkInTime || ""}
              disabled
              className="bg-gray-100"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>

        {/* Check Out Time */}
        <div>
          <Label>Check Out Time</Label>
          <div className="relative">
            <Input
              type="text"
              value={attendance.checkOutTime || ""}
              disabled
              className="bg-gray-100"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          {!attendance.isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              className="rounded-lg bg-brand-500 px-4 py-2 text-white transition hover:bg-brand-600"
            >
              Check In
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
            >
              Check Out
            </button>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
