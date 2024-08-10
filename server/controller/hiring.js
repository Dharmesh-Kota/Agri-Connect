import User from '../models/user.js'
import WorkApplication from '../models/work_application.js'
import HirerWorker from '../models/hirer_worker.js'
import axios from 'axios';
// import { application } from 'express';

export const work_application = async (req, res) => {
    try {
        
        let location = '';
        if (Object.keys(req.query).length > 0) {
          let lat = req.query.lat;
          let lng = req.query.lng;

            location = lat + ',' + lng;
        } else {
            location = await User.findById(req.user.id);
            location = location.location;
        }

        let hirers = await WorkApplication.find({status: 'open'}, {application_id: 1, description: 1, hirer: 1, workers_required: 1, closing_date: 1, labour: 1});
        let nearby_hirers = [];
        for (let hirer of hirers) {
            if (hirer.workers_required == 0) continue;
            if (hirer.closing_date < new Date()) continue;
            
            const apiKey = process.env.API_KEY;

            const startCoordinates = location;
            let endCoordinates = await User.findOne({username: hirer.hirer}, {location: 1});
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

                if (distance < 50) {
                    let hirer_details = await User.findOne({username: hirer.hirer}, {name: 1, email: 1});
                    let rating = await HirerWorker.find({});
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
        if (req.body.workers_required <= 0) return res.status(400).json({ message: 'Invalid number of workers!' });
        if (req.body.closing_date < new Date()) return res.status(400).json({ message: 'Invalid closing date!' });
        if (req.body.labour < 0) return res.status(400).json({ message: 'Invalid labour cost!' });

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

        await User.findOneAndUpdate({username: req.user.username}, { working: appication_id });

        return res.status(201).json({ message: 'Work application created successfully!'});

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}


export const apply_for_work = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const application_id = req.params.application_id;
        if (user.working != '') return res.status(400).json({ message: 'You are already working so you cant apply!' });
        let valid = await WorkApplication.findOne({application_id: application_id}, {applicants: 1});
        if (valid.applicants.includes(user.username)) return res.status(400).json({ message: 'You have already applied!' });

        let existing_application = await WorkApplication.findOne({application_id: application_id, status: 'open'});
        if (!existing_application) return res.status(400).json({ message: 'Application is closed!' });
        if (existing_application.applicants.includes(req.user.username)) return res.status(400).json({ message: 'You have already applied!' });

        await WorkApplication.findOneAndUpdate({ application_id: application_id, status: 'open' }, { $push: { applicants: req.user.username } });

        return res.status(201).json({ message: 'Application submitted successfully!' });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });        
    }
}


export const view_applications = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.working != '') return res.status(400).json({ message: 'You are already working so you cant view applications!' });

        let applications = await WorkApplication.find(
            { hirer: req.user.username, status: 'open' },
            { application_id: 1, description: 1, workers_required: 1, closing_date: 1, labour: 1, applicants: 1 }
        ).lean(); // This will return plain JavaScript objects instead of Mongoose documents
        
        for (let application of applications) {
            let hired_workers = await HirerWorker.find(
                { application_id: application.application_id },
                { worker: 1 }
            );
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

        const hirer = await WorkApplication.findOne({application_id: application_id, hirer: req.user.username, status: 'open'});
        if (!hirer) return res.status(400).json({ message: 'You are not the hirer of this application!' });
        let valid = await WorkApplication.findOne({application_id: application_id}, {applicants: 1});
        if (!valid.applicants.includes(worker)) return res.status(400).json({ message: 'Worker is not an applicant!' });
        valid = await User.findOne({username: worker}, {working: 1});
        if (valid.working != '') return res.status(400).json({ message: 'Worker is already working!' });

        let working = await User.findOne({username: worker}, {working: 1});
        if (working.working != '') {
            await WorkApplication.findOneAndUpdate({application_id: application_id}, { 
                $pull: { applicants: worker },
            });
            return res.status(400).json({ message: 'Worker is already working!' });
        }

        let application = await WorkApplication.findOne({application_id: application_id}, {workers_required: 1});
        if (application.workers_required == 0) return res.status(400).json({ message: 'No workers required!' });
        
        await HirerWorker.create({
            application_id: application_id,
            worker: worker,
            status: 'ongoing'
        });

        await WorkApplication.findOneAndUpdate({application_id: application_id}, { 
            $pull: { applicants: worker },
            $inc: { workers_required: -1 }
        });

        await User.findOneAndUpdate({username: worker}, { working: application_id });

        return res.status(201).json({ message: 'Worker hired successfully!' });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}


