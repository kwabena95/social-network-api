const router = require('express').Router();
const { getAllThought, addThought } = require('../../controllers/thought-controller');


// user route /api/users
router.route('/').get(getAllThought).post(addThought);

module.exports = router;