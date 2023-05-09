const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
require('./services/passport');


const app = express();

app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());

// app.use('/uploads', express.static('/uploads/users/'));

const recipeRoute = require('./routes/recipesRoutes');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');

app.use('/api/recipes', recipeRoute);
app.use('/api/', userRoute);
app.use('/', authRoute);

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://Imperia-Organic-Project:mushroom1234$@cluster0.kag2lif.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})