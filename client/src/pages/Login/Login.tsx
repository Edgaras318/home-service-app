import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import InputField from "@/components/common/InputField/InputField"; // New reusable input field component
import { validateEmail, validatePassword } from "@/utils/validators";
import styles from './Login.module.scss';
import Button from "@/components/common/Button/Button";
import {ApiService} from "@/services/api-services";
import {AuthResponse} from "@/types";

// Define the shape of the form state
type FormState = {
  email: string;
  password: string;
}

// Define the shape of the errors object
type Errors = {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false); // Loading state for UX

  // Validate form fields
  const validate = (): Errors => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    return { email: emailError, password: passwordError };
  };

  // Handle change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form state
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being changed
    setErrors((prev) => ({
      ...prev,
      [name as keyof Errors]: '',
    }));
  };

  // Handle form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true); // Start loading

    try {
      // Simulate an API call (replace with actual API call)
      const userData: AuthResponse = await ApiService.login(form.email,form.password );
      setUser(userData);
      navigate('/'); // Navigate to home on successful login
    } catch (error) {
      setErrors({ email: '', password: 'Login failed. Please try again.' });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <InputField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Type your email"
            />
            <InputField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Type your password"
            />
            <Button
                type="submit"
                disabled={loading}
                fullWidth={true}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>

          <div className={styles.socialLogin}>
            <div className={`${styles.socialIcon} ${styles.facebookIcon}`}>F</div>
            <div className={`${styles.socialIcon} ${styles.twitterIcon}`}>T</div>
            <div className={`${styles.socialIcon} ${styles.googleIcon}`}>G</div>
          </div>

          <div className={styles.signUpLink}>
            <p>Or Sign Up Using</p>
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
  );
};

export default Login;
