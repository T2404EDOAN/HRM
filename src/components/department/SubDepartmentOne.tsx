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
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import { BiPlusCircle } from "react-icons/bi";
import Checkbox from "../form/input/Checkbox"; 

interface SubDepartment {
  id: number;
  name: string;
  departmentName: string;
  status: string;
}

const tableData: SubDepartment[] = [
  {
    id: 1,
    name: "Frontend Development",
    departmentName: "IT Department",
    status: "Active",
  },
  {
    id: 2,
    name: "Backend Development",
    departmentName: "IT Department",
    status: "Active",
  },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const departmentOptions = [
  { value: "IT Department", label: "IT Department" },
  { value: "HR Department", label: "HR Department" },
  // ...add more departments
];

interface SubDepartmentFormProps {
  subDepartment?: SubDepartment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SubDepartment, 'id'>) => void;
  mode: 'add' | 'edit';
}

const SubDepartmentForm = ({ subDepartment, isOpen, onClose, onSubmit, mode }: SubDepartmentFormProps) => {
  const [formData, setFormData] = useState({
    name: subDepartment?.name || '',
    departmentName: subDepartment?.departmentName || '',
    status: subDepartment?.status || 'Active'  
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-xl bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              {mode === 'add' ? 'Add New Sub Department' : 'Edit Sub Department'}
            </Dialog.Title>
            <button
              onClick={() => onClose()}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
            onClose();
          }}>
            <div className="space-y-6">
              <div>
                <Label>Sub Department Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter sub department name"
                />
              </div>
              
              <div>
                <Label>Department</Label>
                <Select
                  options={departmentOptions}
                  value={formData.departmentName}
                  onChange={(value) => handleInputChange("departmentName", value)}
                  className="dark:bg-dark-900"
                />
              </div>

              <div>
                <Label>Status</Label>
                <div className="space-y-2">
                  {statusOptions.map(option => (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.status === option.value}
                        onChange={() => handleInputChange("status", option.value)}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {option.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 flex items-center gap-2"
                >
                  {mode === 'add' && <BiPlusCircle className="text-lg" />}
                  {mode === 'add' ? 'Add' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default function SubDepartmentOne() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSubDepartment, setEditingSubDepartment] = useState<SubDepartment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  // Pagination and filtering logic
  const filteredData = tableData.filter(subDept => 
    subDept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subDept.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Add handleEdit function
  const handleEdit = (subDept: SubDepartment) => {
    setEditingSubDepartment(subDept);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Search and Add Button */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 dark:bg-white/[0.03] dark:border-white/[0.05]">
        <div className="w-72">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search sub departments..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <BiPlusCircle className="text-lg" />
          Add
        </button>
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
                  Sub Department name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Department name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
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
              {currentItems.map((subDept) => (
                <TableRow key={subDept.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {subDept.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {subDept.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {subDept.departmentName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={subDept.status === "Active" ? "success" : "error"}
                    >
                      {subDept.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex gap-3">
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                        onClick={() => handleEdit(subDept)}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
                        <FiTrash2 size={18} />
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

      {/* Unified Form Modal */}
      <SubDepartmentForm
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setEditingSubDepartment(null);
        }}
        onSubmit={(data) => {
          if (editingSubDepartment) {
            // Handle edit
            console.log('Updated sub department:', { ...data, id: editingSubDepartment.id });
          } else {
            // Handle add
            console.log('New sub department:', data);
          }
        }}
        subDepartment={editingSubDepartment || undefined}
        mode={editingSubDepartment ? 'edit' : 'add'}
      />
    </div>
  );
}
