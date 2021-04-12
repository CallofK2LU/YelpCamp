const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '605cad8a1880220284f1be38',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, consequatur hic eum eaque consequuntur nesciunt aut veritatis a praesentium ipsam non inventore ad cupiditate tempore culpa cumque ratione doloremque!',
            price,
            geometry : { 
                type: "Point", 
                coordinates:  [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/k2lu324fsdf/image/upload/v1617115313/YelpCamp/wsfwmngwpwxn6rf3tipp.jpg',
                    filename: 'YelpCamp/wsfwmngwpwxn6rf3tipp'
                },
                {
                    url: 'https://res.cloudinary.com/k2lu324fsdf/image/upload/v1617115313/YelpCamp/inwme1s0jtzg0plkqymp.jpg',
                    filename: 'YelpCamp/inwme1s0jtzg0plkqymp'
                }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})