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
import { BiPlusCircle } from "react-icons/bi";

interface SalaryAdvanceRequest {
  id: number;
  amount: number;
  reason: string;
  notes?: string;
  requestDate: string;
  status: string;
}

const tableData: SalaryAdvanceRequest[] = [
  {
    id: 1,
    amount: 5000000,
    requestDate: "2024-02-20",
    reason: "Medical expenses",
    status: "Chờ duyệt",
  },
  {
    id: 2,
    amount: 3000000,
    requestDate: "2024-02-19",
    reason: "Personal expenses",
    status: "Đã duyệt",
  },
];

const statusOptions = [
  { value: "Đã duyệt", label: "Đã duyệt" },
  { value: "Chờ duyệt", label: "Chờ duyệt" },
  { value: "Từ chối", label: "Từ chối" },
];

interface SalaryAdvanceFormProps {
  request?: SalaryAdvanceRequest;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SalaryAdvanceRequest, 'id'>) => void;
  mode: 'add' | 'edit';
}

const SalaryAdvanceForm = ({ request, isOpen, onClose, onSubmit, mode }: SalaryAdvanceFormProps) => {
  const [formData, setFormData] = useState({
    amount: request?.amount || 0,
    reason: request?.reason || '',
    notes: request?.notes || '',
    requestDate: new Date().toISOString().split('T')[0],
    status: 'Chờ duyệt'
  });

  const handleInputChange = (field: string, value: string | number) => {
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
              Salary Advance Request
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
                <Label>Advance Amount *</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", Number(e.target.value))}
                  placeholder="Enter advance amount"
                  required
                />
              </div>
              
              <div>
                <Label>Reason *</Label>
                <Input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  placeholder="Enter reason"
                  required
                />
              </div>

              <div>
                <Label>Notes (optional)</Label>
                <Input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter notes"
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
                  Submit Request
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default function RequestSalaryAdvanceOne() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<SalaryAdvanceRequest | null>(null);
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

  // Add handleEdit function
  const handleEdit = (request: SalaryAdvanceRequest) => {
    setEditingRequest(request);
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
              placeholder="Search by reason..."
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
                  Advance Amount
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Request Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Reason
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {currentItems.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {request.id}
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
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex gap-3">
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                        onClick={() => handleEdit(request)}
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
      <SalaryAdvanceForm
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setEditingRequest(null);
        }}
        onSubmit={(data) => {
          if (editingRequest) {
            console.log('Updated request:', { ...data, id: editingRequest.id });
          } else {
            console.log('New request:', data);
          }
        }}
        request={editingRequest || undefined}
        mode={editingRequest ? 'edit' : 'add'}
      />
    </div>
  );
}
