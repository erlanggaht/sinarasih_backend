import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import Konfigurasi from './models/postgress_connect.js'
import router from './router/route.js'
import cors from 'cors'

const app = express()
const corsOptions ={
  origin: ['https://sinarasih-backend.vercel.app/'],
  credentials: true,
  sameSite: 'none',
  
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({extended:false}))
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