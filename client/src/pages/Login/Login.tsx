import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import InputField from "@/components/common/InputField/InputField"; // New reusable input field component
import { validateUsername, validatePassword } from "@/utils/validators";
import styles from './Login.module.scss';
import Button from "@/components/common/Button/Button";

// Define the shape of the form state
type FormState = {
  username: string;
  password: string;
}

// Define the shape of the errors object
type Errors = {
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  // Combine username and password into a form state
  const [form, setForm] = useState<FormState>({ username: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false); // Loading state for UX

  // Validate form fields
  const validate = (): Errors => {
    const usernameError = validateUsername(form.username);
    const passwordError = validatePassword(form.password);
    return { username: usernameError, password: passwordError };
  };

  // Handle change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form state
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being changed
    setErrors((prev) => {
      if (prev[name as keyof Errors]) {
        return { ...prev, [name as keyof Errors]: '' };
      }
      return prev;
    });
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
      // Simulate an API call
      const userData = { username: form.username };
      setUser(userData);
      navigate('/');
    } catch (error) {
      setErrors({ username: '', password: 'Login failed. Please try again.' });
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
                label="Username"
                name="username"  // Add the 'name' attribute to map to form state
                value={form.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="Type your username"
            />
            <InputField
                label="Password"
                name="password"  // Add the 'name' attribute to map to form state
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
