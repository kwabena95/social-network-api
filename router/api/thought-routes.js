const router = require('express').Router();
const { getAllThought, addThought, getThoughtById, updateThought, deleteThought } = require('../../controllers/thought-controller');


// user route /api/users
router.route('/').get(getAllThought);

// /api/thoughts/<Id>
router.route('/:Id')
    .get(getThoughtById)
    .post(addThought)

//  /api/thoughts/<userId>/thoughtId
router.route('/:userId/:thoughtId')
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;