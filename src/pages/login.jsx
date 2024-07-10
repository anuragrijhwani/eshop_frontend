import "./login.css";
import { useAuth } from "../store/auth.jsx";
import { useFormik } from "formik";
import { loginSchema } from "../validation/login-validation.jsx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Config } from "../constants/config.js";
export const Login = () => {
  const { storeToken } = useAuth();
  const Navigate = useNavigate();
  const handleSubmit1 = async (e) => {
    try {
      const Response = await fetch(`${Config.APIUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });
      const data = await Response.json();

      if (Response.ok && data.status==200) {
      
        //storing token in local storage
        storeToken(data.Token);
        console.log(data.Token);
        toast.success("Login Success");
        setTimeout(() => {
          Navigate("/");
        }, 1000);
        
        formik.resetForm();
      } else {
        toast.error(data?.message || "email or password is invalid");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit1,
  });

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="login-Form">
            <div className="center-div">
              <h1>Login</h1>
              </div>
              <form onSubmit={formik.handleSubmit}>
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
                  {formik.errors.email && formik.touched.email ? (
                    <p className="validation-error">{formik.errors.email}</p>
                  ) : null}
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
                <div className="center-div">
                  <button type="submit">Submit</button>
                  <br />
                  <Link className="signUp" to="/registration">
                    Click Here to Registration
                  </Link>
                </div>
                <br />
                <br />
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
