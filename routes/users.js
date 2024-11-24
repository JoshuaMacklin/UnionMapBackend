const { Router } = require('express');
const usersCtrl = require('../controllers/users.js');

const router = Router();

router.post('/', usersCtrl.createUser);
router.get('/', usersCtrl.readUser);
router.patch('/', usersCtrl.updateUser)
router.delete('/', usersCtrl.deleteUser);


module.exports = router;
