const { Post } = require('../models');

const postData = [
    {
        title: 'Express Handlebars',
        category: 'Express',
        content: 'HandleBars can be used to render web pages to the client side from data on the server-side.',
        image: 'https://picsum.photos/300/200',
        views: 2,
        user_id: 0
    },
    {
        title: 'ORMs',
        category: 'Database',
        content: 'An ORM system is a technique where you use an object-oriented paradigm to create a mapping between application and database to perform data manipulation and query directly.',
        image: 'https://picsum.photos/150/100',
        views: 5,
        user_id: 1
    },
    {
        title: 'Database Normalisation',
        category: 'Database',
        content: 'Database normalisation is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity.',
        image: 'https://picsum.photos/600/400',
        views: 1,
        user_id: 2
    },
    {
        title: 'DRY',
        category: 'Best practices',
        content: 'DRY code is a software principle that stands for Don\'t Repeat Yourself, where the goal is to reduce the repetition of code.',
        image: 'https://picsum.photos/900/600',
        views: 6,
        user_id: 3
    }
];

const seedPost = () => Post.bulkCreate(postData, {
    individualHooks: true,
});

module.exports = seedPost;
