const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer();

app.post('/api/fileanalyse', (req, res) => {
    return upload.single('upfile')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(422).json({ err });
        }
        const file = req.file;
        return res.json({
            name: file.originalname,
            type: file.mimetype,
            size: file.size
        });
    });
});

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port);
});
