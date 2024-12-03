const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path')
const hbs = exphbs.create({
    extname: '.hbs', 
    layoutsDir: path.join(__dirname, './views/hbs'),  
    partialsDir: path.join(__dirname, './views/hbs'), 
});

app.engine('.hbs', hbs.engine); 
app.set('view engine', '.hbs');  
app.set('views', path.join(__dirname, './views/hbs'));
app.use(express.static('./assets'));
app.use(express.static('./scripts'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './views/hbs'))); 


const PORT = 3002;



app.get('/', async (req, res) => {
    res.render('home');
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error connecting with server", error);
  } else {
    console.log(`Server is listening on port -> ${PORT}`);
    console.log(`\n\nhttp://localhost:${PORT}\n\n`);
  }
});


