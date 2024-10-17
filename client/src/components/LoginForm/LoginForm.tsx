import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import InputField from "@/components/common/InputField/InputField";
import styles from './LoginForm.module.scss';
import Button from "@/components/common/Button/Button";
import { loginValidationSchema, loginInitialValues } from '@/schemas/authValidationSchemas';
import { LoginPayload } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from "axios"; // Ensure AxiosError is imported
import { errorMessages } from "@/consts/errorMessages";
import { ErrorResponseData } from "@/types";
import routes from "@/routes";
import {useNavigate} from "react-router-dom";


const Login: React.FC = () => {
    const { mutate, isPending } = useAuth({ mode: 'login' });
    const navigate = useNavigate();

    const handleSubmit = (values: LoginPayload, formikHelpers: FormikHelpers<LoginPayload>) => {
        mutate(values, {
            onSettled: () => {
                formikHelpers.setSubmitting(false);
            },
            onError: (error) => {
                const axiosError = error as AxiosError; // Assert the error type to AxiosError
                const errorResponse = axiosError.response?.data as ErrorResponseData;

                formikHelpers.setErrors({
                    email: '',
                    password: errorResponse?.message || errorMessages.authentication.defaultError
                });
            },
            onSuccess: () => {
                formikHelpers.resetForm(); // Reset form on successful login
            }
        });
    };

    const handleNavigateToSignUp = () => {
        navigate(routes.login);
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
                                aria-label="Email input"
                            />
                            <Field
                                name="password"
                                type="password"
                                placeholder="Type your password"
                                as={InputField}
                                label="Password"
                                error={touched.password && errors.password}
                                aria-label="Password input"
                            />
                            <Button type="submit" disabled={isSubmitting || isPending} fullWidth>
                                {isSubmitting || isPending ? "Loading..." : "Login"}
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
                    <a onClick={handleNavigateToSignUp}>Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
