import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BiCheck, BiX } from "react-icons/bi";
import Input from "../form/input/InputField";

interface SalaryAdvanceRequest {
  id: number;
  employee: {
    id: string;
    name: string;
    image: string;
  };
  amount: number;
  reason: string;
  notes?: string;
  requestDate: string;
  status: string;
}

const tableData: SalaryAdvanceRequest[] = [
  {
    id: 1,
    employee: {
      id: "EMP001",
      name: "Nguyễn Văn A",
      image: "/images/user/user-17.jpg",
    },
    amount: 5000000,
    requestDate: "2024-02-20",
    reason: "Chi phí y tế",
    status: "Chờ duyệt",
  },
  {
    id: 2,
    employee: {
      id: "EMP002",
      name: "Trần Thị B",
      image: "/images/user/user-18.jpg",
    },
    amount: 3000000,
    requestDate: "2024-02-19",
    reason: "Chi phí cá nhân",
    status: "Đã duyệt",
  },
];

const statusOptions = [
  { value: "Đã duyệt", label: "Đã duyệt" },
  { value: "Chờ duyệt", label: "Chờ duyệt" },
  { value: "Từ chối", label: "Từ chối" },
];

export default function ApproveSalaryAdvanceOne() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Pagination and filtering logic
  const filteredData = tableData.filter(request => 
    request.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination with filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Add handleSearch function
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Update handleApprove function
  const handleApprove = (request: SalaryAdvanceRequest) => {
    console.log('Approved request:', { ...request, status: "Đã duyệt" });
  };

  // Update handleReject function
  const handleReject = (request: SalaryAdvanceRequest) => {
    console.log('Rejected request:', { ...request, status: "Từ chối" });
  };

  return (
    <div className="space-y-4">
      {/* Search only */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.05]">
        <div className="w-72">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by reason..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No.
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nhân viên
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Số tiền ứng
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Ngày gửi đơn
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Lý do
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentItems.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.id}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={request.employee.image}
                          alt={request.employee.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {request.employee.id}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {request.employee.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.amount.toLocaleString('vi-VN')} VNĐ
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {new Date(request.requestDate).toLocaleDateString('vi-VN')}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.reason}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        request.status === "Đã duyệt" 
                          ? "success" 
                          : request.status === "Chờ duyệt"
                          ? "warning"
                          : "error"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-3 justify-start">
                      <button 
                        className="p-1 text-green-500 hover:text-green-700 rounded-full hover:bg-green-50"
                        onClick={() => handleApprove(request)}
                      >
                        <BiCheck size={20} />
                      </button>
                      <button 
                        className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                        onClick={() => handleReject(request)}
                      >
                        <BiX size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t dark:border-white/[0.05]">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, tableData.length)} of {tableData.length} entries
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
      </div>
    </div>
  );
}
