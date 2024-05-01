# ParallaX Crafts

## Live Link: https://parallax-crafts.web.app

## Features

-   dynamic titles for each page
-   lazy imports for better performance
-   dark mode support

### Navbar

-   Shows user image if logged in, and shows profile name on hover

### Login Page

### Register Page

### Home Page

-   Banner section with 3 slides
-   Browse by category section: show all the category headers in the db with the total number of products in each category
    -   Clicking on a category header will take the user to the category page where all items in that category are shown
-   Services offered section
-   Offers section
-   Crafts section with 6 products being showcased: products are fetched randomly from the total list of products in the database
    -   shows view details button on hover over a specific product in the slider

### Add Craft Item Page

-   add item to the db and also updates the category collection to reflect the number of products in that category

### All arts & crafts section

-   shows all the products in the database in table format for large screeens
-   for smaller screens, shows the products in a card format
-   table view or card view is lazy loaded for better performance so that table view does not load on smaller screens and card view does not load on larger screens

### My Crafts section

-   shows all the products added by the logged in user
-   allows user to delete or update the product
-   if a user tries to go the update link of another user's product, it will redirect to my crafts section of that user
-   filter dropdown allows for filter by customization type

### Update page

-   allows user to update the product details

### Footer

-   shows social media links and contact information

### 404 page

-   shows a 404 page if the user tries to access a page that does not exist

### Loading spinner

-   shows a loading spinner when the data is loading

### Toast / Sweet Alert

-   shows a toast/sweet alert message when a user adds, updates or deletes a product

### Packages Used

-   `animate.css` : Used to animate certain elements throughout the site.

-   `axios` : Used for making API requests.

-   `firebase` : Used for user authentication.

-   `lottie-react` Used in displaying 404 page **_(Challenge part)_**.

-   `react-hot-toast` : Used for displaying toast notifications.

-   `react-icons` : Used for displaying icons.

-   `react-stars` : Used for displaying star ratings.

-   `react-tooltip` : Used for displaying tooltips **_(Challenge part)_**.

-   `sweetalert2` : Used for displaying alerts.

-   `swiper` : Used for creating sliders / swipers.
