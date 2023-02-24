const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const recipeRoute = require('./routes/recipesRoutes');
const userRoute = require('./routes/userRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const port = 5000;
// app.use(express.json())
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors());
app.use('/api/recipes', recipeRoute);
app.use('/api/', userRoute);
// app.use('/uploads', express.static('/uploads/users/'));
app.use("/dick",express.static(path.join(__dirname, '/uploads/users/')))

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://Imperia-Organic-Project:mushroom1234$@cluster0.kag2lif.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})