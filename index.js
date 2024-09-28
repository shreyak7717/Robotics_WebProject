const express = require('express');
const app = express()
app.set("view engine", "ejs");
const routes = require('./routes/routes'); // Import routes from routes.js
app.set("views", __dirname + '/views');
app.use(express.static('./assets'));
app.use(express.static('./scripts'));
app.use(express.static('./apps'));

const PORT = 3000;

app.use('/',routes);


app.listen(PORT, (error) => {
  if (error) {
    console.log("Error connecting with server", error);
  } else {
    console.log(`Server is listening on port -> ${PORT}`);
    console.log(`\n\nhttp://localhost:${PORT}\n\n`);
  }
});