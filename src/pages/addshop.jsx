import "./addShop.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useFormik } from "formik";
import { addShopSchema } from "../validation/addShop-validation.jsx";
import { useAuth } from "../store/auth.jsx";
import { toast } from "react-toastify";
import { Config } from "../constants/config.js";

export const AddShop = () => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const location = useLocation();
  const shopData = location?.state?.shopData || null;
  const { authorizationToken, user } = useAuth();

  const handleSubmit1 = async (values, actions) => {
    const formData = new FormData();
    formData.append("shopName", values.shopName);
    formData.append("address", values.address);

    if (shopData?._id) {
      formData.append("shopId", shopData._id);
    } else {
      formData.append("createdBy", user._id);
    }

    for (let i = 0; i < values.shopImagesFile.length; i++) {
      formData.append("shopImage", values.shopImagesFile[i]);
    }

    try {
      const response = await fetch(
        shopData?._id
          ? `${Config.APIUrl}/shop/update`
          : `${Config.APIUrl}/shop/create`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        actions.resetForm();
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      shopName: shopData?.shopName || "",
      address: shopData?.address || "",
      shopImagesFile: [],
    },
    validationSchema: addShopSchema,
    onSubmit: handleSubmit1,
  });

  return (
    <div className="section-addShop">
      <div className="addShop-form">
      <div className="center-div">
        <h1>{shopData?._id ? "Edit" : "Add"} Shop</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="shopName">Shop Name</label>
            <input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              id="shopName"
              autoComplete="off"
              value={formik.values.shopName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.shopName && formik.touched.shopName ? (
              <p className="validation-error">{formik.errors.shopName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              id="address"
              autoComplete="off"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.address && formik.touched.address ? (
              <p className="validation-error">{formik.errors.address}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="shopImagesFile" aria-readonly={true}>
              Shop Images{" "}
              {formik.values.shopImagesFile.length > 0
                ? ` ${formik.values.shopImagesFile.length} files Selected`
                : !!shopData?.shopImage
                ? "1 Image Uploaded"
                : ""}
            </label>
            <button
              className="shopImg"
              type="button"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Select files
            </button>
            <input
              ref={fileRef}
              type="file"
              name="shopImagesFile"
              id="shopImagesFile"
              multiple
              style={{ display: "none" }}
              onChange={(event) => {
                formik.setFieldValue(
                  "shopImagesFile",
                  Array.from(event.target.files)
                );
              }}
            />
          </div>

          <br />
          <div className="center-div">
            <button type="submit">{shopData?._id ? "Update" : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
