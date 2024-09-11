import { useState } from "react";
import { useUserInfoContext } from "../../context/UserProvider";
import { toast } from "react-toastify";
import axiosInstance from "../../apis/axiosConfig";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";

export function AccountDetails() {
  const { currentUser } = useUserInfoContext();
  const [showPassword, setShowPassword] = useState(false);

  // console.log(currentUser);

  const [userInfo, setUserInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    currentPasswordError: "",
    newPasswordError: "",
    confirmNewPasswordError: "",
  });

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\*\@\%\$\#]).{8,30}$/;
  const regexName = /^[a-zA-Z][a-zA-Z ]{2,30}$/;

  const handleInfoUser = (e) => {
    if (e.target.name === "currentPassword") {
      setUserInfo({
        ...userInfo,
        currentPassword: e.target.value,
      });
      setErrors({
        ...errors,
      });
    }
    if (e.target.name === "newPassword") {
      setUserInfo({
        ...userInfo,
        newPassword: e.target.value,
      });
      setErrors({
        ...errors,
        newPasswordError:
          e.target.value.length === 0
            ? "Enter new password"
            : !passwordRegex.test(e.target.value) &&
              "use upper, lower, digit, and special char from @ # % $",
      });
    }
    if (e.target.name === "confirmNewPassword") {
      setUserInfo({
        ...userInfo,
        confirmNewPassword: e.target.value,
      });
      setErrors({
        ...errors,
        confirmNewPasswordError:
          e.target.value.length === 0
            ? "Enter confirm new password"
            : e.target.value !== userInfo.newPassword &&
              "New password confirmation must match the new password",
      });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (
      (!userInfo.currentPassword || userInfo.currentPassword) &&
      !userInfo.newPassword &&
      !userInfo.confirmNewPassword
    ) {
      toast.error("No modification");
    } else if (
      errors.currentPasswordError ||
      errors.newPasswordError ||
      errors.confirmNewPasswordError
    ) {
      toast.error("Enter valid data");
    } else {
      try {
        const res = await axiosInstance.put(
          "/api/v1/fur/password/updatePassword",
          {
            currentPassword: userInfo.currentPassword,
            newPassword: userInfo.newPassword,
            confirmNewPassword: userInfo.confirmNewPassword,
          }
        );
        toast.success("Password updated");
      } catch (err) {
        toast.error("Password incorrect");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleUpdateUser(e)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Full name</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder={currentUser.fullName}
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Display name</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder={currentUser.fullName}
        />
        <span className="italic font-bold">
          This will be how your name will be displayed in the account section
          and in reviews
        </span>
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Email address</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="email"
          name=""
          readOnly
          placeholder={currentUser.email}
        />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl text-white">Password change</h3>
        <div className=" relative flex flex-col gap-4 text-[#929292]">
          <label>Current password (leave blank to leave unchanged)</label>
          <input
            className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
            type={showPassword ? "text" : "password"}
            name="currentPassword"
            onChange={(e) => handleInfoUser(e)}
            value={userInfo.currentPassword}
          />
          <button
            type="button"
            className="absolute top-[60px] right-4 flex items-center text-gray-500 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <IoEye />}
          </button>
        </div>
        <div className="relative flex flex-col gap-4 text-[#929292]">
          <label>New password (leave blank to leave unchanged)</label>
          <input
            className={`bg-transparent py-4 px-8 rounded-full border border-[#929292] ${
              !errors.newPasswordError && "focus:border-[#C26510]"
            } ${
              errors.newPasswordError && "border-red-500"
            } focus:outline-none duration-500`}
            type={showPassword ? "text" : "password"}
            name="newPassword"
            onChange={(e) => handleInfoUser(e)}
            value={userInfo.newPassword}
          />
          <button
            type="button"
            className="absolute top-[60px] right-4 flex items-center text-gray-500 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <IoEye />}
          </button>
          <span className="text-red-500 text-sm font-semibold">
            {errors.newPasswordError}
          </span>
        </div>
        <div className="relative flex flex-col gap-4 text-[#929292]">
          <label>Confirm new password</label>
          <input
            className={`bg-transparent py-4 px-8 rounded-full border border-[#929292] ${
              !errors.confirmNewPasswordError && "focus:border-[#C26510]"
            } ${
              errors.confirmNewPasswordError && "border-red-500"
            } focus:outline-none duration-500`}
            type={showPassword ? "text" : "password"}
            name="confirmNewPassword"
            onChange={(e) => handleInfoUser(e)}
            value={userInfo.confirmNewPassword}
          />
          <button
            type="button"
            className="absolute top-[60px] right-4 flex items-center text-gray-500 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <IoEye />}
          </button>
          <span className="text-red-500 text-sm font-semibold">
            {errors.confirmNewPasswordError}
          </span>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-transparent text-[#C26510] text-[17px] py-3 px-8 border border-[#C26510] rounded-3xl hover:bg-[#C26510] hover:text-white duration-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
