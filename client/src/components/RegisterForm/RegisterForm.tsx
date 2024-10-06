// RegisterForm.tsx
import React, { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField/InputField";
import {validateName, validatePassword} from "@/utils/validators";
import styles from "./RegisterForm.module.scss";
import Button from '@/components/common/Button/Button'
import {ApiService} from "@/services/api-services";
import {ErrorsRegister, ErrorResponseData, ErrorsRegister, FormDataRegister} from '@/types'
import { AxiosError } from "axios";

const RegisterForm = () => {
    const [form, setForm] = useState<FormDataRegister>({name: "", age: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState<ErrorsRegister>({});
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const nameError = validateName(form.name);
        const passwordError = validatePassword(form.password);
        const confirmPasswordError = form.password !== form.confirmPassword ? "Passwords do not match." : "";
        return { name: nameError, password: passwordError, confirmPassword: confirmPasswordError };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => {
            // Type assertion here
            if (prev[name as keyof ErrorsRegister]) {
                return { ...prev, [name as keyof ErrorsRegister]: "" };
            }
            return prev;
        });
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.values(validationErrors).some(Boolean)) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const userData = await ApiService.register(form.name, form.age, form.email, form.password);
            setUser(userData);
            navigate("/");
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data as ErrorResponseData;

            setErrors({ confirmPassword: errorMessage?.message || "An error occurred" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <InputField
                        label="Name"
                        name="name"
                        type="text"
                        value={form.name}
                        error={errors.name}
                        onChange={handleChange}
                        placeholder="Type your name"
                    />
                    <InputField
                        label="Age"
                        name="age"
                        type="number"
                        value={form.age}
                        error={errors.age}
                        onChange={handleChange}
                        placeholder="Type your age"
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        error={errors.email}
                        onChange={handleChange}
                        placeholder="Type your username"
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        error={errors.password}
                        onChange={handleChange}
                        placeholder="Type your password"
                    />
                    <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        error={errors.confirmPassword}
                        onChange={handleChange}
                        placeholder="Type your password"
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth={true}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>
                <div className={styles.signUpLink}>
                    <p>Already have an account?</p>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
