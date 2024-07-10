import * as Yup from "yup";

export const addProductSchema = Yup.object({
  productName: Yup.string().required("Please Enter Product Name"),
  productPrice: Yup.string().required("Please Enter Product Price"),
});
