import React from 'react';

const InputField = ({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
}) => {
  return (
    <>
    <div className="mb-2  py-1">
      <input
        className={`w-full px-4 py-3 bg-black text-white text-sm rounded-full focus:outline-none focus:ring-2 ${
          error ? 'focus:ring-red-500 border-red-500' : 'focus:ring-orange-500 border-orange-500'
        }`}
        id={id}
        name={name}
        type={type}
        style={{ border: '1px solid #A5A5A5' }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      
    </div>
    {error ?<span className="text-red-500 text-sm " style={{ display: 'block',margin:'-5px'}}>{error}</span>:<span className="text-red-500 text-sm " style={{ display: 'none'}}></span>}

    </>
  );
};

export default InputField;



