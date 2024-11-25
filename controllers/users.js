const User = require('../models/User');
const argon2 = require('argon2');

module.exports = {
  createUser,
  loginUser,
  readUser,
  updateUser,
  deleteUser
};

async function createUser(req, res) {
  console.log(req.body)
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).send('Username, email, and password are required');
    }

    //password validation
    if (password.length < 5) {
      return res.status(400).send('Password must be more than 5 characters');
    }

    //hashing the password before saving
    try {
      const hash = await argon2.hash(password); 

      const newUser = new User({
        username,
        email,
        password: hash 
      });
      
      try{
        await User.create(newUser);
  
        res.status(201).send("User has been created");
      }catch (err){
        res.status(404).send(err.errmsg)
      }

    } catch (err) {
      res.status(404).send(`Please try again: ${err}`)
    }

  } catch (err) {
    res.status(400).json(`Internal Server Error: ${err}`);
  }
}

async function loginUser(req, res) {
  console.log(req.body)
  try {
    let { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).send('Username, email, and password are required');
    }

    //password validation
    if (password.length < 5) {
      return res.status(400).send('Password must be more than 5 characters');
    }

    // check if password + hashed is same
    const user = await User.findOne({username});
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // const { id, username, email, organizations } = user;
    
    try {
      if (await argon2.verify(user.password, password)) {
        res.status(200).send("User Validated");
      } else {
        res.status(400).send("Incorrect Password");
      }
    } catch (err) {
      res.status(404).send(`Please try again: ${err}`)
    }

  } catch (err) {
    res.status(400).json(`Internal Server Error: ${err}`);
  }
}

async function readUser(req, res) {
  try {
    const userId = req.params.id || req.body.id;
    console.log(req.params.id);

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { id, username, email, organizations } = user;
    
    res.status(200).json({ id, username, email, organizations });
  } catch (err) {
    res.status(500).json('Server Error');
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id || req.body.id;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json('Server Error');
  }
}

async function deleteUser(req, res) {
  try {
    // Get the user ID from the request body or params
    const userId = req.params.id || req.body.id;

    // Check if the user ID is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    // Check if the user was deleted successfully
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json(`Internal Server Error: ${err}`);
  }
}