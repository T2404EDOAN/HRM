import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useState, useEffect, useRef } from "react";

import { PlusIcon, Search as SearchIcon, MoreHorizontal, Pencil, Trash2, Mail, FileText } from "lucide-react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

interface Employee {
  id: number;
  code: string;
  name: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  position: string;
  department: string;
  avatar: string; // Thêm trường avatar
}

const tableData: Employee[] = [
  {
    id: 1,
    code: "NV001",
    name: "Nguyễn Văn A",
    gender: "Nam",
    birthDate: "1990-01-01",
    phone: "0123456789",
    email: "nguyenvana@example.com",
    position: "Nhân viên",
    department: "Phòng Kỹ thuật",
    avatar: "/images/user/user-17.jpg"
  },
  {
    id: 2,
    code: "NV002",
    name: "Nguyễn Văn B",
    gender: "Nam",
    birthDate: "1990-01-01", 
    phone: "0123456789",
    email: "nguyenvanb@example.com",
    position: "Nhân viên",
    department: "Phòng Kỹ thuật",
    avatar: "/images/user/user-18.jpg"
  },
  // ...thêm dữ liệu mẫu khác
];

export default function EmployeeProfileOne() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDropdownToggle = (e: React.MouseEvent, employeeId: number) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.top - 10,
        left: rect.left
      });
    }
    setActiveDropdown(activeDropdown === employeeId ? null : employeeId);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleAddClick = () => {
    navigate("/employee-profile/add"); // Updated path
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button variant="primary" onClick={handleAddClick}>
          <PlusIcon className="mr-2 h-6 w-6" /> {/* Sửa lại size */}
          Thêm
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="p-4">
          <div className="w-[292px] relative">
            <Input 
              type="text" 
              id="input"
              className="pl-10" 
            />
            <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  STT
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Mã nhân viên
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Họ và tên
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Giới tính
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Ngày sinh
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Số điện thoại
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Email
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Vị trí
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Đơn vị
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((employee, index) => (
                <TableRow key={employee.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.code}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={employee.avatar}
                          alt={employee.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {employee.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {employee.position}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.gender}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.birthDate}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.phone}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.position}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {employee.department}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="relative">
                      <button 
                        ref={buttonRef}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        onClick={(e) => handleDropdownToggle(e, employee.id)}
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </button>
                      
                      {activeDropdown === employee.id && (
                        <div 
                          className="fixed w-44 bg-white rounded-md shadow-lg border border-gray-200 z-[9999]"
                          style={{
                            top: `${dropdownPosition.top}px`,
                            left: `${dropdownPosition.left}px`,
                          }}
                        >
                          <div className="py-1">
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 group"
                              onClick={() => console.log('Edit', employee.id)}
                            >
                              <Pencil className="h-4 w-4 mr-2 text-blue-600" />
                              <span className="text-blue-600">Sửa</span>
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 group"
                              onClick={() => console.log('Send Mail', employee.id)}
                            >
                              <Mail className="h-4 w-4 mr-2 text-green-600" />
                              <span className="text-green-600">Gửi mail</span>
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 group"
                              onClick={() => console.log('Contract', employee.id)}
                            >
                              <FileText className="h-4 w-4 mr-2 text-yellow-600" />
                              <span className="text-yellow-600">Hợp đồng</span>
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 group"
                              onClick={() => console.log('Delete', employee.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                              <span className="text-red-600">Xóa</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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
