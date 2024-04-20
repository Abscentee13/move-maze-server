const initializeDatabaseConnection = require('../config/database');

const getUserById = async (userId) => {
    const sqlQuery = 'SELECT * FROM users WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [userId]);
};

const getUserByEmail = async (email) => {
    const sqlQuery = 'SELECT * FROM users WHERE email = ?';
    return await initializeDatabaseConnection.query(sqlQuery, [email]);
};

const getAllUsers = async () => {
    const sqlQuery = 'SELECT id, username, email, role FROM users';
    return await initializeDatabaseConnection.query(sqlQuery);
};

const createUser = async (userData) => {
    const sqlQuery = 'INSERT INTO users SET ?';
    return initializeDatabaseConnection.query(sqlQuery, userData);
};

const updateUser = async (userId, userData) => {
    const sqlQuery = 'UPDATE users SET ? WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [userData, userId]);
};

const deleteUser = async (userId) => {
    const sqlQuery = 'DELETE FROM users WHERE id = ?';
    return initializeDatabaseConnection.query(sqlQuery, [userId]);
};

const getActiveUsers = async () => {
    const currentTimeMs = Date.now();
    const activeTimePeriodMs = currentTimeMs - (15 * 60 * 1000);
    const activeTimePeriod = new Date(activeTimePeriodMs);
    const sqlQuery = 'SELECT * FROM users WHERE last_visit >= ?';
    return initializeDatabaseConnection.query(sqlQuery, [activeTimePeriod]);
};


module.exports = {
    getUserById,
    getUserByEmail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getActiveUsers
};
