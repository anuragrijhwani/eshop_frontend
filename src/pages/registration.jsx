import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useFormik } from "formik";
import { signUpSchema } from "../validation/signup-validation.jsx";
import { Config } from "../constants/config.js";
import { toast } from "react-toastify";

export const Registration = () => {
  const Navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleSubmit1 = async (e, action) => {
    const params = {
      username: e.username,
      email: e.email,
      phone: e.phone,
      password: e.password,
    };
    try {
      const response = await fetch(`${Config.APIUrl}/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      if (response.ok) {
        // storeToken(data.Token);
        // action.resetForm();
        toast.success("Registration Success");
        Navigate("/login");
      } else {
        formik.setFieldError("email", data.message, false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: handleSubmit1,
  });

  return (
    <div className="section-registration">
      <div className="registration-form">
        <div className="center-div">
          <h1>Registration</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              id="username"
              autoComplete="off"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username ? (
              <p className="validation-error">{formik.errors.username}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="validation-error">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              autoComplete="off"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="validation-error">{formik.errors.password}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              id="confirm_password"
              autoComplete="off"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.confirm_password &&
            formik.touched.confirm_password ? (
              <p className="validation-error">
                {formik.errors.confirm_password}
              </p>
            ) : null}
          </div>
          <br />
          <div className="center-div">
            <button type="submit">Submit</button>
            <br />
            <Link className="loginLink" to="/login">
              Click Here to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
