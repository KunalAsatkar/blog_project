const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const _ = require('lodash');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

let arr = [];
const homeInfo = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia ducimus quae voluptatibus? Expedita, aliquid molestias iure corrupti quod explicabo, eaque rem sequi magnam cupiditate illum, dolorem placeat quaerat eum minus tenetur delectus earum rerum nam saepe sit assumenda! Neque, deserunt mollitia! Tempore delectus atque architecto quas corporis sequi aperiam ad."
const aboutInfo = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, quisquam. Tempora sed labore, cupiditate modi quod sint, tenetur vitae excepturi repellat voluptas mollitia sapiente iusto nisi numquam a ea laudantium aliquid nobis magni similique optio? Magnam eius magni ab. Reiciendis inventore doloribus neque deserunt veniam sapiente aliquam maxime! Aspernatur, eius?"
const contactInfo = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates totam expedita quae officia id ipsam odit deleniti est, mollitia a impedit illum velit soluta saepe! Necessitatibus delectus accusamus blanditiis provident similique dolorum deleniti rem voluptate deserunt, voluptatibus architecto perspiciatis nemo eum eaque. Possimus quod est iure ducimus consequuntur ea aperiam."
// let home = {
//     title: "home",
//     content: homeInfo
// }
// arr.unshift(home);
app.get('/', function (req, res) {
    res.render('index', { homeInfo: homeInfo, arr: arr });
})

app.get('/about', (req, res) => {
    res.render('about', { aboutInfo: aboutInfo });
})

app.get('/contact', (req, res) => {
    res.render('contact', { contactInfo: contactInfo });
})

app.get('/compose', (req, res) => {
    res.render('compose');
})
app.post('/compose', (req, res) => {
    let post = {
        title: req.body.postTitle,
        content: req.body.postContent
    }
    arr.push(post);
    // console.log(arr.length);
    res.redirect('/');
})


app.get('/post/:topic', (req, res) => {
    //_.function_name
    arr.forEach(function (data) {
        if (_.lowerCase(data.title) === _.lowerCase(req.params.topic)) {
            res.render('post', { data: data });
        }
    });
})





app.listen(port, function () {
    console.log("server is running on " + port);
})