import { createContext , useContext, useState} from "react";
import { userDetails } from "../pages/UserDetails";
import { toast } from 'react-toastify'

const EcommerceContext = createContext()
const useEcommerceContext = () => useContext(EcommerceContext)

export default useEcommerceContext

export function EcommerceProvider({ children }){
    const [wishList, setWishlist] = useState([])
     const [cartList, setCartList] = useState([]) 
     const [primaryAddress, setPrimaryAddress] = useState(userDetails.addresses.find((address) => address.isPrimary))
    function updateCartList(productId, productTitle) {
      let product = []
      const existingProduct = cartList.find(product => product.id === productId)
      if (existingProduct){
        product = cartList.map(product => 
          product.id === productId 
            ? { ...product, quantity: product.quantity + 1 } 
            : product
        )
      } else {
        console.log("Added to the cart - toast error")
        toast.success(`${productTitle} added to the cart`)
        product = [...cartList, { id: productId, title: productTitle, quantity: 1 }]
      }
      setCartList(product)
    }  

    function increaseQuantity(productId){
      const product = cartList.find((p) => p.id === productId)
      if(product.quantity >= 10){
        toast.error(`${product.title} reached out max quantity`,{toastId: "max-qty-toast"})
      }else{
          toast.success(`${product.title} quantity increased`)
      }
      const updateProduct = cartList.map((product) =>  product.id === productId && product.quantity < 10 ? {...product, quantity: product.quantity + 1} : product)
      setCartList(updateProduct)
    }
    function decreaseQuantity(productId){
      const product = cartList.find((p) => p.id === productId)
          if(product.quantity <= 1){
            toast.error(`${product.title} removed from cart`,{toastId: "min-qty-toast"})
          }else{
            toast.success(`${product.title} quantity decreased`)            
          }
      const updateProduct = cartList.map((product) =>  product.id === productId && product.quantity > 0 ?  {...product, quantity: product.quantity - 1}: product)
      const filteredProduct = updateProduct.filter((product) => product.quantity !== 0)

      setCartList(filteredProduct)
    }

   function toggleWishlist(productId){
    if(wishList.includes(productId)){
       toast.error("Remove from wishlist")
      const filterWishlist = wishList.filter((product) => product !== productId)
      setWishlist(filterWishlist)
    }else{
      toast.success("Added to wishlist")
      setWishlist((preValue) => [...preValue, productId])
    }
  }

  function isInWishlist(productId){
   
    return wishList.includes(productId)
  }

  function removeFromWishlist(productId){
    
      const filterWishlist = wishList.filter((product) => product !== productId)
      setWishlist(filterWishlist)
  }

  return(
    <EcommerceContext.Provider value={{wishList, toggleWishlist, isInWishlist, removeFromWishlist, cartList, updateCartList,increaseQuantity,decreaseQuantity, primaryAddress, setPrimaryAddress}}>
      {children}
    </EcommerceContext.Provider>
  )
}