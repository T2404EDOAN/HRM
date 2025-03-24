import { useState } from "react";

interface AttendanceState {
  isCheckedIn: boolean;
  checkInTime?: string;
  checkOutTime?: string;
}

export default function AttendanceFormOne() {
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
    <div className="bg-white dark:bg-white/[0.03]">
      <div className="space-y-4">
        <div>
          <div className="text-2xl font-semibold mb-2">
            <span className="text-2xl inline-block w-8 mr-3">👤</span>
            Nguyễn Văn A
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            <div>
              <span className="text-2xl inline-block w-8 mr-3">📅</span>
              Date: {new Date().toLocaleDateString()}
            </div>
            <div>
              <span className="text-2xl inline-block w-8 mr-3">🕒</span>
              Current Time: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="mt-6">
          {!attendance.isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <span className="text-2xl inline-block w-8 mr-3">🔘</span>
              Check-in
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <span className="text-2xl inline-block w-8 mr-3">🔘</span>
              Check-out
            </button>
          )}
        </div>

        {attendance.checkInTime && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Last check-in: {attendance.checkInTime}
          </div>
        )}
        {attendance.checkOutTime && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Last check-out: {attendance.checkOutTime}
          </div>
        )}
      </div>
    </div>
  );
}
