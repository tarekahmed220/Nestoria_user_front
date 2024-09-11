import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the function to upload files to Cloudinary
const uploadToCloudinary = async (file) => {
  const cloudName = 'yussef'; // Replace with your Cloudinary cloud name
  const uploadPreset = 'ml_default'; // Replace with your whitelisted unsigned upload preset

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
    return response.data.secure_url; // Return the secure URL from Cloudinary
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
    const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,8}$/;

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

        // Update formData with the URLs from Cloudinary
        const updatedFormData = {
          ...formData,
          bankStatement: uploadResults[0],
          taxFile: uploadResults[1],
          frontID: uploadResults[2],
          backID: uploadResults[3],
        };

        // Now you can send `updatedFormData` to your backend
        console.log(updatedFormData);

        setUploading(false);
        navigate('/thanks');
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
    <div className=" mx-auto p-4 py-16 px-4 md:px-10 text-white"
    style={{
      backgroundImage: "url('/body-bg.png')",
      backgroundPosition: "left top",
      backgroundSize: "auto",
      backgroundRepeat: "repeat",
      backgroundAttachment: "scroll",
      backgroundColor: "#101010",
    }}
 
    
    >
      <div className="bg-[#000] p-8 rounded-3xl shadow-md">
        <h2 className="text-3xl text-[#C26510] mb-6 text-center">Seller Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-white w-full">
          {/* Workshop Name */}
          <div className="flex flex-col">
            <label htmlFor="workshopName" className="mb-2 ">Workshop Name</label>
            <input
              id="workshopName"
              name="workshopName"
              type="text"
              value={formData.workshopName}
              onChange={handleChange}
              className="p-4 rounded-3xl border border-[#A5A5A5] text-white bg-[#000] focus:border-[#C26510] focus:outline-none transition duration-500"
            />
            {errors.workshopName && <p className="text-red-500 text-sm mt-1">{errors.workshopName}</p>}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className=" mb-2 ">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="p-4 rounded-3xl border border-[#A5A5A5] text-white bg-[#000] focus:border-[#C26510] focus:outline-none transition duration-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className=" mb-2">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-4 rounded-3xl border border-[#A5A5A5] text-white bg-[#000] focus:border-[#C26510] focus:outline-none transition duration-500"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Bank Statement */}
          <div {...getRootPropsBank()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
            <input {...getInputPropsBank()} />
            <div className="text-center">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <p className="text-sm text-[#A5A5A5]">Upload Bank Statement</p>
              {previewBankStatement && <img src={previewBankStatement} alt="Bank Statement Preview" className="mt-2 max-w-full h-auto" />}
              {errors.bankStatement && <p className="text-red-500 text-sm mt-1">{errors.bankStatement}</p>}
            </div>
          </div>

          {/* Tax File */}
          <div {...getRootPropsTax()} className="border-2 border-dashed border-[#929292] p-6 rounded-3xl cursor-pointer">
            <input {...getInputPropsTax()} />
            <div className="text-center">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <p className="text-sm text-[#A5A5A5]">Upload Tax File</p>
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
            <input {...getInputPropsBack()}  />
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
              className={`w-1/2 p-4 rounded-3xl text-white bg-[#C26510] hover:bg-[#A0522D] transition duration-500  ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
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







