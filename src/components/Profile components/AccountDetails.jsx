import { useUserInfoContext } from "../../context/UserProvider";

export function AccountDetails() {

  const { currentUser } = useUserInfoContext();

  return (
    <form className="flex flex-col gap-6">
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
        <div className="flex flex-col gap-4 text-[#929292]">
          <label>Current password (leave blank to leave unchanged)</label>
          <input
            className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
            type="password"
            name=""
          />
        </div>
        <div className="flex flex-col gap-4 text-[#929292]">
          <label>New password (leave blank to leave unchanged)</label>
          <input
            className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
            type="password"
            name=""
          />
        </div>
        <div className="flex flex-col gap-4 text-[#929292]">
          <label>Confirm new password</label>
          <input
            className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
            type="password"
            name=""
          />
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
