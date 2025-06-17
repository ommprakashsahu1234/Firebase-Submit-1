import React, { useState } from "react";

const Contact = () => {
    const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };




  //uploading
const submitData = async (event) => {
  event.preventDefault();
  const { firstName, lastName, mobile, email, message } = formData;

  if (!firstName || !lastName || !mobile || !email || !message) {
    alert("Please fill all the fields.");
    return;
  }

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "user_files");

    const res = await fetch(`https://api.cloudinary.com/v1_1/dtquf8kx2/upload`, {
      method: "POST",
      body: data,
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error.message || "Unknown Cloudinary error");
    }

    return json.secure_url; 
  };

  let fileUrl = "";

  if (file) {
    try {
      fileUrl = await uploadToCloudinary(file);
      alert("✅ File uploaded successfully!");
    } catch (err) {
      alert("❌ File upload failed: " + err.message);
      return; // stop the process if file upload fails
    }
  }

  const res = await fetch(
    "{{firebase URL Here}}",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        mobile,
        email,
        message,
        ...(fileUrl && { documentUrl: fileUrl }), 
      }),
    }
  );

  if (res.ok) {
    setFormData({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      message: "",
    });
    setFile(null);
    alert("✅ Feedback received! Our team will get back to you.");
  } else {
    alert("❌ Something went wrong while saving data.");
  }
};



  return (
    <section className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Feedback / Complaint Form
      </h2>
      <form className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900 dark:text-gray-100 mb-4 md:mb-0"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900 dark:text-gray-100"
            required
          />
        </div>

        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900 dark:text-gray-100"
          pattern="[0-9]{10,15}"
          title="Enter a valid phone number"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ID"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900 dark:text-gray-100"
          required
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your feedback or complaint"
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 text-gray-900 dark:text-gray-100"
          required
        ></textarea>

        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx .jpg ,.jpeg ,.png"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
          onClick={submitData}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Contact;
