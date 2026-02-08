import { useEffect, useState } from "react";
import Header from "../components/Header"
import useEcommerceContext from "../context/EcommerceContext"
import { userDetails } from "./UserDetails";
import { useNavigate } from "react-router-dom";

export default function AddressDetails(){
 const {primaryAddress, setPrimaryAddress} = useEcommerceContext()
 const [messageDisplay, setMessageDisplay] = useState(false)
 const navigate = useNavigate()

 const [address, setAddress] = useState({
        addressId: 0,
        houseNo: "",
        buildingName: "",
        floor: "",
        street: "",
        landmark: "",
        area: "",
        city: "",
        district: "",
        state: "",
        country: "",
        postalCode: "",
        addressType: "",
        isPrimary: false,
 })

 console.log(address)
 console.log(userDetails.addresses)

 const addNewAddress = (address) => {
   if(userDetails.addresses.addressId !== address.addressId && address.addressId !== 0){
    userDetails.addresses.push(address)
   }
 }

const handleInputChange = (e) => {
  const { name, value,checked} = e.target;
  
  setAddress(prevState => ({
    ...prevState,
    [name]: value,
    isPrimary: checked ? true : false,
  }));
}

const handleFormSubmit = (e) => {
  e.preventDefault()
  
  const newId = userDetails.addresses.length + 1
  
  const finalAddress = {
    ...address,
    addressId: address.addressId || newId
  }
  
  addNewAddress(finalAddress)
   setMessageDisplay(true)
 
 
}

useEffect(() => {
  if (messageDisplay) {
    const timer = setTimeout(() => {
      setMessageDisplay(false);
   navigate(`/user`)
    }, 3000)
    return () => clearTimeout(timer);
  }
}, [messageDisplay]);

return(
  <>
    <Header/>
    <div className="container py-4">
  <div className="row justify-content-center">
    <div className="col-lg-8">
      <form onSubmit={handleFormSubmit} className="p-4 border rounded bg-white shadow-sm">
        <h5 className="mb-4 fw-bold">Address Form</h5>
        
        <div className="row g-3">
          {/* Address Type & Primary Status */}
          <div className="col-md-8">
            <label className="form-label fw-medium text-secondary">Address Type</label>
            <select 
              name="addressType" 
              className="form-select" 
              onChange={handleInputChange} 
              value={address.addressType}
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="col-md-4 d-flex align-items-end pb-2">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                name="isPrimary"
                id="isPrimary"
                checked={address.isPrimary}
                onChange={handleInputChange}
              />
              <label className="form-check-label small" htmlFor="isPrimary">
                Set as Primary
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label small text-muted">House No.</label>
            <input type="text" name="houseNo" className="form-control" onChange={handleInputChange} value={address.houseNo} />
          </div>
          <div className="col-md-8">
            <label className="form-label small text-muted">Building Name</label>
            <input type="text" name="buildingName" className="form-control" onChange={handleInputChange} value={address.buildingName} />
          </div>

          <div className="col-md-6">
            <label className="form-label small text-muted">Floor</label>
            <input type="text" name="floor" className="form-control" onChange={handleInputChange} value={address.floor} />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">Street</label>
            <input type="text" name="street" className="form-control" onChange={handleInputChange} value={address.street} />
          </div>

          <div className="col-md-6">
            <label className="form-label small text-muted">Area / Locality</label>
            <input type="text" name="area" className="form-control" onChange={handleInputChange} value={address.area} />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">Landmark</label>
            <input type="text" name="landmark" className="form-control" onChange={handleInputChange} value={address.landmark} />
          </div>

          <div className="col-md-4">
            <label className="form-label small text-muted">City</label>
            <input type="text" name="city" className="form-control" onChange={handleInputChange} value={address.city} />
          </div>
          <div className="col-md-4">
            <label className="form-label small text-muted">District</label>
            <input type="text" name="district" className="form-control" onChange={handleInputChange} value={address.district} />
          </div>
          <div className="col-md-4">
            <label className="form-label small text-muted">Zip Code</label>
            <input type="text" name="postalCode" className="form-control" onChange={handleInputChange} value={address.postalCode} />
          </div>

          <div className="col-md-6">
            <label className="form-label small text-muted">State</label>
            <input type="text" name="state" className="form-control" onChange={handleInputChange} value={address.state} />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">Country</label>
            <input type="text" name="country" className="form-control" onChange={handleInputChange} value={address.country} />
          </div>

          <div className="col-12 mt-4 pt-2 border-top d-flex justify-content-end">
            <button type="button" className="btn btn-outline-danger me-2 px-4">
              Cancel
            </button>
            <button type="submit" className="btn btn-success px-4" >
              {address.addressId ? 'Save Address' : 'Add New'}
            </button>
          </div>
        </div>
      </form>
      
      <p className="text-success">{messageDisplay ? `Address Added successfully` : ``}</p>
    </div>
  </div>
</div>
    </>
  )
}