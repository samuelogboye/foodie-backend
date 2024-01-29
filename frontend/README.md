# FOODIES RESTAURANT WEBSITE

### Home Page And Landing page

![Foodies Website Home Page](#)

![Foodies Website Landing Page](#)


# Restaurant Website

This repository contains the codebase for a foodies restaurant website, aimed at showcasing the restaurant's menu, services, and providing an interactive platform for customers.

# Architecture
![architecture](#)


## Features and Overview

- **Account Creation**: Users can create an account to be eligble for the all the website feautures.
- **Menu Display**: Browse through the restaurant's food.
- **Cart Display**: A visual representation of the cart, showing the user selected food, quantities, and possibly prices.
- **Modification Options**: : Users can adjust quantities, remove selected food in the cart.
- **Order Summary**: The cart displays a summary of the selected food, the total cost.
- **Checkout Process**: : Once satisfied with their selection, users proceed to the checkout page to complete the order. Here, they provide pickup details, select payment methods, and confirm the order..

## Technologies Used

- **Frontend**: HTML, React.js, Tailwind CSS
- **Backend**: Python Flask
- **Database**: MYSQL 
- **Additional Tools**: RESTful API for reservations, Google Maps API for location integration, Paystact API for payment gateway


## Some of the API routes

 **Authentication**:
 1. **/api/v1/register (POST)**
    - Params: name, email address, phone number, password
    - Return: User profile data upon successful registration
 2. **/api/v1/login (POST)**
    - Params: email address and password
    - Return: Authentication token upon successful login
    - /api/v1/logout (POST)

**User Profile:**:
 1. **/api/v1/user/<user_id> (GET)**
    - Return: User profile data including name, email address phone number, total orders, and order history

 2. **/api/v1/user/update (POST)**
    - Params: User profile update data (e.g., name, email, phone number, password)
    - Allow users to update their profile information.

**Food**:
 1. **/api/v1/menu (GET)**
    - Return: List of available menu items with details like picture, name and price

 2. **/api/v1/menu/<food_id> (GET)**
    - Return: Detailed information about a specific food item, including the picture, name and price

**Orders**:
 1. **/api/v1/orders (GET)**
    - Return: List of all orders placed by the currently authenticated user

 2. **/api/v1/cart (GET)**
    - Return: Contents of the user's cart, including food items, quantities, and total cost

 3. **/api/v1/cart/add (POST)**
    - Params: food_id and quantity
    - Add a food item to the user's cart

 4. **/api/v1/cart/remove (POST)**
    - Params: food_id
    - Remove a food item from the user's cart

 5. **/api/v1/order/checkout (POST)**
    - Params: cart contents, delivery address, and payment details
    - Place an order, process payment, and return order confirmation

 6. **/api/v1/orders/<order_id> (GET)**
    - Return: Details of a specific order, including order items and status.


## Setup Instructions
