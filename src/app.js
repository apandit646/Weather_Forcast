const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();




const app = express();
const port = process.env.PORT || 3000;



// Define paths for templates and static files
const public_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// Set up Handlebars as the view engine and specify the views directory
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);


// Middleware for serving static files
app.use(express.urlencoded({ extends: false }))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(public_path));

// Connect to MongoDB

mongoose.connect('mongodb+srv://apandit646:5mmUQlfwOaBQaUjs@weather.xfhzi.mongodb.net/?retryWrites=true&w=majority&appName=weather', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
// Define routes
const complaint_data = new mongoose.Schema({
    
    email: { type: String },
    complaint: { type: String }
});

const Complain_Data = mongoose.model('Complain_Data', complaint_data);

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contactUs', (req, res) => {
    res.render('contactUs');
});

app.post('/contactUs', async (req, res) => {
    const { email, complaint } = req.body;

    try {
        if (!email || !complaint) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new Complain_Data({ email, complaint });
        // console.log(newUser);

        // Save user to database
        await newUser.save();
        res.status(200).json({ message: "Complaint submitted successfully!" });
    } catch (error) {
        console.error("Error saving complaint:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/weather', (req, res) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day_dta = days[dayOfWeek]
    // Current date

    const formattedDate = today.toDateString();
    console.log(formattedDate)

    const dateString = formattedDate;
    const formatted = dateString.split(' ').slice(1).join(' ');
    console.log(formattedDate); // "Jan 15 2025"


    res.render('weather', {
        dayOfWeek: day_dta,
        date_current: formatted

    });
});

// Handle 404 errors
app.get('*', (req, res) => {
    res.render('404error', {
        errorMsg: "404 Accured"

    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



