# SwiftCart Server

A Node.js/Express backend for SwiftCart. Provides product, order, user, admin, upload, and payment APIs.

- Live API: [`https://swiftcartbd-server.vercel.app/`](https://swiftcartbd-server.vercel.app/)
- Postman Docs: [`SwiftCart API Collection`](https://documenter.getpostman.com/view/39991008/2sB3QGtWV4)

## Tech Stack
- Express, Mongoose, Stripe, Cloudinary
- CORS, Cookie Parser, JSON Web Tokens

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB connection string
- Stripe secret key
- Cloudinary credentials

### Environment Variables
Create a `.env` file in the project root:

```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=https://swiftcartbd.vercel.app
```

### Install & Run

```bash
npm install
nodemon server.js
```

The server responds at `/` with:
```json
{ "success": true, "message": "API service running 🚀" }
```

## Base URL
- Local: `http://localhost:<PORT>`
- Production: `https://swiftcartbd-server.vercel.app`

All routes below are prefixed with `/api/*`.

## Authentication & Authorization
- Admin endpoints use JWT via cookies; roles: `super`, `moderate`, `low`.
- Public endpoints are noted accordingly.

## Endpoints

### Users
Base path: `/api/users`

- POST `/` — Upsert current user (public; relies on frontend Firebase auth token)

### Products
Base path: `/api/products`

- GET `/` — Get all products
- GET `/:id` — Get product by id
- POST `/reviews` — Create product review (user context)
- GET `/reviews/:id` — Get all reviews for product `:id`

### Orders
Base path: `/api/orders`

- POST `/new` — Create new order (public)
- POST `/` — Get orders for current user (expects user context)
- GET `/:id` — Get single order by id

### Admin
Base path: `/api/admin`

- POST `/auth` — Send current admin user
- POST `/register-superadmin` — Register first super admin (public, one-time)
- POST `/register` — Register admin (requires `super`)
- POST `/login` — Admin login
- GET `/logout` — Admin logout
- GET `/users` — Get all admin users (requires `super`)
- GET `/users/:id` — Get single admin (requires `super`)
- PUT `/users/:id` — Update admin privilege (requires `super`)
- DELETE `/users/:id` — Delete admin (requires `super`)
- POST `/product/new` — Create product (requires `moderate` or `super`)
- PUT `/product/:id` — Update product (requires `moderate` or `super`)
- DELETE `/product/:id` — Delete product (requires `moderate` or `super`)
- DELETE `/product/review/:id` — Delete product review (requires `moderate` or `super`)
- GET `/orders` — Get all orders (requires `low`, `moderate`, or `super`)
- PUT `/order/:id` — Update order status (requires `low`, `moderate`, or `super`)
- DELETE `/order/:id` — Delete order (requires `moderate` or `super`)

### Uploads
Base path: `/api/upload`

- POST `/` — Upload image to Cloudinary

### Payments
Base path: `/api/payment`

- POST `/create-payment-intent` — Create Stripe PaymentIntent and return client secret

## Error Handling
- Centralized error middleware handles thrown errors and sends structured JSON.

## CORS
- In production, allowed origins include `FRONTEND_URL`, `*.netlify.app`, `*.vercel.app`.
- In development, allows localhost on common ports.

## Repositories and Live Apps

- Client Live: [`https://swiftcartbd.vercel.app/`](https://swiftcartbd.vercel.app/)
- Admin Live: [`https://swiftcartbd-admin.vercel.app/`](https://swiftcartbd-admin.vercel.app/)

- Client Repo: [`miraz23/Swiftcart_client`](https://github.com/miraz23/Swiftcart_client)
- Admin Repo: [`miraz23/Swiftcart_admin`](https://github.com/miraz23/Swiftcart_admin)

## Notes
- Some endpoints require authentication cookies set by the admin login flow.
- Refer to Postman collection for required request bodies and example responses.
