import { useEffect, useState } from "react";
import Header from "../components/Header";
import useEcommerceContext from "../context/EcommerceContext";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import StarCounter from "../components/StarCounter";

export default function Wishlist() {
  const {
    wishList,
    updateCartList,
    toggleWishlist,
    isInWishlist,
    cartList,
    increaseQuantity,
    decreaseQuantity,
  } = useEcommerceContext();
  const { data, loading, error } = useFetch(
    "https://backend-ecommerce-opal-xi.vercel.app/products",
  );
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (data && data.data.products.length > 0) {
      const wishlistData = data.data.products.filter((product) =>
        wishList.includes(product._id),
      );
      setProduct(wishlistData);
    }
  }, [data, wishList]);

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
    product.length > 0
      ? product.map((product) => {
          const storeInWishlist = isInWishlist(product._id);
          const quantityDetails = productQuantity(product._id);
          return (
        <div key={product._id} className="col-sm-6 col-md-6 col-lg-3 mb-4">
  <div className="card my-3 shadow-sm border-0 h-100 position-relative transition-hover" 
       style={{ borderRadius: "12px", overflow: "hidden" }}>
    <Link to={`/productsDetails/${product._id}`} className="text-decoration-none">
      <div className="d-flex align-items-center justify-content-center" 
           style={{ backgroundColor: "#f8f9fa", height: "15rem", overflow: "hidden", position: 'relative' }}>
        <img 
          src={`${product.images[0]}`}  
          style={{ 
            maxHeight: "85%", 
            maxWidth: "85%", 
            objectFit: "contain",
            transition: "transform 0.3s ease" 
          }} 
          className="img-fluid" 
          alt={product.title}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
    </Link>

    <div className="position-absolute" style={{ top: "10px", right: "10px", zIndex: "10" }}>
      <button 
        className="btn btn-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" 
        style={{ 
            width: "35px", 
            height: "35px", 
            border: "none", 
            backgroundColor: "white",
            transition: "none"
        }}
        onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product._id);
        }}
      >
        <i className={`${storeInWishlist ? "bi bi-heart-fill text-danger" : "bi bi-heart text-muted"}`}></i>
      </button>
    </div>

    <div className="card-body d-flex flex-column p-3">
      <Link to={`/productsDetails/${product._id}`} className="text-decoration-none">
        <h6 className="card-title text-dark fw-bold mb-2" 
            style={{ height: "2.5rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>
          {product.title}
        </h6>
        
        <div className="mb-2" style={{ color: "#0099ff" }}>
          <span className="card-text fs-3 fw-bold">₹{product.price.toLocaleString()}</span>
          <div className="card-text d-flex align-items-center mt-1">
            <span className="me-2"><StarCounter rating={product.rating}/></span>
            <span className="text-muted small">({product.rating})</span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="mt-auto">
        {quantityDetails.quantity > 0 ? (
          <div className="d-flex align-items-center justify-content-between bg-primary rounded shadow-sm px-1">
            <button className="btn text-white fw-bold" onClick={() => increaseQuantity(product._id)}>+</button>
            <span className="text-white fw-bold">{quantityDetails.quantity}</span>
            <button className="btn text-white fw-bold" onClick={() => decreaseQuantity(product._id)}>-</button>
          </div>
        ) : (
          <button className="btn btn-primary w-100 fw-medium d-flex align-items-center justify-content-center gap-2" 
                  onClick={() => updateCartList(product._id, product.title)}>
            <i className="bi bi-cart-plus"></i>
            <span>Add to cart</span>
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
      <Header />
      <main className="container">
        <h1 className="text-center mt-4"> My Wishlist</h1>
        <div className="row">
          {loading && <p className="display-5 my-3">Loading...</p>}
          {productCards}
        </div>
        {wishList.length === 0 && !loading && !error &&(
  <div className="col-12 text-center py-5 my-5">
    <div className="mb-4">
      {/* A large, soft-colored icon looks professional */}
      <i className="bi bi-heartbreak text-muted opacity-25" style={{ fontSize: "5rem" }}></i>
    </div>
    <h2 className="fw-bold text-dark">Your wishlist is empty</h2>
    <p className="text-muted mb-4">
      Save your favorite gadgets here to keep an eye on price drops and availability.
    </p>
    <Link to="/products/laptops" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm">
      Explore Products
    </Link>
  </div>
)}
      </main>
    </>
  );
}
