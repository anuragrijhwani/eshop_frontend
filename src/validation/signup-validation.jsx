import * as Yup from "yup";

export const signUpSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please Enter User Name"),
  email: Yup.string().email().required("Please Enter Email"),
  password: Yup.string().min(6).max(25).required("please Enter Password"),
  confirm_password: Yup.string()
    .required("Please Enter confirm Password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
