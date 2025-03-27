import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import FileInput from "../form/input/FileInput"; // Add this import
import Button from "../ui/button/Button";

const steps = [
  { number: 1, title: "Thông tin cơ bản", active: true },
  { number: 2, title: "Thông tin lương và ngân hàng", active: false },
  { number: 3, title: "Thông tin công việc", active: false },
  { number: 4, title: "Thông tin sinh học liên hệ", active: false },
  { number: 5, title: "Người khác", active: false },
  { number: 6, title: "Người giám sát", active: false },
];

const countryOptions = [
  { value: "vietnam", label: "Việt Nam" },
  { value: "other", label: "Khác" },
];

const provinceOptions = [
  { value: "hanoi", label: "Hà Nội" },
  { value: "hcm", label: "TP. Hồ Chí Minh" },
  { value: "danang", label: "Đà Nẵng" },
  // Add more provinces...
];

const genderOptions = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" }
];

const maritalStatusOptions = [
  { value: "single", label: "Độc thân" },
  { value: "married", label: "Đã kết hôn" },
  { value: "divorced", label: "Ly hôn" }
];

const departmentOptions = [
  { value: "it", label: "Phòng IT" },
  { value: "hr", label: "Phòng Nhân sự" },
  { value: "marketing", label: "Phòng Marketing" },
  { value: "finance", label: "Phòng Tài chính" },
];

const positionOptions = [
  { value: "staff", label: "Nhân viên" },
  { value: "teamlead", label: "Trưởng nhóm" },
  { value: "manager", label: "Quản lý" },
  { value: "director", label: "Giám đốc" },
];

const taskTypeOptions = [
  { value: "fulltime", label: "Toàn thời gian" },
  { value: "parttime", label: "Bán thời gian" },
  { value: "probation", label: "Thử việc" },
  { value: "contract", label: "Hợp đồng" },
];

const employeeTypeOptions = [
  { value: "official", label: "Nhân viên chính thức" },
  { value: "probation", label: "Thử việc" },
  { value: "contract", label: "Hợp đồng" },
  { value: "collaborator", label: "Cộng tác viên" },
];

const salaryFrequencyOptions = [
  { value: "monthly", label: "Theo tháng" },
  { value: "weekly", label: "Theo tuần" },
  { value: "biweekly", label: "2 tuần/lần" },
];

const emergencyRelationOptions = [
  { value: "parent", label: "Cha/Mẹ" },
  { value: "spouse", label: "Vợ/Chồng" },
  { value: "sibling", label: "Anh/Chị/Em" },
  { value: "relative", label: "Người thân" },
  { value: "friend", label: "Bạn bè" },
];

const bloodTypeOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "O", label: "O" },
  { value: "AB", label: "AB" },
];

const healthStatusOptions = [
  { value: "excellent", label: "Tốt" },
  { value: "good", label: "Khá" },
  { value: "normal", label: "Bình thường" },
  { value: "poor", label: "Yếu" },
];

