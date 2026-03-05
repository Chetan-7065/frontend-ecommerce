import { NavLink } from "react-router-dom";

export default function Footer(){
  return(
    <>
    <footer class="bg-dark text-light mt-5 pt-5 pb-3 ">
  <div class="container">
    <div class="row">
      <div class="col-md-4 mb-4">
        <NavLink className="navbar-brand text-light fs-3" to="/">Gadget<span style={{color: "#4cc9f0"}}>Hub</span></NavLink>
        <p class="text-secondary">Your one-stop destination for the latest tech and premium electronics.</p>
      </div>

      <div class="col-md-4 mb-4">
        <h5 class="text-uppercase mb-3">Shop</h5>
        <ul class="list-unstyled">
          <li><a href="/products/laptops" class="text-secondary text-decoration-none">Laptops</a></li>
          <li><a href="/products/Smartphones" class="text-secondary text-decoration-none">Smartphones</a></li>
          <li><a href="/products/SmartHome" class="text-secondary text-decoration-none">Accessories</a></li>
        </ul>
      </div>

      <div class="col-md-4 mb-4">
        <h5 class="text-uppercase mb-3">Support</h5>
        <ul class="list-unstyled">
          <li><a href="#" class="text-secondary text-decoration-none">Privacy Policy</a></li>
          <li><a href="#" class="text-secondary text-decoration-none">Terms of Service</a></li>
          <li><a href="#" class="text-secondary text-decoration-none">Contact Us</a></li>
        </ul>
      </div>
    </div>

    <hr class="bg-secondary"/>

    <div class="row">
      <div class="col text-center">
        <p class="mb-0 fs-6">&copy; 2026 GadgetHub. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>
{/* <div class="d-flex flex-column min-vh-100">

  <main class="flex-grow-1">
    <div class="container mt-5">
      <h1>GadgetHub Store</h1>
      <p>Your premium electronics content goes here.</p>
    </div>
  </main>

  <footer class="container-fluid bg-dark mt-auto py-3">
    <div class="container">
      <p class="text-light fs-5 mb-0 text-center">&copy; GadgetHub 2026</p>
    </div>
  </footer>

</div> */}
    </>
  )
}