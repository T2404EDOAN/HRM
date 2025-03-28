import { useState } from "react";
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import FileInput from "../form/input/FileInput"; // Add this import
import Button from "../ui/button/Button";
import { UserIcon, BriefcaseIcon, AcademicCapIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const steps = [
  { 
    number: 1, 
    title: "Thông tin cơ bản", 
    active: true,
    icon: UserIcon
  },
  { 
    number: 2, 
    title: "Thông tin công việc", 
    active: false,
    icon: BriefcaseIcon
  },
  { 
    number: 3, 
    title: "Thông tin trình độ và kỹ năng", 
    active: false,
    icon: AcademicCapIcon
  },
  { 
    number: 4, 
    title: "Lương và phúc lợi", 
    active: false,
    icon: CurrencyDollarIcon
  },
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

const ethnicityOptions = [
  { value: "kinh", label: "Kinh" },
  { value: "tay", label: "Tày" },
  { value: "muong", label: "Mường" },
  // Add more as needed
];

const religionOptions = [
  { value: "none", label: "Không" },
  { value: "buddhism", label: "Phật giáo" },
  { value: "catholic", label: "Công giáo" },
  { value: "protestant", label: "Tin lành" },
  // Add more as needed
];

const bankOptions = [
  { value: "vcb", label: "Vietcombank" },
  { value: "tcb", label: "Techcombank" },
  { value: "bidv", label: "BIDV" },
  // Add more as needed
];

const contractTypeOptions = [
  { value: "probation", label: "Hợp đồng thử việc" },
  { value: "official", label: "Hợp đồng chính thức" },
  { value: "temporary", label: "Hợp đồng thời vụ" },
];

const workStatusOptions = [
  { value: "working", label: "Đang làm" },
  { value: "resigned", label: "Nghỉ việc" },
  { value: "probation", label: "Thử việc" },
  { value: "maternity", label: "Nghỉ thai sản" },
];

const workShiftOptions = [
  { value: "regular", label: "Ca hành chính" },
  { value: "night", label: "Ca đêm" },
  { value: "flexible", label: "Linh hoạt" },
];

const workLocationOptions = [
  { value: "office", label: "Văn phòng" },
  { value: "branch", label: "Chi nhánh" },
  { value: "remote", label: "Làm từ xa" },
];

const workTypeOptions = [
  { value: "fulltime", label: "Toàn thời gian" },
  { value: "parttime", label: "Bán thời gian" },
  { value: "collaborator", label: "Hợp tác viên" },
];

const educationLevelOptions = [
  { value: "university", label: "Đại học" },
  { value: "college", label: "Cao đẳng" },
  { value: "vocational", label: "Trung cấp" },
  { value: "highschool", label: "Trung học phổ thông" },
];

const majorOptions = [
  { value: "it", label: "Công nghệ thông tin" },
  { value: "business", label: "Quản trị kinh doanh" },
  { value: "accounting", label: "Kế toán" },
  { value: "marketing", label: "Marketing" },
  // Add more as needed
];

const skillLevelOptions = [
  { value: "basic", label: "Cơ bản" },
  { value: "intermediate", label: "Khá" },
  { value: "advanced", label: "Giỏi" },
  { value: "expert", label: "Thành thạo" },
];

const languageOptions = [
  { value: "english", label: "Tiếng Anh" },
  { value: "japanese", label: "Tiếng Nhật" },
  { value: "chinese", label: "Tiếng Trung" },
  { value: "korean", label: "Tiếng Hàn" },
];

const allowanceTypes = [
  { value: "transport", label: "Phụ cấp xăng xe" },
  { value: "meal", label: "Phụ cấp ăn trưa" },
  { value: "housing", label: "Phụ cấp nhà ở" },
  { value: "phone", label: "Phụ cấp điện thoại" },
  { value: "responsibility", label: "Phụ cấp trách nhiệm" },
];

type Certificate = {
  name: string;
  issueDate: string;
  expiryDate: string;
  organization: string;
  file: File | null;
};

type Allowance = {
  type: string;
  amount: number;
};

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
  const [selectedEthnicity, setSelectedEthnicity] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [useCurrentAddress, setUseCurrentAddress] = useState(false);
  const [age, setAge] = useState(0);
  const [receiveViaBankAccount, setReceiveViaBankAccount] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [employeeCode, setEmployeeCode] = useState("");
  const [selectedContractType, setSelectedContractType] = useState("");
  const [selectedWorkStatus, setSelectedWorkStatus] = useState("");
  const [selectedWorkShift, setSelectedWorkShift] = useState("");
  const [selectedWorkLocation, setSelectedWorkLocation] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState("");
  const [oldEmployeeCode, setOldEmployeeCode] = useState("");
  const [directManager, setDirectManager] = useState("");
  const [contractEndDate, setContractEndDate] = useState("");
  const [resignationReason, setResignationReason] = useState("");
  const [resignationDate, setResignationDate] = useState("");
  const [workNotes, setWorkNotes] = useState("");
  const [selectedEducationLevel, setSelectedEducationLevel] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [skills, setSkills] = useState<Array<string>>([]);
  const [languages, setLanguages] = useState<Array<{ language: string, level: string }>>([]);
  const [basicSalary, setBasicSalary] = useState<number>(0);
  const [allowances, setAllowances] = useState<Allowance[]>([]);
  const [hasSocialInsurance, setHasSocialInsurance] = useState(false);
  const [insuranceDate, setInsuranceDate] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateName = (name: string) => {
    return /^[A-Za-zÀ-ỹ\s]+$/.test(name);
  };

  const validateIdentityNumber = (id: string) => {
    return /^(\d{9}|\d{12})$/.test(id);
  };

  const validatePhone = (phone: string) => {
    return /^0\d{9}$/.test(phone);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateTaxCode = (code: string) => {
    return /^(\d{10}|\d{13})$/.test(code);
  };

  const validateFileSize = (file: File, maxSizeMB: number) => {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    return file.size <= maxSize;
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    setAge(age);
    return age >= 18;
  };

  const generateCompanyEmail = (name: string) => {
    if (!name) return '';
    const normalizedName = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z\s]/g, '')
      .trim()
      .replace(/\s+/g, '.');

    return `${normalizedName}@company.com`;
  };

  const generateEmployeeCode = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `NV${year}${randomNum}`;
  };

  const handleAddCertificate = () => {
    setCertificates([
      ...certificates,
      {
        name: "",
        issueDate: "",
        expiryDate: "",
        organization: "",
        file: null
      }
    ]);
  };

  const handleRemoveCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  const handleCertificateChange = (index: number, field: keyof Certificate, value: string | File) => {
    const newCertificates = [...certificates];
    newCertificates[index] = {
      ...newCertificates[index],
      [field]: value
    };
    setCertificates(newCertificates);
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
            <span className={`w-10 h-10 ${
              step.number <= currentStep 
                ? 'bg-indigo-600 border-indigo-200'
                : 'bg-gray-100 border-gray-200'
            } border rounded-full flex justify-center items-center ${
              step.number <= currentStep ? 'text-white' : 'text-gray-400'
            } z-10`}>
              <step.icon className="w-5 h-5" />
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
          {/* Basic Information Section */}
          <div className="col-span-2">
            <h4 className="text-base font-medium mb-4">Thông tin cá nhân</h4>
          </div>

          <div className="relative">
            <Label>
              Họ và tên
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Nhập họ và tên"
              required
              onChange={(e) => {
                if (!validateName(e.target.value)) {
                  // Show error message
                }
              }}
            />
          </div>

          <div className="relative">
            <Label>Tên gọi khác</Label>
            <Input
              type="text"
              placeholder="Nhập tên gọi khác (nếu có)"
            />
          </div>

          {/* Add marital status */}
          <div className="relative">
            <Label>
              Tình trạng hôn nhân
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={maritalStatusOptions}
              value={selectedMaritalStatus}
              onChange={setSelectedMaritalStatus}
              placeholder="Chọn tình trạng hôn nhân"
              required
            />
          </div>

          {/* Add phone number */}
          <div className="relative">
            <Label>
              Số điện thoại
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="tel"
              placeholder="Nhập số điện thoại"
              required
              onChange={(e) => {
                if (!validatePhone(e.target.value)) {
                  // Show error message
                }
              }}
            />
          </div>

          {/* Add personal email */}
          <div className="relative">
            <Label>
              Email cá nhân
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="email"
              placeholder="email@example.com"
              required
              onChange={(e) => {
                if (!validateEmail(e.target.value)) {
                  // Show error message
                }
              }}
            />
          </div>

          {/* Add company email */}
          <div className="relative">
            <Label>
              Email công ty
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="email"
              placeholder="ten.nhanvien@company.com"
              required
              value={generateCompanyEmail(/* pass name here */)}
              disabled
            />
            <span className="text-xs text-gray-500 mt-1">
              Email được tạo tự động theo định dạng: ten.nhanvien@company.com
            </span>
          </div>

          {renderDateInput(
            "Ngày sinh",
            "",
            (dates) => {
              if (dates[0] && !calculateAge(dates[0])) {
                // Show age warning
              }
            },
            true
          )}

          <div className="relative">
            <Label>
              Giới tính
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={genderOptions}
              value={selectedGender}
              onChange={setSelectedGender}
              placeholder="Chọn giới tính"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Số CMND/CCCD
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Nhập số CMND/CCCD"
              required
              onChange={(e) => {
                if (!validateIdentityNumber(e.target.value)) {
                  // Show error message
                }
              }}
            />
          </div>

          <div className="relative">
            <Label>
              Mã số thuế
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Nhập mã số thuế"
              required
              onChange={(e) => {
                if (!validateTaxCode(e.target.value)) {
                  // Show error message
                }
              }}
            />
          </div>

          <div className="relative">
            <Label>
              Quốc tịch
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={countryOptions}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Chọn quốc tịch"
              defaultValue="vietnam"
              required
            />
          </div>

          <div className="relative">
            <Label>Dân tộc</Label>
            <Select
              options={ethnicityOptions}
              value={selectedEthnicity}
              onChange={setSelectedEthnicity}
              placeholder="Chọn dân tộc"
            />
          </div>

          {/* Bank Account Section */}
          <div className="col-span-2 mt-6">
            <h4 className="text-base font-medium mb-4">Thông tin tài khoản ngân hàng</h4>
          </div>

          <div className="col-span-2">
            <Label>Hình thức nhận lương</Label>
            <div className="flex items-center gap-2 mt-2 mb-4">
              <input
                type="checkbox"
                checked={receiveViaBankAccount}
                onChange={(e) => setReceiveViaBankAccount(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">Nhận lương qua tài khoản ngân hàng</span>
            </div>

            {receiveViaBankAccount && (
              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <Label>
                    Ngân hàng nhận lương
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select
                    options={bankOptions}
                    value={selectedBank}
                    onChange={setSelectedBank}
                    placeholder="Chọn ngân hàng"
                    required
                  />
                </div>

                <div className="relative">
                  <Label>
                    Số tài khoản
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Nhập số tài khoản"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Address Section */}
          <div className="col-span-2 mt-6">
            <h4 className="text-base font-medium mb-4">Địa chỉ</h4>
          </div>

          <div className="col-span-2">
            <Label>Địa chỉ thường trú</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Select
                options={provinceOptions}
                placeholder="Tỉnh/Thành phố"
              />
              <Input placeholder="Quận/Huyện" />
              <Input placeholder="Phường/Xã" />
            </div>
            <Input
              type="text"
              placeholder="Số nhà, tên đường"
              className="w-full"
            />
          </div>

          <div className="col-span-2">
            <div className="flex items-center mb-2">
              <Label>Địa chỉ tạm trú</Label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={useCurrentAddress}
                  onChange={(e) => setUseCurrentAddress(e.target.checked)}
                />
                <span className="ml-2">Giống địa chỉ thường trú</span>
              </label>
            </div>
            {!useCurrentAddress && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Select
                    options={provinceOptions}
                    placeholder="Tỉnh/Thành phố"
                  />
                  <Input placeholder="Quận/Huyện" />
                  <Input placeholder="Phường/Xã" />
                </div>
                <Input
                  type="text"
                  placeholder="Số nhà, tên đường"
                  className="w-full"
                />
              </>
            )}
          </div>

          {/* Avatar Section */}
          <div className="col-span-2 mt-6">
            <h4 className="text-base font-medium mb-4">Hình ảnh</h4>
          </div>

          <div className="relative">
            <Label>
              Hình ảnh đại diện
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <FileInput
              accept="image/jpeg,image/png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (!validateFileSize(file, 2)) {
                    // Show error message about file size
                    return;
                  }
                  setAvatarFile(file);
                }
              }}
              className="w-full"
            />
            <span className="text-xs text-gray-500 mt-1">
              Hỗ trợ định dạng JPG, PNG. Dung lượng tối đa 2MB
            </span>
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

  const renderEducationAndSkillsForm = () => (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Trình Độ & Kỹ Năng</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Education Section */}
          <div className="col-span-2">
            <h4 className="text-base font-medium mb-4">Trình độ học vấn</h4>
          </div>

          <div className="relative">
            <Label>
              Trình độ học vấn
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={educationLevelOptions}
              value={selectedEducationLevel}
              onChange={setSelectedEducationLevel}
              placeholder="Chọn trình độ"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Chuyên ngành
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={majorOptions}
              value={selectedMajor}
              onChange={setSelectedMajor}
              placeholder="Chọn chuyên ngành"
              required
            />
          </div>

          {/* Certificates Section */}
          <div className="col-span-2 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium">Bằng cấp & Chứng chỉ</h4>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCertificate}
              >
                Thêm chứng chỉ
              </Button>
            </div>
            
            <div className="space-y-6">
              {certificates.map((cert, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between mb-4">
                    <h5 className="font-medium">Chứng chỉ #{index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertificate(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Label>
                        Tên chứng chỉ
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        type="text"
                        value={cert.name}
                        placeholder="VD: TOEIC, IELTS, AWS..."
                        onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="relative">
                      <Label>
                        Tổ chức cấp
                        <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        type="text"
                        value={cert.organization}
                        placeholder="VD: IIG Vietnam, Cambridge..."
                        onChange={(e) => handleCertificateChange(index, 'organization', e.target.value)}
                        required
                      />
                    </div>

                    {renderDateInput(
                      "Ngày cấp",
                      cert.issueDate,
                      (dates) => handleCertificateChange(index, 'issueDate', dates[0]?.toISOString() || ''),
                      true
                    )}

                    {renderDateInput(
                      "Ngày hết hạn",
                      cert.expiryDate,
                      (dates) => handleCertificateChange(index, 'expiryDate', dates[0]?.toISOString() || '')
                    )}

                    <div className="col-span-2">
                      <Label>Tệp đính kèm</Label>
                      <div className="flex items-center gap-4">
                        <FileInput
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleCertificateChange(index, 'file', file);
                            }
                          }}
                          className="flex-1"
                        />
                        {cert.file && (
                          <span className="text-sm text-gray-600">
                            {cert.file.name}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        Hỗ trợ: PDF, DOC, DOCX, JPG, PNG (Tối đa 5MB)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="col-span-2 mt-6">
            <h4 className="text-base font-medium mb-4">Kỹ năng chuyên môn</h4>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Nhập kỹ năng và nhấn Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const target = e.target as HTMLInputElement;
                    if (target.value.trim()) {
                      setSkills([...skills, target.value.trim()]);
                      target.value = '';
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Languages Section */}
          <div className="col-span-2 mt-6">
            <h4 className="text-base font-medium mb-4">Ngoại ngữ</h4>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex gap-4">
                  <Select
                    options={languageOptions}
                    value={lang.language}
                    onChange={(value) => {
                      const newLangs = [...languages];
                      newLangs[index].language = value;
                      setLanguages(newLangs);
                    }}
                    placeholder="Chọn ngoại ngữ"
                  />
                  <Select
                    options={skillLevelOptions}
                    value={lang.level}
                    onChange={(value) => {
                      const newLangs = [...languages];
                      newLangs[index].level = value;
                      setLanguages(newLangs);
                    }}
                    placeholder="Chọn trình độ"
                  />
                  <button
                    type="button"
                    onClick={() => setLanguages(languages.filter((_, i) => i !== index))}
                    className="text-red-500"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setLanguages([...languages, { language: "", level: "" }])}
              >
                Thêm ngoại ngữ
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {renderFormButtons(2, 4)}
        </div>
      </form>
    </div>
  );

  const renderWorkInfoForm = () => (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Thông Tin Công Việc</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <Label>
              Mã nhân viên
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="VD: NV2025001"
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setEmployeeCode(generateEmployeeCode())}
              >
                Tạo mã
              </Button>
            </div>
          </div>

          <div className="relative">
            <Label>Mã số nhân viên cũ</Label>
            <Input
              type="text"
              placeholder="Nhập mã cũ nếu có"
              value={oldEmployeeCode}
              onChange={(e) => setOldEmployeeCode(e.target.value)}
            />
          </div>

          <div className="relative">
            <Label>
              Phòng ban
              <span className="text-red-500 ml-1">*</span>
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
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={positionOptions}
              value={selectedPosition}
              onChange={(value) => setSelectedPosition(value)}
              placeholder="Chọn chức vụ"
              required
            />
          </div>

          {renderDateInput(
            "Ngày vào làm",
            "",
            (dates) => console.log(dates),
            true
          )}

          <div className="relative">
            <Label>
              Loại hợp đồng
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={contractTypeOptions}
              value={selectedContractType}
              onChange={(value) => setSelectedContractType(value)}
              placeholder="Chọn loại hợp đồng"
              required
            />
          </div>

          {renderDateInput(
            "Ngày kết thúc hợp đồng",
            contractEndDate,
            (dates) => setContractEndDate(dates[0]?.toISOString() || "")
          )}

          <div className="relative">
            <Label>
              Trạng thái làm việc
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={workStatusOptions}
              value={selectedWorkStatus}
              onChange={(value) => setSelectedWorkStatus(value)}
              placeholder="Chọn trạng thái"
              required
            />
          </div>

          <div className="relative">
            <Label>Quản lý trực tiếp</Label>
            <Select
              options={[]} // This should be populated with employee list
              value={directManager}
              onChange={(value) => setDirectManager(value)}
              placeholder="Chọn quản lý"
            />
          </div>

          <div className="relative">
            <Label>
              Ca làm việc
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={workShiftOptions}
              value={selectedWorkShift}
              onChange={(value) => setSelectedWorkShift(value)}
              placeholder="Chọn ca làm việc"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Địa điểm làm việc
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={workLocationOptions}
              value={selectedWorkLocation}
              onChange={(value) => setSelectedWorkLocation(value)}
              placeholder="Chọn địa điểm"
              required
            />
          </div>

          <div className="relative">
            <Label>
              Hình thức làm việc
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select
              options={workTypeOptions}
              value={selectedWorkType}
              onChange={(value) => setSelectedWorkType(value)}
              placeholder="Chọn hình thức"
              required
            />
          </div>

          {selectedWorkStatus === 'resigned' && (
            <>
              <div className="relative">
                <Label>Lý do nghỉ việc</Label>
                <Input
                  type="text"
                  placeholder="Nhập lý do nghỉ việc"
                  value={resignationReason}
                  onChange={(e) => setResignationReason(e.target.value)}
                />
              </div>

              {renderDateInput(
                "Ngày nghỉ việc",
                resignationDate,
                (dates) => setResignationDate(dates[0]?.toISOString() || "")
              )}
            </>
          )}

          <div className="relative col-span-2">
            <Label>Ghi chú</Label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
              placeholder="Nhập ghi chú về công việc của nhân viên"
              value={workNotes}
              onChange={(e) => setWorkNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {renderFormButtons(1, 3)}
        </div>
      </form>
    </div>
  );

  const renderSalaryForm = () => (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Lương & Phúc Lợi</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Salary Section */}
          <div className="col-span-2">
            <h4 className="text-base font-medium mb-4">Thông tin lương</h4>
          </div>

          <div className="relative">
            <Label>
              Mức lương cơ bản
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                type="number"
                min="0"
                step="100000"
                value={basicSalary || ''}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                placeholder="Nhập mức lương cơ bản"
                required
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                VNĐ
              </span>
            </div>
          </div>

          {/* Allowances Section */}
          <div className="col-span-2 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-medium">Phụ cấp</h4>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAllowances([...allowances, { type: '', amount: 0 }])}
              >
                Thêm phụ cấp
              </Button>
            </div>

            <div className="space-y-4">
              {allowances.map((allowance, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <Select
                    options={allowanceTypes}
                    value={allowance.type}
                    onChange={(value) => {
                      const newAllowances = [...allowances];
                      newAllowances[index].type = value;
                      setAllowances(newAllowances);
                    }}
                    placeholder="Chọn loại phụ cấp"
                    className="flex-1"
                  />
                  <div className="relative w-48">
                    <Input
                      type="number"
                      min="0"
                      step="100000"
                      value={allowance.amount || ''}
                      onChange={(e) => {
                        const newAllowances = [...allowances];
                        newAllowances[index].amount = Number(e.target.value);
                        setAllowances(newAllowances);
                      }}
                      placeholder="Nhập số tiền"
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      VNĐ
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setAllowances(allowances.filter((_, i) => i !== index))}
                  >
                    Xóa
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Section */}
          <div className="col-span-2 mt-6">
            <h4 className="text-base font-medium mb-4">Bảo hiểm xã hội</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hasSocialInsurance}
                  onChange={(e) => setHasSocialInsurance(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label>Tham gia bảo hiểm xã hội</Label>
              </div>

              {hasSocialInsurance && (
                <>
                  {renderDateInput(
                    "Ngày tham gia bảo hiểm",
                    insuranceDate,
                    (dates) => setInsuranceDate(dates[0]?.toISOString() || ""),
                    true
                  )}

                  <div className="relative">
                    <Label>Số sổ bảo hiểm</Label>
                    <Input
                      type="text"
                      value={insuranceNumber}
                      onChange={(e) => setInsuranceNumber(e.target.value)}
                      placeholder="Nhập số sổ bảo hiểm"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          {renderFormButtons(3, 4)}
        </div>
      </form>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfoForm();
      case 2:
        return renderWorkInfoForm();
      case 3:
        return renderEducationAndSkillsForm();
      case 4:
        return renderSalaryForm();
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
