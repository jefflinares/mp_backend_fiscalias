const express = require('express')
const app = express()
var bodyparser = require('body-parser');
var cors = require('cors');
var router = express.Router();
const port = process.env.PORT || 3000;
const back = 'Backend MP - FISCALIAS';

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use('/api',router);



router.use((request, response, next) => {
    //console.log('middleware');
    next();
});


router.route('').get((request, response) => {
    //response.sendFile('')
    response.send(back);
});


router.route('/fiscalias').get((request, response) => {
    dboperations.getFiscalias().then(result => {
        response.status(200).json(result[0]);
    });
});


router.route('/fiscalias/:id').get((request, response) => {
    dboperations.getFiscalia(request.params.id).then(result => {
        response.status(202).json(result);
    });
});

router.route('/fiscalias/:id').delete((request, response) => {
    dboperations.deleteFiscalia(request.params.id).then(result => {
        response.status(202).json(result);
    });
});


router.route('/fiscalias').post((request, response) => {

    let fiscalia = {...request.body};
    dboperations.addFiscalia(fiscalia).then(result => {
        response.status(201).json(result);
    });
});



router.route('/fiscalias').put((request, response) => {

    let fiscalia = {...request.body};
    dboperations.updateFiscalia(fiscalia).then(result => {
        response.status(202).json(result);
    });
});



const fiscalia = require('./db/model/fiscalia');
const dboperations = require('./db/operations/dbOperations');




app.get('/', (req, res) => {
  res.send(back)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})