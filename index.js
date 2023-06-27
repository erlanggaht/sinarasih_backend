import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import Konfigurasi from './models/postgress_connect.js'
import router from './router/route.js'
import cors from 'cors'
import cloudinary from 'cloudinary'

const app = express()

app.use(cors())

cloudinary.config({ 
  cloud_name: 'djsizjaee', 
  api_key: '462791252649381', 
  api_secret: 'VOZO0QsbsRQBZTaRQU7I3HUVqMc' 
});

app.use(bodyParser.json())

const Connect_DB = new Konfigurasi

app.use(router)

app.listen(process.env.PORT,()=>{
    console.log(`konek ke port ${process.env.PORT}`)
})


  Connect_DB.Client.connect((err) => {
    if(!err) console.log('Berhasil konek ke database')
    else console.log('gagal konek ke database')
  })