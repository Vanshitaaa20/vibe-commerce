# Vibe Commerce — Mock E-Com Cart

A full-stack shopping-cart demo built for the internship screening.

**Tech Stack**  
- Frontend: React (Create-React-App)  
- Backend: Node.js + Express  
- Database: MongoDB (Mongoose)  
- External API: Fake Store API (for product seed)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Vanshitaaa20/vibe-commerce.git
cd vibe-commerce
cd backend
npm install
# Create .env in /backend:
# MONGO_URI=mongodb://127.0.0.1:27017/vibecommerce
# PORT=5000
npm run seed   # seeds products from Fake Store API
npm run dev    # or npm start
```
The API runs at http://localhost:5000/api
```
cd ../frontend
npm install
# Create .env in /frontend:
# REACT_APP_API=http://localhost:5000
npm start
```
The app opens in your default browser at http://localhost:3000

🛒 Features
- Product listing (data fetched from Fake Store API and stored locally)  
- Add to Cart / Remove from Cart  
- Cart persists per user via uid stored in localStorage  
- Checkout using user details (mock) → Receipt with timestamp  
- Defensive error-handling  
- Responsive UI  

🎬 Demo Video

[Insert your Loom or YouTube unlisted link here]

✅ Running Checks

Make sure:

- Products load and are visible
- Cart updates when items are added/removed
- Checkout returns a receipt and resets cart


Thanks for checking.
