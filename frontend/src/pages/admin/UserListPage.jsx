import React, { useState } from "react";
// External Modules
import { Link } from "react-router-dom";
import { FaTimes, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
// Custom Modules
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";

const UserListPage = () => {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete, error: errorDelete }] =
    useDeleteUserMutation();
  const [activeUserId, setActiveUserId] = useState(null);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        setActiveUserId(id);
        await deleteUser(id).unwrap(); // .unwrap() is necessary because without it the mutation returns a resolved promise. `Success value` or `Error` lives inside result object
        toast.success("User deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      } finally {
        setActiveUserId(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        {/* <h2 className="w-full text-3xl font-bold">Users</h2> */}

        {isLoading ? (
          <Loader className="size-10 mx-auto" />
        ) : error ? (
          <Message variant="danger" className="p-2" >
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="w-full bg-white lg:shadow-md rounded-xl overflow-hidden lg:text-sm">
            {/* DESKTOP HEADER */}
            <div
              className="hidden lg:grid 
          grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_170px]
          gap-4 bg-gray-100 p-3 font-semibold text-gray-700 border-b border-gray-300"
            >
              <span className="truncate">ID</span>
              <span className="truncate">Name</span>
              <span>Email</span>
              <span className="flex justify-center">Admin</span>
              <span className="text-center">Actions</span>
            </div>

            {/* ------DESKTOP VIEW----- */}
            <div className="hidden lg:flex flex-col">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="grid 
                grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_170px]
                gap-4 items-center p-3 border-b border-gray-300 hover:bg-gray-100"
                >
                  {/* ID */}
                  <span className="truncate">{user._id}</span>
                  {/* Name */}
                  <span className="truncate font-medium">{user.name}</span>
                  {/* Email */}
                  <span className="truncate">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </span>
                  {/* isAdmin */}
                  <span className="flex justify-center">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </span>

                  {/* Actions */}
                  <div className="flex justify-center gap-2">
                    {loadingDelete && user._id === activeUserId ? (
                      <Loader />
                    ) : (
                      <>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap cursor-pointer">
                            <FaEdit />
                            Edit
                          </button>
                        </Link>

                        <button
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 whitespace-nowrap cursor-pointer"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* -----MOBILE VIEW----- */}
            <div className="lg:hidden flex flex-col gap-4 bg-gray-100">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
                >
                  {/* User Id */}
                  <span className="text-gray-500 break-all">#{user._id}</span>

                  <div className="text-sm text-gray-600 space-y-1">
                    {/* Name */}
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    {/* Email */}
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    {/* isAdmin */}
                    <p className="flex items-center gap-2">
                      <strong>Admin:</strong>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-2">
                    {loadingDelete && user._id === activeUserId ? (
                      <Loader className="size-6" />
                    ) : (
                      <>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            <FaEdit />
                            Edit
                          </button>
                        </Link>

                        <button
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
