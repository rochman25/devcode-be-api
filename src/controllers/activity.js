const db = require('../models');

async function get(req, res, next) {
    try {
        const data = await db.Activity.findAll();
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
        const data = await db.Activity.findOne({
            where: {
                id
            }
        });
        if(data === null){
            res.json({
                status:'Not Found',
                message: `Activity with ID ${id} Not Found`,
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

async function post(req, res, next) {
    try {
        const {
            firstName,
            lastName,
            age
        } = req.body;
        await db.User.create({
            firstName,
            lastName,
            age,
        }).then((item) => {
            res.json({
                status: 'success',
                message: 'Successfully create new user',
                code: 200,
                data: item,
            });
        }).catch((error) => {
            if (error.name === 'SequelizeUniqueConstraintError') {
                next(error.errors[0].message);
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
        const user = await db.User.findOne({
            where: {
                id: req.params.id
            }
        });
        const {
            firstName,
            lastName,
            age
        } = req.body;
        await user.update({
            firstName,
            lastName,
            age,
        });
        await user.save();
        res.json({
            status: 'success',
            message: 'Successfully updated user data',
            code: 200,
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

async function destroy(req, res, next) {
    try {
        await db.User.destroy({
            where: {
                id: req.params.id
            },
        });
        res.json({
            status: 'success',
            message: 'Successfully delete user data',
            code: 200,
            data: [],
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