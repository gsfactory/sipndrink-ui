import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

module.exports = {
    loginValidationSchema
};