// Local modules
import { useState, useEffect } from "react";
// External modules
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// Custom modules
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const UserEditPage = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await updateUser({userId, name, email, isAdmin}).unwrap();
        toast.success('User updated successfully');
        refetch();
        navigate('/admin/userlist');
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-7xl p-3 mx-auto">
      {/* Go back button */}
      <Link
        to={"/admin/userlist"}
        className="hidden lg:block w-fit px-2 py-1 border rounded-sm mb-4"
      >
        Go Back
      </Link>
      <div className="w-full lg:max-w-4xl bg-white rounded-xl p-4 lg:p-8 mx-auto border border-slate-300 my-5">
        <h2 className="text-2xl font-semibold mb-5">Edit User</h2>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <form className="space-y-4" onSubmit={submitHandler}>
            {/* User name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter product name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter product description"
              />
            </div>

            {/* IsAdmin */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label>Admin</label>
              </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-techmart-color text-white py-2 rounded-md hover:bg-techmart-dark transition mt-4"
            >
              Update Product
            </button>

            {isLoading && <Loader />}
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditPage;
