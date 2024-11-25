const Org = require('../models/Organization');

module.exports = {
  createOrg,
  readOrg,
  readAllOrgs,
  updateOrg,
  deleteOrg
};

async function createOrg(req, res) {
  try {
    const { managerId, name, address, description } = req.body;

    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${process.env.GEOAPIFY_KEY}`);
    const data = await response.json();
    
    if (!data) {
      res.status(404).send("Please try a more descriptive address")
    }

    console.log(data.results[0].lon);
    console.log(data.results[0].lat)

    const newOrg = new Org({
      managerId,
      name,
      address,
      description,
      lon: data.results[0].lon,
      lat: data.results[0].lat
    });

    const org = await Org.create(newOrg);

    res.status(200).json(org);
  } catch (err) {
    res.status(400).json(`Server Error: ${err}`);
  }
}

async function readAllOrgs(req, res) {
  try {
    const orgs = await Org.find({});
    
    if (!orgs) {
      return res.status(404).json({ message: 'no organizations not found' });
    }
    
    res.status(200).json(orgs);
  } catch (err) {
    res.status(500).json('Server Error');
  }
}

async function readOrg(req, res) {
  try {
    const orgId = req.params.id || req.body.id;

    const org = await Org.findById(orgId);
    
    if (!org) {
      return res.status(404).json({ message: 'organization not found' });
    }
    
    res.status(200).json(org);
  } catch (err) {
    res.status(500).json('Server Error');
  }
}

async function updateOrg(req, res) {
  try {
    const orgId = req.params.id || req.body.id;

    const updatedOrg = await Org.findByIdAndUpdate(orgId, req.body, { new: true });
    
    if (!updatedOrg) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    
    res.status(200).json(updatedOrg);
  } catch (err) {
    res.status(500).json('Server Error');
  }
}

async function deleteOrg(req, res) {
  try {
    // Get the org ID from the request body or params
    const orgId = req.params.id || req.body.id;

    // Check if the org ID is provided
    if (!orgId) {
      return res.status(400).json({ message: 'Organization ID is required' });
    }

    // Delete the Org
    const deletedOrg = await Org.findByIdAndDelete(orgId);

    // Check if the Org was deleted successfully
    if (!deletedOrg) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (err) {
    res.status(400).json(`Internal Server Error: ${err}`);
  }
}
