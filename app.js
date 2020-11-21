const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use('/views/css', express.static('views/css'));

app.listen(3000, 'localhost', () => {
  console.log('server running on port 3000');
})

app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'git push rejected', 
      desc: 'bagaimana cara mengatasi git push rejected'
    },
    {
      title: 'nodejs dan expressjs', 
      desc: 'belajar dasar nodejs dan expressjs'
    },
    {
      title: '10 bahasa pemograman terpopuler', 
      desc: '10 bahasa pemograman terpopuler tahun 2020'
    }
  ]
  res.render('index', {title: 'Blogs', blogs: blogs});
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'})
})

app.get('/about-me', (req, res) => {
  res.redirect('/about');
})

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a New Blog'});
})

app.use((req, res) => {
  res.status(404).render('not-found', {title: '404 Not Found'});
})