import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import useEcommerceContext from "../context/EcommerceContext";
import StarCounter from "../components/StarCounter";

function ProductsCard({ displayProduct, loading, error }) {
  const {
    toggleWishlist,
    isInWishlist,
    updateCartList,
    cartList,
    increaseQuantity,
    decreaseQuantity,
  } = useEcommerceContext();

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

  const productCards =
    displayProduct.length > 0
      ? displayProduct.map((product) => {
          const storeInWishlist = isInWishlist(product._id);
          const quantityDetails = productQuantity(product._id);
          return (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div
                className="card h-100 border-0 shadow-sm transition-all hover-up"
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <span
                  className="position-absolute top-0 end-0 m-3 z-3"
                  onClick={() => toggleWishlist(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={`${storeInWishlist ? "bi bi-heart-fill text-danger" : "bi bi-heart text-muted"}`}
                    style={{ fontSize: "1.1rem" }}
                  ></i>
                </span>

                <Link
                  to={`/productsDetails/${product._id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="d-flex align-items-center justify-content-center p-3 bg-white"
                    style={{ height: "9rem" }}
                  >
                    <img
                      src={product.images[0]}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      className="img-fluid"
                      alt={product.title}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                </Link>

                <div className="card-body d-flex flex-column p-3 pt-0">
                  <Link
                    to={`/productsDetails/${product._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <h6
                      className="card-title mb-2 fw-bold"
                      style={{
                        fontSize: "0.95rem",
                        height: "2.6rem",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.3rem",
                      }}
                    >
                      {product.title}
                    </h6>

                    <div className="d-flex align-items-center mb-2">
                      <StarCounter rating={product.rating} />
                      <span className="ms-2 text-muted small">
                        {product.rating}
                      </span>
                    </div>

                    <div
                      className="fw-bold text-primary mb-3"
                      style={{ fontSize: "1.25rem" }}
                    >
                      ₹{product.price.toLocaleString()}
                    </div>
                  </Link>

                  <div className="mt-auto">
                    {quantityDetails.quantity > 0 ? (
                      <div className="d-flex align-items-center justify-content-between border border-primary rounded-pill p-1">
                        <button
                          className="btn btn-sm btn-primary rounded-circle px-2 py-0"
                          onClick={() => decreaseQuantity(product._id)}
                        >
                          -
                        </button>
                        <span className="fw-bold">
                          {quantityDetails.quantity}
                        </span>
                        <button
                          className="btn btn-sm btn-primary rounded-circle px-2 py-0"
                          onClick={() => increaseQuantity(product._id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-primary w-100 rounded-pill fw-bold shadow-sm"
                        style={{ padding: "8px 0", transition: "0.3s" }}
                        onClick={() =>
                          updateCartList(product._id, product.title)
                        }
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      : [];
  return (
    <>
      {loading && <p className="display-5 my-3">loading...</p>}
      {productCards.length === 0 && !loading ? (
        <p className="text-center display-5 my-3">No data found</p>
      ) : (
        productCards
      )}
      {error && alert(`${error}`)}
    </>
  );
}

export default function Products() {
  const apiUrl = "https://backend-ecommerce-opal-xi.vercel.app/products";
  const { data, loading, error } = useFetch(apiUrl);
  const [product, setProduct] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  const [isInsearchQuery, setIsInsearchQuery] = useState(false);

  useEffect(() => {
    if (data && data.data.products.length > 0) {
      setProduct(data.data.products);
    }
  }, [data]);

  const searchQuery = useParams();

  useEffect(() => {
    if (!product || product.length === 0 || !searchQuery?.searchQuery ) return
    const existingProduct = product.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.searchQuery.toLowerCase()),
  );
  if (existingProduct.length > 0) {
    setDisplayProduct(existingProduct);
    setIsInsearchQuery(false);
    } else if (
      !formData.category.includes(searchQuery.searchQuery.toLowerCase())
    ){
      setFormData((preValue) => ({
        ...preValue,
        category: [...preValue.category, searchQuery.searchQuery],
      }));
    }
  }, [searchQuery, product, formData.category]);

  const [formData, setFormData] = useState(() => {
    const initialCategory = searchQuery?.searchQuery
      ? [searchQuery.searchQuery.toLowerCase()]
      : [];
    return {
      category: initialCategory,
      rating: 0,
      price: "",
    };
  });

  function handleFilterData(event) {
    const { name, value, checked } = event.target;

    setFormData((preValue) => ({
      ...preValue,
      [name]:
        name === "category"
          ? checked
            ? [...preValue.category, value]
            : preValue.category.filter((category) => category !== value)
          : name === "rating"
            ? parseInt(value)
            : value,
    }));
  }

  function handleRatingClick(num) {
    setFormData((prev) => ({ ...prev, rating: num }));
  }

  useEffect(() => {
    if (product.length === 0 && isInsearchQuery) return;

    let result = [...product];

    if (formData.category.length > 0) {
      const filteredData = [];
      for (let i = 0; i < formData.category.length; i++) {
        const filterByCategory = result.filter((product) =>
          product.category.title
            .toLowerCase()
            .includes(formData.category[i].toLowerCase())
        );
        filteredData.push(...filterByCategory)
      }
      result = [...filteredData];
    }

    if (formData.rating > 0) {
      result = result.filter((product) => product.rating >= formData.rating);
      //  && product.rating < formData.rating + 1 )
    }

    if (formData.price) {
      if (formData.price === "low to high") {
        result = [...result].sort(
          (productA, productB) => productA.price - productB.price,
        );
      } else if (formData.price === "high to low") {
        result = [...result].sort(
          (productA, productB) => productB.price - productA.price,
        );
      }
    }

    setDisplayProduct(result);
  }, [formData, product, isInsearchQuery]);

  function resetFilters() {
    setFormData({
      category: [],
      rating: 0,
      price: "",
    });
  }

  return (
    <>
      <Header />
      <main className="container-fluid px-md-5">
      
        <div className="row g-4 my-2">
      
          <div className="col-lg-3 col-xl-2 mt-3">
            <div
              className="card border-0 shadow-sm p-3 sticky-top"
              style={{
                top: "20px",
                borderRadius: "15px",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0" style={{ color: "#1a202c" }}>
                  Filters
                </h4>
                <button
                  className="btn btn-link btn-sm text-decoration-none p-0"
                  onClick={resetFilters}
                >
                  Clear All
                </button>
              </div>

              <form>
                <div className="filter-group mb-4">
                  <label className="fw-bold small text-uppercase text-muted mb-3 d-block">
                    Categories
                  </label>
                  {[
                    "laptops",
                    "audio",
                    "gaming",
                    "wearables",
                    "smartHome",
                    "smartphones",
                  ].map((cat) => (
                    <div className="form-check mb-2" key={cat}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="category"
                        id={cat}
                        checked={formData.category.includes(cat)}
                        value={cat}
                        onChange={handleFilterData}
                      />
                      <label
                        className="form-check-label text-capitalize"
                        htmlFor={cat}
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>

                <hr className="text-muted opacity-25" />
                <div className="filter-group mb-4">
                  <label className="fw-bold small text-uppercase text-muted mb-3 d-block">
                    Minimum Rating
                  </label>
                  <input
                    className="form-range custom-range"
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    name="rating"
                    value={formData.rating}
                    onChange={handleFilterData}
                  />
                  <div className="d-flex justify-content-between px-1">
                    {[1, 2, 3, 4].map((num) => (
                      <div
                        key={num}
                        onClick={() => handleRatingClick(num)}
                        style={{ cursor: "pointer" }}
                        className={`small ${formData.rating === num ? "fw-bold text-primary" : "text-muted"}`}
                      >
                        {num}★
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="text-muted opacity-25" />

                <div className="filter-group mb-2">
                  <label className="fw-bold small text-uppercase text-muted mb-3 d-block">
                    Sort By Price
                  </label>
                  <div className="btn-group-vertical w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="price"
                      id="lowHigh"
                      value="low to high"
                      onChange={handleFilterData}
                    />
                    <label
                      className="btn btn-outline-light text-dark border text-start mb-2 rounded"
                      htmlFor="lowHigh"
                    >
                      <i className="bi bi-sort-numeric-down me-2"></i>Low to
                      High
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="price"
                      id="highLow"
                      value="high to low"
                      onChange={handleFilterData}
                    />
                    <label
                      className="btn btn-outline-light text-dark border text-start rounded"
                      htmlFor="highLow"
                    >
                      <i className="bi bi-sort-numeric-up me-2"></i>High to Low
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-9 col-xl-10">
            <div className="bg-white p-3 rounded-3 shadow-sm min-vh-100">
              <div className="row g-3">
                <ProductsCard
                  displayProduct={displayProduct}
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
