// LoginForm.tsx
import React from 'react';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';
import InputField from "@/components/common/InputField/InputField";
import styles from './LoginForm.module.scss';
import Button from "@/components/common/Button/Button";
import { ApiService } from "@/services/api-services";
import { AuthResponse, ErrorResponseData, LoginPayload } from "@/types";
import { AxiosError } from "axios";
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { loginValidationSchema, loginInitialValues } from '@/schemas/authValidationSchemas';
import { errorMessages } from '@/consts/errorMessages'; // Import the error messages

const Login: React.FC = () => {
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleSubmit = async (values: LoginPayload, { setSubmitting, setErrors }: FormikHelpers<LoginPayload>) => {
        try {
            const userData: AuthResponse = await ApiService.login(values.email, values.password);
            setUser(userData?.data);
            navigate('/');
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data as ErrorResponseData;

            setErrors({ email: '', password: errorMessage?.message || errorMessages.authentication.defaultError });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1>Login</h1>
                <Formik
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Type your email"
                                as={InputField}
                                label="Email"
                                error={touched.email && errors.email}
                            />
                            <Field
                                name="password"
                                type="password"
                                placeholder="Type your password"
                                as={InputField}
                                label="Password"
                                error={touched.password && errors.password}
                            />
                            <Button type="submit" disabled={isSubmitting} fullWidth>
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
