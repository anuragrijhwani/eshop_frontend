import * as Yup from "yup";

export const addShopSchema = Yup.object({
    shopName: Yup.string().min(2).max(25).required("Please Enter Shop Name"),
  address: Yup.string().required("Please Enter Shop Address"),
});
