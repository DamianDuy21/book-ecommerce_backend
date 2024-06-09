const express = require('express')
const cors = require('cors')
const configStaticFiles = require('./config/staticFiles');
const userRouter = require('./routes/userRouter');
const connection = require('./config/database');
const fileUpload = require("express-fileupload")
require("dotenv").config()


const app = express()
app.use(cors({
    origin: '*',
    credentials: true,
}))
const port = process.env.PORT || 8081
const hostname = process.env.HOST_NAME || "localhost";

//config static files
configStaticFiles(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config middleware
app.use(fileUpload())

app.use('/v1/api/user', userRouter);


//test connection
(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Example app listening on ${hostname}, port ${port}`)
        })

    }
    catch (error) {
        console.log("Error connection:", error)
    }
})()

