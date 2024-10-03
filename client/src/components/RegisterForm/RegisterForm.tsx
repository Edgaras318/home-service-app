// RegisterForm.tsx
import React, { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField/InputField"; // New reusable input field component
import { validateUsername, validatePassword } from "@/utils/validators"; // Moved validation to separate file
import styles from "./RegisterForm.module.scss";
import Button from "@/components/common/Button/Button"; // Adjusted casing for consistency

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state for UX

  const validate = () => {
    const usernameError = validateUsername(form.username);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError =
      form.password !== form.confirmPassword ? "Passwords do not match." : "";
    return {
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear error for this field on change
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setForm({ username: "", password: "", confirmPassword: "" }); // Reset form after successful registration
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
        <form onSubmit={handleRegister} noValidate>
          {errors.username && (
            <p className={styles.errorText}>{errors.username}</p>
          )}
          <InputField
            label="Username"
            name="username"
            type="text"
            value={form.username}
            error={errors.username}
            onChange={handleChange}
            placeholder="Type your username"
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            error={errors.password}
            onChange={handleChange}
            placeholder="Type your password"
          />
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}
          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleChange}
            placeholder="Type your password"
          />
          <Button type="submit" disabled={loading} fullWidth={true}>
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
