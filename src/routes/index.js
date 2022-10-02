const express = require('express');

const router = express.Router();
const activityController = require('../controllers/activity');
const todoController = require('../controllers/todo');

router.get('/activity-groups', activityController.get);
router.get('/activity-groups/:id', activityController.getOne);
router.post('/activity-groups', activityController.post);
router.patch('/activity-groups/:id', activityController.update);
router.delete('/activity-groups/:id', activityController.destroy);

router.get('/todo-items', todoController.get);
router.get('/todo-items/:id', todoController.getOne);
router.delete('/todo-items/:id', todoController.destroy);

module.exports = router;
