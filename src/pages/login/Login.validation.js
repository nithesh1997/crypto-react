
import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LoginValidationSchema = () => {
    return (
        yup.object().shape({
            email: yup.string().email("Invalid email format").required("Email is required")
                .matches(
                    emailRegex,
                    "Email Address invalid",
                ),
            password: yup.string().required("Password is required"),
        })
    )
}



export default LoginValidationSchema