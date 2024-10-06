import React from 'react';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import InputField from "@/components/common/InputField/InputField";
import styles from './LoginForm.module.scss';
import Button from "@/components/common/Button/Button";
import { ApiService } from "@/services/api-services";
import { AuthResponse, ErrorResponseData } from "@/types";
import { AxiosError } from "axios";
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { loginValidationSchema } from '@/schemas/authValidationSchemas'; // Adjust the path as necessary

interface LoginValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    const initialValues: LoginValues = { email: '', password: '' };

    const handleSubmit = async (values: LoginValues, { setSubmitting, setErrors }: FormikHelpers<LoginValues>) => {
        try {
            const userData: AuthResponse = await ApiService.login(values.email, values.password);
            setUser(userData);
            navigate('/');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data as ErrorResponseData;

            setErrors({ email: '', password: errorMessage?.message || "An error occurred" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            <Field
                                name="email"
                                type="text"
                                placeholder="Type your email"
                                as={InputField}
                                label="Email"
                                error={errors.email}
                            />
                            <Field
                                name="password"
                                type="password"
                                placeholder="Type your password"
                                as={InputField}
                                label="Password"
                                error={errors.password}
                            />
                            <Button type="submit" disabled={isSubmitting} fullWidth={true}>
                                {isSubmitting ? "Loading..." : "Login"}
                            </Button>
                        </Form>
                    )}
                </Formik>

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
