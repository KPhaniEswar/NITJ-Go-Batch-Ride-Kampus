const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/rideSharing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Ride Schema
const rideSchema = new mongoose.Schema({
    driver: String,
    passengers: [String],
    startLocation: String,
    endLocation: String,
    date: Date,
});

const Ride = mongoose.model('Ride', rideSchema);

// Create a ride
app.post('/api/rides', async (req, res) => {
    const newRide = new Ride(req.body);
    try {
        await newRide.save();
        res.status(201).send(newRide);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all rides
app.get('/api/rides', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.send(rides);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});