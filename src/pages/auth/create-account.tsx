import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../api/api";
import { FormError } from "../../components/form-error";

export enum UserRole {
  CLIENT = "CLIENT",
  OWNER = "OWNER",
}

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateAccountForm>({ defaultValues: { role: UserRole.CLIENT } });
  const navigate = useNavigate();
  const onSubmit = async () => {
    const { email, password, role } = getValues();
    const response = await createAccount({
      email,
      password,
      role,
    });
    const { ok, error } = response?.data;
    if (ok) {
      alert("계정이 생성되었습니다. 로그인 해주세요.");
      navigate("/");
    } else {
      console.log(error);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <Helmet>Create Account | hermes delivery</Helmet>
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Create Account</h3>
        <form
          onSubmit={handleSubmit(onSubmit)} // form 안에 담긴 정보를 handleSubmit 을 통해 가공
          className="grid gap-3 mt-5 px-5"
        >
          <input
            {...register("email", {
              required: "Email is required",
              //이메일 형식 체크
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
            <span className="font-midium text-red-500">
              <FormError errorMessage="Password must be more than 10 chars." />
            </span>
          )}
          <select {...register("role", { required: true })} name="role">
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <button className="mt-3 btn">Create</button>
        </form>
      </div>
    </div>
  );
};
