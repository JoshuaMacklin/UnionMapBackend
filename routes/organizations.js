const { Router } = require('express');
const orgCtrl = require('../controllers/organizations.js');

const router = Router();

router.post('/', orgCtrl.createOrg);
router.get('/', orgCtrl.readOrg);
router.get('/all', orgCtrl.readAllOrgs);
router.patch('/', orgCtrl.updateOrg);
router.delete('/', orgCtrl.deleteOrg);

module.exports = router;
