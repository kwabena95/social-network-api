const router = require('express').Router();
const { getAllThought, addThought, getThoughtById, updateThought, deleteThought } = require('../../controllers/thought-controller');


// user route /api/users
router.route('/').get(getAllThought);

// /api/thoughts/<Id>
router.route('/:thoughtId').get(getThoughtById)

router.route('/:userId').post(addThought)

//  /api/thoughts/thoughtId
router.route('/:thoughtId').put(updateThought)

//  /api/thoughts/thoughtId
router.route('/:thoughtId').delete(deleteThought);


module.exports = router;