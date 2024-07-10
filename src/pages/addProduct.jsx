import "./addShop.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useFormik } from "formik";
import { useAuth } from "../store/auth.jsx";
import { addProductSchema } from "../validation/addProduct-validation.jsx";
import { toast } from "react-toastify";
import { Config } from "../constants/config.js";

export const AddProduct = () => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const { authorizationToken, user } = useAuth();
  const location = useLocation();
  const shopId = location?.state?.shopId;
  const productData = location?.state?.productData || null;

  const handleSubmit1 = async (values, actions) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("productPrice", values.productPrice);

    if (!!productData?._id) {
      formData.append("productId", productData?._id);
    } else {
      formData.append("createdBy", user._id);
      formData.append("shopId", shopId);
    }

    for (let i = 0; i < values.productImage.length; i++) {
      formData.append("productImage", values.productImage[i]);
    }

    try {
      const response = await fetch(
        productData?._id
          ? `${Config.APIUrl}/product/update`
          : `${Config.APIUrl}/product/create`,
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
      productName: productData?.productName || "",
      productPrice: productData?.productPrice || "",
      productImage: [],
    },
    validationSchema: addProductSchema,
    onSubmit: handleSubmit1,
  });

  return (
    <div className="section-addShop">
      <div className="addShop-form">
        <div className="center-div">
          <h1>{productData?._id ? "Edit" : "Add"} Product</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="product Name"
              id="productName"
              autoComplete="off"
              value={formik.values.productName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.productName && formik.touched.productName ? (
              <p className="validation-error">{formik.errors.productName}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="productPrice">Product Price</label>
            <input
              type="text"
              name="productPrice"
              placeholder="product Price"
              id="productPrice"
              autoComplete="off"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.productPrice && formik.touched.productPrice ? (
              <p className="validation-error">{formik.errors.productPrice}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="productImage" aria-readonly={true}>
              Product Images{" "}
              {formik.values.productImage.length > 0
                ? ` ${formik.values.productImage.length} files Selected`
                : !!productData?.productImage
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
              name="productImage"
              id="productImage"
              multiple
              style={{ display: "none" }}
              onChange={(event) => {
                formik.setFieldValue(
                  "productImage",
                  Array.from(event.target.files)
                );
              }}
            />
          </div>

          <br />
          <div className="center-div">
            <button type="submit">
              {productData?._id ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
