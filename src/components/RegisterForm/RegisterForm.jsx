import React, { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField/InputField"; // New reusable input field component
import { validateUsername, validatePassword } from "@/utils/validators"; // Moved validation to separate file
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
    const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state for UX

    const validate = () => {
        const usernameError = validateUsername(form.username);
        const passwordError = validatePassword(form.password);
        const confirmPasswordError = form.password !== form.confirmPassword ? "Passwords do not match." : "";
        return { username: usernameError, password: passwordError, confirmPassword: confirmPasswordError };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));

        setErrors((prev) => {
            if (prev[name]) {
                // Only update if an error exists for this field
                return { ...prev, [name]: "" };
            }
            return prev; // No error, no need to update state
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.values(validationErrors).some(Boolean)) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true); // Start loading
        try {
            // Simulate an API call
            const userData = { username: form.username };
            setUser(userData);
            navigate("/");
        } catch (error) {
            setErrors({ password: "Registration failed. Please try again." });
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <InputField
                        label="Username"
                        name="username"
                        type="text"
                        value={form.username}
                        error={errors.username}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        error={errors.password}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        error={errors.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit" className={styles.submitButton} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
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
