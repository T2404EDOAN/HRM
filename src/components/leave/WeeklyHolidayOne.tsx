import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { FiEdit } from "react-icons/fi";
import { Dialog, Listbox } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

interface WeeklyHoliday {
    id: number;
    selectedDays: string[];
}

const dayOptions = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
];

// Initial data
const initialData: WeeklyHoliday = {
    id: 1,
    selectedDays: ['Saturday', 'Sunday'],
};

const EditForm = ({ isOpen, onClose, data, onSave }: any) => {
    const [selected, setSelected] = useState(
        data.selectedDays.map((day: string) => 
            dayOptions.find(opt => opt.value === day)
        )
    );

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-xl bg-white dark:bg-gray-800 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold">
                            Edit Weekly Holiday
                        </Dialog.Title>
                        <button onClick={onClose}>
                            <XMarkIcon className="size-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-base font-medium">Select Days</label>
                            <Listbox
                                value={selected}
                                onChange={setSelected}
                                multiple
                            >
                                <div className="relative">
                                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-700 py-3 pl-4 pr-10 text-left border dark:border-gray-600 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 min-h-[46px]">
                                        <span className="block truncate min-h-[24px]">
                                            {selected.length > 0 
                                                ? selected.map(day => day?.label).join(', ')
                                                : 'Select days'}
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>
                                    <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[280px] z-50">
                                        {dayOptions.map((day) => (
                                            <Listbox.Option
                                                key={day.value}
                                                value={day}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-3 pl-10 pr-4 ${
                                                        active
                                                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100'
                                                            : 'text-gray-900 dark:text-gray-100'
                                                    }`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className={`block truncate text-base ${selected ? 'font-medium' : 'font-normal'}`}>
                                                            {day.label}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    onSave({
                                        ...data,
                                        selectedDays: selected.map(opt => opt.value)
                                    });
                                    onClose();
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default function WeeklyHolidayOne() {
    const [holidayData, setHolidayData] = useState(initialData);
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
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
                                Day name
                            </TableCell>
                            <TableCell
                                isHeader
                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                {holidayData.id}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                {holidayData.selectedDays.join(", ")}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                <button
                                    onClick={() => setIsEditOpen(true)}
                                    className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
                                >
                                    <FiEdit size={18} />
                                </button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <EditForm
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                data={holidayData}
                onSave={setHolidayData}
            />
        </div>
    );
}
