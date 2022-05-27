const express = require('express')
const app = express()
const port = 3001
const mysql = require('promise-mysql')
const {query} = require("express");
const cors = require('cors');

app.use(cors());

app.get('/thumbnail', async (req, res) => {

    const connection = await mysql.createConnection({

        user: 'root',
        password: 'password',
        database: 'clarivate'
    })

    const thumbnails = await connection.query('SELECT * FROM `thumbnails`')
    let jsonData = thumbnails
    if (req.query.id){
        let urlId = req.query.id
        jsonData = jsonData.filter((thumbnail) => urlId == thumbnail.id)
    }

    res.json(jsonData)

})
app.use(express.json())
app.post('/thumbnail', async (req,res) => {
    const connection = await mysql.createConnection({

        user: 'root',
        password: 'password',
        database: 'clarivate'
    })
    let thumbnailId = req.body.thumbnailId
    let incrementCount = req.body.clickCount
    let query = 'UPDATE `thumbnails` SET `clickCount` = "' + incrementCount + '" WHERE `id` = "' + thumbnailId + '" '

    connection.query(query)
    res.json({
        status: 200,
        message: 'click count updated',
        data: req.body
    })
})



app.listen(port)