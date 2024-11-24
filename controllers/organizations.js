const Org = require('../models/Organization');

module.exports = {
  createOrg,
  readOrg,
  updateOrg,
  deleteOrg
};

async function createOrg(req, res) {
  try {
    const org = await Org.create(req.body);

    res.status(200).json(org);
  } catch (err) {
    res.status(400).json('No Beuno:(');
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
