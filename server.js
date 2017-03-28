const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

const port    = process.env.port || 3000;
let app = express();

app.use((req, res, next)=>{
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append file.');
    }
  });
  console.log(log);
  next();
});





app.use(express.static(__dirname+'/public'));

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',  ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',  (text)=>{
  return text.toUpperCase();
});

app.get('/', (req, res)=>{

  res.render('home.hbs', {
    pageTitle: 'Home',
    message: 'Welcome to our home page'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to fulfill request'
  });
});

app.get('/projects', (req, res)=>{
  res.render('project.hbs', {
    pageTitle: 'Project page',
    message: 'Welcome to my project page'
  });
});


app.listen(port, ()=>{
  console.log(`Server is up & running on port ${port}`);
});
