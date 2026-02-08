import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useEcommerceContext from "../context/EcommerceContext"

export const userDetails = {
    id: 1,
    name: "John Smith",
    imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    addresses: [{
        addressId: 1,
        houseNo: "123",
        buildingName: "Sunrise Apartments",
        street: "Main Street",
        landmark: "Near Central Park",
        area: "Downtown",
        city: "New York",
        district: "Manhattan",
        state: "New York",
        country: "United States",
        postalCode: "10001",
        addressType: "Home",
        isPrimary: true,
      },
       {
        addressId: 2,
        houseNo: "456",
        buildingName: "Tech Tower",
        floor: "15th Floor",
        street: "Broadway",
        area: "Financial District",
        city: "New York",
        district: "Manhattan",
        state: "New York",
        country: "United States",
        postalCode: "10005",
        addressType: "Office",
        isPrimary: false,
      }
    ]
}

export default function UserDetails(){
 const { primaryAddress, setPrimaryAddress } = useEcommerceContext()
 const [addresses, setAddresses] = useState(userDetails.addresses)
 
useEffect(() => {
  const primary = addresses.find((address) => address.isPrimary);
  
  if (primary && primary.addressId !== primaryAddress?.addressId) {
    setPrimaryAddress(primary);
  }

  
}, [addresses, setPrimaryAddress, primaryAddress]);
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

 const handlePrimaryAddress = (addressId) => {
   const updatedAddressess = addresses.map((address) => address.addressId === addressId ? {...address, isPrimary: true}: {...address, isPrimary: false})
    if(updatedAddressess){
      setAddresses(updatedAddressess)
    }
  }

  const handleEditChanges = (addressId) => {
    const changeAddress = addresses.find((address) => address.addressId == addressId)
    if(changeAddress){
      setAddress(changeAddress)
    }
  }
  
  const handleDelete = (addressId) => {
    const filteredAddresses = addresses.filter((address) => address.addressId !== addressId)
     setAddresses(filteredAddresses)
    
  }


 const handleInputChange = (e) => {
  const { name, value,checked} = e.target;
  
  setAddress(prevState => ({
    ...prevState,
    [name]: value,
    isPrimary: checked ? true : false,
  }));
}

  const handleSubmitChanges = (e) => {
    e.preventDefault()
    const updatedAddressess = addresses.map((addre) => addre.addressId === address.addressId ? {...address} : {...addre} )
    if(updatedAddressess){
      setAddresses(updatedAddressess)
    }
  }


  const addressCards = addresses.map((address) => {
    return (
      <div key={address.addressId}>
  <div  className="row border rounded p-3 my-2 align-items-center bg-white shadow-sm g-0">
    <div className="col-auto px-3">
      <input 
        type="radio" 
        name="address" 
        className="form-check-input mt-0"
        onChange={() => handlePrimaryAddress(address.addressId)}
        checked={address.isPrimary} 
      />
    </div>

    <div className="col">
      <span className="badge bg-light text-dark fw-bold mb-1">{address.addressType}</span>
      <p className="text-muted mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
        {address.houseNo} {address.buildingName}, {address.street}, {address.landmark}, {address.area}, {address.city}, {address.state} - {address.postalCode}
      </p>
    </div>

    <div className="col-auto px-3 d-flex gap-2">
  <button 
    type="button" 
    className="btn btn-outline-secondary btn-sm rounded-circle"
    style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    data-bs-toggle="modal" 
    data-bs-target="#exampleModal"
    onClick={() => handleEditChanges(address.addressId)}
  >
    <i className="bi bi-pencil"></i>
  </button>
  <button 
    type="button" 
    className="btn btn-outline-danger btn-sm rounded-circle"
    style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    onClick={() => handleDelete(address.addressId)}
  >
    <i className="bi bi-x-lg"></i>
  </button>
</div>

  </div>
</div>
    )
  })

  return (
    <>
    <Header/>
 <main className="container my-5">
  <div className="row justify-content-center">
    <div className="col-lg-10">
      <div className="row g-5">
        {/* Left Side: Photo & Quick Status */}
        <div className="col-md-4 text-center">
          <img 
            className="rounded-4 shadow-sm mb-3 border p-1 bg-white" 
            src={`${userDetails.imageUrl}?crop=faces&fit=crop&h=200&w=200/200x200`} 
            style={{ width: '180px', height: '180px', objectFit: 'cover' }}
            alt="Profile" 
          />
          <h4 className="fw-bold">{userDetails.name}</h4>
          <p className="text-muted small">Verified Account</p>
          <button className="btn btn-dark w-100 rounded-pill shadow-sm">Edit Photo</button>
        </div>

        {/* Right Side: Data Grid */}
        <div className="col-md-8">
          <h5 className="mb-4 fw-bold">Account Settings</h5>
          <div className="row g-4">
            <div className="col-12 border-bottom pb-3">
              <label className="text-muted small d-block">Full Name</label>
              <span className="fs-5">{userDetails.name}</span>
            </div>
            <div className="col-sm-6 border-bottom pb-3">
              <label className="text-muted small d-block">Phone</label>
              <span className="fs-5">{userDetails.phone}</span>
            </div>
            <div className="col-sm-6 border-bottom pb-3">
              <label className="text-muted small d-block">Birthday</label>
              <span className="fs-5">{userDetails.dateOfBirth}</span>
            </div>
          </div>
          
          <div className="mt-5">
            <h5 className="fw-bold mb-3">Address Book</h5>
            <div className="d-grid gap-2">{addressCards}</div>
            <Link className="btn btn-outline-dark mt-3 rounded-pill" to="/address/newAddress">+ Add New Address</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
      {/* modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content border-0 shadow">
      <div className="modal-header bg-light">
        <h5 className="modal-title fw-bold" id="exampleModalLabel">
          {address.addressId ? 'Edit Address' : 'Add New Address'}
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmitChanges}  >
        <div className="modal-body p-4">
          <div className="row g-3">
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
          </div>
        </div>
        <div className="modal-footer bg-light">
          <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">
            Close
          </button>
          <button type="submit" className="btn btn-success px-4" data-bs-dismiss="modal">
            {address.addressId ? 'Update Address' : 'Add New'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

    </main>
    </>
  )
}