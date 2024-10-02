import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import InputField from "@/components/common/InputField/InputField"; // New reusable input field component
import { validateUsername, validatePassword } from "@/utils/validators"; // Moved validation to separate file
import styles from './Login.module.scss';

const Login = () => {
  // Combine username and password into a form state
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  // Validate form fields
  const validate = () => {
    const usernameError = validateUsername(form.username);
    const passwordError = validatePassword(form.password);
    return { username: usernameError, password: passwordError };
  };

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form state
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being changed
    setErrors((prev) => {
      if (prev[name]) {
        return { ...prev, [name]: '' };
      }
      return prev;
    });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Simulate an API call
      const userData = { username: form.username };
      setUser(userData);
      navigate('/');
    } catch (error) {
      setErrors({ username: '', password: 'Login failed. Please try again.' });
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
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
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
