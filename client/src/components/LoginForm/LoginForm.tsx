import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import InputField from "@/components/common/InputField/InputField";
import { validateEmail, validatePassword } from "@/utils/validators";
import styles from './LoginForm.module.scss';
import Button from "@/components/common/Button/Button";
import {ApiService} from "@/services/api-services";
import {AuthResponse, ErrorResponseData} from "@/types";
import {AxiosError} from "axios";
import {FormLogin, ErrorsLogin} from "@/types";

const Login: React.FC = () => {
    const [form, setForm] = useState<FormLogin>({ email: '', password: '' });
    const [errors, setErrors] = useState<ErrorsLogin>({});
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const validate = (): ErrorsLogin => {
        const emailError = validateEmail(form.email);
        const passwordError = validatePassword(form.password);
        return { email: emailError, password: passwordError };
    };

    // Handle change for form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({
            ...prev,
            [name as keyof ErrorsLogin]: '',
        }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.values(validationErrors).some(Boolean)) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);

        try {
            const userData: AuthResponse = await ApiService.login(form.email,form.password );
            setUser(userData);
            navigate('/');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data as ErrorResponseData;

            setErrors({ email: '', password: errorMessage?.message || "An error occurred" });
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
