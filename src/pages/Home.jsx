import { useEffect, useState } from "react";
import "./shop.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Config } from "../constants/config";

export const Home = () => {
  const [shop, setShop] = useState([]);
  const { authorizationToken ,isLoggedIn } = useAuth();

  const getShop = async () => {
    try {
      const response = await fetch(Config.APIUrl + "/shop/all", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setShop(data.data);
      }
    } catch (error) {
      console.log("error from frontend product side", error);
    }
  };

  useEffect(() => {
    if(!isLoggedIn){
      navigate('/login')
    }
    getShop();
  }, []);

  const navigate = useNavigate();
  const sendData = (shopData) => {
    navigate("/shopDetail", { state: { shopData } });
  };

  const onShopEdit = (shopData) => {
    navigate("/addShop", { state: { shopData } });
  };

  return (
    <>
      <section className="section-productData">
        <div className="container">
          <h1 className="main-heading">All Shops</h1>
        </div>

        <div className="container grid grid-three-cols">
          {shop?.map((currentElem, index) => {
            const { _id, shopName, address, shopImage } = currentElem;


            return (
              <div className="card" key={index}>
                <div className="card-images">
                  <img
                    src={Config.shopImageURL + shopImage}
                    alt="product-image"
                    width="250px"
                    height="250px"
                  />
                </div>
                <div className="card-details">
                  <p className="title">
                    <b>Shop Name</b>: {shopName}
                  </p>
                  <p className="desc">
                    <b>Address</b>: {address}
                  </p>
                  <button
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      sendData(currentElem);
                    }}
                  >
                    View Products({currentElem?.products?.length || "0"})
                  </button>
                  <button
                    onClick={() => {
                      onShopEdit(currentElem);
                    }}
                  >
                    Edit Shop
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
