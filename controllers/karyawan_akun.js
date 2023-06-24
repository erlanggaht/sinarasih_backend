import { Client } from "../models/postgress_connect.js"
import jwt from 'jsonwebtoken'

import Query_Akun from "./query/query_akun.js"


// Query
export const {
    query_getTokenMasterAdmin,
    query_addAkunKaryawan,
    query_updateRefreshToken,
    query_updateAksesToken
} = Query_Akun

class Akun_Karyawan {
   
    // Tambah Akun
    static addAkun =  (req,res) => {
        const {username,password,token, nama,deskripsi,posisi,ig} = req.body
        // Cek Token Master Admin
            const query_ma =  Client.query(query_getTokenMasterAdmin(token),(err,result) => {
                if(result.rowCount === 0) {
                    return res.status(401).json({message : "Token Karyawan Salah! silahkan tanyakan ke yg bersangkutan"})  
                }
                
            const query = Client.query(query_addAkunKaryawan(username,password),async (err,result) => {
                    if(!err) {
                        const query_add = Client.query(await query_addData(nama,deskripsi,posisi,ig),(err) => {
                           if(!err) res.status(201).json({message:'daftar akun karyawan berhasil'})
                           if(err) res.status(400).json({messageError:'ada kesalahan saat memasukan data karyawan'})
                        })
                    }
                    else res.status(400).json({message:'ada kesalahan saat melakukan daftar'})
                }) 
    
            })
    }


    static loginAkun =  (req,res) => {
       const {username,password} = req.body 
       const getUser =  Client.query(query_addAkunKaryawan(username,password),(err,result) => {
        if(!result.rowCount) return res.status(401).json({message:"akun belum terdaftar. silahkan daftar"})
        // Jika Berhasil Login 
        const create_refreshtoken =  jwt.sign({name : username},process.env.TOKEN_RAHASIA,{
            expiresIn : '1h',
            algorithm : "HS256"
        },(err,token) => {
            if(token) {
                Client.query(query_updateRefreshToken(token,username))
            }
            if(err) console.log('ada kesalahan saat membuat refresh_token')
        })
        const create_accesstoken =  jwt.sign({name : username},process.env.TOKEN_RAHASIA,{
            expiresIn : '1h',
            algorithm : "HS256"
        },(err,token) => {
            if(token) {
                Client.query(query_updateAksesToken(token,username))
                res.status(200).json({message:"berhasil login",token:token})
            }
            if(err) console.log('ada kesalahan saat membuat access_token')
        })
        

       })

    }

}

export default Akun_Karyawan