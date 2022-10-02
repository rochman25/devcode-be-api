const db = require('../models');

async function get(req, res, next) {
    try {
        const activityGroupId = req.query.activity_group_id;
        let data;
        if(activityGroupId){
            data = await db.Todo.findAll({
                where: {
                    'activity_group_id': activityGroupId
                }
            });
        }else{
            data = await db.Todo.findAll();
        }
        res.json({
            status: 'Success',
            message: 'Success',
            data,
        });
    } catch (error) {
        next(error);
    }
}

async function getOne(req, res, next) {
    try {
        const id = req.params.id;
        const data = await db.Todo.findOne({
            where: {
                id
            }
        });
        if(data === null){
            res.json({
                status:'Not Found',
                message: `Todo Item with ID ${id} Not Found`,
                data:{}
            });
        }
        res.json({
            status: 'Success',
            message: 'Success',
            data,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get,
    getOne,
};