export default function EmployeeOneAdd() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
  const [selectedSalaryFrequency, setSelectedSalaryFrequency] = useState("");
  const [selectedEmergencyRelation, setSelectedEmergencyRelation] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("");
  const [hasDisability, setHasDisability] = useState(false);

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderDateInput = (label: string, value: string, onChange: (dates: Date[]) => void, required?: boolean) => (
    <div className="relative">
      <Label>
        {label}
        {required && (
          <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
          </svg>
        )}
      </Label>
      <div className="relative w-full flatpickr-wrapper">
        <Flatpickr
          value={value}
          onChange={onChange}
          options={{
            dateFormat: "d/m/Y",
            placeholder: "dd/mm/yyyy",
            allowInput: true
          }}
          placeholder="dd/mm/yyyy"
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );

  const renderStepper = () => (
    <ol className="flex items-center w-full text-sm text-gray-500 font-medium sm:text-base mb-12">
      {steps.map((step, index) => (
        <li key={index} className="flex flex-col items-center flex-1">
          <div className={`flex items-center justify-center w-full relative ${
            index !== steps.length - 1 ? 'after:content-[\'\'] after:absolute after:top-1/2 after:-translate-y-1/2 after:w-full after:h-[1px] after:bg-gray-200 after:left-[calc(50%+20px)]' : ''
          }`}>
            <span className={`w-8 h-8 ${
              step.number <= currentStep 
                ? 'bg-indigo-600 border-indigo-200'
                : 'bg-gray-100 border-gray-200'
            } border rounded-full flex justify-center items-center text-sm ${
              step.number <= currentStep ? 'text-white' : ''
            } z-10`}>
              {step.number}
            </span>
          </div>
          <span className="mt-2 text-xs text-center">{step.title}</span>
        </li>
      ))}
    </ol>
  );

  const renderFormButtons = (prevStep: number, nextStep: number, isLastStep?: boolean) => (
    <div className="flex justify-end gap-2">
      <Button 
        type="button"
        variant="outline"
        onClick={() => setCurrentStep(prevStep)}
      >
        Quay lại
      </Button>
      <Button
        type={isLastStep ? "submit" : "button"}
        variant="primary"
        onClick={isLastStep ? undefined : () => setCurrentStep(nextStep)}
      >
        {isLastStep ? "Hoàn thành" : "Tiếp theo"}
      </Button>
    </div>
  );

  const renderPersonalInfoForm = () => (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Thông Tin Cơ Bản</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <Label>
              Họ
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="text"
              placeholder="Nhập họ"
              required
            />
          </div>

          <div className="relative">
            <Label>Tên đệm</Label>
            <Input
              type="text"
              placeholder="Nhập tên đệm"
            />
          </div>

          <div className="relative">
            <Label>
              Tên
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="text"
              placeholder="Nhập tên"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Email
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Số điện thoại
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="tel"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div className="relative">
            <Label>Quốc gia</Label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={(value) => setSelectedCountry(value)}
              className="dark:bg-dark-900"
              placeholder="Chọn quốc gia"
            />
          </div>

          <div className="relative">
            <Label>Tỉnh/Thành phố</Label>
            <Select
              options={provinceOptions}
              value={selectedProvince}
              onChange={(value) => setSelectedProvince(value)}
              className="dark:bg-dark-900"
              placeholder="Chọn tỉnh/thành phố"
            />
          </div>

          <div className="relative">
            <Label>Quận/Huyện</Label>
            <Input
              type="text"
              placeholder="Nhập quận/huyện"
            />
          </div>

          <div className="relative">
            <Label>Phường/Xã</Label>
            <Input
              type="text"
              placeholder="Nhập phường/xã"
            />
          </div>

          <div className="relative">
            <Label>Địa chỉ cụ thể</Label>
            <Input
              type="text"
              placeholder="Số nhà, tên đường..."
            />
          </div>

          <div className="relative">
            <Label>Nơi sinh</Label>
            <Input
              type="text"
              placeholder="Nhập nơi sinh"
            />
          </div>

          <div className="relative">
            <Label>
              Số CMND/CCCD
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="text"
              placeholder="Nhập số CMND/CCCD"
              required
            />
          </div>

          {renderDateInput(
            "Ngày cấp CMND/CCCD",
            "",
            (dates) => console.log(dates),
            true
          )}

          <div className="relative">
            <Label>Nơi cấp CMND/CCCD</Label>
            <Input
              type="text"
              placeholder="Nhập nơi cấp"
            />
          </div>

          <div className="relative">
            <Label>Số hộ chiếu</Label>
            <Input
              type="text"
              placeholder="Nhập số hộ chiếu"
            />
          </div>

          <div className="relative">
            <Label>Số giấy phép lái xe</Label>
            <Input
              type="text"
              placeholder="Nhập số giấy phép lái xe"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="primary"
            onClick={() => setCurrentStep(2)}
          >
            Tiếp theo
          </Button>
        </div>
      </form>
    </div>
  );

  const renderAccountInfoForm = () => (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Thông Tin Tài Khoản</h3>
      <form className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <Label>
              Tên đăng nhập
              <svg /* svg for required marker */ />
            </Label>
            <Input
              type="text"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Mật khẩu
              <svg /* svg for required marker */ />
            </Label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Xác nhận mật khẩu
              <svg /* svg for required marker */ />
            </Label>
            <Input
              type="password"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <div className="relative">
            <Label>Email công ty</Label>
            <Input
              type="email"
              placeholder="email@congty.com"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {renderFormButtons(1, 3)}
        </div>
      </form>
    </div>
  );

  const renderSalaryInfoForm = () => (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Thông Tin Lương & Ngân Hàng</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <Label>
              Lương cơ bản
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="number"
              placeholder="Nhập lương cơ bản"
              required
            />
          </div>

          <div className="relative">
            <Label>Phụ cấp</Label>
            <Input
              type="number"
              placeholder="Nhập phụ cấp"
            />
          </div>

          <div className="relative">
            <Label>
              Tên ngân hàng
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="text"
              placeholder="Nhập tên ngân hàng"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Số tài khoản
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="text"
              placeholder="Nhập số tài khoản"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Chi nhánh
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="text"
              placeholder="Nhập chi nhánh ngân hàng"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Chủ tài khoản
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input
              type="text"
              placeholder="Nhập tên chủ tài khoản"
              required
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {renderFormButtons(1, 3)}
        </div>
      </form>
    </div>
  );

  const renderBiologicalInfoForm = () => {
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected avatar:", file.name);
      }
    };
  
    const handlePassportPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected passport photo:", file.name);
      }
    };
  
    return (
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Thông Tin Sinh Học & Liên Hệ</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {renderDateInput(
              "Ngày sinh",
              "",
              (dates) => console.log(dates),
              true
            )}
  
            <div className="relative">
              <Label>
                Giới tính
                <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </Label>
              <Select
                options={genderOptions}
                value={selectedGender}
                onChange={(value) => setSelectedGender(value)}
                placeholder="Chọn giới tính"
                required
              />
            </div>
  
            <div className="relative">
              <Label>Tình trạng hôn nhân</Label>
              <Select
                options={maritalStatusOptions}
                value={selectedMaritalStatus}
                onChange={(value) => setSelectedMaritalStatus(value)}
                placeholder="Chọn tình trạng hôn nhân"
              />
            </div>
  
            <div className="relative">
              <Label>Số trẻ em</Label>
              <Input
                type="number"
                min="0"
                placeholder="Nhập số trẻ em"
              />
            </div>
  
            <div className="relative">
              <Label>Tôn giáo</Label>
              <Input
                type="text"
                placeholder="Nhập tôn giáo"
              />
            </div>
  
            <div className="relative">
              <Label>Upload ảnh đại diện</Label>
              <FileInput 
                onChange={handleAvatarChange} 
                accept="image/*"
                className="w-full"
              />
            </div>
  
            <div className="relative">
              <Label>Upload ảnh cỡ hộ chiếu</Label>
              <FileInput 
                onChange={handlePassportPhotoChange} 
                accept="image/*"
                className="w-full"
              />
            </div>
  
            <div className="relative col-span-2">
              <h4 className="text-base font-medium mb-4">Thông Tin Liên Hệ Khẩn Cấp</h4>
            </div>
  
            <div className="relative">
              <Label>
                Người liên lạc khẩn cấp
                <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </Label>
              <Input
                type="text"
                placeholder="Nhập tên người liên lạc"
                required
              />
            </div>
  
            <div className="relative">
              <Label>
                Mối quan hệ
                <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </Label>
              <Select
                options={emergencyRelationOptions}
                value={selectedEmergencyRelation}
                onChange={(value) => setSelectedEmergencyRelation(value)}
                placeholder="Chọn mối quan hệ"
                required
              />
            </div>
  
            <div className="relative">
              <Label>
                Số điện thoại khẩn cấp
                <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </Label>
              <Input
                type="tel"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
          </div>
  
          <div className="flex gap-2 justify-end">
            {renderFormButtons(3, 5)}
          </div>
        </form>
      </div>
    );
  };

  const renderWorkInfoForm = () => (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Thông Tin Công Việc</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <Label>
              Phòng ban
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Select
              options={departmentOptions}
              value={selectedDepartment}
              onChange={(value) => setSelectedDepartment(value)}
              placeholder="Chọn phòng ban"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Chức vụ
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Select
              options={positionOptions}
              value={selectedPosition}
              onChange={(value) => setSelectedPosition(value)}
              placeholder="Chọn chức vụ"
              required
            />
          </div>

          <div className="relative">
            <Label>Loại nhiệm vụ</Label>
            <Select
              options={taskTypeOptions}
              value={selectedTaskType}
              onChange={(value) => setSelectedTaskType(value)}
              placeholder="Chọn loại nhiệm vụ"
            />
          </div>

          {renderDateInput(
            "Ngày tham gia",
            "",
            (dates) => console.log(dates),
            true
          )}

          {renderDateInput(
            "Ngày ký hợp đồng",
            "",
            (dates) => console.log(dates),
            true
          )}

          <div className="relative">
            <Label>Số thẻ nhân viên</Label>
            <Input 
              type="text" 
              placeholder="Nhập số thẻ nhân viên"
            />
          </div>

          <div className="relative">
            <Label>
              Giờ làm việc/tháng
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Input 
              type="number"
              min="0"
              placeholder="Nhập số giờ làm việc"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Tần suất trả lương
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Select
              options={salaryFrequencyOptions}
              value={selectedSalaryFrequency}
              onChange={(value) => setSelectedSalaryFrequency(value)}
              placeholder="Chọn tần suất trả lương"
              required
            />
          </div>

          <div className="relative">
            <Label>Lương theo giờ</Label>
            <Input 
              type="number"
              min="0"
              placeholder="Nhập lương theo giờ"
            />
          </div>

          <div className="relative">
            <Label>Cấp bậc nhân viên</Label>
            <Select
              options={positionOptions}
              value={selectedPosition}
              onChange={(value) => setSelectedPosition(value)}
              placeholder="Chọn cấp bậc"
            />
          </div>

          <div className="relative">
            <Label>Thành phố làm việc</Label>
            <Select
              options={provinceOptions}
              value={selectedProvince}
              onChange={(value) => setSelectedProvince(value)}
              placeholder="Chọn thành phố làm việc"
            />
          </div>

          <div className="relative">
            <Label>
              Loại nhân viên
              <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
              </svg>
            </Label>
            <Select
              options={employeeTypeOptions}
              value={selectedEmployeeType}
              onChange={(value) => setSelectedEmployeeType(value)}
              placeholder="Chọn loại nhân viên"
              required
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {renderFormButtons(2, 4)}
        </div>
      </form>
    </div>
  );

  const renderOtherDetailsForm = () => {
    const handleMedicalFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected medical file:", file.name);
      }
    };

    return (
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Thông Tin Khác</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-6 mb-6">
            {/* Cột thông tin y tế - bên trái */}
            <div className="flex-1 space-y-6">
              <h4 className="text-base font-medium mb-4">Thông Tin Y Tế</h4>
              <div className="relative">
                <Label>Nhóm máu</Label>
                <Select
                  options={bloodTypeOptions}
                  value={selectedBloodType}
                  onChange={(value) => setSelectedBloodType(value)}
                  placeholder="Chọn nhóm máu"
                />
              </div>

              <div className="relative">
                <Label>Tình trạng sức khỏe</Label>
                <Select
                  options={healthStatusOptions}
                  value={selectedHealthStatus}
                  onChange={(value) => setSelectedHealthStatus(value)}
                  placeholder="Chọn tình trạng sức khỏe"
                />
              </div>

              <div className="relative">
                <Label>Có khuyết tật không?</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={hasDisability}
                    onChange={(e) => setHasDisability(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">Có khuyết tật</span>
                </div>
              </div>

              {hasDisability && (
                <div className="relative">
                  <Label>Mô tả khuyết tật</Label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Nhập mô tả chi tiết về tình trạng khuyết tật"
                  />
                </div>
              )}
            </div>

            {/* Cột liên hệ cá nhân - bên phải */}
            <div className="flex-1 space-y-6">
              <h4 className="text-base font-medium mb-4">Liên Hệ Cá Nhân</h4>
              <div className="relative">
                <Label>Email cá nhân</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                />
              </div>

              <div className="relative">
                <Label>Số điện thoại di động</Label>
                <Input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
          </div>

          {/* Phần hồ sơ & tài liệu y tế - phía dưới */}
          <div className="border-t pt-6">
            <h4 className="text-base font-medium mb-4">Hồ Sơ & Tài Liệu Y Tế</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <Label>Tên tài liệu</Label>
                <Input
                  type="text"
                  placeholder="Nhập tên tài liệu"
                />
              </div>

              {renderDateInput(
                "Ngày hết hạn",
                "",
                (dates) => console.log(dates)
              )}

              <div className="relative col-span-2">
                <Label>Tệp đính kèm</Label>
                <FileInput 
                  onChange={handleMedicalFileChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 justify-end">
            {renderFormButtons(4, 6)}
          </div>
        </form>
      </div>
    );
  };

  const renderConfirmationForm = () => {
    return (
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Cài đặt người dùng</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <Label>
                Email
                <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </Label>
              <Input
                type="text"
                placeholder="Email"
                required
              />
            </div>

           
            

            <div className="relative">
              <Label>
                Mật khẩu
                <svg width="7" height="7" className="ml-1 inline" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                </svg>
              </Label>
              <Input
                type="tel"
                placeholder="Mật khẩu"
                required
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            {renderFormButtons(5, 6, true)}
          </div>
        </form>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfoForm();
      case 2:
        return renderSalaryInfoForm();
      case 3:
        return renderWorkInfoForm(); // New function
      case 4:
        return renderBiologicalInfoForm();
      case 5:
        return renderOtherDetailsForm();
      case 6:
        return renderConfirmationForm();
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow dark:bg-white/[0.03]">
      {renderStepper()}
      {renderStep()}
    </div>
  );
}
