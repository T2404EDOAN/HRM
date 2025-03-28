import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { BiPlusCircle } from "react-icons/bi";
import Input from "../form/input/InputField";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Label from "../form/Label";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../icons";

interface Holiday {
  id: number;
  name: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
}

const mockHolidays: Holiday[] = [
  {
    id: 1,
    name: "Tết Nguyên Đán",
    fromDate: "2024-02-08",
    toDate: "2024-02-14",
    totalDays: 7
  },
  {
    id: 2,
    name: "Giỗ Tổ Hùng Vương",
    fromDate: "2024-04-18",
    toDate: "2024-04-18",
    totalDays: 1
  },
  {
    id: 3,
    name: "Lễ 30/4 - 1/5",
    fromDate: "2024-04-30",
    toDate: "2024-05-01",
    totalDays: 2
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('/');
};

interface HolidayFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Holiday, 'id'>) => void;
}

const HolidayForm = ({ isOpen, onClose, onSubmit }: HolidayFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    fromDate: '',
    toDate: '',
    totalDays: 0
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
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-xl bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              New Holiday
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
            onSubmit(formData);
            onClose();
          }}>
            <div className="space-y-6">
              <div>
                <Label>
                  Holiday name
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter holiday name"
                  required
                />
              </div>

              <div>
                <Label>
                  From date
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative w-full flatpickr-wrapper">
                  <Flatpickr
                    value={formData.fromDate}
                    onChange={([date]) => {
                      const fromDate = date.toISOString();
                      setFormData(prev => ({
                        ...prev,
                        fromDate,
                        totalDays: calculateTotalDays(fromDate, prev.toDate)
                      }));
                    }}
                    options={{
                      dateFormat: "d/m/Y",
                      allowInput: true,
                      disableMobile: true,
                      placeholder: "dd/mm/yyyy"
                    }}
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                    placeholder="dd/mm/yyyy"
                    required
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <CalenderIcon className="size-6" />
                  </span>
                </div>
              </div>

              <div>
                <Label>
                  End date
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative w-full flatpickr-wrapper">
                  <Flatpickr
                    value={formData.toDate}
                    onChange={([date]) => {
                      const toDate = date.toISOString();
                      setFormData(prev => ({
                        ...prev,
                        toDate,
                        totalDays: calculateTotalDays(prev.fromDate, toDate)
                      }));
                    }}
                    options={{
                      dateFormat: "d/m/Y",
                      allowInput: true,
                      disableMobile: true,
                      placeholder: "dd/mm/yyyy"
                    }}
                    className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                    placeholder="dd/mm/yyyy"
                    required
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <CalenderIcon className="size-6" />
                  </span>
                </div>
              </div>

              <div>
                <Label>Total days</Label>
                <Input
                  type="number"
                  value={formData.totalDays}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 flex items-center gap-2"
                >
                  <BiPlusCircle className="text-lg" />
                  Add
                </button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default function HolidayOne() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddHoliday = (data: Omit<Holiday, 'id'>) => {
    console.log('New holiday:', data);
    // Handle adding new holiday here
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
              placeholder="Search holidays..."
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

      <ComponentCard title="Holiday List">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Holiday Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  From Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  To Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Days
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {mockHolidays.map((holiday, index) => (
                <tr key={holiday.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {holiday.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {formatDate(holiday.fromDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {formatDate(holiday.toDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {holiday.totalDays}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-3 justify-end">
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                      >
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
      </ComponentCard>

      <HolidayForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddHoliday}
      />
    </div>
  );
}
