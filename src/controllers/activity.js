const db = require('../models');

async function get(req, res, next) {
    try {
        const data = await db.Activity.findAll();
        return res.json({
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
        const data = await db.Activity.findOne({
            where: {
                id
            }
        });
        if (data === null) {
            return res.json({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
                data: {}
            },404);
        }
        return res.json({
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
            email
        } = req.body;
        await db.Activity.create({
            title,
            email
        }).then((item) => {
            return res.json({
                status: 'Success',
                message: 'Success',
                data: item,
            });
        }).catch((error) => {
            if (typeof error.errors !== undefined && error.errors.length > 0) {
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
        });
    } catch (error) {
        next(error.message);
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const activity = await db.Activity.findOne({
            where: {
                id
            }
        });

        if (activity === null) {
            return res.json({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
                data: {}
            },404);
        }

        const {
            title,
            email
        } = req.body;
        if(req.body.title == null){
            let errorStatus = {
                statusMessage: "Bad Request",
                statusCode: 400,
                stack: "title cannot be null",
            }
            return next(errorStatus);
        }
        await activity.update({
            title,
            email,
        });
        await activity.save();
        return res.json({
            status: 'Success',
            message: 'Success',
            data: activity,
        });
    } catch (error) {
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
    }
}

async function destroy(req, res, next) {
    try {
        const id = req.params.id;
        const activity = await db.Activity.findOne({
            where: {
                id
            }
        });

        if (activity === null) {
            return res.json({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
                data: {}
            },404);
        }

        await activity.destroy();
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