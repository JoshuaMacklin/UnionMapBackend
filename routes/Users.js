import express from 'express'
const router = express.Router();

// User signup endpoint
router.post('/UserSignUp', async (req, res) => {
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

export default router;