import User from '../models/user.js'
import WorkApplication from '../models/work_application.js'
import HirerWorker from '../models/hirer_worker.js'
import { application } from 'express';

export const work_application = async (req, res) => {
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
        let hirers = WorkApplication.find({status: 'open'}, {application_id: 1, description: 1, hirer: 1, workers_required: 1, closing_date: 1, labour: 1});
        let nearby_hirers = [];
        for (const hirer of hirers) {
            const apiKey = process.env.apiKey;

            const startCoordinates = location;
            let endCoordinates = await User.findOne(hirer.hirer, {location: 1});
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
                    let hirer_details = await User.findOne(hirer.hirer, {name: 1, email: 1});
                    hirer.distance = distance;
                    hirer.travelTime = travelTime;
                    hirer.hirer_name = hirer_details.name;
                    hirer.hirer_email = hirer_details.email;
                    nearby_hirers.push(hirer);
                }
            } else {
                console.error('No route found.');
            }
        };
    
        return res.status(201).json({ hirers: nearby_hirers });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}


export const create_work_application = async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id);
        if (user.working != '') return res.status(400).json({ message: 'You are already working so you cant appoint!' });

        // Generating 15digits id with current date and time so that each appointment id is unique
        // assuming that no two appointments are booked at the same time
        const currentDate = new Date();
        const options = { timeZone: 'Asia/Kolkata' };
        const formattedDate = currentDate.toLocaleDateString('en-IN', options).replace(/\//g, '');
        const formattedTime = currentDate.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' }).replace(/:/g, '');
        const formattedDateTime = `${formattedDate}T${formattedTime}`;

        const appication_id = formattedDateTime;
        await WorkApplication.create({
            application_id: appication_id,
            hirer: req.user.username,
            workers_required: req.body.workers_required,
            closing_date: req.body.closing_date,
            description: req.body.description,
            labour: req.body.labour,
            status: 'open'
        });

        return res.status(201).json({ message: 'Work application created successfully!'});

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}


export const apply_for_work = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.working != '') return res.status(400).json({ message: 'You are already working so you cant apply!' });
        
        const application_id = req.params.application_id;
        await WorkApplication.findOneAndUpdate({ application_id: application_id }, { $push: { applicants: req.user.username } });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });        
    }
}


export const view_applications = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.working != '') return res.status(400).json({ message: 'You are already working so you cant view applications!' });

        let applications = await WorkApplication.find({hirer: req.user.username}, {application_id: 1, description: 1, workers_required: 1, closing_date: 1, labour: 1, applicants: 1});
        for (application of applications) {
            let hired_workers = await HirerWorker.find({application_id: application.application_id}, {worker: 1});
            application.hired_workers = hired_workers;
        }

        return res.status(201).json({ applications: applications });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });        
    }
}


export const hire_worker = async (req, res) => {
    try {
        
        const application_id = req.params.application_id;
        const worker = req.params.worker;
        // const

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}