import { useForm } from "react-hook-form";
import Field from "../common/Field";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, setError, } = useForm();
    const navigate = useNavigate();

    const submitForm = async (formData) => {
        console.log(formData);
        try {
            let response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData);
            if (response.status == 201) {
                navigate('/login')
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
            className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]">
            <Field label={"First Name"} error={errors.firstName}>
                <input
                    {...register('firstName', { required: "First name is required" })}
                    type="firstName"
                    name="firstName"
                    id="firstName"
                    className={`auth-input ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
            </Field>
            <Field label={"Last Name"} error={errors.firstName}>
                <input
                    {...register('lastName', { required: "Last name is required" })}
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    className={`auth-input ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
            </Field>
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
            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;