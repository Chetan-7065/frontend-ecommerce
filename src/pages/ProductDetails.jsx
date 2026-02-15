import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import StarCounter from "../components/StarCounter";
import useEcommerceContext from "../context/EcommerceContext";
import { useToastLoader } from "../components/useToastLoader";

export default function ProductDetails() {
  const { updateCartList, cartList, increaseQuantity, decreaseQuantity } =
    useEcommerceContext();
  const productId = useParams();
  const apiUrl = "https://backend-ecommerce-opal-xi.vercel.app/products";
  const { data, loading, error } = useFetch(apiUrl);
  const [product, setProduct] = useState([]);
  const [productImage, setProductImage] = useState("");
   const { hasFetched } = useToastLoader(loading, error, data, {
      loading: "loading products details...",
      error: "Failed to load products details"
    } )
  useEffect(() => {
    if (data && data.data.products.length > 0) {
      const products = data.data.products.find(
        (product) => product._id === productId.productId,
      );
      setProduct(products);
      setProductImage(products.images[0]);
    }
  }, [data, productId.productId]);

  function productQuantity(productId) {
    const existingProduct = cartList.find(
      (product) => product.id === productId,
    );
    if (existingProduct) {
      return { quantity: existingProduct.quantity };
    } else {
      return { quantity: 0 };
    }
  }
  const quantityDetails = productQuantity(productId.productId);

  return (
    <>
      <Header />
      <main>
         
        {error &&<p className="fs-3 text-dark my-4"> Error while fetching the data</p>}
        {Object.keys(product).length > 0 && (
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-5">
                <div className="sticky-top" style={{ top: "20px" }}>
                  <div className="border rounded p-3 mb-3">
                    <img
                      src={productImage}
                      className="img-fluid"
                      alt={product.title}
                       onMouseOver={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(0.90)'}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    {Object.keys(product).length > 0 &&
                      product.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          className="img-thumbnail"
                          onClick={() => setProductImage(img)}
                          style={{
                            width: "60px",
                            height: "60px",
                            cursor: "pointer",
                          }}
                          alt="thumbnail"
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(0.90)'}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-md-7 ps-md-5">
                <h5 className="text-primary mb-0">{product.brand} Store</h5>
                <h2 className="fw-normal border-bottom pb-2">
                  {product.title}
                </h2>

                <div className="d-flex align-items-center mb-2">
                  <span className="text-warning me-2 fw-bold">
                    {product.rating}
                  </span>
                  <span>
                    <StarCounter rating={product.rating} />
                  </span>
                  <span className="text-info small border-start ms-1 ps-2">
                    {" "}
                    1,240 ratings
                  </span>
                </div>

                <hr />

                <div className="price-section">
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-danger fs-3">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100,
                      )}
                      %
                    </span>
                    <h2 className="fw-bold mb-0">
                      ₹{product.price.toLocaleString()}
                    </h2>
                  </div>
                  <p className="text-muted small mb-1">
                    M.R.P.:{" "}
                    <span className="text-decoration-line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </p>
                  <span className="badge bg-light text-dark border">
                    Inclusive of all taxes
                  </span>
                </div>

                <hr />
                <div className="specs-table mt-4">
                  <h5 className="fw-bold">Product Details</h5>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th className="ps-0 text-muted w-25">Brand</th>
                        <td>{product.brand}</td>
                      </tr>
                      <tr>
                        <th className="ps-0 text-muted">Category</th>
                        <td>{product.category.title}</td>
                      </tr>
                      <tr>
                        <th className="ps-0 text-muted">Model Name</th>
                        <td>{product.title}</td>
                      </tr>
                      <tr>
                        <th className="ps-0 text-muted">Availability</th>
                        <td
                          className={
                            product.inStock
                              ? "text-success fw-bold"
                              : "text-danger"
                          }
                        >
                          {product.inStock
                            ? "In Stock"
                            : "Currently Unavailable"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr />

                <div className="about-item">
                  <h5 className="fw-bold">About this item</h5>
                  <ul className="ps-3 mt-3">
                    <li className="mb-2">{product.category.description}</li>
                    <li className="mb-2">
                      Experience the latest technology with the {product.brand}{" "}
                      {product.title}.
                    </li>
                    <li className="mb-2">
                      Advanced camera system with professional-grade sensors.
                    </li>
                    <li className="mb-2">
                      Long-lasting battery life and fast-charging support.
                    </li>
                    {/* <li className="mb-2">Original listing created on {new Date(product.createdAt).toLocaleDateString()}.</li> */}
                  </ul>
                </div>

                <div className="card mt-4 border-2 shadow-sm">
                  <div className="card-body">
                    <h4 className="text-success mb-3">
                      ₹{product.price.toLocaleString()}
                    </h4>
                    <p className="small">
                      FREE delivery <strong>Tomorrow</strong>. Order within{" "}
                      <span className="text-success">10 hrs 20 mins</span>.
                    </p>
                    <div className="d-grid gap-2">
                      {quantityDetails.quantity > 0 ? (
                        <div className="d-flex  align-item-center justify-content-around bg-warning  rounded border ">
                          <span
                            className="btn text-dark"
                            onClick={() => increaseQuantity(product._id)}
                          >
                            +
                          </span>
                          <span className="card-text text-dark my-auto">
                            {quantityDetails.quantity}
                          </span>
                          <span
                            className="btn text-dark"
                            onClick={() => decreaseQuantity(product._id)}
                          >
                            -
                          </span>
                        </div>
                      ) : (
                        <button
                          className="btn btn-warning rounded-pill py-2 fw-bold mt-auto"
                          onClick={() =>
                            updateCartList(product._id, product.title)
                          }
                        >
                          <span>Add to cart</span>
                        </button>
                      )}
                      {/* <button className="btn btn-warning rounded-pill py-2 fw-bold">Add to Cart</button> */}
                      <button
                        className="btn btn-orange rounded-pill py-2 fw-bold"
                        style={{ backgroundColor: "#ffa41c" }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
