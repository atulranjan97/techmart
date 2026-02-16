import React from "react";
// External Modules
import { Link } from "react-router-dom";
// Custom Modules
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !orders.length ? (
        <Message>No orders yet</Message>
      ) : (
        <>
          {/* ================= MOBILE VIEW ================= */}
          <div className="space-y-4 lg:hidden">
            {orders.map((order) => (
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

                <Link to={`/order/${order._id}`}>
                  <button className="w-fit mx-auto mt-2 px-4 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition">
                    Details
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
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
                  {orders.map((order) => (
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
                        <Link to={`/order/${order._id}`}>
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
  );
};

export default OrderListPage;
