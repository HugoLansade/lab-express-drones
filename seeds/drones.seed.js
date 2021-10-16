// Iteration #1

const drones = [
    {
        name : "Uma",
        propellers : "6",
        maxSpeed : "21",
    },
    {
        name : "Will",
        propellers : "1",
        maxSpeed : "5", 
    },
    {
        name : "Kill",
        propellers : "3",
        maxSpeed : "8", 
    },
    {
        name : "Bill",
        propellers : "5",
        maxSpeed : "23", 
    }
];

const mongoose = require("mongoose");
const droneModel = require("./../models/Drone.model");

mongoose
.connect("mongodb://localhost/lab-express-drones", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(async (x) => {
    console.log(`Connected to Mongo ! Database name : "${x.connections[0].name}"`)

    const res = await droneModel.insertMany(drones);
    console.log(res.length + " drones inserted in database !");
})
.catch((err) => console.error("Error connecting to mongo", err));

mongoose.connection.close();