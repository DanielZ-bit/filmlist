require('dotenv').config()
const express = require('express')
const app = express();
const filmRouter = require('./routes/films')
const connectDB = require("./db/connect")
const port = process.env.PORT || 4000;
const path = require("path");

app.use(express.json())

//middleware
app.use(express.static(path.join(__dirname, 'public/dist')))

app.use('/api/v1/list/films', filmRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
});


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`listening on port ${port}`))
    }
    catch (error) {
        console.log(error)
    }
}

start()