import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Enter valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 8 characters")
      .required("Password is required"),
  })
  .strict();

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema), defaultValues });
  const user = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handlers
  const onSubmitHandler = async (data) => {
    try {
      const payLoad = { ...data };
      dispatch(
        login(payLoad, (user) => {
          if (user) {
            navigate(PATH_DASHBOARD.root, { replace: true });
          }
          reset();
        })
      );
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2>Lets sign you in.</h2>
      <p className="error">{user?.error}</p>
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
      <Link to={PATH_AUTH.register}>Register here..</Link>
      <br />
      <button type="submit" disabled={isSubmitting}>
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
