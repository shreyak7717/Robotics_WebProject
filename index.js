const express = require('express');
const app = express()
app.set("view engine", "ejs");
app.set("views", __dirname + '/views');
app.use(express.static('./assets'));
app.use(express.static('./scripts'));
app.use(express.static('./apps'));

app.get('/',(req,res)=>{
    res.render('resources')
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
