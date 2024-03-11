const { HttpException } = require('../classes/http-error');
const { userService } = require('../services/users');
const { IdSchema, userSchema } = require('../validators');

/**
 * @api { GET } /users/:id/
 *
 * @description Get user by ID
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const getUserById = async (req, res, next) => {
  try {
    // Use the IdSchema to validate the ID
    const _id = await IdSchema.validateAsync(req.params.id, { convert: true });

    const user = await userService.getUserById(_id);

    return res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { GET } /users/
 *
 * @description Get users list
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    if (!Number.isInteger(+page) || +page < 1) {
      throw HttpException.BadRequest('Invalid page number');
    }

    if (!Number.isInteger(+limit) || +limit < 1 || +limit > 100) {
      throw HttpException.BadRequest('Invalid limit');
    }

    const users = await userService.getAllUsers({ page: +page, limit: +limit });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { POST } /users/
 *
 * @description Create user
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const createUser = async (req, res, next) => {
  try {
    const _user = await userSchema.validateAsync(
      { ...req.body },
      { stripUnknown: true },
    );

    const newUser = await userService.createUser(_user);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { PUT } /users/:id/
 *
 * @description Update user
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const updateUser = async (req, res, next) => {
  try {
    // Use the IdSchema to validate the ID
    const _id = await IdSchema.validateAsync(req.params.id, { convert: true });

    const _user = await userSchema.validateAsync(
      { ...req.body },
      { stripUnknown: true },
    );

    const updatedUser = await userService.updateUser(_id, _user);

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { DELETE } /users/:id/
 *
 * @description Delete user
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const deleteUser = async (req, res, next) => {
  try {
    // Use the IdSchema to validate the ID
    const _id = await IdSchema.validateAsync(req.params.id, { convert: true });

    await userService.deleteUser(_id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * @api { GET } /users/active/
 *
 * @description Get active users list
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const getActiveUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    if (!Number.isInteger(+page) || +page < 1) {
      throw HttpException.BadRequest('Invalid page number');
    }

    if (!Number.isInteger(+limit) || +limit < 1 || +limit > 100) {
      throw HttpException.BadRequest('Invalid limit');
    }

    const activeUsers = await userService.getActiveUsers({
      page: +page,
      limit: +limit,
    });

    res.json(activeUsers);
  } catch (error) {
    next(error);
  }
};

module.exports.usersController = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getActiveUsers,
};
