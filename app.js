//jshint esversion:6

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // Custom module to get the current date

// Initialize the Express app
const app = express();

// Set the view engine to EJS for templating
app.set('view engine', 'ejs');

// Use body-parser to parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Initialize arrays to store items
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// Handle GET request for the home route //
app.get("/", function (req, res) {
    // Get the current date using the custom date module
    const day = date.getDate();

    // Debugging: Log the current date
    console.log("Home Route - Current Date: ", day);

    // Render the "list" EJS template with the current date and items
    res.render("list", { listTitle: day, newListItems: items, routeName: "home" });
});

// Handle POST request for adding a new item
app.post("/", function (req, res) {
    // Get the new item from the form
    const item = req.body.newItem;

    // Debugging: Log the new item and the list it is being added to
    console.log("POST Request - New Item: ", item);
    console.log("POST Request - List Type: ", req.body.list);

    // Check which list the item should be added to (work or home)
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

// Handle GET request for the work route
app.get("/work", function (req, res) {
    // Debugging: Log the current work items
    console.log("Work Route - Current Work Items: ", workItems);

    // Render the "list" EJS template with the work list items
    res.render("list", { listTitle: "Work List", newListItems: workItems, routeName: "work" });
});

// Handle GET request for the about route
app.get("/about", function (req, res) {
    // Debugging: Log access to the about route //
    console.log("About Route Accessed");

    // Render the "list" EJS template with about page content//
    res.render("list", { listTitle: "About", newListItems: [], routeName: "about" });
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
