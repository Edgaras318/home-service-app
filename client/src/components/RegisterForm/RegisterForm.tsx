import React from "react";
import { Formik, Form, Field, FormikHelpers } from 'formik';
import InputField from "@/components/common/InputField/InputField";
import Button from "@/components/common/Button/Button";
import styles from "./RegisterForm.module.scss";
import { registerValidationSchema, registerInitialValues } from '@/schemas/authValidationSchemas';
import { errorMessages } from '@/consts/errorMessages';
import {ErrorResponseData, FormDataRegister} from '@/types';
import { useAuth } from '@/hooks/useAuth';
import {AxiosError} from "axios";  // Import the useAuth hook

const RegisterForm: React.FC = () => {
    const { mutate, isPending } = useAuth({ mode: 'register' });  // Use the hook in register mode

    const handleSubmit = (values: FormDataRegister, formikHelpers: FormikHelpers<FormDataRegister>) => {
        if (values.password !== values.confirmPassword) {
            formikHelpers.setErrors({ confirmPassword: errorMessages.authentication.passwordMismatch });
            formikHelpers.setSubmitting(false);
            return;
        }

        mutate(values, {
            onSettled: () => {
                formikHelpers.setSubmitting(false);
            },
            onError: (error) => {
                const axiosError = error as AxiosError; // Assert the error type to AxiosError
                const errorResponse = axiosError.response?.data as ErrorResponseData;

                formikHelpers.setErrors({
                    email: '',
                    password: '',
                    confirmPassword: errorResponse?.message || errorMessages.authentication.defaultError,
                });
            },
        });
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
                            <Button type="submit" disabled={isSubmitting || isPending} fullWidth>
                                {isSubmitting || isPending ? "Registering..." : "Register"}
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
