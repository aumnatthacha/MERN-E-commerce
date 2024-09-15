import { useForm } from "react-hook-form";
import { FaSave } from 'react-icons/fa';
import useAxiosSecure from '../../hook/useAxiosSecure'
import Swal from "sweetalert2";



const AddProducts = () => {
  const AxiosSecure = useAxiosSecure()

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const productInfo = {
      name: data.name,
      description: data.detail,
      category: data.category,
      price: data.price,
      image: data.imageURL
    };
    try {
      AxiosSecure.post("/products", productInfo).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Created Successfully",
            icon: "success",
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: error,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className=" flex my-10">
        <h2 className="text-2xl"> Add a new</h2>
        <h2 className="text-2xl ml-3 text-red"> Product items</h2>
      </div>
      <div className="h-full w-[70vw]">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Name of product"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div className="flex justify-between">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Type of product</span>
              </label>
              <select className="input input-bordered w-full" {...register("category")} required>
                <option value="" disabled selected hidden>
                  Select your type product
                </option>
                <option value="UX/UI UX Design">UX/UI UX Design</option>
                <option value="Front-End Developer">Front-End Developer</option>
                <option value="Back-end developers">Back-end developers</option>
                <option value="full-stack developer">Full-stack developer</option>
                <option value="Business Analysis">Business Analysis</option>
              </select>
            </div>
            <div className="ml-2 w-full">
              <label className="label">
                <span className="label-text">Price of product</span>
              </label>
              <input
                type="number"
                placeholder="Price of product"
                className="input input-bordered w-full"
                required
                {...register("price")}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Detail</span>
            </label>
            <textarea
              type="text"
              placeholder="Detail Product"
              className="input input-bordered h-[8rem]"
              required
              {...register("detail")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image Url</span>
            </label>
            <input
              type="text"
              placeholder="Image url : www.image.com/image01"
              className="input input-bordered"
              required
              {...register("imageURL")}
            />
          </div>
          <div className="mt-10">
            <button type="submit" className="bg-red flex items-center justify-center px-4 py-2 text-white rounded-md">
              Create Item
              <FaSave className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;