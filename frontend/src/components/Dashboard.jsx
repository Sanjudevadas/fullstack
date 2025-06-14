import React, { useState } from "react";
import PostJob from "./dashboard/PostJob";
import { ClipboardList, Briefcase, Settings, LogOut } from "lucide-react"; // Install via `npm install lucide-react`

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("submissions");

  const renderContent = () => {
    switch (activeSection) {
      case "submissions":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">📥 Form Submissions</h2>
            <p className="text-gray-600">This section will show form submissions.</p>
          </section>
        );
      case "jobs":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
           
            <PostJob />
          </section>
        );
      case "settings":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">⚙️ Settings</h2>
            <p className="text-gray-600">Settings content will be available here.</p>
          </section>
        );
      case "logout":
        return (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">👋 Logged Out</h2>
            <p className="text-gray-600">You have been logged out.</p>
          </section>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { id: "submissions", label: "Form Submissions", icon: <ClipboardList size={20} /> },
    { id: "jobs", label: "Post a Job", icon: <Briefcase size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    { id: "logout", label: "Logout", icon: <LogOut size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 sticky top-0 h-screen hidden md:flex flex-col justify-between border-r">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-8">📊 Dashboard</h2>
          <ul className="space-y-3 font-medium">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition duration-200 ${
                    activeSection === item.id
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "hover:bg-blue-50 text-gray-700"
                  } cursor-pointer`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-gray-400 mt-8">&copy; 2025 sanjyou</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-12">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
