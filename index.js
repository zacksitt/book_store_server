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
const feedbackCtrl = require("./controllers/feedbackController")
//autho
app.post('/api/signin',customerCtrl.sign_in)
app.post('/api/signup',customerCtrl.sign_up)
//customers
app.get('/api/auth/customers',cauth,customerCtrl.get)
app.put('/api/auth/customer',cauth,customerCtrl.update)
app.delete('/api/auth/customer',cauth,customerCtrl.del)
//sale
app.post('/api/auth/sale',cauth,saleCtrl.create)
app.get('/api/auth/sales',cauth,saleCtrl.get)
//books
app.put('/api/auth/book',cauth,bookCtrl.create)
app.delete('/api/auth/book',cauth,bookCtrl.del)
app.post('/api/auth/book',cauth,bookCtrl.create)
app.get('/api/auth/books',cauth,bookCtrl.get)
//feedback
app.get('/api/auth/feedbacks',cauth,feedbackCtrl.get)
app.post('/api/auth/feedback',cauth,feedbackCtrl.create)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});