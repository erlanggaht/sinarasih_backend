import { Client } from "../models/postgress_connect.js"
import jwt from 'jsonwebtoken'

class Akun_Karyawan {
   
    // Tambah Akun
    static addAkun = (req,res) => {
        const {username,password} = req.body
        const query = Client.query(`INSERT INTO akun_karyawan (id,username,password) values(default,
            '${username}', 
            '${password}'
        )`,(err,result) => {
            if(!err) res.status(201).json({message:'daftar berhasil'})
            else (res.status(400).json({message:'ada kesalahan saat melakukan daftar'}))
        }) 
    }


    static loginAkun =  (req,res) => {
       const {username,password} = req.body 
       const getUser =  Client.query(`SELECT * FROM akun_karyawan where username = '${username}' and password = '${password}'`,(err,result) => {
        if(!result.rowCount) return res.status(401).json({message:"akun belum terdaftar. silahkan daftar"})
        // Jika Berhasil Login 
        const create_refreshtoken =  jwt.sign({name : username},process.env.TOKEN_RAHASIA,{
            expiresIn : '1h',
            algorithm : "HS256"
        },(err,token) => {
            if(token) {
                Client.query(`UPDATE akun_karyawan set refresh_token = '${token}' `)
            }
            if(err) console.log('ada kesalahan saat membuat refresh_token')
        })
        const create_accesstoken =  jwt.sign({name : username},process.env.TOKEN_RAHASIA,{
            expiresIn : '30s',
            algorithm : "HS256"
        },(err,token) => {
            if(token) {
                Client.query(`UPDATE akun_karyawan set akses_token = '${token}' `)
            }
            if(err) console.log('ada kesalahan saat membuat access_token')
        })
        res.cookie('token','tknsadasdsa')      
               
       })



    }

}

export default Akun_Karyawan