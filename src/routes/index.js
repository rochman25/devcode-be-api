const express = require('express');

const router = express.Router();
const activityController = require('../controllers/activity');

router.get('/activity-groups', activityController.get);
router.get('/activity-groups/:id', activityController.getOne);

module.exports = router;
