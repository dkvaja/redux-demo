import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosPost } from "../../services/axios";
import { API_ROUTER } from "../../services/apis";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(32, "Name must be at most 32 characters"),
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters")
      .required("Password is required"),
  })
  .strict();

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), defaultValues });
  const navigate = useNavigate();

  // Handlers
  const onSubmitHandler = async (data) => {
    try {
      const payLoad = { ...data };
      const res = await axiosPost(API_ROUTER.REGISTER, payLoad);
      if (res.status) {
        alert("Registered Success");
        navigate(PATH_AUTH.login);
        reset();
      } else {
        alert(res?.message || "Something went wrong");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Register.</h2>
      <br />
      <input placeholder="Enter your name" type="text" {...register("name")} />
      <p className="error">{errors.name?.message}</p>
      <br />
      <input
        placeholder="Enter your email"
        type="email"
        {...register("email")}
      />
      <p className="error">{errors.email?.message}</p>
      <br />
      <input
        placeholder="Enter your password"
        type="password"
        {...register("password")}
      />
      <p className="error">{errors.password?.message}</p>
      <br />
      <Link to={PATH_AUTH.login}>Already have an account?</Link>

      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
