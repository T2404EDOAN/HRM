import { useState } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Eye, Download } from "react-bootstrap-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Input from "../form/input/InputField";

interface SalaryAdvanceRequest {
  id: number;
  employee: {
    id: string;
    name: string;
    image: string;
  };
  salaryMonth: string;
  totalSalary: number;
}

const tableData: SalaryAdvanceRequest[] = [
  {
    id: 1,
    employee: {
      id: "EMP001",
      name: "Nguyễn Văn A",
      image: "/images/user/user-17.jpg",
    },
    salaryMonth: "02/2024",
    totalSalary: 15000000,
  },
  {
    id: 2,
    employee: {
      id: "EMP002",
      name: "Trần Thị B",
      image: "/images/user/user-18.jpg",
    },
    salaryMonth: "02/2024",
    totalSalary: 12000000,
  },
];

export default function EmployeeSalaryManagementOne() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Pagination and filtering logic
  const filteredData = tableData.filter(request => 
    request.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Update handler functions
  const handleView = (request: SalaryAdvanceRequest) => {
    console.log('View details:', request);
  };

  const handleDownload = (request: SalaryAdvanceRequest) => {
    console.log('Download salary info:', request);
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
              placeholder="Search by employee name..."
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
                  Sl
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Employee name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Salary month
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Total salary
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
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
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {request.employee.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.salaryMonth}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.totalSalary.toLocaleString('vi-VN')} VNĐ
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-3 justify-start">
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                        onClick={() => handleView(request)}
                        title="View details"
                      >
                        <Eye size={20} />
                      </button>
                      <button 
                        className="p-1 text-green-500 hover:text-green-700 rounded-full hover:bg-green-50"
                        onClick={() => handleDownload(request)}
                        title="Download"
                      >
                        <Download size={20} />
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
