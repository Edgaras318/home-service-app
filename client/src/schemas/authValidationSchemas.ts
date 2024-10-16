import * as Yup from "yup";
import {FormDataRegister, LoginPayload, RegisterPayload} from "@/types";

export const loginValidationSchema: Yup.Schema<LoginPayload> = Yup.object({
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string().required(),
});

export const registerValidationSchema: Yup.Schema<FormDataRegister> = Yup.object({
    name: Yup.string().min(3).required(),
    age: Yup.number()
        .required()
        .positive()
        .integer(),
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .min(8)
        .required(),
    confirmPassword: Yup.string()
        .min(8)
        .required()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const loginInitialValues: LoginPayload = {
    email: "",
    password: "",
};
export const registerInitialValues: FormDataRegister = {
    name: "",
    email: "",
    age: 0,
    password: "",
    confirmPassword: "",
};
