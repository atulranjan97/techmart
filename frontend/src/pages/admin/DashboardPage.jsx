import { useGetUsersQuery } from "../../slices/usersApiSlice";
import {
  useGetOrdersQuery,
  useGetOrdersStatsQuery,
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

  // const { data, isLoading: loadingOrders } = useGetOrdersQuery();
  const { data: orderStats, isLoading: loadingOrderStats } =
    useGetOrdersStatsQuery();
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
          // value={`₹ ${!loadingOrders && data.orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0).toFixed(2)}`}
          value={!loadingOrderStats && orderStats ? `₹ ${orderStats?.totalSales?.toLocaleString("en-IN")}` : 0 }
        />
        <Card
          title="Orders"
          value={!loadingOrderStats && orderStats?.totalOrders || 0 }
        />
        <Card title="Users" value={!loadingUsers && users.length} />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow overflow-x-auto mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {loadingRecentOrders ? (
          <Loader className="mx-auto" />
        ) : errorRecentOrders ? (
          <Message variant="danger">
            {errorRecentOrders?.data?.message || errorRecentOrders.error}
          </Message>
        ) : !recentOrders.length ? (
          <Message>No recent orders yet</Message>
        ) : (
          <>
            {/* MOBILE VIEW */}
            <div className="space-y-4 lg:hidden">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="text-sm md:text-base bg-white rounded-lg shadow p-4 space-y-2 divide-y divide-gray-300"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID</span>
                    <span className="font-medium">{order._id.slice(-6)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">User</span>
                    <span className="">{order.user.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="">{order.createdAt.substring(0, 10)}</span>
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
                      {order.isPaid
                        ? order.paidAt.substring(0, 10)
                        : "Not Paid"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Delivered</span>
                    <span className="font-semibold">
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "Pending"}
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

            {/* DESKTOP VIEW */}
            {loadingRecentOrders ? (
              <Loader className="mx-auto" />
            ) : errorRecentOrders ? (
              <Message variant="danger">
                {errorRecentOrders?.data?.message || errorRecentOrders.error}
              </Message>
            ) : !recentOrders.length ? (
              <Message>No recent orders yet</Message>
            ) : (
              <div className="hidden lg:flex flex-col bg-white shadow-md rounded-xl overflow-hidden text-sm">
                {/* HEADER */}
                <div
                  className="grid 
    grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_140px]
    gap-4 bg-gray-100 p-3 font-semibold text-gray-700 border-b border-gray-300"
                >
                  <span className="truncate">Id</span>
                  <span className="truncate">User</span>
                  <span className="whitespace-nowrap">Date</span>
                  <span>Total</span>
                  <span>Paid</span>
                  <span>Delivered</span>
                  <span className="text-center">Actions</span>
                </div>

                {/* ROWS */}
                {recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="grid 
        grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_140px]
        gap-4 items-center p-3 border-b border-gray-300 hover:bg-gray-100"
                  >
                    {/* ID */}
                    <span className="min-w-0 truncate">
                      {order._id.slice(-6)}...
                    </span>

                    {/* User */}
                    <span className="min-w-0 truncate font-medium">
                      {order.user.name}
                    </span>

                    {/* Date */}
                    <span className="whitespace-nowrap">
                      {order.createdAt.substring(0, 10)}
                    </span>

                    {/* Total */}
                    <span className="whitespace-nowrap">
                      ₹{order.totalPrice.toLocaleString("en-IN")}
                    </span>

                    {/* Paid */}
                    <span className="whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.isPaid
                          ? order.paidAt.substring(0, 10)
                          : "Not Paid"}
                      </span>
                    </span>

                    {/* Delivered */}
                    <span className="whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : "Pending"}
                      </span>
                    </span>

                    {/* Actions */}
                    <div className="flex justify-center shrink-0">
                      <Link to={`/admin/order/${order._id}`}>
                        <button className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 whitespace-nowrap cursor-pointer">
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
