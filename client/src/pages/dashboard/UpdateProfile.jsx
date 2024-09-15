/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.PhotoURL;
    updateUserProfile({ name, photoURL })
      .then(() => {
        alert("Profile Updated!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center my-20">
      <div className="card transform-gpu w-full max-w-sm shadow-2xl bg-gray-100 rounded-lg">
        <h3 className="font-bold text-lg mt-3 text-center">
          Update Your Profile
        </h3>
        <form className="card-body px-4 py-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered w-full"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Upload Profile Photo</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              required
              {...register("PhotoURL")}
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Update"
              className="text-white bg-red btn w-full hover:bg-rose-950"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
