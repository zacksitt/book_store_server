const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const cauth = require("./middleware/cauth")

app.use(bodyParser.json());
app.use(cors());
// enable files upload
app.use(fileUpload({
    
    limits: {
        fileSize: 7 * 1024 * 1024 // 1 MB
    },
    abortOnLimit: true,
    createParentPath: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'));

const customerCtrl = require("./controllers/customerController")
const saleCtrl = require("./controllers/saleController");
const bookCtrl = require("./controllers/bookController");
app.post('/api/signin',customerCtrl.sign_in)
app.post('/api/signup',customerCtrl.sign_up)

app.post('/api/auth/sale',cauth,saleCtrl.create)
app.post('/api/auth/book',cauth,bookCtrl.create)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});