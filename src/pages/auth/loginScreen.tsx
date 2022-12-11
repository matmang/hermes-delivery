import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { login } from "../../api/api";
import { Login } from "../../api/dtos/login.interface";
import { FormError } from "../../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../../constants";

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

export const LoginScreen = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();
  const onSubmit = async () => {
    const { email, password } = getValues();
    const response = await login({ email, password });
    const { ok, error, token } = response?.data;
    if (ok && token) {
      alert("헤르메스에 오신 것을 환영합니다!");
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      window.location.replace("/");
    } else {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <Helmet>
        <title>Login | hermes-delivery</title>
      </Helmet>
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log in</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5 mb-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="mb-3 input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 10,
            })}
            name="password"
            required
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              <FormError errorMessage="Password must be more than 10 chars." />
            </span>
          )}
          <button className="mt-3 btn">Log In</button>
        </form>
        <div>
          New to Hermes?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
