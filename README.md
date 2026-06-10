# Vintage Vibes

**Vintage Vibes** is a premium fashion e-commerce platform designed to provide a high-end, seamless shopping experience. Focused on quality apparel and intuitive design, it bridges the gap between style and technology, offering customers a sophisticated way to explore collections and manage their personal style.

By leveraging modern web technologies, Vintage Vibes ensures fast performance, type-safe operations, and a responsive interface that looks stunning on any device.

## 👕 What is Vintage Vibes?

Vintage Vibes addresses the need for a refined digital boutique. The platform provides specialized workflows for different users:

### 🛍️ Customer

* **Dynamic Browsing:** Explore categorized collections (Men, Women, Kids) with advanced filtering.
* **Product Depth:** View detailed product pages featuring category breadcrumbs, rich image galleries, and related product suggestions.
* **Customization:** Select specific sizes and colors (via visual swatches) with real-time stock feedback.
* **Shopping Tools:** Integrated quantity increment/decrement, persistent wishlist, and a real-time cart system.
* **Account Management:** Secure login to track order history and manage profile details.

### 🛡️ Administrator (Dashboard)

* **Inventory Control:** Add, edit, and remove products with multi-image support and variation management (sizes/colors).
* **Order Tracking:** Monitor real-time transactions and update fulfillment statuses (Processing, Shipped, Delivered).
* **Business Analytics:** Visualize sales performance, popular categories (e.g., Coats), and revenue growth through interactive charts.
* **Content Management:** Control promotional banners and featured collection highlights.

## ✅ Key Benefits

* **💎 Premium Visual Experience** Built with a focus on "Maison" typography and minimalist aesthetics using Tailwind CSS for a professional, boutique feel.
* **⚡ Blazing Fast Navigation** Uses React and client-side routing to ensure instant page transitions and a smooth "Add to Cart" flow without page reloads.
* **🎨 High-Fidelity Customization** Detailed product interactions, including smooth image switching, color-coded swatches, and intuitive quantity selectors.
* **🛡️ Robust Type Safety** Developed with TypeScript across the entire stack, significantly reducing runtime errors and ensuring data integrity for products and orders.
* **📱 Mobile-First Design** A fully responsive sidebar and optimized touch-controls ensure the shopping experience is perfect on smartphones and tablets alike.
* **📈 Data-Driven Growth** Administrators gain critical insights into customer preferences and stock movement through a dedicated analytics engine.

Vintage Vibes transforms clothing retail into a transparent, elegant, and scalable digital ecosystem where style meets code.

## 🏗️ Project Architecture

**Vintage Vibes** follows a modern, full-stack TypeScript architecture to ensure scalability and a high-performance developer experience.

### 🖥️ Frontend: React.js & TypeScript

* **Framework:** Built with **React** and **Vite** for ultra-fast development and optimized production builds.
* **State Management:** Utilizes **React Context API** (`ShopContext`) for global data flow (Cart, Products, Auth).
* **Styling:** **Tailwind CSS** for rapid UI development and a consistent brand design language.
* **Icons:** Powered by **React Icons** (Fi, Ri sets) for a clean, modern aesthetic.

---

### 🌐 Backend: Express.js

* **Engine:** **Node.js** with **Express.js** handling RESTful API architecture.
* **Security:** Implements **JWT (JSON Web Tokens)** for secure user sessions and **Bcrypt** for password hashing.
* **Operations:** Manages complex product filtering, cart persistence logic, and order fulfillment workflows.

---

### 🗄️ Database: MongoDB

* **Structure:** A NoSQL **MongoDB** database for flexible storage of fashion items with varying attributes (sizes, colors, categories).
* **Reliability:** Stores user profiles, order logs, and product collections with high availability.
* **Scalability:** Designed to handle thousands of SKUs and concurrent customer transactions effortlessly.

---

## ⚙️ Installation & Setup

To run **Vintage Vibes** locally, follow the steps below.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/vintage-vibes.git
cd vintage-vibes

```

### 👕 Frontend Setup (React - Customer & Admin UI)

```bash
cd client

# Create a .env file and add:
# VITE_BACKEND_URL=http://localhost:4000

npm install
npm run dev

```

### 🌐 Server Setup (Express.js Backend)

```bash
cd server

# Create a .env file and add:
# PORT=4000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# CLOUDINARY_API_KEY=your_key

npm install
npm run server

```

---

## 🚀 Live Demo & Test Credentials

### 🔗 Live URLs

* 🌐 **Live Project (Render)**: [https://fashion-ecommerce-frontend-t5zl.onrender.com/](https://fashion-ecommerce-frontend-t5zl.onrender.com/)

### 🧪 Test Credentials

Explore the platform using these sample accounts:

#### 🛍️ Customer

```txt
📧 Email: shopper@vintagevibes.com  
🔑 Password: 12345678

```

#### 🛡️ Administrator

```txt
📧 Email: admin@vintagevibes.com  
🔑 Password: 12345678

```
