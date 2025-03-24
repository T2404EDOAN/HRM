import { useState } from "react";

interface AttendanceRecord {
  id: number;
  employee: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: 'Present' | 'Absent' | 'Late';
  notes?: string;
}

export default function AttendanceFormAdmin() {
  const [formData, setFormData] = useState({
    employee: '',
    date: '',
    timeIn: '',
    timeOut: '',
    status: 'Present',
    notes: ''
  });

  const [records, setRecords] = useState<AttendanceRecord[]>([
    {
      id: 1,
      employee: 'Nguyễn Văn A',
      date: '2025-03-24',
      timeIn: '08:30',
      timeOut: '17:30',
      status: 'Present'
    },
    {
      id: 2,
      employee: 'Trần B',
      date: '2025-03-24',
      timeIn: '09:00',
      timeOut: '18:00',
      status: 'Late',
      notes: 'Kẹt xe'
    }
  ]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">📌 Attendance Management</h2>
      
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              <span className="text-2xl mr-2">👤</span>Employee
            </label>
            <select className="w-full p-2 border rounded">
              <option>Select Employee</option>
              <option>Nguyễn Văn A</option>
              <option>Trần B</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">
              <span className="text-2xl mr-2">📅</span>Date
            </label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-2xl mr-2">🕒</span>Time In
            </label>
            <input type="time" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-2xl mr-2">🕒</span>Time Out
            </label>
            <input type="time" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-2xl mr-2">📌</span>Status
            </label>
            <select className="w-full p-2 border rounded">
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-2xl mr-2">📝</span>Notes
            </label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Enter reason if any" />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            💾 Save
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            ❌ Delete
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">📊 Attendance Records</h3>
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time In</th>
              <th className="p-4 text-left">Time Out</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Notes</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {records.map((record) => (
              <tr key={record.id}>
                <td className="p-4">{record.employee}</td>
                <td className="p-4">{record.date}</td>
                <td className="p-4">{record.timeIn}</td>
                <td className="p-4">{record.timeOut}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded ${
                    record.status === 'Present' ? 'bg-green-100 text-green-800' :
                    record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="p-4">{record.notes}</td>
                <td className="p-4">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">✏️ Edit</button>
                  <button className="text-red-500 hover:text-red-700">❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
