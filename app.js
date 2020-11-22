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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/home', (req, res) => {
  res.redirect('/blogs');
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

// mongo sandbox routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result});
    })
    .catch((err) => {
      console.log(err);
    })
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', {title: 'Blogs Detail', blog: result})
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    })
})

app.use((req, res) => {
  res.status(404).render('not-found', {title: '404 Not Found'});
});