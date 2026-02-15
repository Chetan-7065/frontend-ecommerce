import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import useEcommerceContext from "../context/EcommerceContext";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import StarCounter from "../components/StarCounter";
import { useToastLoader } from "../components/useToastLoader";

export default function Cart() {
  const {
    cartList,
    increaseQuantity,
    decreaseQuantity,
    toggleWishlist,
    isInWishlist,
    primaryAddress,
  } = useEcommerceContext();
  const [displayProduct, setDisplayProduct] = useState([]);
  const [message, setMessage] = useState("");
  const { data, loading, error } = useFetch(
    "https://backend-ecommerce-opal-xi.vercel.app/products",
  )
    const { hasFetched } = useToastLoader(loading, error, data, {
    loading: "Fetching your cart...",
    error: "Failed to load cart"
  } )
  
  useEffect(() => {
    if (data && data.data.products.length > 0 && cartList.length > 0) {
      const products = cartList.map((item) => {
        const existingProduct = data.data.products.find(
          (product) => product._id === item.id,
        );
        if (existingProduct) {
          return {
            ...existingProduct,
            quantity: item.quantity,
          };
        } else {
          return { ...item };
        }
        
      });
      setDisplayProduct(products);
    } else {
      setDisplayProduct([]);
    }

    
  }, [data, cartList, loading, error]);

  const productCards =
    displayProduct.length > 0
      ? displayProduct.map((product) => {
          const storeInWishlist = isInWishlist(product._id)
          return (
            <div key={product._id} className="col-sm-6 col-md-6 col-lg-3 mb-4">
              <div
                className="card h-100 shadow-sm border-0 position-relative transition-hover"
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <Link
                  to={`/productsDetails/${product._id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#f8f9fa",
                      height: "15rem",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={`${product.images[0]}`}
                      style={{
                        maxHeight: "85%",
                        maxWidth: "85%",
                        objectFit: "contain",
                        transition: "transform 0.3s ease",
                      }}
                      className="img-fluid"
                      alt={product.title}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>
                </Link>
                <div
                  className="position-absolute"
                  style={{ top: "10px", right: "10px", zIndex: "10" }}
                >
                  <button
                    className="btn btn-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                    style={{
                      width: "35px",
                      height: "35px",
                      border: "none",
                      backgroundColor: "white",
                      transition: "none", 
                    }}
                    onClick={(e) => {
                      e.preventDefault(); 
                      toggleWishlist(product._id);
                    }}
                  >
                    <i
                      className={`${storeInWishlist ? "bi bi-heart-fill text-danger" : "bi bi-heart text-muted"}`}
                    ></i>
                  </button>
                </div>

                <div className="card-body d-flex flex-column p-3">
                  <Link to={`/productsDetails/${product._id}`}>
                    <h6
                      className="card-title text-dark fw-bold mb-2"
                      style={{
                        height: "2.5rem",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.title}
                    </h6>

                    <div className="mb-3">
                      <div style={{ color: "#0099ff" }}>
                        <span className="card-text fs-4 fw-bold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-text d-flex align-items-center mt-1">
                        <span className="me-2">
                          <StarCounter rating={product.rating} />
                        </span>
                        <span className="text-muted small">
                          ({product.rating})
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-auto">
                    <div className="d-flex align-items-center justify-content-around bg-primary rounded shadow-sm border-0 py-1">
                      <span
                        className="btn text-white fw-bold px-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => increaseQuantity(product._id)}
                      >
                        +
                      </span>
                      <span className="card-text text-white fw-bold my-auto">
                        {product.quantity}
                      </span>
                      <span
                        className="btn text-white fw-bold px-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => decreaseQuantity(product._id)}
                      >
                        -
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      : [];

  const cartDetails = displayProduct.reduce((acc, curr) => {
    acc.totalItems = (acc.totalItems || 0) + curr.quantity;
    acc.totalOriginalPrice =
      (acc.totalOriginalPrice || 0) + curr.quantity * curr.originalPrice;
    acc.totalPrice = (acc.totalPrice || 0) + curr.quantity * curr.price;
    acc.totalSavings = acc.totalOriginalPrice - acc.totalPrice;
    acc.totalDiscount = parseInt(
      (acc.totalSavings / acc.totalOriginalPrice) * 100,
    );
    return acc;
  }, {});

  const ordersList = displayProduct.reduce((acc, curr) => {
    const totalProductPrice = curr.quantity * curr.price;
    acc.product = "69274ebbe1a3d21e6b477606";
    acc.totalPrice = totalProductPrice;
    acc.quantity = curr.quantity;
    acc.shippingAddress = primaryAddress;
    acc.paymentDetails = {
      paymentMethod: "Card",
      status: "Completed",
    };
    acc.orderStatus = "Processing";
    acc.premiumMember = true;
    return acc;
  }, {});

  async function handleCheckoutBtn() {
    try {
      const response = await fetch(
        "https://backend-ecommerce-opal-xi.vercel.app/orders",
        {
          method: "Post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(ordersList),
        },
      );

      if (!response.ok) {
        throw new error("Failed to add order");
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }

    setMessage("Order placed successfully");
  }

  return (
    <>
      <Header />
      <main className="container-fluid px-md-5">
        <h1 className="text-center mt-4 fw-bold">My Cart</h1>
        <div className="row mt-4 g-4">
          <div className="col-lg-9">
            <div className="row g-3">
              {!loading && cartList.length === 0 && hasFetched &&(
                <div className="text-center p-5 mx-5 ">
                  <i className="bi bi-cart-x display-1 text-muted"></i>
                  <p className="fs-2 mt-3 ">No items in your cart</p>
                </div>
              )}
              {productCards}
            </div>
          </div>
          <div className="col-lg-3">
            {displayProduct.length > 0 && (
              <div
                className="card position-sticky shadow-sm border-0"
                style={{
                  top: "2rem",
                  borderRadius: "15px",
                  zIndex: 10,
                }}
              >
                <div className="card-body p-4">
                  <h5 className="card-title fw-bold mb-4">Order Summary</h5>

                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="ps-0 text-muted fw-normal">
                          Total Price
                        </th>
                        <td className="text-end fw-bold">
                          ₹{cartDetails.totalOriginalPrice}
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0 text-muted fw-normal">Discount</th>
                        <td className="text-end">
                          <span className="text-danger">
                            -{cartDetails.totalDiscount}%
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0 text-muted fw-normal">Delivery</th>
                        <td className="text-end text-success fw-bold">
                          {cartDetails.totalItems > 0
                            ? `₹${cartDetails.totalItems * 100}`
                            : "Free"}
                        </td>
                      </tr>
                      <tr className="border-top">
                        <th className="ps-0 pt-3 fw-bold fs-5">Total Amount</th>
                        <td className="text-end pt-3 fw-bold fs-5 text-primary">
                          ₹
                          {(
                            cartDetails.totalPrice +
                            cartDetails.totalItems * 100
                          ).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <hr className="my-4" />

                  <div className="mb-4">
                    <label className="form-label text-muted small text-uppercase fw-bold">
                      Shipping Address
                    </label>
                    <div className="d-flex align-items-start border rounded p-2 bg-light">
                      <i className="bi bi-geo-alt mt-1 me-2 text-primary"></i>
                      <div className="small text-secondary">
                        <strong className="text-dark">
                          {primaryAddress.addressType}
                        </strong>
                        <p className="mb-0">
                          {primaryAddress.houseNo} {primaryAddress.buildingName}
                          , {primaryAddress.street}, {primaryAddress.city} -{" "}
                          {primaryAddress.postalCode}
                        </p>
                      </div>
                    </div>
                    <Link
                      className="btn btn-link btn-sm p-0 mt-1 text-decoration-none"
                      to="/user"
                    >
                      Change Address
                    </Link>
                  </div>

                  <button
                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm rounded-3"
                    onClick={handleCheckoutBtn}
                  >
                    Proceed to Checkout
                  </button>

                  <div className="text-center text-muted small mt-3">
                    <i className="bi bi-shield-check text-success me-1"></i>
                    Secure Checkout
                  </div>
                </div>
              </div>
            )}
            <div className="text-success text-center mt-2 fw-bold">
              {message}
            </div>
            {error && (
              <p className="text-danger text-center mt-2 font-monospace">
                Error loading cart.
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
