// RegisterForm.tsx
import React from "react";
import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/common/InputField/InputField";
import styles from "./RegisterForm.module.scss";
import Button from "@/components/common/Button/Button";
import { ApiService } from "@/services/api-services";
import { ErrorResponseData, FormDataRegister } from '@/types';
import { AxiosError } from "axios";
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { registerValidationSchema, registerInitialValues } from '@/schemas/authValidationSchemas';
import { errorMessages } from '@/consts/errorMessages'; // Import the error messages

const RegisterForm: React.FC = () => {
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleSubmit = async (values: FormDataRegister, { setSubmitting, setErrors }: FormikHelpers<FormDataRegister>) => {
        if (values.password !== values.confirmPassword) {
            setErrors({ confirmPassword: errorMessages.authentication.passwordMismatch });
            setSubmitting(false);
            return;
        }

        try {
            const userData = await ApiService.register(values.name, values.age, values.email, values.password);
            setUser(userData?.data);
            navigate("/");
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage = axiosError.response?.data as ErrorResponseData;

            setErrors({ confirmPassword: errorMessage?.message || errorMessages.authentication.defaultError });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h1>Register</h1>
                <Formik
                    initialValues={registerInitialValues}
                    validationSchema={registerValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <Field
                                name="name"
                                type="text"
                                placeholder="Type your name"
                                as={InputField}
                                label="Name"
                                error={touched.name && errors.name}
                            />
                            <Field
                                name="age"
                                type="number"
                                placeholder="Type your age"
                                as={InputField}
                                label="Age"
                                error={touched.age && errors.age}
                            />
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
                            <Field
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                as={InputField}
                                label="Confirm Password"
                                error={touched.confirmPassword && errors.confirmPassword}
                            />
                            <Button type="submit" disabled={isSubmitting} fullWidth>
                                {isSubmitting ? "Registering..." : "Register"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <div className={styles.signUpLink}>
                    <p>Already have an account?</p>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
