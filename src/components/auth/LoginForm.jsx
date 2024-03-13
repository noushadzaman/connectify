import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, setError, } = useForm();
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const submitForm = async (formData) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);
            if (res.status === 200) {
                const { token, user } = res.data;
                if (token) {
                    const authToken = token.token;
                    const refreshToken = token.refreshToken;
                    console.log(`login time auth token: ${authToken}`);
                    setAuth({ user, authToken, refreshToken });
                    navigate('/');
                }
            }
        }
        catch (error) {
            console.log(error)
            setError("root.random", {
                type: "random",
                message: `User with email ${formData.email} is not found`,
            })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
        >
            <Field label={"Email"} error={errors.email}>
                <input
                    {...register('email', { required: "Email id is required" })}

                    type="email"
                    name="email"
                    id="email"
                    className={`auth-input ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
            </Field>
            <Field label={"Password"} error={errors.password}>
                <input
                    {...register('password', {
                        required: "Password id is required",
                        minLength: {
                            value: 8,
                            message: 'Password must be 8 characters long'
                        }
                    })}
                    type="password"
                    name="password"
                    id="password"
                    className={`auth-input ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
            </Field>
            <p>{errors?.root?.random?.message}</p>
            <Field>
                <button
                    className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                    type="submit"
                >
                    Login
                </button>
            </Field>
        </form>
    );
};

export default LoginForm;