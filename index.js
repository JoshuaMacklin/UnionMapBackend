import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './db/connect.js'

import User from './models/user.js'
import Company from './models/company.js'

dotenv.config()
connect()

const app = express()
const PORT = process.env.PORT || 4000

//Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Routes
app.get('/', async (req, res) => {
    res.send("API Started")
})

app.post('/UserSignUp', async (req, res) => {
    try {
        // Extract the user data from the request body
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('Username, email, and password are required');
        }

        const newUser = new User({
            username,
            email,
            password // should hash the password before saving it
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).send('User signed up successfully');
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error}`);
    }
});

    // Company signup endpoint
app.post('/Company', async (req, res) => {
    try {
        // Extract the user data from the request body
        const { username, email, password, address } = req.body;

        if (!username || !email || !password || !address) {
            return res.status(400).send('Username, email, password, and address are required');
        }

        const newCompany = new Company({
            username,
            email,
            password, // should hash the password before saving it
            address
        });

        // Save the user to the database
        await newCompany.save();
        // add code to save the company data to mongoose

        res.status(201).send('Company signed up successfully');
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error}`);
    }
});

app.delete('/Company', async (req, res) => {
    try {
        // Extract the username from the request body or query parameters
        const { username } = req.body;

        if (!username) {
            return res.status(400).send('Username is required');
        }

        // Find and remove the company by username
        await Company.findOneAndRemove({ username });

        res.status(200).send('Company deleted successfully');
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error}`);
    }
});



//Error handler
app.use((err, req, res, next) => {
    res.status(500).json({error})
}) 

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

