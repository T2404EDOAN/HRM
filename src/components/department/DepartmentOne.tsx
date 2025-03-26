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

interface Department {
  id: number;
  name: string;
  status: string;
}

const tableData: Department[] = [
  {
    id: 1,
    name: "IT Department",
    status: "Active",
  },
  {
    id: 2,
    name: "HR Department",
    status: "Active",
  },
  {
    id: 3,
    name: "Marketing Department",
    status: "Pending",
  },
  {
    id: 4,
    name: "Finance Department",
    status: "Cancel",
  },
  {
    id: 5,
    name: "Operations Department",
    status: "Active",
  },
  {
    id: 6,
    name: "Sales Department",
    status: "Active",
  },
  {
    id: 7,
    name: "Research & Development",
    status: "Pending",
  },
  {
    id: 8,
    name: "Quality Assurance",
    status: "Active",
  },
  {
    id: 9,
    name: "Customer Service",
    status: "Active",
  },
  {
    id: 10,
    name: "Legal Department",
    status: "Pending",
  },
  {
    id: 11,
    name: "Public Relations",
    status: "Active",
  },
  {
    id: 12,
    name: "Product Management",
    status: "Cancel",
  },
  {
    id: 13,
    name: "Supply Chain",
    status: "Active",
  },
  {
    id: 14,
    name: "Administration",
    status: "Active",
  },
  {
    id: 15,
    name: "Training Department",
    status: "Pending",
  }
];

interface EditDepartmentFormProps {
  department: Department;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Department) => void;
}

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Cancel", label: "Cancel" },
];

const EditDepartmentForm = ({ department, isOpen, onClose, onSubmit }: EditDepartmentFormProps) => {
  const [formData, setFormData] = useState(department);

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
              Edit Department
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
                <Label>Department Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              
              <div>
                <Label>Status</Label>
                <Select
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => handleInputChange("status", value)}
                  className="dark:bg-dark-900"
                />
              </div>

              {/* Action Buttons */}
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
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

interface AddDepartmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Department, 'id'>) => void;
}

const AddDepartmentForm = ({ isOpen, onClose, onSubmit }: AddDepartmentFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active'
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
              Add New Department
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
                <Label>Department Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter department name"
                />
              </div>
              
              <div>
                <Label>Status</Label>
                <Select
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => handleInputChange("status", value)}
                  className="dark:bg-dark-900"
                />
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
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                >
                  Add Department
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default function DepartmentOne() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const itemsPerPage = 5;
  
  // Filter data based on search term
  const filteredData = tableData.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination with filtered data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Reset to first page when searching
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (updatedDepartment: Department) => {
    // Here you would typically update the data in your backend
    // For now, we'll just update it in the frontend
    const updatedData = tableData.map((dept) =>
      dept.id === updatedDepartment.id ? updatedDepartment : dept
    );
    // Update your data source here
    console.log('Updated department:', updatedDepartment);
  };

  const handleAddSubmit = (newDepartment: Omit<Department, 'id'>) => {
    // Here you would typically send to backend
    // For now, just log it
    console.log('New department:', newDepartment);
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
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          + Add Department
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
              {currentItems.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm">
                    {department.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {department.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        department.status === "Active"
                          ? "success"
                          : department.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {department.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex gap-3">
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                        onClick={() => handleEdit(department)}
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

      {/* Add Modal */}
      <AddDepartmentForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
      />

      {/* Edit Modal */}
      {editingDepartment && (
        <EditDepartmentForm
          department={editingDepartment}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingDepartment(null);
          }}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
}
