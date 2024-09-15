import React from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";

const UserList = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  const handleCheckRole = (user) => {
    if (user.role === "admin") {
      axiosSecure
        .patch(`/users/user/${user._id}/${user.role}`)
        .then(() => {
          refetch();
          Swal.fire({
            title: "Change role admin to user",
            icon: "success",
          });
        })
        .catch(() => {
          const errorStatus = error?.response?.status;
          const errorMessage = error?.response?.message;
          Swal.fire({
            title: `${errorStatus} - ${errorMessage}`,
            icon: "error",
          });
        });
    }
    axiosSecure.patch(`/users/user/${user._id}/${user.role}`).then(() => {
      refetch();
      Swal.fire({
        title: "Change role user to admin",
        icon: "success",
      });
    });
  };
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you Sure",
      text: "You want to delete this " + `${user.name}` + "user?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${res.data.name} has deleted!`,
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-2 my-2">
        <h2 className="text-2xl">All users</h2>
        <h2 className="text-2xl">{users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red text-white text-center">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Job</th>
              <th className="px-6 py-3">Favorite Color</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-center divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src={user.photo}
                        alt="Avatar"
                      />
                    </div>
                    <div className="ml-4">{user.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-red-600"
                      checked={user.role === "admin"}
                      onChange={() => handleCheckRole(user)}
                    />
                    <span className="ml-2">Admin</span>
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
