import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link , useNavigate } from "react-router-dom";
import useEcommerceContext from "../context/EcommerceContext";
import { userDetails } from "../pages/UserDetails";
export default function Header(){
  const [message , setMessage] = useState("")
  const {wishList, cartList} = useEcommerceContext()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      navigate(`/products/${message}`);
    }
  };

  function handleKeyChange(e){
    if(e.key === "Enter" && message.trim()){
      navigate(`/products/${message}`)
    }
  }
  return(
 <header>
  <nav className="navbar sticky-top navbar-expand-lg " style={{"background": "#001d3d", "borderBottom": "3px solid #003566"}} >
    <div className="container">
      <NavLink className="navbar-brand text-light fs-3" to="/">Gadget<span style={{color: "#4cc9f0"}}>Hub</span></NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="d-flex flex-grow-1 mx-lg-4 my-lg-0">
          <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2 border-0 shadow-none" style={{backgroundColor: "#e9ecef"}} type="search" placeholder="Search devices..." aria-label="Search" onChange={(event) => setMessage(event.target.value)} onKeyDown={handleKeyChange}/>
            <Link className="btn btn-info text-white" to={message.trim() ? `/products/${message}`: "#"} type="submit"> <i className="bi bi-search"></i></Link>
          </form>
        </div>
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <NavLink className="nav-link link-light" to="/wishlist"><span className="fs-5 bi bi-heart position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-warning fs-5">{wishList.length}</span>
            </span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link link-light" to="/cart"><span className="fs-5 bi bi-cart position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-warning fs-5">{cartList.length}</span>
            </span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user" className="nav-link link-light"><img className="img-fluid rounded-circle border border-info" src={`${userDetails.imageUrl}?crop=faces&fit=crop&h=30&w=30`} alt="user-image" /></NavLink>
          </li>
        </ul> 
      </div>
    </div>
  </nav>
</header>
  )
}