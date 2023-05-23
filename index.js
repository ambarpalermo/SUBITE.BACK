const express = require('express');
const app = express();

function logger(req, res, next) {
    console.log(`Route Recieved: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(express.json());
app.use(logger);

//SETUP ---------------------------------------------------------------------------------------------

app.get('/hard', (req, res) => {
    //recibo datos hard
})

app.post('/IA', (req, res) => {
    console.log(req.body)
    console.log("recibido")
    let {personas} = req.body
    personas = parseInt(personas);
    console.log(personas)

    res.json({message: "juanelson"})
})

//config-----------------------------------------------------------------------------------

app.listen(5000, () => {
    console.log('Server on port 5000');
});