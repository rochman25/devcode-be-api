const db = require('../models');

async function get(req, res, next) {
  try {
    const page = req.query.page !== undefined ? req.query.page : 1;
    const limit = 10;
    const data = await db.User.findAll({
      include: db.Task,
      offset: ((page - 1) * limit),
      limit,
      duplicating: false,
      subQuery: false,
    });
    res.json({
      status: 'Success',
      message: 'Successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function post(req, res, next) {
  try {
    const { firstName, lastName, age } = req.body;
    await db.User.create({
      firstName, lastName, age,
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
    const user = await db.User.findOne({ where: { id: req.params.id } });
    const { firstName, lastName, age } = req.body;
    await user.update({
      firstName, lastName, age,
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
      where: { id: req.params.id },
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
  get, post, update, destroy,
};