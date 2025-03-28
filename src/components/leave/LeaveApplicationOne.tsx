import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { FiEdit, FiTrash2, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BiPlusCircle } from "react-icons/bi";
import Input from "../form/input/InputField";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Label from "../form/Label";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../icons";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";

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
  employeeId: string;
  avatar: string;
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

interface LeaveApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<LeaveApplication, 'id'>) => void;
}

const leaveTypeOptions = [
  { value: "annual", label: "Annual Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "personal", label: "Personal Leave" }
];

const LeaveApplicationForm = ({ isOpen, onClose, onSubmit }: LeaveApplicationFormProps) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    type: '',
    leaveStartDate: '',
    leaveEndDate: '',
    days: 0,
    reason: '',
    hardCopy: false
  });

  const calculateTotalDays = (from: string, to: string) => {
    if (!from || !to) return 0;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full rounded-xl bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              New Leave Application
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              ...formData,
              applyDate: new Date().toISOString(),
              approvedDate: null,
              approvedStartDate: null,
              approvedEndDate: null,
              approvedDays: null,
              managerComments: null,
              status: 'Pending'
            });
            onClose();
          }}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>
                  Employee
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>
                  Leave type
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  options={leaveTypeOptions}
                  value={formData.type}
                  onChange={(value) => setFormData({ ...formData, type: value })}
                  placeholder="Select leave type"
                  required
                />
              </div>

              <div>
                <Label>
                  From date
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative w-full">
                  <Flatpickr
                    value={formData.leaveStartDate}
                    onChange={([date]) => {
                      const startDate = date.toISOString();
                      setFormData(prev => ({
                        ...prev,
                        leaveStartDate: startDate,
                        days: calculateTotalDays(startDate, prev.leaveEndDate)
                      }));
                    }}
                    options={{
                      dateFormat: "d/m/Y",
                      allowInput: true,
                      minDate: "today",
                      placeholder: "dd/mm/yyyy"
                    }}
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                    required
                  />
                  <CalenderIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label>
                  End date
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative w-full">
                  <Flatpickr
                    value={formData.leaveEndDate}
                    onChange={([date]) => {
                      const endDate = date.toISOString();
                      setFormData(prev => ({
                        ...prev,
                        leaveEndDate: endDate,
                        days: calculateTotalDays(prev.leaveStartDate, endDate)
                      }));
                    }}
                    options={{
                      dateFormat: "d/m/Y",
                      allowInput: true,
                      minDate: formData.leaveStartDate || "today",
                      placeholder: "dd/mm/yyyy"
                    }}
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                    required
                  />
                  <CalenderIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label>Total days</Label>
                <Input
                  type="number"
                  value={formData.days}
                  disabled
                  className="bg-gray-100 dark:bg-gray-700"
                />
              </div>

              <div>
                <Label>Application hard copy</Label>
                <FileInput
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) => setFormData({ ...formData, hardCopy: e.target.files!.length > 0 })}
                  className="w-full"
                />
                <span className="text-xs text-gray-500 mt-1">
                  Supports: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                </span>
              </div>

              <div className="col-span-2">
                <Label>
                  Reason
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 min-h-[100px]"
                  required
                />
              </div>

              <div className="col-span-2 flex items-center justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

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

export default function LeaveApplicationOne() {
  const [isFormOpen, setIsFormOpen] = useState(false);
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

  const handleSubmit = (data: Omit<LeaveApplication, 'id'>) => {
    console.log('New leave application:', data);
    // Handle form submission
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
              placeholder="Search leave applications..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          <BiPlusCircle className="text-lg" />
          New Leave Application
        </button>
      </div>

      <ComponentCard title="Leave Applications">
        <div className="flex flex-col">
          <div className="overflow-x-auto max-h-[calc(100vh-300px)]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Apply Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Leave Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Leave End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approved Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approved Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approved End Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approved Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Hard Copy</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Manager Comments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedDate ? formatDate(application.approvedDate) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedStartDate ? formatDate(application.approvedStartDate) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedEndDate ? formatDate(application.approvedEndDate) : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.approvedDays || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.hardCopy ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{application.managerComments || '-'}</td>
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
                        <button className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50">
                          <FiEdit size={18} />
                        </button>
                        <button className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50">
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

      <LeaveApplicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
