const express = require('express')
const User = require('./model')


const router = new express.Router();

router.post('/create', async (req, res) => {
    console.log('here');
    try {
        const user = new User(req.body);
        console.log(user)
        await user.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).send();
    }
});


router.get('/list', async (req, res) => {
    try {
        const users = await User.find({
            isDeleted: false
        });
        res.send(users);
    } catch (error) {
        req.status(500).send();
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const user = await User.findById({
            _id: req.params.id
        });

        if(!user){
            throw new Error('User not found!');
        }

        const updates = Object.keys(req.body);

        updates.forEach(update => {
            user.set(update, req.body[update])
        });

        await user.save();
        res.send(user);

    } catch (error) {
        res.status(400).send();
    }
});


router.patch('/delete/:id', async (req, res) => {
    try {
        const user = await User.findById({
            _id: req.params.id
        });

        if(!user){
            throw new Error('User not found!');
        }

        user.set('isDeleted', true);
        
        await user.save();
        res.send(user);

    } catch (error) {
        res.status(400).send();
    }
});


module.exports = router;