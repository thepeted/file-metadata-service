'use strict'
const express = require('express')
const multer = require('multer')
const path = require('path')
const upload = multer()

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.post('/uploads', upload.single('file'), (req, res) => {
  try {
    res.json({ 
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      encoding: req.file.encoding
    })
  }
  catch(e) {
    console.log(e)
    res.json({ error: 'Sorry, something went wrong' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('listening on port ' + port))
