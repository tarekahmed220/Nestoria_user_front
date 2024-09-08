import { useState } from "react";

export function BillingAddress() {
  const countries = [
    "Egypt",
    "Palestine",
    "Yemen",
    "Sudan",
    "Syria",
  ];

  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <form className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="flex flex-col gap-4">
          <label className="text-[#929292]">
            First name
          </label>
          <input
            className="bg-transparent py-4 px-8 text-[#929292] rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
            type="text"
            name=""
            placeholder="Ahmed"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#929292]">
            Last name
          </label>
          <input
            className="bg-transparent py-4 px-8 text-[#929292] rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
            type="text"
            name=""
            placeholder="Tarek"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Company name (optional)</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Country / Region</label>
        <div className="relative flex items-center">
          <select
            value={selectedCountry}
            onChange={handleChange}
            className="block appearance-none bg-transparent cursor-pointer w-full py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          >
            {countries.map((country) => (
              <option
                key={country}
                value={country}
                className="bg-[#101010] px-3 font-bold text-[#929292] cursor-pointer hover:text-white hover:bg-slate-100"
              >
                {country}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-5 text-white">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 0l10 10 10-10H0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Street address</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder="House number and street name"
        />
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder="Apartment, suite, unit, etc, (optional)"
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Twon/city</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>State/Country</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Postcode/ZIP</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="text"
          name=""
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Phone</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="number"
          name=""
          placeholder=""
        />
      </div>
      <div className="flex flex-col gap-4 text-[#929292]">
        <label>Email address</label>
        <input
          className="bg-transparent py-4 px-8 rounded-full border border-[#929292] focus:border-[#C26510] focus:outline-none duration-500"
          type="email"
          name=""
          placeholder="ahmed@gmail.com"
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-transparent text-[#C26510] text-[17px] py-3 px-8 border border-[#C26510] rounded-3xl hover:bg-[#C26510] hover:text-white duration-500"
        >
          Save Address
        </button>
      </div>
    </form>
  );
}
