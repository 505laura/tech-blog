const { User } = require('../models');
const crypto = require('crypto');

const randomString = (n) => crypto.randomBytes(n).toString('hex')


const randomEmail = () => `${randomString(8)}@gmail.com`;

const randomPassword = () => randomString(8);

const randomUsername = () => randomString(5);

const randomGender = () => Math.random() > 0.5 ? 'Male' : 'Female';

const randomTelephone = () => Math.floor(Math.random() * (10 ** 9));

const generateUser = (role) => ({
    email: randomEmail(),
    password: randomPassword(),
    username: randomUsername(),
    gender: randomGender(),
    role
})

const userData = Array(10).fill(0).map(() => generateUser('User'));

const seedUser = async() => {
    await User.create(    {
        email: 'testuser@gmail.com',
        password: '16Gh#00l',
        username: 'amyslay123',
        gender: 'Female',
        role: 'Admin'
    })
    await User.bulkCreate(userData, {
        individualHooks: true,
    });
}

module.exports = seedUser;

