import React from "react";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import {
  useGetOrdersQuery,
  useGetRecentOrdersQuery,
} from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const {
    data: users,
    isLoading: loadingUsers,
    error: errorUsers,
  } = useGetUsersQuery();

  const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
  const {
    data: recentOrders,
    isLoading: loadingRecentOrders,
    error: errorRecentOrders,
  } = useGetRecentOrdersQuery();
  console.log(typeof recentOrders);

  const Card = ({ title, value }) => (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Total Sales"
          value={`₹ ${!loadingOrders && orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0).toFixed(2)}`}
        />
        <Card
          title="Orders"
          value={
            !loadingOrders &&
            orders.reduce((acc, order) => acc + order.orderItems.length, 0)
          }
        />
        <Card title="Users" value={!loadingUsers && users.length} />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow overflow-x-auto mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {loadingRecentOrders ? (
          <Loader />
        ) : errorRecentOrders ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
          {/* ================= MOBILE VIEW ================= */}
          <div className="space-y-4 lg:hidden">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="text-sm md:text-base bg-white rounded-lg shadow p-4 space-y-2 divide-y divide-gray-300"
              >
                <div className="flex justify-between">
                  <span className="text-gray-500">ID</span>
                  <span className="font-medium">
                    {order._id.slice(-6)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">User</span>
                  <span className="">{order.user.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="">
                    {order.createdAt.substring(0, 10)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold">
                    ₹{order.totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Paid</span>
                  <span className="font-semibold">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Delivered</span>
                  <span className="font-semibold">
                    {order.isDelivered ? order.deliveredAt.substring(0, 10) : "Pending"}
                  </span>
                </div>

                <Link to={`/admin/order/${order._id}`}>
                  <button className="w-fit mx-auto mt-2 px-4 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition">
                    Details
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-sm">
                  <tr>
                    <th className="p-3 font-semibold text-gray-700">
                      Id
                    </th>
                    <th className="p-3 font-semibold text-gray-700">
                      User
                    </th>
                    <th className="p-3 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="p-3 font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="p-3 font-semibold text-gray-700">
                      Paid
                    </th>
                    <th className="p-3 font-semibold text-gray-700">
                      Delivered
                    </th>
                    <th className="p-3 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-gray-300 hover:bg-gray-100 transition"
                    >
                      <td className="p-2 text-sm text-gray-800">
                        {order._id}
                      </td>
                      <td className="p-2 text-sm font-semibold text-gray-800">
                        {order.user.name}
                      </td>
                      <td className="p-2 text-sm text-gray-800">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-2 text-sm text-gray-800">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </td>

                      <td className="p-2">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            order.isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}
                        </span>
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            order.isDelivered
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.isDelivered ? order.deliveredAt.substring(0, 10) : "Pending"}
                        </span>

                      </td>

                      <td className="p-2">
                        <Link to={`/admin/order/${order._id}`}>
                          <button className="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
