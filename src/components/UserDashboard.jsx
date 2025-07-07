import React, { useState} from "react";
import { UserEditForm } from "./UserEditForm";
import ClockInButton from "./ClockInButton ";
import ClockInOutControl from "./ClockInOutControl";
export function UserDashboard({
  user,
  allUsers,
  handleDeactivate,
  editingUser,
  setEditingUser,
  handleEdit,
}) {
  const isAdmin = user.role === "admin";
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState('');

  const handleClockIn = () => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setClockInTime(now);
    setIsClockedIn(true);
  };
  return (
    <div>
      <ClockInButton
        onClick={handleClockIn}
        isClockedIn={isClockedIn}
        clockInTime={clockInTime}
      />

        {/* <div className="h-[2000px] bg-gray-100"> */}
      {/* Other content */}
      {/* <ClockInOutControl /> */}
    {/* </div> */}
      <h2 className="text-xl font-semibold mb-4 text-center">
        Welcome, {user.name}
      </h2>

      {isAdmin ? (
        <>
          <h3 className="font-medium mb-2">All Users:</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Address</th>
                  <th className="border px-4 py-2 text-left">Role</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <tr key={u.id} className="odd:bg-white even:bg-gray-50">
                    <td className="border px-4 py-2">{u.name}</td>
                    <td className="border px-4 py-2">{u.email}</td>
                    <td className="border px-4 py-2">{u.address}</td>
                    <td className="border px-4 py-2">{u.role}</td>
                    <td className="border px-4 py-2">
                      {u.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="border px-4 py-2 flex justify-around gap-2">
                      <button
                        onClick={() => setEditingUser(u)}
                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeactivate(u.id)}
                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingUser && (
            <UserEditForm
              user={editingUser}
              onChange={setEditingUser}
              onCancel={() => setEditingUser(null)}
              onSave={handleEdit}
              isAdmin={true}
            />
          )}
        </>
      ) : (
        <div className="text-sm space-y-2">
          {editingUser ? (
            <UserEditForm
              user={editingUser}
              onChange={setEditingUser}
              onCancel={() => setEditingUser(null)}
              onSave={handleEdit}
              isAdmin={false}
            />
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <button
                onClick={() => setEditingUser(user)}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
