# GadgetHub Electronics E-commerce App

A full-stack E-commerce application featuring complete CRUD operations to manage, browse, and update electronic products<br>
Built with react frontend, Express/Node backend , MongoDB database.

---

## Demo Link

[Link Demo](https://frontend-ecommerce-six-zeta.vercel.app/)

---
## Quick Start

```
git clone https://github.com/Chetan-7065/frontend-ecommerce.git
cd <your-repo>
npm install 
npm run dev # or `npm start` / `yarn dev`
```

## Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB

---

## Demo Video 
Watch a walkthrough (5 minutes) of all the major features of this app:<br/>
[Loom Video](https://frontend-ecommerce-six-zeta.vercel.app/)

---

## Features
**Home**
- Browse products easily through organized categories like laptops, mobiles and Home appliances.
- Search for any product instantly by typing its name in the search bar.
- View the deal of the day and purchase or view it instantly with one click.

**Products List**
- Browse all products with their current prices and user ratings, and easily add them to your wishlist.
- Filter out products by rating or categories and sort them easily from low-to-high or high-to-low price.
- Click any product to instantly view its all specification and add it directly to your cart.

**Product Details**
- View full product details including the current price, name, specification and user ratings. 
- Easily add item to your cart or order instantly with a single click.

**Wishlist**
- View all the products saved in your wishlist and purchase them instantly with a single click.

**Cart**
- View all the products saved in your cart along with total price and current delivery address.
- Order all the products on particular address with a single click

**Profile** 
- View your personal details including name, contact info and primary delivery address and new delivery locations.
- Easily update your main address and remove the old and unwanted addresses from your profile.
- View your complete order history organized conveniently from newest to oldest purchase.

---

## API Reference

### **Get /api/products**
List of all products <br>
Sample response <br>
```
[{id, title, brand, price, category, rating, images}, ...]
```

### **Get /api/products/:productID**
Get a specific product by Id<br>
Sample response <br>
```
{id, title, brand, price, category, rating, images}
```

### **Get /api/categories**
List of all categories <br>
Sample response <br>
```
[{id, title, image, description}, ...]
```

### **Get /api/orders**
List of all lead <br>
Sample response <br>
```
{id, name, source, agent, status, tags, timeToClose, priority}
```

#### **Post /api/order**
Easily update a new order<br>
Sample response <br>
```
{id, product, price, address, paymentDetails, status, premiumMember}
```

## Contact

For bugs or feature requests, please reach out to chetanpathak3055@gmail.com