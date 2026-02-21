import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Connect to backend API
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-3">
            Have a question about a product or your order? We're here to help.
          </p>
        </div>

        {/* <div className="grid md:grid-cols-2 gap-10"> */}
        <div className="lg:w-xl mx-auto">

          {/* Contact Info */}
          <div className="bg-white shadow-md rounded-xl p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-500 text-lg" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">atul.ranjan098@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-500 text-lg" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">+91 997....41</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-500 text-lg" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  New Delhi, India
                </p>
              </div>
            </div>

            {/* <div className="pt-6 border-t text-sm text-gray-500">
              Customer support available Mon–Sat, 9 AM – 6 PM.
            </div> */}
          </div>

          {/* Contact Form */}
          {/* <div className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default ContactPage;