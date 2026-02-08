import useFetch from "../useFetch"
import heroImage from "../images/heroImage.png"
import iphone from "../images/iphone.png"
import { Link } from "react-router-dom";

function Product(){
     const productsUrl =  "https://backend-ecommerce-opal-xi.vercel.app/products"
     const {data, loading , error} = useFetch(productsUrl)
     let productOfTheDay = []
     if(data){
       const categoryProduct = data.data.products.filter((product)=> product.category.title === "Smartphones")
       if(categoryProduct.length > 1){
         productOfTheDay.push(categoryProduct[1])
        }
    }
    return(
      <>
      {loading && <p className="fs-3 text-dark">loading...</p> }
      {error && <p className="fs-3 text-dark">Error while fetching the data</p> }
     {productOfTheDay && productOfTheDay.length > 0 &&
        productOfTheDay.map((product) => {
          return (
<div key={product._id} className="container d-flex align-items-center my-5 py-5 px-4 rounded-5" style={{background: "linear-gradient(to right, #f0f7ff, #ffffff)"}}>
    <div className="ms-lg-5">
        <p className="text-primary fs-5 mb-0 fw-medium">Don't Miss Out</p>
        <h2 className="fw-black text-dark mb-3" style={{fontSize: "2.5rem"}}>Deal of the day</h2>
        <div className="d-flex align-items-center gap-3">
            <p className="text-primary fs-3 fw-bold mb-0">₹{product.price}</p>
            <p className="text-muted fs-5 text-decoration-line-through mb-0">₹{product.originalPrice}</p>
        </div>
        <Link to={`/productsDetails/${product._id}`} className="btn btn-dark btn-lg mt-4 px-4 fs-6 shadow">Shop now</Link>
    </div>
    <div className="ms-auto pe-lg-5">
        <img className="img-fluid" style={{width: "25rem", transform: "scale(1.1)"}} src={iphone} alt="" />
    </div>
</div>
          )
        })}
    </>
    )
}

function CategoriesList(){
  const url = "https://backend-ecommerce-opal-xi.vercel.app/categories"
    const {data, loading , error} = useFetch(url)
     const arrayOfIcons = ["bi bi-laptop", "bi bi-headphones","bi bi-controller", "bi bi-smartwatch", "bi bi-house-door", "bi bi-phone" ]
     let categoriesList = []
    if(data){
      categoriesList = data.data.categories.map((category, index) => {
        return(
      <div key={category._id} className="col-sm-3 col-md-2 my-3">
  <Link to={`/products/${category.title}`} className="text-decoration-none">
    <div className="card h-100 border-1 border-white py-3 shadow-sm" 
         style={{ 
           backgroundColor: 'rgba(255, 255, 255, 0.7)', 
           backdropFilter: 'blur(10px)', 
           borderRadius: '24px' 
         }}>
      <div className="text-center py-2">
        <i style={{ color: "#1d1d1f" }} className={`${arrayOfIcons[index]} display-6`}></i>
      </div>
      <div className="card-body text-center">
        <h6 className="fw-bold" style={{ color: "#1d1d1f" }}>{category.title}</h6>
        <p className="small text-primary mb-0">Shop Now &rarr;</p>
      </div>
    </div>
  </Link>
</div>
        )
      })
    }
   return(
    <div className="row">
        {loading &&<p className="fs-3 text-dark my-4"> loading...</p>}
        {error &&<p className="fs-3 text-dark my-4"> Error while fetching the data</p>}
        {data && data.data.categories.length > 0 && categoriesList}
        </div>
   )
}


export default function Home(){
  
  return (
    <main >
     <section style={{"backgroundColor": "#F0F7FF", "backgroundImage": "radial-gradient(circle at 10% 20%, #e0f2fe 0%, #f0f7ff 100%)"}}>
  <div className="container d-flex align-items-center justify-content-start gap-5 py-4">
    <div className="display-3 fw-bold d-flex flex-column text-primary" style={{"letterSpacing": "-1px"}}>
      <span className="opacity-50">Experience</span>
      <span>Tomorrow's</span>
      <span className="text-dark">Tech Today</span>
    </div>
    <div className="ms-auto">
      <img className="img-fluid" style={{minHeight: "30rem", width: "70vh", objectFit: "contain"}} src={heroImage} alt=""/>
    </div>
  </div>
</section>
      <section className="container">
        <CategoriesList/>
      </section>
      <section >
        <Product/>
      </section>
     </main>
  )
}
