import { Formik } from "formik";
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    // useTheme,
    MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";

import * as yup from "yup";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phone: yup.number().required("Required"),
    password: yup.string().required("Required"),
    role: yup.string().required("Required"),
    address: yup.string().required("Required"),
    picturePath: yup.string(),
});

const loginSchema = yup.object().shape({
    phone: yup.number().required("Required"),
    password: yup.string().required("Required"),
});

const initialRegisterValues = {
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    role: "",
    address: "",
    picturePath: "",
};

const initialLoginValues = {
    phone: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isDesktop = useMediaQuery("(min-width:600px)");

    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialLoginValues : initialRegisterValues}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        sx={{
                            "& > div": {
                                gridColumn: isDesktop ? undefined : "span 4",
                            },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={
                                        Boolean(touched.firstName) &&
                                        Boolean(errors.firstName)
                                    }
                                    helperText={
                                        touched.firstName && errors.firstName
                                    }
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={
                                        Boolean(touched.lastName) &&
                                        Boolean(errors.lastName)
                                    }
                                    helperText={
                                        touched.lastName && errors.lastName
                                    }
                                />
                                <TextField
                                    label="Role"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.role}
                                    name="role"
                                    error={
                                        Boolean(touched.role) &&
                                        Boolean(errors.role)
                                    }
                                    helperText={touched.role && errors.role}
                                    select
                                >
                                    <MenuItem value="farmer">Farmer</MenuItem>
                                    <MenuItem value="middleman">
                                        Middle Man
                                    </MenuItem>
                                </TextField>
                                <TextField
                                    label="Address"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.address}
                                    name="address"
                                    error={
                                        Boolean(touched.address) &&
                                        Boolean(errors.address)
                                    }
                                    helperText={
                                        touched.address && errors.address
                                    }
                                    select
                                />
                            </>
                        )}

                        <TextField
                            label="Phone Number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phone}
                            name="phone"
                            error={
                                Boolean(touched.phone) && Boolean(errors.phone)
                            }
                            helperText={touched.phone && errors.phone}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={
                                Boolean(touched.password) &&
                                Boolean(errors.password)
                            }
                            helperText={touched.password && errors.password}
                        />
                    </Box>

                    <Box>
                        <Button
                            fullwidth="true"
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                // backgroundColor={primary}
                                color: "primary",
                                "&:hover": { color: "secondary" },
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            mb={"1rem"}
                            onClick={() => navigate("/forgot")}
                            sx={{
                                textDecoration: "underline",
                                "&:hover": {
                                    cursor: "pointer",
                                    color: "primary",
                                },
                            }}
                        >
                            {isLogin && <>Forgot password</>}
                        </Typography>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                "&:hover": {
                                    cursor: "pointer",
                                    color: "primary",
                                },
                            }}
                        >
                            {isLogin
                                ? "Haven't registered? Sign Up here"
                                : "Already registered? Login"}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
