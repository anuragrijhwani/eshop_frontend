import "./shop.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Config } from "../constants/config";

export const ShopDetail = () => {
  const { authorizationToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const shopData = location?.state?.shopData;

  const onCreateProduct = () => {
    navigate("/addProduct", { state: { shopId: shopData._id } });
  };

  const onProductEdit = (productData) => {
    navigate("/addProduct", { state: { shopId: shopData._id, productData } });
  };

  return (
    <>
      <section className="section-productData">
        <div className="container">
          <h1 className="main-heading">Shop Details</h1>
          <div className="addProductButton">
            <button onClick={onCreateProduct}>Add Product</button>
          </div>
        </div>

        <div className="container grid grid-three-cols">
          {shopData?.products?.map((currentElem, index) => {
            const { _id, productName, productPrice, productImage } =
              currentElem;

            return (
              <div
                className="card"
                key={index}
                onClick={() => {
                  sendData(_id);
                }}
              >
                <div className="card-images">
                  <img
                    src={Config.productImageURL + productImage}
                    alt="product-image"
                    width="200px"
                    height="200px"
                  />
                </div>
                <div className="card-details">
                  <p className="title">
                    <b>Product Name</b>: {productName}
                  </p>
                  <p className="desc">
                    <b>Price</b>: {productPrice}
                  </p>
                  <button
                    onClick={() => {
                      onProductEdit(currentElem);
                    }}
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
