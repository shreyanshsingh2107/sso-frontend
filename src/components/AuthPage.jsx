import React, { useState, useEffect } from "react";
import api from "../api";
import { AuthForm } from "../components/AuthForm";
import { UserDashboard } from "../components/UserDashboard";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    password: "",
    name: "",
    email: "",
    address: "",
    isActive: true,
  });

  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

useEffect(() => {
  async function fetchUser() {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);

      try {
        const all = await api.get("/users");
        setAllUsers(all.data);
      } catch (err) {
        if (err.response?.status === 403) {
          console.log("User is not admin. Skipping user list.");
        } else {
          toast.error("Failed to load users.");
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  }

  fetchUser();
}, []);


 const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };
  const handleRegister = async () => {
    try {
      await api.post("/users/register", form);
      toast.success("Registered! You can now log in.");
      setTab("login");
    } catch (err) {
      const errMsg = Array.isArray(err?.response?.data?.message)
        ? err.response.data.message.join("\n")
        : err?.response?.data?.message;

      toast.error(errMsg);
    }
  };

  const handleLogin = async () => {
  try {
    const params = new URLSearchParams();
    params.append("email", form.email);
    params.append("password", form.password);

    const res = await api.post("/auth/login", params);

    const userDetails = res.data.user;
    setUser(userDetails);
    toast.success("Logged in!");

    try {
      const all = await api.get("/users");
      setAllUsers(all.data);
    } catch (err) {
      if (err.response?.status === 403) {
        console.log("User is not admin. Cannot fetch all users.");
      } else {
        toast.error("Failed to load users.");
      }
    }
  } catch (err) {
    const errMsg = err?.response?.data?.message || "Something went wrong";
    toast.error(errMsg);
  }
};


  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setAllUsers([]);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleEdit = async () => {
    try {
      const updatedUser = await api.patch(
        `/users/${editingUser.id}`,
        editingUser
      );
      const updated = allUsers.map((u) =>
        u.id === editingUser.id ? updatedUser.data : u
      );

      setAllUsers(updated);

      if (editingUser.id === user.id) {
        setUser(updatedUser.data);
      }

      setEditingUser(null);
      toast.success(" Profile updated");
    } catch {
      toast.error(" Failed to update user");
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await api.patch(`/users/${id}/deactivate`);
      const updatedUsers = allUsers.map((u) =>
        u.id === id ? { ...u, isActive: false } : u
      );
      setAllUsers(updatedUsers);
      toast.success("User deactivated");
    } catch {
      toast.error("Failed to deactivate user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 min-w-96">
        {loading ? (
          <p className="text-center text-sm">🔄 Checking session...</p>
        ) : !user ? (
          <AuthForm
            tab={tab}
            form={form}
            setTab={setTab}
            handleChange={handleChange}
            handleRegister={handleRegister}
            handleLogin={handleLogin}
            handleGoogleLogin= {handleGoogleLogin}
          />
        ) : (
          <>
            <nav className="bg-white border-gray-200 absolute top-0 left-0 h-16 w-full flex items-center justify-end pr-2 dark:bg-gray-500">
              <button className="text-white" onClick={handleLogout}>
                LogOut
              </button>
            </nav>

            <UserDashboard
              user={user}
              allUsers={allUsers}
              handleDeactivate={handleDeactivate}
              handleEdit={handleEdit}
              editingUser={editingUser}
              setEditingUser={setEditingUser}
            />
          </>
        )}
      </div>
    </div>
  );
}
