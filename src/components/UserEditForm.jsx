import React from 'react';

export function UserEditForm({
  user,
  onChange,
  onCancel,
  onSave,
  isAdmin = false
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    onChange({ ...user, [name]: newValue });
  };

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50 space-y-3 text-sm">
      <h3 className="text-lg font-semibold">Edit User</h3>

      <input
        className="border px-4 py-2 rounded w-full text-sm"
        name="name"
        value={user.name}
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        className="border px-4 py-2 rounded w-full text-sm"
        name="email"
        value={user.email}
        disabled
      />

      <input
        className="border px-4 py-2 rounded w-full text-sm"
        name="address"
        value={user.address}
        placeholder="Address"
        onChange={handleChange}
      />

      {isAdmin && (
        <>
          <select
            name="isActive"
            value={user.isActive}
            onChange={(e) =>
              onChange({ ...user, isActive: e.target.value === 'true' })
            }
            className="border px-4 py-2 rounded w-full text-sm"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}

      <div className="flex gap-3 mt-2">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
