const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')


const DB_URI = 'mongodb+srv://issue-tracker:issue-tracker@issue-tracker-75nez.mongodb.net/test?retryWrites=true&w=majority';

//Connecting to our mongodb database
mongoose.connect(DB_URI)
    .catch(err => console.log(err))
    .then(() => {
        console.log("Connected to DB")
    })

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const UserModel = require('./models/user.model');
//Create user
app.post('/user', (req, res, next) => {
    let user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    console.log(req.body);
    UserModel.create(user, (err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    })
})

app.get('/user', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

app.get('/userById/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})
app.put('/user', (req, res) => {
    UserModel.update({ _id: req.body.id }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

//Delete  user
app.delete('/user/:id', (req, res, next) => {
    const id = req.params.id;
    UserModel.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

app.post('/login', (req, res, next) => {
    UserModel.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result == null) {
            res.json({
                message: "User not found",
                loggedIn: false
            })
            return;
        }
        console.log(result+"erererer");
        if (req.body.password == result.password) {
            res.json({
                message: "Logged in successfully",
                loggedIn: true
            })
            return;
        }
        res.json({
            message: "Password error",
        })
    })
})

// Issue Routes
const IssueModel = require('./models/issue.model');

app.post('/issue', (req, res) => {
    IssueModel.create(req.body, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

// Issue Delete
app.delete('/issue/:id', (req, res) => {
    IssueModel.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})
app.get('/issue/', (req, res) => {
    IssueModel.find({}, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})
app.put('/issue/:id', (req, res) => {
    let obj = {};
    if (req.body.resolved) {
        obj.resolved = req.body.resolved
        obj.resolved_at = Date.now();
    }
    if (req.body.title) {
        obj.title = req.body.title;
    }
    IssueModel.updateOne({ _id: req.params.id }, obj, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})


app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => { res.sendFile(path.join(__dirname + '/client/index.html')) }
)
app.get('/dashboard', (req, res) => { res.sendFile(path.join(__dirname + '/client/dashboard.html')) }
)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))