// Company signup endpoint
app.post('/CompanySignUp', async (req, res) => {
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