export const free_worker = async (req, res) => {
    try {
        
        const application_id = req.params.application_id;
        const worker = req.params.worker;

        const hirer = await WorkApplication.findOne({application_id: application_id, hirer: req.user.username, status: 'open'});
        if (!hirer) return res.status(400).json({ message: 'You are not the hirer of this application!' });
        const valid = await HirerWorker.findOne({application_id: application_id, worker: worker, status: 'ongoing'});
        if (!valid) return res.status(400).json({ message: 'Worker is not hired!' });

        let rating = 0;
        if (req.body.hirer_rating > 5) rating = 5;
        else if (req.body.hirer_rating <= 0) rating = 1;
        else rating = req.body.hirer_rating;

        await HirerWorker.findOneAndUpdate({application_id: application_id, worker: worker}, { status: 'completed', hirer_rating: rating });
        await User.findOneAndUpdate({username: worker}, { working: '' });
        await WorkApplication.findOneAndUpdate({application_id: application_id}, { $inc: { workers_required: 1 } });

        return res.status(201).json({ message: 'Worker freed successfully!' });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}


export const cancel_application = async (req, res) => {
    try {
        
        const application_id = req.params.application_id;
        const valid = await HirerWorker.findOne({application_id: application_id, worker: req.user.username, status: 'ongoing'});
        if (!valid) return res.status(400).json({ message: 'You are not hired!' });

        let rating = 0;
        if (req.body.worker_rating > 5) rating = 5;
        else if (req.body.worker_rating <= 0) rating = 1;
        else rating = req.body.worker_rating;
        await HirerWorker.findOneAndUpdate({application_id: application_id, worker: req.user.username}, { status: 'cancelled', worker_rating: rating });
        await User.findOneAndUpdate({username: req.user.username}, { working: '' });
        await WorkApplication.findOneAndUpdate({application_id: application_id}, { $inc: { workers_required: 1 } });

        return res.status(201).json({ message: 'Application cancelled successfully!' });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}


export const delete_application = async (req, res) => {
    try {
        
        const application_id = req.params.application_id;
        const hirer = await WorkApplication.findOne({application_id: application_id, hirer: req.user.username});
        if (!hirer) return res.status(400).json({ message: 'You are not the hirer of this application!' });
        if (hirer.status == 'closed') return res.status(400).json({ message: 'Application is already closed!' });
        
        const workers = await HirerWorker.find({application_id: application_id}, {status: 1});
        for (let worker of workers) {
            if (worker.status == 'ongoing') return res.status(400).json({ message: 'Application has ongoing workers. First free them!' });
        }

        await WorkApplication.findOneAndUpdate({application_id: application_id}, { status: 'closed' });

        let remaining_applications = await WorkApplication.find({hirer: req.user.username, status: 'open'});
        if (remaining_applications.length == 0) {
            await User.findOneAndUpdate({username: req.user.username}, { working: '' });
        }

        return res.status(201).json({ message: 'Application closed successfully!' });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}


export const update_application = async (req, res) => {
    try {
        
        const application_id = req.params.application_id;
        const hirer = await WorkApplication.findOne({application_id: application_id, hirer: req.user.username});
        if (!hirer) return res.status(400).json({ message: 'You are not the hirer of this application!' });
        if (req.body.workers_required < 0) return res.status(400).json({ message: 'Invalid number of workers!' });
        if (req.body.closing_date < new Date()) return res.status(400).json({ message: 'Invalid closing date!' });

        await WorkApplication.findOneAndUpdate({application_id: application_id}, req.body);

        return res.status(201).json({ message: 'Application updated successfully!' });

    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ error: error });
    }
}