import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
  const cloudName = 'yussef'; // Replace with your Cloudinary cloud name
  const uploadPreset = 'ml_default'; // Replace with your upload preset

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    return response.data; // Return the response from Cloudinary, which includes the URL
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw error;
  }
};

const SellerPage = () => {
  const [formData, setFormData] = useState({
    workshopName: '',
    address: '',
    phoneNumber: '',
    bankStatement: null,
    taxFile: null,
    frontID: null,
    backID: null,
  });

  const [errors, setErrors] = useState({});
  const [previewBankStatement, setPreviewBankStatement] = useState(null);
  const [previewTaxFile, setPreviewTaxFile] = useState(null);
  const [previewFrontID, setPreviewFrontID] = useState(null);
  const [previewBackID, setPreviewBackID] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleDrop = (acceptedFiles, name) => {
    const file = acceptedFiles[0];
    
    if (name === 'backID' && formData.frontID && file.name === formData.frontID.name) {
      setErrors((prev) => ({ ...prev, [name]: 'Back ID cannot be the same as Front ID' }));
      return;
    }
    if (name === 'frontID' && formData.backID && file.name === formData.backID.name) {
      setErrors((prev) => ({ ...prev, [name]: 'Front ID cannot be the same as Back ID' }));
      return;
    }
    
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData((prev) => ({ ...prev, [name]: file }));
      const preview = URL.createObjectURL(file);
      if (name === 'bankStatement') setPreviewBankStatement(preview);
      if (name === 'taxFile') setPreviewTaxFile(preview);
      if (name === 'frontID') setPreviewFrontID(preview);
      if (name === 'backID') setPreviewBackID(preview);
      setErrors((prev) => ({ ...prev, [name]: null }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: 'File size must be less than 2MB' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const phoneRegex = /^\+20\d{10}$/;
    const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    switch (name) {
      case 'workshopName':
        newErrors.workshopName = value.length >= 8 ? null : 'Workshop Name must be at least 8 characters long';
        break;
      case 'address':
        newErrors.address = addressRegex.test(value) ? null : 'Address is required and should be at least 3 characters long';
        break;
      case 'phoneNumber':
        newErrors.phoneNumber = phoneRegex.test(value) ? null : 'Phone Number must start with +20 and be 12 digits';
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUploading(true);
      try {
        // Upload files to Cloudinary
        const uploadPromises = [
          formData.bankStatement && uploadToCloudinary(formData.bankStatement),
          formData.taxFile && uploadToCloudinary(formData.taxFile),
          formData.frontID && uploadToCloudinary(formData.frontID),
          formData.backID && uploadToCloudinary(formData.backID),
        ].filter(Boolean);

        const uploadResults = await Promise.all(uploadPromises);
        // Process uploadResults if needed

        setUploading(false);
        navigate('/thank-you');
      } catch (error) {
        setUploading(false);
        console.error('Upload failed:', error);
      }
    }
  };


  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\+20\d{10}$/;
    const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    if (!formData.workshopName || formData.workshopName.length < 8) newErrors.workshopName = 'Workshop Name is required';
    if (!formData.address || !addressRegex.test(formData.address)) newErrors.address = 'Address is required and should be at least 3 characters long';
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone Number must start with +20 and be 12 digits';
    if (!formData.bankStatement) newErrors.bankStatement = 'Bank Statement is required';
    if (!formData.taxFile) newErrors.taxFile = 'Tax File is required';
    if (!formData.frontID) newErrors.frontID = 'Front ID image is required';
    if (!formData.backID) newErrors.backID = 'Back ID image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { getRootProps: getRootPropsBank, getInputProps: getInputPropsBank } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'bankStatement'),
  });

  const { getRootProps: getRootPropsTax, getInputProps: getInputPropsTax } = useDropzone({
    accept: 'application/pdf, image/*',
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'taxFile'),
  });

  const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'frontID'),
  });

  const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'backID'),
  });

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-md">
        <h2 className="text-2xl text-[#929292] mb-6">Seller Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Workshop Name */}
          <div className="flex flex-col">
            <label htmlFor="workshopName" className="text-[#929292] mb-2">Workshop Name</label>
            <input
              id="workshopName"
              name="workshopName"
              type="text"
              value={formData.workshopName}
              onChange={handleChange}
              className="p-4 rounded-3xl border border-[#929292] text-white bg-gray-900 focus:border-[#C26510] focus:outline-none transition duration-500"
            />
            {errors.workshopName && <p className="text-red-500 text-sm mt-1">{errors.workshopName}</p>}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-[#929292] mb-2">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="p-4 rounded-3xl border border-[#929292] text-white bg-gray-900 focus:border-[#C26510] focus:outline-none transition duration-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-[#929292] mb-2">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-4 rounded-3xl border border-[#929292] text-white bg-gray-900 focus:border-[#C26510] focus:outline-none transition duration-500"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Bank Statement */}
          <div {...getRootPropsBank()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
            <input {...getInputPropsBank()} />
            <div className="text-center">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <p className="text-sm text-[#929292]">Upload Bank Statement</p>
              {previewBankStatement && <img src={previewBankStatement} alt="Bank Statement Preview" className="mt-2 max-w-full h-auto" />}
              {errors.bankStatement && <p className="text-red-500 text-sm mt-1">{errors.bankStatement}</p>}
            </div>
          </div>

          {/* Tax File */}
          <div {...getRootPropsTax()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
            <input {...getInputPropsTax()} />
            <div className="text-center">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <p className="text-sm text-[#929292]">Upload Tax File</p>
              {previewTaxFile && <img src={previewTaxFile} alt="Tax File Preview" className="mt-2 max-w-full h-auto" />}
              {errors.taxFile && <p className="text-red-500 text-sm mt-1">{errors.taxFile}</p>}
            </div>
          </div>

          {/* Front ID */}
          <div {...getRootPropsFront()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
            <input {...getInputPropsFront()} />
            <div className="text-center">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <p className="text-sm text-[#929292]">Upload Front ID</p>
              {previewFrontID && <img src={previewFrontID} alt="Front ID Preview" className="mt-2 max-w-full h-auto" />}
              {errors.frontID && <p className="text-red-500 text-sm mt-1">{errors.frontID}</p>}
            </div>
          </div>

          {/* Back ID */}
          <div {...getRootPropsBack()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
            <input {...getInputPropsBack()} />
            <div className="text-center">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <p className="text-sm text-[#929292]">Upload Back ID</p>
              {previewBackID && <img src={previewBackID} alt="Back ID Preview" className="mt-2 max-w-full h-auto" />}
              {errors.backID && <p className="text-red-500 text-sm mt-1">{errors.backID}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full mt-6 flex justify-center">
            <button
              type="submit"
              className={`p-4 rounded-3xl text-white bg-[#C26510] hover:bg-[#A0522D] transition duration-500 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={uploading}
            >
              {uploading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerPage;






// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FaCheckCircle, FaExclamationCircle, FaCloudUploadAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for routing

// const SellerRegistration = () => {
//   const [formData, setFormData] = useState({
//     workshopName: '',
//     address: '',
//     phoneNumber: '',
//     bankStatement: null,
//     taxFile: null,
//     frontID: null,
//     backID: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [previewBankStatement, setPreviewBankStatement] = useState(null);
//   const [previewTaxFile, setPreviewTaxFile] = useState(null);
//   const [previewFrontID, setPreviewFrontID] = useState(null);
//   const [previewBackID, setPreviewBackID] = useState(null);

//   const navigate = useNavigate();

//   const handleDrop = (acceptedFiles, name) => {
//     const file = acceptedFiles[0];
    
//     // Check if front and back IDs are the same
//     if (name === 'backID' && formData.frontID && file.name === formData.frontID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Back ID cannot be the same as Front ID' }));
//       return;
//     }
//     if (name === 'frontID' && formData.backID && file.name === formData.backID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Front ID cannot be the same as Back ID' }));
//       return;
//     }
    
//     if (file && file.size <= 2 * 1024 * 1024) {
//       setFormData((prev) => ({ ...prev, [name]: file }));
//       const preview = URL.createObjectURL(file);
//       if (name === 'bankStatement') setPreviewBankStatement(preview);
//       if (name === 'taxFile') setPreviewTaxFile(preview);
//       if (name === 'frontID') setPreviewFrontID(preview);
//       if (name === 'backID') setPreviewBackID(preview);
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     } else {
//       setErrors((prev) => ({ ...prev, [name]: 'File size must be less than 2MB' }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };
//     const phoneRegex = /^\+20\d{10}$/;

//     switch (name) {
//       case 'workshopName':
//         newErrors.workshopName = value.length >= 8 ? null : 'Workshop Name must be at least 8 characters long';
//         break;
//       case 'address':
//         newErrors.address = value ? null : 'Address is required';
//         break;
//       case 'phoneNumber':
//         newErrors.phoneNumber = phoneRegex.test(value) ? null : 'Phone Number must start with +20 and be 12 digits';
//         break;
//       default:
//         break;
//     }
//     setErrors(newErrors);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setTimeout(() => {
//         navigate('/thank-you');
//       }, 1000);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const phoneRegex = /^\+20\d{10}$/;

//     if (!formData.workshopName || formData.workshopName.length < 8) newErrors.workshopName = 'Workshop Name is required';
//     if (!formData.address) newErrors.address = 'Address is required';
//     if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber))
//       newErrors.phoneNumber = 'Phone Number must start with +20 and be 12 digits';
//     if (!formData.bankStatement) newErrors.bankStatement = 'Bank Statement is required';
//     if (!formData.taxFile) newErrors.taxFile = 'Tax File is required';
//     if (!formData.frontID) newErrors.frontID = 'Front ID image is required';
//     if (!formData.backID) newErrors.backID = 'Back ID image is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const { getRootProps: getRootPropsBank, getInputProps: getInputPropsBank } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'bankStatement'),
//   });

//   const { getRootProps: getRootPropsTax, getInputProps: getInputPropsTax } = useDropzone({
//     accept: 'application/pdf, image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'taxFile'),
//   });

//   const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'frontID'),
//   });

//   const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'backID'),
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#131312] p-4 text-white">
//       <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-5xl">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#929292]">Seller Registration</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#131312] p-4 text-white rounded-3xl" noValidate>
//           {/* Workshop Name */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Workshop Name
//               {errors.workshopName ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="workshopName"
//               value={formData.workshopName}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your workshop name"
//             />
//             {errors.workshopName && <p className="text-red-500 text-sm mt-1">{errors.workshopName}</p>}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Address
//               {errors.address ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your address"
//             />
//             {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Phone Number (+20)
//               {errors.phoneNumber ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your phone number"
//             />
//             {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
//           </div>

//           {/* Bank Statement Upload */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Upload Bank Statement
//             </label>
//             <div {...getRootPropsBank()} className="mt-1 flex flex-col items-center justify-center p-4 border border-[#929292] rounded-3xl bg-gray-700 hover:border-[#C26510] hover:bg-gray-600 cursor-pointer transition duration-500">
//               <input {...getInputPropsBank()} />
//               <FaCloudUploadAlt className="text-3xl text-[#929292]" />
//               <p className="mt-2 text-sm text-[#929292]">Drag and drop or click to upload (Max: 2MB)</p>
//               {previewBankStatement && (
//                 <img src={previewBankStatement} alt="Bank Statement Preview" className="mt-2 h-24 w-auto object-cover" />
//               )}
//               {errors.bankStatement && <p className="text-red-500 text-sm mt-1">{errors.bankStatement}</p>}
//             </div>
//           </div>

//           {/* Tax File Upload */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Upload Tax File
//             </label>
//             <div {...getRootPropsTax()} className="mt-1 flex flex-col items-center justify-center p-4 border border-[#929292] rounded-3xl bg-gray-700 hover:border-[#C26510] hover:bg-gray-600 cursor-pointer transition duration-500">
//               <input {...getInputPropsTax()} />
//               <FaCloudUploadAlt className="text-3xl text-[#929292]" />
//               <p className="mt-2 text-sm text-[#929292]">Drag and drop or click to upload (Max: 2MB)</p>
//               {previewTaxFile && (
//                 <img src={previewTaxFile} alt="Tax File Preview" className="mt-2 h-24 w-auto object-cover" />
//               )}
//               {errors.taxFile && <p className="text-red-500 text-sm mt-1">{errors.taxFile}</p>}
//             </div>
//           </div>

//           {/* Front ID Upload */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Upload Front ID
//             </label>
//             <div {...getRootPropsFront()} className="mt-1 flex flex-col items-center justify-center p-4 border border-[#929292] rounded-3xl bg-gray-700 hover:border-[#C26510] hover:bg-gray-600 cursor-pointer transition duration-500">
//               <input {...getInputPropsFront()} />
//               <FaCloudUploadAlt className="text-3xl text-[#929292]" />
//               <p className="mt-2 text-sm text-[#929292]">Drag and drop or click to upload (Max: 2MB)</p>
//               {previewFrontID && (
//                 <img src={previewFrontID} alt="Front ID Preview" className="mt-2 h-24 w-auto object-cover" />
//               )}
//               {errors.frontID && <p className="text-red-500 text-sm mt-1">{errors.frontID}</p>}
//             </div>
//           </div>

//           {/* Back ID Upload */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Upload Back ID
//             </label>
//             <div {...getRootPropsBack()} className="mt-1 flex flex-col items-center justify-center p-4 border border-[#929292] rounded-3xl bg-gray-700 hover:border-[#C26510] hover:bg-gray-600 cursor-pointer transition duration-500">
//               <input {...getInputPropsBack()} />
//               <FaCloudUploadAlt className="text-3xl text-[#929292]" />
//               <p className="mt-2 text-sm text-[#929292]">Drag and drop or click to upload (Max: 2MB)</p>
//               {previewBackID && (
//                 <img src={previewBackID} alt="Back ID Preview" className="mt-2 h-24 w-auto object-cover" />
//               )}
//               {errors.backID && <p className="text-red-500 text-sm mt-1">{errors.backID}</p>}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-full">
//             <button
//               type="submit"
//               className="w-full p-4 bg-transparent text-[#C26510] border border-[#C26510] rounded-3xl hover:bg-[#C26510] hover:text-white transition duration-500">
//               Submit Registration
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerRegistration;


// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FaCheckCircle, FaExclamationCircle, FaCloudUploadAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // تأكد من استيراد axios

// const SellerRegistration = () => {
//   const [formData, setFormData] = useState({
//     workshopName: '',
//     address: '',
//     phoneNumber: '',
//     bankStatement: null,
//     taxFile: null,
//     frontID: null,
//     backID: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [previewBankStatement, setPreviewBankStatement] = useState(null);
//   const [previewTaxFile, setPreviewTaxFile] = useState(null);
//   const [previewFrontID, setPreviewFrontID] = useState(null);
//   const [previewBackID, setPreviewBackID] = useState(null);

//   const navigate = useNavigate();

//   const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/yussef/image/upload';
//   const UPLOAD_PRESET = 'ml_default';

//   const handleDrop = (acceptedFiles, name) => {
//     const file = acceptedFiles[0];
    
//     // Check if front and back IDs are the same
//     if (name === 'backID' && formData.frontID && file.name === formData.frontID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Back ID cannot be the same as Front ID' }));
//       return;
//     }
//     if (name === 'frontID' && formData.backID && file.name === formData.backID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Front ID cannot be the same as Back ID' }));
//       return;
//     }
    
//     if (file && file.size <= 2 * 1024 * 1024) {
//       // Set preview
//       const preview = URL.createObjectURL(file);
//       if (name === 'bankStatement') setPreviewBankStatement(preview);
//       if (name === 'taxFile') setPreviewTaxFile(preview);
//       if (name === 'frontID') setPreviewFrontID(preview);
//       if (name === 'backID') setPreviewBackID(preview);

//       // Upload to Cloudinary
//       uploadToCloudinary(file, name);

//       setErrors((prev) => ({ ...prev, [name]: null }));
//     } else {
//       setErrors((prev) => ({ ...prev, [name]: 'File size must be less than 2MB' }));
//     }
//   };

//   const uploadToCloudinary = async (file, fieldName) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', UPLOAD_PRESET);

//     try {
//       const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
//       setFormData((prev) => ({
//         ...prev,
//         [fieldName]: response.data.secure_url,
//       }));
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setErrors((prev) => ({ ...prev, [fieldName]: 'Failed to upload file' }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };
//     const phoneRegex = /^\+20\d{10}$/;

//     switch (name) {
//       case 'workshopName':
//         newErrors.workshopName = value.length >= 8 ? null : 'Workshop Name must be at least 8 characters long';
//         break;
//       case 'address':
//         newErrors.address = value ? null : 'Address is required';
//         break;
//       case 'phoneNumber':
//         newErrors.phoneNumber = phoneRegex.test(value) ? null : 'Phone Number must start with +20 and be 12 digits';
//         break;
//       default:
//         break;
//     }
//     setErrors(newErrors);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setTimeout(() => {
//         navigate('/thank-you');
//       }, 1000);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const phoneRegex = /^\+20\d{10}$/;

//     if (!formData.workshopName || formData.workshopName.length < 8) newErrors.workshopName = 'Workshop Name is required';
//     if (!formData.address) newErrors.address = 'Address is required';
//     if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber))
//       newErrors.phoneNumber = 'Phone Number must start with +20 and be 12 digits';
//     if (!formData.bankStatement) newErrors.bankStatement = 'Bank Statement is required';
//     if (!formData.taxFile) newErrors.taxFile = 'Tax File is required';
//     if (!formData.frontID) newErrors.frontID = 'Front ID image is required';
//     if (!formData.backID) newErrors.backID = 'Back ID image is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const { getRootProps: getRootPropsBank, getInputProps: getInputPropsBank } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'bankStatement'),
//   });

//   const { getRootProps: getRootPropsTax, getInputProps: getInputPropsTax } = useDropzone({
//     accept: 'application/pdf, image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'taxFile'),
//   });

//   const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'frontID'),
//   });

//   const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'backID'),
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#131312] p-4 text-white">
//       <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-5xl">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#929292]">Seller Registration</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#131312] p-4 text-white rounded-3xl" noValidate>
//           {/* Workshop Name */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Workshop Name
//               {errors.workshopName ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="workshopName"
//               value={formData.workshopName}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your workshop name"
//             />
//             {errors.workshopName && <p className="text-red-500 text-sm mt-1">{errors.workshopName}</p>}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Address
//               {errors.address ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your address"
//             />
//             {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Phone Number
//               {errors.phoneNumber ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="+201234567890"
//             />
//             {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
//           </div>

//           {/* Bank Statement */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Bank Statement
//               {errors.bankStatement ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div {...getRootPropsBank()} className="border border-[#929292] rounded-3xl p-4 cursor-pointer">
//               <input {...getInputPropsBank()} />
//               {previewBankStatement ? (
//                 <img src={previewBankStatement} alt="Bank Statement Preview" className="w-full h-auto rounded-3xl mt-2" />
//               ) : (
//                 <div className="text-center text-gray-500">
//                   <FaCloudUploadAlt className="text-3xl mb-2" />
//                   <p>Drag and drop or click to upload your bank statement (image only)</p>
//                 </div>
//               )}
//             </div>
//             {errors.bankStatement && <p className="text-red-500 text-sm mt-1">{errors.bankStatement}</p>}
//           </div>

//           {/* Tax File */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Tax File
//               {errors.taxFile ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div {...getRootPropsTax()} className="border border-[#929292] rounded-3xl p-4 cursor-pointer">
//               <input {...getInputPropsTax()} />
//               {previewTaxFile ? (
//                 <img src={previewTaxFile} alt="Tax File Preview" className="w-full h-auto rounded-3xl mt-2" />
//               ) : (
//                 <div className="text-center text-gray-500">
//                   <FaCloudUploadAlt className="text-3xl mb-2" />
//                   <p>Drag and drop or click to upload your tax file (image or PDF)</p>
//                 </div>
//               )}
//             </div>
//             {errors.taxFile && <p className="text-red-500 text-sm mt-1">{errors.taxFile}</p>}
//           </div>

//           {/* Front ID */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Front ID
//               {errors.frontID ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div {...getRootPropsFront()} className="border border-[#929292] rounded-3xl p-4 cursor-pointer">
//               <input {...getInputPropsFront()} />
//               {previewFrontID ? (
//                 <img src={previewFrontID} alt="Front ID Preview" className="w-full h-auto rounded-3xl mt-2" />
//               ) : (
//                 <div className="text-center text-gray-500">
//                   <FaCloudUploadAlt className="text-3xl mb-2" />
//                   <p>Drag and drop or click to upload your front ID (image only)</p>
//                 </div>
//               )}
//             </div>
//             {errors.frontID && <p className="text-red-500 text-sm mt-1">{errors.frontID}</p>}
//           </div>

//           {/* Back ID */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Back ID
//               {errors.backID ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div {...getRootPropsBack()} className="border border-[#929292] rounded-3xl p-4 cursor-pointer">
//               <input {...getInputPropsBack()} />
//               {previewBackID ? (
//                 <img src={previewBackID} alt="Back ID Preview" className="w-full h-auto rounded-3xl mt-2" />
//               ) : (
//                 <div className="text-center text-gray-500">
//                   <FaCloudUploadAlt className="text-3xl mb-2" />
//                   <p>Drag and drop or click to upload your back ID (image only)</p>
//                 </div>
//               )}
//             </div>
//             {errors.backID && <p className="text-red-500 text-sm mt-1">{errors.backID}</p>}
//           </div>

//           <div className="col-span-2 flex justify-center">
//             <button type="submit" className="bg-[#C26510] text-white p-4 rounded-full hover:bg-[#A9540D] focus:outline-none focus:ring-2 focus:ring-[#C26510] focus:ring-opacity-50 transition duration-500">
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerRegistration;


// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FaCheckCircle, FaExclamationCircle, FaCloudUploadAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Import axios for API requests

// const CLOUD_NAME = 'yussef';
// const UPLOAD_PRESET = 'ml_default';

// const SellerRegistration = () => {
//   const [formData, setFormData] = useState({
//     workshopName: '',
//     address: '',
//     phoneNumber: '',
//     bankStatement: null,
//     taxFile: null,
//     frontID: null,
//     backID: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [previewBankStatement, setPreviewBankStatement] = useState(null);
//   const [previewTaxFile, setPreviewTaxFile] = useState(null);
//   const [previewFrontID, setPreviewFrontID] = useState(null);
//   const [previewBackID, setPreviewBackID] = useState(null);

//   const navigate = useNavigate();

//   const handleDrop = (acceptedFiles, name) => {
//     const file = acceptedFiles[0];
    
//     // Check if front and back IDs are the same
//     if (name === 'backID' && formData.frontID && file.name === formData.frontID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Back ID cannot be the same as Front ID' }));
//       return;
//     }
//     if (name === 'frontID' && formData.backID && file.name === formData.backID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Front ID cannot be the same as Back ID' }));
//       return;
//     }
    
//     if (file && file.size <= 2 * 1024 * 1024) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//       uploadToCloudinary(file, name);
//     } else {
//       setErrors((prev) => ({ ...prev, [name]: 'File size must be less than 2MB' }));
//     }
//   };

//   const uploadToCloudinary = async (file, name) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', UPLOAD_PRESET);
      
//       const response = await axios.post(`CLOUDINARY_URL=cloudinary://814697199196913:va2SjzhkFGqG7kYoLmZEvJiOSoc@yussef`, formData);
//       const { secure_url } = response.data;
      
//       setFormData((prev) => ({ ...prev, [name]: secure_url }));
      
//       // Set previews
//       const preview = URL.createObjectURL(file);
//       if (name === 'bankStatement') setPreviewBankStatement(preview);
//       if (name === 'taxFile') setPreviewTaxFile(preview);
//       if (name === 'frontID') setPreviewFrontID(preview);
//       if (name === 'backID') setPreviewBackID(preview);
//     } catch (error) {
//       console.error('Error uploading to Cloudinary:', error);
//       setErrors((prev) => ({ ...prev, [name]: 'Error uploading file' }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };
//     const phoneRegex = /^\+20\d{10}$/;
//     const addressRegex = /^[\w\s,.-]{5,}$/; // Example regex for address validation

//     switch (name) {
//       case 'workshopName':
//         newErrors.workshopName = value.length >= 8 ? null : 'Workshop Name must be at least 8 characters long';
//         break;
//       case 'address':
//         newErrors.address = addressRegex.test(value) ? null : 'Address is not valid';
//         break;
//       case 'phoneNumber':
//         newErrors.phoneNumber = phoneRegex.test(value) ? null : 'Phone Number must start with +20 and be 12 digits';
//         break;
//       default:
//         break;
//     }
//     setErrors(newErrors);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setTimeout(() => {
//         navigate('/thank-you');
//       }, 1000);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const phoneRegex = /^\+20\d{10}$/;
//     const addressRegex = /^[\w\s,.-]{5,}$/;

//     if (!formData.workshopName || formData.workshopName.length < 8) newErrors.workshopName = 'Workshop Name is required';
//     if (!formData.address || !addressRegex.test(formData.address)) newErrors.address = 'Address is required and must be valid';
//     if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone Number must start with +20 and be 12 digits';
//     if (!formData.bankStatement) newErrors.bankStatement = 'Bank Statement is required';
//     if (!formData.taxFile) newErrors.taxFile = 'Tax File is required';
//     if (!formData.frontID) newErrors.frontID = 'Front ID image is required';
//     if (!formData.backID) newErrors.backID = 'Back ID image is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const { getRootProps: getRootPropsBank, getInputProps: getInputPropsBank } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'bankStatement'),
//   });

//   const { getRootProps: getRootPropsTax, getInputProps: getInputPropsTax } = useDropzone({
//     accept: 'application/pdf, image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'taxFile'),
//   });

//   const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'frontID'),
//   });

//   const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'backID'),
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#131312] p-4 text-white">
//       <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-5xl">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#929292]">Seller Registration</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#131312] p-4 text-white rounded-3xl" noValidate>
//           {/* Workshop Name */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Workshop Name
//               {errors.workshopName ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="workshopName"
//               value={formData.workshopName}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your workshop name"
//             />
//             {errors.workshopName && <p className="text-red-500 text-sm mt-1">{errors.workshopName}</p>}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Address
//               {errors.address ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your address"
//             />
//             {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//           </div>
//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292] flex items-center">
//               Phone Number
//               {errors.phoneNumber ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="mt-1 p-4 w-full border border-[#929292] rounded-full focus:border-[#C26510] focus:outline-none bg-gray-700 text-white"
//               placeholder="Enter your phone number with +20"
//             />
//             {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
//           </div>

//           {/* Bank Statement */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Bank Statement
//               {errors.bankStatement ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div
//               {...getRootPropsBank()}
//               className="mt-1 p-4 border border-[#929292] rounded-full cursor-pointer bg-gray-700 text-white text-center"
//             >
//               <input {...getInputPropsBank()} />
//               {previewBankStatement ? (
//                 <img src={previewBankStatement} alt="Bank Statement Preview" className="w-full h-40 object-cover rounded-xl mt-2" />
//               ) : (
//                 <div className="flex items-center justify-center h-40">
//                   <FaCloudUploadAlt className="text-4xl" />
//                   <p className="mt-2">Drag & drop or click to select a file</p>
//                 </div>
//               )}
//             </div>
//             {errors.bankStatement && <p className="text-red-500 text-sm mt-1">{errors.bankStatement}</p>}
//           </div>

//           {/* Tax File */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Tax File
//               {errors.taxFile ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div
//               {...getRootPropsTax()}
//               className="mt-1 p-4 border border-[#929292] rounded-full cursor-pointer bg-gray-700 text-white text-center"
//             >
//               <input {...getInputPropsTax()} />
//               {previewTaxFile ? (
//                 <img src={previewTaxFile} alt="Tax File Preview" className="w-full h-40 object-cover rounded-xl mt-2" />
//               ) : (
//                 <div className="flex items-center justify-center h-40">
//                   <FaCloudUploadAlt className="text-4xl" />
//                   <p className="mt-2">Drag & drop or click to select a file</p>
//                 </div>
//               )}
//             </div>
//             {errors.taxFile && <p className="text-red-500 text-sm mt-1">{errors.taxFile}</p>}
//           </div>

//           {/* Front ID */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Front ID
//               {errors.frontID ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div
//               {...getRootPropsFront()}
//               className="mt-1 p-4 border border-[#929292] rounded-full cursor-pointer bg-gray-700 text-white text-center"
//             >
//               <input {...getInputPropsFront()} />
//               {previewFrontID ? (
//                 <img src={previewFrontID} alt="Front ID Preview" className="w-full h-40 object-cover rounded-xl mt-2" />
//               ) : (
//                 <div className="flex items-center justify-center h-40">
//                   <FaCloudUploadAlt className="text-4xl" />
//                   <p className="mt-2">Drag & drop or click to select a file</p>
//                 </div>
//               )}
//             </div>
//             {errors.frontID && <p className="text-red-500 text-sm mt-1">{errors.frontID}</p>}
//           </div>

//           {/* Back ID */}
//           <div>
//             <label className="block text-sm font-medium text-[#929292]">
//               Back ID
//               {errors.backID ? (
//                 <FaExclamationCircle className="ml-2 text-red-500" />
//               ) : (
//                 <FaCheckCircle className="ml-2 text-green-500" />
//               )}
//             </label>
//             <div
//               {...getRootPropsBack()}
//               className="mt-1 p-4 border border-[#929292] rounded-full cursor-pointer bg-gray-700 text-white text-center"
//             >
//               <input {...getInputPropsBack()} />
//               {previewBackID ? (
//                 <img src={previewBackID} alt="Back ID Preview" className="w-full h-40 object-cover rounded-xl mt-2" />
//               ) : (
//                 <div className="flex items-center justify-center h-40">
//                   <FaCloudUploadAlt className="text-4xl" />
//                   <p className="mt-2">Drag & drop or click to select a file</p>
//                 </div>
//               )}
//             </div>
//             {errors.backID && <p className="text-red-500 text-sm mt-1">{errors.backID}</p>}
//           </div>

//           <button
//             type="submit"
//             className="mt-6 bg-[#C26510] text-white py-3 px-6 rounded-full font-semibold transition duration-500 hover:bg-[#a35e00]"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerRegistration;
// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FaCheckCircle, FaExclamationCircle, FaCloudUploadAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for routing

// const SellerPage = () => {
//   const [formData, setFormData] = useState({
//     workshopName: '',
//     address: '',
//     phoneNumber: '',
//     bankStatement: null,
//     taxFile: null,
//     frontID: null,
//     backID: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [previewBankStatement, setPreviewBankStatement] = useState(null);
//   const [previewTaxFile, setPreviewTaxFile] = useState(null);
//   const [previewFrontID, setPreviewFrontID] = useState(null);
//   const [previewBackID, setPreviewBackID] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const navigate = useNavigate();

//   const handleDrop = (acceptedFiles, name) => {
//     const file = acceptedFiles[0];
    
//     if (name === 'backID' && formData.frontID && file.name === formData.frontID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Back ID cannot be the same as Front ID' }));
//       return;
//     }
//     if (name === 'frontID' && formData.backID && file.name === formData.backID.name) {
//       setErrors((prev) => ({ ...prev, [name]: 'Front ID cannot be the same as Back ID' }));
//       return;
//     }
    
//     if (file && file.size <= 2 * 1024 * 1024) {
//       setFormData((prev) => ({ ...prev, [name]: file }));
//       const preview = URL.createObjectURL(file);
//       if (name === 'bankStatement') setPreviewBankStatement(preview);
//       if (name === 'taxFile') setPreviewTaxFile(preview);
//       if (name === 'frontID') setPreviewFrontID(preview);
//       if (name === 'backID') setPreviewBackID(preview);
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     } else {
//       setErrors((prev) => ({ ...prev, [name]: 'File size must be less than 2MB' }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     const newErrors = { ...errors };
//     const phoneRegex = /^\+20\d{10}$/;
//     const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

//     switch (name) {
//       case 'workshopName':
//         newErrors.workshopName = value.length >= 8 ? null : 'Workshop Name must be at least 8 characters long';
//         break;
//       case 'address':
//         newErrors.address = addressRegex.test(value) ? null : 'Address is required and should be at least 3 characters long';
//         break;
//       case 'phoneNumber':
//         newErrors.phoneNumber = phoneRegex.test(value) ? null : 'Phone Number must start with +20 and be 12 digits';
//         break;
//       default:
//         break;
//     }
//     setErrors(newErrors);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setUploading(true);
//       try {
//         // Upload files to Cloudinary
//         const uploadPromises = [
//           formData.bankStatement && uploadToCloudinary(formData.bankStatement),
//           formData.taxFile && uploadToCloudinary(formData.taxFile),
//           formData.frontID && uploadToCloudinary(formData.frontID),
//           formData.backID && uploadToCloudinary(formData.backID),
//         ].filter(Boolean);

//         const uploadResults = await Promise.all(uploadPromises);
//         // Process uploadResults if needed

//         setUploading(false);
//         navigate('/thank-you');
//       } catch (error) {
//         setUploading(false);
//         console.error('Upload failed:', error);
//       }
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const phoneRegex = /^\+20\d{10}$/;
//     const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

//     if (!formData.workshopName || formData.workshopName.length < 8) newErrors.workshopName = 'Workshop Name is required';
//     if (!formData.address || !addressRegex.test(formData.address)) newErrors.address = 'Address is required and should be at least 3 characters long';
//     if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber))
//       newErrors.phoneNumber = 'Phone Number must start with +20 and be 12 digits';
//     if (!formData.bankStatement) newErrors.bankStatement = 'Bank Statement is required';
//     if (!formData.taxFile) newErrors.taxFile = 'Tax File is required';
//     if (!formData.frontID) newErrors.frontID = 'Front ID image is required';
//     if (!formData.backID) newErrors.backID = 'Back ID image is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const { getRootProps: getRootPropsBank, getInputProps: getInputPropsBank } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'bankStatement'),
//   });

//   const { getRootProps: getRootPropsTax, getInputProps: getInputPropsTax } = useDropzone({
//     accept: 'application/pdf, image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'taxFile'),
//   });

//   const { getRootProps: getRootPropsFront, getInputProps: getInputPropsFront } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'frontID'),
//   });

//   const { getRootProps: getRootPropsBack, getInputProps: getInputPropsBack } = useDropzone({
//     accept: 'image/*',
//     onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'backID'),
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#131312] p-4 text-white">
//       <div className="bg-gray-800 p-8 rounded-3xl shadow-lg w-full max-w-5xl">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#929292]">Seller Registration</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Workshop Name */}
//           <div className="flex flex-col">
//             <label htmlFor="workshopName" className="text-[#929292] mb-2">Workshop Name</label>
//             <input
//               id="workshopName"
//               name="workshopName"
//               type="text"
//               value={formData.workshopName}
//               onChange={handleChange}
//               className="p-4 rounded-3xl border border-[#929292] text-white bg-gray-900 focus:border-[#C26510] focus:outline-none transition duration-500"
//             />
//             {errors.workshopName && <p className="text-red-500 text-sm mt-1">{errors.workshopName}</p>}
//           </div>

//           {/* Address */}
//           <div className="flex flex-col">
//             <label htmlFor="address" className="text-[#929292] mb-2">Address</label>
//             <input
//               id="address"
//               name="address"
//               type="text"
//               value={formData.address}
//               onChange={handleChange}
//               className="p-4 rounded-3xl border border-[#929292] text-white bg-gray-900 focus:border-[#C26510] focus:outline-none transition duration-500"
//             />
//             {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//           </div>

//           {/* Phone Number */}
//           <div className="flex flex-col">
//             <label htmlFor="phoneNumber" className="text-[#929292] mb-2">Phone Number</label>
//             <input
//               id="phoneNumber"
//               name="phoneNumber"
//               type="text"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="p-4 rounded-3xl border border-[#929292] text-white bg-gray-900 focus:border-[#C26510] focus:outline-none transition duration-500"
//             />
//             {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
//           </div>

//           {/* Bank Statement */}
//           <div {...getRootPropsBank()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
//             <input {...getInputPropsBank()} />
//             <div className="text-center">
//               <FaCloudUploadAlt className="text-4xl mb-2" />
//               <p className="text-sm text-[#929292]">Upload Bank Statement</p>
//               {previewBankStatement && <img src={previewBankStatement} alt="Bank Statement Preview" className="mt-2 max-w-full h-auto" />}
//               {errors.bankStatement && <p className="text-red-500 text-sm mt-1">{errors.bankStatement}</p>}
//             </div>
//           </div>

//           {/* Tax File */}
//           <div {...getRootPropsTax()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
//             <input {...getInputPropsTax()} />
//             <div className="text-center">
//               <FaCloudUploadAlt className="text-4xl mb-2" />
//               <p className="text-sm text-[#929292]">Upload Tax File</p>
//               {previewTaxFile && <img src={previewTaxFile} alt="Tax File Preview" className="mt-2 max-w-full h-auto" />}
//               {errors.taxFile && <p className="text-red-500 text-sm mt-1">{errors.taxFile}</p>}
//             </div>
//           </div>

//           {/* Front ID */}
//           <div {...getRootPropsFront()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
//             <input {...getInputPropsFront()} />
//             <div className="text-center">
//               <FaCloudUploadAlt className="text-4xl mb-2" />
//               <p className="text-sm text-[#929292]">Upload Front ID</p>
//               {previewFrontID && <img src={previewFrontID} alt="Front ID Preview" className="mt-2 max-w-full h-auto" />}
//               {errors.frontID && <p className="text-red-500 text-sm mt-1">{errors.frontID}</p>}
//             </div>
//           </div>

//           {/* Back ID */}
//           <div {...getRootPropsBack()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
//             <input {...getInputPropsBack()} />
//             <div className="text-center">
//               <FaCloudUploadAlt className="text-4xl mb-2" />
//               <p className="text-sm text-[#929292]">Upload Back ID</p>
//               {previewBackID && <img src={previewBackID} alt="Back ID Preview" className="mt-2 max-w-full h-auto" />}
//               {errors.backID && <p className="text-red-500 text-sm mt-1">{errors.backID}</p>}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-full mt-6 flex justify-center">
//             <button
//               type="submit"
//               className={`p-4 rounded-3xl text-white bg-[#C26510] hover:bg-[#A0522D] transition duration-500 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               disabled={uploading}
//             >
//               {uploading ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SellerPage;


