import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";


const ProductListUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/products`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [product]);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteUser = (products) => {
    Swal.fire({
      title: "Are you Sure",
      text: "You want to delete this " + `${products.name}` + "?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/products/${products._id}`).then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: `${res.data.name} has deleted!`,
                icon: "success",
              });
            }
          });
        } catch (error) {
          Swal.fire({
            title: "Deleted!",
            text: `${error} can't deleted!`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mx-5 my-10">
        <h2 className="text-2xl font-bold">All products</h2>
        <h2 className="text-2xl font-bold">ทั้งหมด {product.length} รายการ</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          {/* Table header */}
          <thead className="bg-red-500 text-white text-center bg-red">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Update</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody className="text-center divide-y divide-gray-200">
            {currentItems.map((product, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center">
                    <div className="w-10 h-10">
                      <img
                        className="w-full h-full rounded-full"
                        src={product.image}
                        alt="Product"
                      />
                    </div>
                    <span className="ml-4">{product.name}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/dashboard/update/${product._id}`}>
                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                      Update
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteUser(product)}
                  >
                   <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-10">
        <button
          className={`btn bg-red-500 text-white mx-2 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <button
          className={`btn bg-red-500 text-white mx-2 ${
            indexOfLastItem >= product.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= product.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListUpdate;
