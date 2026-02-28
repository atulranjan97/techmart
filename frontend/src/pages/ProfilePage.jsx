// Core Modules
import { useState, useEffect } from "react";

// External Modules
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Custom Modules
import { useProfileMutation } from "../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-gray-20 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* PROFILE CARD */}
        <div className="bg-white max-w-md mx-auto border border-slate-300 p-8 h-fit">
          <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep unchanged"
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>

            <button className="w-full bg-gray-700 text-white py-2.5 rounded-lg font-medium cursor-pointer">
              Update Profile
            </button>

            {loadingUpdateProfile && <Loader />}
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
