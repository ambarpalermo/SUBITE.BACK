const express = require('express');
const app = express();

function logger(req, res, next) {
    console.log(`Route Recieved: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(express.json());
app.use(logger);

//SETUP ---------------------------------------------------------------------------------------------

app.post('/hard', (req, res) => {
    console.log(req.body)
    console.log("recibido.hard")
    let {temp} = req.body
    console.log(temp)

    res.json({message: "hola kuki"})
})

app.post('/IA', (req, res) => {
    console.log(req.body)
    console.log("recibido.IA")
    let {personas} = req.body
    console.log(personas)
    //db.conexiones
    res.json({message: "hola juana"})
})

app.get('/IAdatos', (req, res) =>{
    //con.query select datos para thiago
})

//config-----------------------------------------------------------------------------------

app.listen(5000, () => {
    console.log('Server on port 5000');
});