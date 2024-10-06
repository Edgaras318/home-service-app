import * as Yup from "yup";
import { LoginPayload, RegisterPayload } from "@/types";
import { authValidationErrorMessages } from "@/consts/authValidationErrorMessages";

// Password validation rules can be defined as a constant for reusability
const passwordValidation = Yup.string().required(authValidationErrorMessages.required);

export const loginValidationSchema: Yup.Schema<LoginPayload> = Yup.object({
    email: Yup.string()
        .email(authValidationErrorMessages.email)
        .required(authValidationErrorMessages.required),
    password: passwordValidation,
});

export const registerValidationSchema: Yup.Schema<RegisterPayload> = Yup.object({
    name: Yup.string().required(authValidationErrorMessages.required),
    age: Yup.number()
        .required(authValidationErrorMessages.required)
        .positive(authValidationErrorMessages.agePositive)
        .integer(authValidationErrorMessages.ageInteger),
    email: Yup.string()
        .email(authValidationErrorMessages.email)
        .required(authValidationErrorMessages.required),
    password: passwordValidation,
});
