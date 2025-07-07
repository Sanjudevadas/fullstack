import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PostJob from "./dashboard/PostJob";
import Submissions from "./dashboard/Submissions";
import {
  ClipboardList,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("submissions");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "submissions", label: "Form Submissions", icon: ClipboardList },
    { id: "jobs", label: "Post a Job", icon: Briefcase },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  const renderContent = () => {
    const content = {
      submissions: {
        title: "📥 Form Submissions",
        body: <Submissions />,
      },
      jobs: {
        title: "🧰 Post a Job",
        body: <PostJob />,
      },
      settings: {
        title: "⚙️ Settings",
        body: <p>Settings content will be available here.</p>,
      },
      logout: {
        title: "👋 Logged Out",
        body: <p>You have been logged out.</p>,
      },
    };

    const selected = content[activeSection];

    return (
      <AnimatePresence mode="wait">
        <motion.section
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4">{selected.title}</h2>
          <div className="text-gray-800">
            {typeof selected.body === "string" ? (
              <p>{selected.body}</p>
            ) : (
              selected.body
            )}
          </div>
        </motion.section>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-gray-800 relative">
      {/* Mobile Header Toggle Button */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white shadow-sm z-50">
        <h2 className="text-xl font-bold text-blue-600">📊 Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen || window.innerWidth >= 768 ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`w-64 z-40 bg-white/80 backdrop-blur-lg p-6 shadow-xl border-r border-white/50 rounded-xl m-4 absolute md:static top-[60px] md:top-0 h-full ${
          sidebarOpen ? "block" : "hidden md:flex"
        } flex-col justify-between`}
      >
        <div>
          <ul className="space-y-3 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left transition duration-200 group cursor-pointer ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    <Icon
                      size={20}
                      className="group-hover:scale-110 group-hover:text-blue-600 transition-transform duration-200"
                    />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="text-sm text-gray-500 mt-8 text-center md:text-left">
          &copy; 2025 SanjYou
        </p>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 space-y-12 min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
