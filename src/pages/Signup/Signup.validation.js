
import * as yup from "yup";



const customerNameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{5,}$/;

const ValidationSchema = () => {
    return (
        yup.object().shape({
            fname: yup.string().required("First Name is a mandatory field")
                .matches(
                    customerNameRegex,
                    "First Name Should be Only Alpha-Numeric",
                ),
            lname: yup.string().required("Last Name is a mandatory field")
                .matches(
                    customerNameRegex,
                    "Second Name Should be Only Alpha-Numeric",
                ),
            email: yup.string().email("Invalid email format").required("Email is a mandatory field")
                .matches(
                    emailRegex,
                    "Email Address invalid",
                ),
            password: yup.string().required("Password is a mandatory field")
                .matches(
                    passwordRegex,
                    "Password Must Includes (e.g., Nithesh@123)",
                ),
            reenterPassword: yup.string()
                .oneOf([yup.ref('password'), null], "Password and Confirm Password must be the same")
                .required("Re-enter Password is a mandatory field")
                .matches(
                    passwordRegex,
                    "Re-Password Must Includes (e.g., Nn6!@#$%^&*)",
                ),
            agreeTerms: yup.boolean().oneOf([true], "You must agree to the terms and conditions")
        })
    )
};



export default ValidationSchema