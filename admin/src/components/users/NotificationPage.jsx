import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineMail } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from "../common/Header";

export default function NotificationPage() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  useEffect(() => {
    axios
      .get(`${base_url}/admin/all-users`)
      .then((res) => setActiveUsers(res.data.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSearch = (e) => setSearch(e.target.value);
  const handleSelect = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedUser || !subject || !message) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${base_url}/admin/send-notification`, {
        recipients: selectedUser,
        subject,
        message,
        sendViaEmail: true,
      });

      toast.success(response.data.message || "Notification sent successfully!");
      setMessage("");
      setSubject("");
      setSelectedUser("All Users");
    } catch (error) {
      toast.error("Failed to send notification!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"], 
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"], // ✅ Enable image upload option
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["clean"],
  ];

  return (
    <section className="w-full bg-gray-100 font-bai">
      <Header />
      <div className="p-6 w-full flex justify-center">
        <div className="w-full p-6">
          <h2 className="text-[25px] font-semibold text-gray-700 mb-4">
            Notification to Verified Users
          </h2>

          <section className="bg-white p-[30px] rounded-[2px]">
            <div className="flex items-center justify-start mb-4">
              <button className="relative flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-[5px] shadow-md border-2 border-blue-600">
                <AiOutlineMail className="text-xl" /> Send Via Email
                <div className="absolute top-0 right-0 bg-blue-600 w-6 h-6 rounded-bl-lg"></div>
              </button>
            </div>

            <div>
              <div className="relative w-full mb-[10px]">
                <label className="block text-[16px] font-medium text-gray-700 mb-[4px]">
                  Being Sent To *
                </label>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-full p-2 border rounded-md flex justify-between items-center text-gray-700 bg-white"
                  >
                    {selectedUser}
                    <FaChevronDown />
                  </button>
                  {isOpen && (
                    <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full p-2 border-b text-gray-700 outline-blue-500"
                      />
                      <ul className="max-h-60 overflow-y-auto">
                        <li
                          className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          onClick={() => handleSelect("All Users")}
                        >
                          All Users
                        </li>
                        {activeUsers
                          .filter((user) =>
                            user.email.toLowerCase().includes(search.toLowerCase())
                          )
                          .map((user, index) => (
                            <li
                              key={index}
                              className="p-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                              onClick={() => handleSelect(user.email)}
                            >
                              {user.email}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <label className="block text-[16px] font-medium text-gray-700 mb-[4px]">
                Subject *
              </label>
              <input
                type="text"
                placeholder="Subject / Title"
                className="w-full p-2 border rounded-md mt-1 text-gray-700 outline-blue-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <label className="block text-[16px] font-medium mt-[10px] text-gray-700 mb-[4px]">
                Message *
              </label>
              <ReactQuill
                value={message}
                onChange={setMessage}
                className="mt-1 h-[300px] text-gray-700 font-bai bg-white outline-blue-500"
                modules={{
                  toolbar: toolbarOptions, // ✅ Custom toolbar with images
                }}
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full mt-[60px] text-white text-lg py-2 rounded-md ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
