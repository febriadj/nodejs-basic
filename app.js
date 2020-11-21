const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

// koneksi ke database
const dbURI = 'mongodb+srv://febriadj:dbfebri26@nodetuts.z7vkh.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    app.listen(3000, 'localhost', () => {
      console.log('server running on port 3000');
    })
  })
  .catch((err) => {
    console.log(err)
  });

app.set('view engine', 'ejs');

// middleware files
app.use('/public/css', express.static('public/css'));
app.use(morgan('tiny'));

// mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'second blog',
    desc: 'this is my second blog'
  });

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5fb964f8507a1b1d60dbc7f9')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// routes
app.get('/', (req, res) => {
  const blogs = [
    {title: 'git push rejected', desc: 'bagaimana cara mengatasi git push rejected'},
    {title: 'nodejs dan expressjs', desc: 'belajar dasar nodejs dan expressjs'},
    {title: '10 bahasa pemograman terpopuler', desc: '10 bahasa pemograman terpopuler tahun 2020'}
  ]
  res.render('index', {title: 'Blogs', blogs: blogs});
});

app.get('/home', (req, res) => {
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'})
});

app.get('/about-me', (req, res) => {
  res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a New Blog'});
});

app.use((req, res) => {
  res.status(404).render('not-found', {title: '404 Not Found'});
});