import User from '../models/user.js';
import RentMachinery from '../models/rent_machinery.js';
import axios from 'axios';

export const rent_application = async (req, res) => {
    try {
        
        let location = '';
        if (Object.keys(req.query).length > 0) {
            lat = req.query.lat;
            lng = req.query.lng;
            location = lat + ',' + lng;
        } else {
            location = await User.findById(req.user.id);
            location = location.location;
        }

        let applications = await RentMachinery.find({}, {rent_id: 1, owner: 1, description: 1, category: 1, rent: 1, quantity_available: 1}).lean();
        let feasible_applications = [];

        for (let application of applications) {
            if (application.quantity_available == 0) continue;
            
            const apiKey = process.env.API_KEY;

            const startCoordinates = location;
            let endCoordinates = await User.findOne({username:application.owner}, {location: 1});
            endCoordinates = endCoordinates.location;

            if (!endCoordinates) {
                continue;
            }
            const traffic = true;

            const tomtomApiEndpoint = 'https://api.tomtom.com/routing/1/calculateRoute/';
            const url = `${tomtomApiEndpoint}${startCoordinates}:${endCoordinates}/json?key=${apiKey}&traffic=${traffic}`;

            const response = await axios.get(url);
            const data = response.data;
            const route = data.routes && data.routes[0];

            if (route) {
                const distance = route.summary.lengthInMeters / 1000; // in km
                const travelTime = route.summary.travelTimeInSeconds / 60; // in mins

                if (distance < 25) {
                    let owner_details = await User.findOne({username: application.owner}, {name: 1, email: 1});
                    application.distance = distance;
                    application.travelTime = travelTime;
                    application.owner_name = owner_details.name;
                    application.owner_email = owner_details.email;
                    feasible_applications.push(application);
                }
            } else {
                console.error('No route found.');
            }
        }

        return res.status(200).send({ applications: feasible_applications });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });        
    }
}


export const create_rent_application = async (req, res) => {
    try {
        
        let reqbody = req.body.formValues;
        if (reqbody.rent < 0 || reqbody.quantity_available < 0) return res.status(400).send({ error: 'Invalid input!' });

        // Generating 15digits id with current date and time so that each appointment id is unique
        // assuming that no two appointments are booked at the same time
        const currentDate = new Date();
        const options = { timeZone: 'Asia/Kolkata' };
        const formattedDate = currentDate.toLocaleDateString('en-IN', options).replace(/\//g, '');
        const formattedTime = currentDate.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' }).replace(/:/g, '');
        const formattedDateTime = `${formattedDate}T${formattedTime}`;

        const rent_id = formattedDateTime;


        await RentMachinery.create({
            rent_id: rent_id,
            owner: req.user.username,
            description: req.body.description,
            category: req.body.category,
            rent: req.body.rent,
            quantity_available: req.body.quantity_available
        });

        return res.status(200).send({ message: 'Rent application created successfully!' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });        
    }
}


export const view_applications = async (req, res) => {
    try {
        
        let applications = await RentMachinery.find({owner: req.user.username}, {rent_id: 1, description: 1, category: 1, rent: 1, quantity_available: 1, machinery_holder: 1});
        for (let application of applications) {
            let holder_details = [];
            for (let holder of application.machinery_holder) {
                let holder_detail = await User.findOne({username: holder}, {name: 1, email: 1, username: 1, contact: 1});
                holder_details.push(holder_detail);
            }
            application.machinery_holder = holder_details;
        }

        return res.status(200).send({ applications: applications });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });        
    }
}


export const rent_machinery = async (req, res) => {
    try {
        
        let application = await RentMachinery.findOne({rent_id: req.body.rent_id});
        if (!application) return res.status(400).send({ error: 'No such rent application found!' });
        if (req.body.quantity_required < 1) return res.status(400).send({ error: 'Invalid input!' });
        if (application.quantity_available == 0 || application.quantity_available < req.body.quantity_required) return res.status(400).send({ error: 'Machinery not available!' });

        await RentMachinery.findOneAndUpdate({
            rent_id: req.body.rent_id
        }, {
            $inc: { quantity_available: -req.body.quantity_required },
            $push: { machinery_holder: req.user.username }
        });

        return res.status(200).send({ message: 'Machinery rented successfully!' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });        
    }
}


export const update_application = async (req, res) => {
   
    try {
        
        const rent_id = req.params.rent_id;
        let application = await RentMachinery.findOne({rent_id: rent_id, owner: req.user.username});
        if (!application) return res.status(400).send({ error: 'No such rent application found!' });

        if (req.body.rent < 0 || req.body.quantity_available < 0) return res.status(400).send({ error: 'Invalid input!' });

        await RentMachinery.findOneAndUpdate({
            rent_id: rent_id
        }, {
            description: req.body.description,
            category: req.body.category,
            rent: req.body.rent,
            quantity_available: req.body.quantity_available
        });

        return res.status(200).send({ message: 'Rent application updated successfully!' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });        
    }
}


export const delete_application = async (req, res) => {
    try {
        
        const rent_id = req.params.rent_id;
        let application = await RentMachinery.findOne({rent_id: rent_id, owner: req.user.username});
        if (!application) return res.status(400).send({ error: 'No such rent application found!' });

        await RentMachinery.findOneAndDelete({rent_id: rent_id});

        return res.status(200).send({ message: 'Rent application deleted successfully!' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });        
    }
}


export const free_machinery = async (req, res) => {
    try {
        
        const rent_id = req.params.rent_id;
        const user = req.params.user;
        let application = await RentMachinery.findOne({rent_id: rent_id, owner: req.user.username});
        if (!application) return res.status(400).send({ error: 'No such rent application found!' });

        await RentMachinery.findOneAndUpdate({
            rent_id: rent_id
        }, {
            $inc: { quantity_available: 1 },
            $pull: { machinery_holder: user }
        });

        return res.status(200).send({ message: 'Machinery freed successfully!' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });        
    }
}