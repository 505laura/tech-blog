const sequelize = require('../config/connection');
const seedPost = require('./postData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    const users = await seedUser();
    const posts = await seedPost();
};

module.exports = {seedAll};

//seedAll();
