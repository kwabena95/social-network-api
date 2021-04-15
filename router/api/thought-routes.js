const router = require('express').Router();
const { getAllThought, addThought, getThoughtById, updateThought, deleteThought } = require('../../controllers/thought-controller');


// user route /api/users
router.route('/').get(getAllThought);

// /api/thoughts/<Id>
router.route('/:Id')
    .get(getThoughtById)
    .post(addThought)
    .put(updateThought)
//  /api/thoughts/<userId>/thoughtId
router.route('/:thoughtId')

    .delete(deleteThought);


module.exports = router;