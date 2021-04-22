const router = require('express').Router();
const { getAllThought, addThought, getThoughtById, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller');


// user route /api/users
router.route('/').get(getAllThought);

// /api/thoughts/<Id>
router.route('/:thoughtId').get(getThoughtById)

router.route('/:userId').post(addThought)

//  /api/thoughts/thoughtId
router.route('/:thoughtId').put(updateThought)

//  /api/thoughts/thoughtId
router.route('/:thoughtId').delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/:reactionId').delete(deleteReaction);


module.exports = router;