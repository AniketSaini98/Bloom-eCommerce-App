# Bloom ECommerceApp

This application demonstrates a functional e-commerce product listing with the core features implemented. The code structure follows best practices for React applications and provides a solid foundation for further development.

## Project info

**DEMO**: https://preview--product-bloom-trove.lovable.app/

## How can I edit this code?

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/AniketSaini98/product-bloom-trove/

# Step 2: Navigate to the project directory.
cd product-bloom-trove

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# Step 5: Open your browser to
http://localhost:8080
```

## What technologies are used for this project?

This project is built with:

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **State Management:** React Context API
- **Routing:** React Router
- **Data Fetching:** Native fetch API
- **Build Tool:** Vite

## Solution Overview
This is a React-based e-commerce application that displays products from the FakeStoreAPI. The application includes the following features:

- Product listing with grid layout
- Product details page
- Shopping cart functionality with persistent storage
- Wishlist functionality
- Search and filtering capabilities
- Responsive design

## Approach
### 1. Component Structure:
- Created reusable components for product cards, search filters, and cart/wishlist buttons
- Implemented context providers for cart and wishlist state management
- Designed responsive layouts using Tailwind CSS

### 2. Data Flow:
- Used the FakeStoreAPI to fetch product data
- Implemented filtering and sorting on the client side
- Stored cart and wishlist data in localStorage for persistence

### 3. User Experience:
- Added loading states for data fetching
- Implemented toast notifications for user actions
- Designed intuitive UI with clear navigation

### 4. Optimizations:
- Cached API responses to reduce network requests
- Used error boundaries for handling API failures gracefully
- Implemented responsive design for all device sizes

## Challenges and Notes

### 1. API Limitations:
- The FakeStoreAPI doesn't support actual checkout functionality
- Limited product data and images
- No authentication or user management

### 2. Future Improvements:
- Implement user authentication
- Add product reviews and ratings
- Enhance filter capabilities with more options
- Add pagination for product listings
- Implement actual checkout flow with payment integration
- Add more detailed product information
- Improve performance with React Query for data fetching

### 3. Known Issues:
- Price filtering could be improved with a smoother slider experience
- Mobile navigation could be enhanced for better usability
- More robust error handling for network issues
