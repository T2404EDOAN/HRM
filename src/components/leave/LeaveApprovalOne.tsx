import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BiCheck, BiX } from "react-icons/bi";
import Input from "../form/input/InputField";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('/');
};

interface LeaveApplication {
  id: number;
  employeeName: string;
  employeeId: string; // Add this
  avatar: string; // Add this
  type: string;
  applyDate: string;
  leaveStartDate: string;
  leaveEndDate: string;
  days: number;
  reason: string;
  approvedDate: string | null;
  approvedStartDate: string | null;
  approvedEndDate: string | null;
  approvedDays: number | null;
  hardCopy: boolean;
  managerComments: string | null;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const mockLeaveApplications: LeaveApplication[] = [
  {
    id: 1,
    employeeName: "John Doe",
    employeeId: "EMP001",
    avatar: "/images/user/user-17.jpg",
    type: "Annual Leave",
    applyDate: "2024-03-15",
    leaveStartDate: "2024-03-20",
    leaveEndDate: "2024-03-22",
    days: 3,
    reason: "Family vacation",
    approvedDate: "2024-03-16",
    approvedStartDate: "2024-03-20",
    approvedEndDate: "2024-03-22",
    approvedDays: 3,
    hardCopy: true,
    managerComments: "Approved",
    status: "Approved"
  }
];

export default function LeaveApprovalOne() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Filter data based on search term
  const filteredData = mockLeaveApplications.filter(application =>
    application.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.05]">
        <div className="w-72">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search leave applications..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <ComponentCard title="Leave Applications">
        <div className="flex flex-col">
          <div className="overflow-x-auto max-h-[calc(100vh-300px)]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">Sl</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]">Employee Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">Apply Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">Leave Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">Leave End Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">Days</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">Approved Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]">Approved Start Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]">Approved End Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">Approved Days</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">Hard Copy</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[100px]">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {currentItems.map((application, index) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{indexOfFirstItem + index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <img
                            width={40}
                            height={40}
                            src={application.avatar}
                            alt={application.employeeName}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {application.employeeId}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {application.employeeName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{formatDate(application.applyDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{formatDate(application.leaveStartDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{formatDate(application.leaveEndDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.days}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedDate ? formatDate(application.approvedDate) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedStartDate ? formatDate(application.approvedStartDate) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedEndDate ? formatDate(application.approvedEndDate) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedDays || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.hardCopy ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-3 justify-end">
                        <button className="p-1 text-green-500 hover:text-green-700 rounded-full hover:bg-green-50">
                          <BiCheck size={20} />
                        </button>
                        <button className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
                          <BiX size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination - now outside of scroll area */}
          <div className="flex items-center justify-between px-4 py-3 border-t dark:border-white/[0.05] bg-white dark:bg-gray-800 sticky bottom-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
