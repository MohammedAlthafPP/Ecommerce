# E-Buy || MERN Ecommerce

An Ecommerce website using Node.js, React.js, Express.js, MongoDB


## Table of content
 - [Screenshot](#Screenshot)
 - [Tech Stack](#TechStack)
 - [Features](#Features)
 - [Environment Variables](#EnvironmentVariables)
 - [Run Locally](#RunLocally)
 - [Author](#Author)
 - [License](#License)



## Screenshot

![App Screenshot](https://res.cloudinary.com/althaf-ecommerce/image/upload/v1663667034/samples/New_Project_mpahk0.png)

The website resembles a real store and you can add products to your cart and wishlist and pay for them.

## TechStack

**Client:** React, Redux, Redux-Thunk, Material UI

**Server:** Node, Express

**Database:** mongoDB

**Services:** Nodemailer, Cloudinary, JWT 



## Features
**Users can do following:**

- Create an account, login or logout.
- View user profile.
- edit user profile.
- Change password.
- Add multiple addresses.
- Edit, Delete addresses.
- Browse available products.
- Add products to the shopping cart and wishlist.
- View products in the shopping cart and wishlist.
- Delete products from the shopping cart and wishlist.




**Admin can do following:**

- Login or logout to the admin panel
- Add, Edit, Delete products.
- Add, Edit, Delete product category
- Manage all Users




## EnvironmentVariables

To run this project, you will need to add the following environment variables to your .env file

**Server:**

`PORT`
`DB_URI`
`FRONTEND_URL`

`JWT_SECRET`
`JWT_EXPIRE`
`COOKIE_EXPIRE`

`SMPT_SERVICE`
`SMPT_MAIL`
`SMPT_PASSWORD`

`SMPT_HOST`
`SMPT_PORT`
`MY_SITE`

`CLOUDINARY_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

**Client :**

`REACT_APP_SITE_NAME`

## RunLocally

Clone the project

```bash
  git clone https://github.com/MohammedAlthafPP/Ecommerce.git
```

Go to the project client directory

```bash
  cd Ecommerce/frontend
```

Install dependencies

```bash
  npm install
```


Go to the project Ecommerce directory

```bash
  cd Ecommerce
```

Install dependencies

```bash
  npm install
```

Start project

```bash
  npm run dev
```

## Author

- [@MohammedAlthaf](https://github.com/MohammedAlthafPP)


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

