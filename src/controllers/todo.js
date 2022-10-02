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
            },404);
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

async function post(req, res, next) {
    try {
        const {
            title,
            activity_group_id
        } = req.body;
        await db.Todo.create({
            title,
            activity_group_id
        }).then((item) => {
            return res.json({
                status: 'Success',
                message: 'Success',
                data: item,
            });
        }).catch((error) => {
            if (typeof error.errors != 'undefined') {
                if (typeof error.errors.length != 'undefined' && error.errors.length > 0) {
                    let messages = "";
                    error.errors.forEach(function (item) {
                        messages = messages.concat(item.message);
                    });
                    let errorStatus = {
                        statusMessage: "Bad Request",
                        statusCode: 400,
                        stack: messages,
                    }
                    next(errorStatus);
                } else {
                    next(error.message);
                }
            } else {
                next(error.message);
            }
        });
    } catch (error) {
        next(error.message);
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const todo = await db.Todo.findOne({
            where: {
                id
            }
        });

        if (todo === null) {
            return res.json({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
                data: {}
            },404);
        }

        const {
            title,
            activity_group_id
        } = req.body;
        await todo.update({
            title,
            activity_group_id
        }).then((item) => {
            return res.json({
                status: 'Success',
                message: 'Success',
                data: item,
            });
        }).catch((error) => {
            if (typeof error.errors != 'undefined') {
                if (typeof error.errors.length != 'undefined' && error.errors.length > 0) {
                    let messages = "";
                    error.errors.forEach(function (item) {
                        messages = messages.concat(item.message);
                    });
                    let errorStatus = {
                        statusMessage: "Bad Request",
                        statusCode: 400,
                        stack: messages,
                    }
                    next(errorStatus);
                } else {
                    next(error.message);
                }
            } else {
                next(error.message);
            }
        });
    } catch (error) {
        next(error.message);
    }
}

async function destroy(req, res, next) {
    try {
        const id = req.params.id;
        const todo = await db.Todo.findOne({
            where: {
                id
            }
        });

        if (todo === null) {
            return res.json({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
                data: {}
            },404);
        }

        await todo.destroy();
        return res.json({
            status: 'Success',
            message: 'Success',
            data: {},
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get,
    getOne,
    post,
    update,
    destroy,
};
