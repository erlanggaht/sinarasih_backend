import { Client } from "../models/postgress_connect.js"
import Query from "./query.js"


// Query
export const {
    query_getdata,
    query_addData,
    query_deleteData,
    query_updateData
} = Query

class Karyawan {

    static getKaryawan (req,res) {
       const query =  Client.query(query_getdata,(err,result) => {
           if(!err) {
            res.status(200).json(result.rows)
        }
           if(err) res.status(400).send({messageError:'ada kesalahan saat ambil data karyawan'})
       })
   }

    static async addKaryawan (req,res) {
        const {nama,deskripsi,posisi,ig} = req.body
        const query = Client.query(await query_addData(nama,deskripsi,posisi,ig),(err) => {
           if(!err) res.status(201).json({message:'data berhasil dimasukan'})
           if(err) res.status(400).json({messageError:'ada kesalahan saat memasukan data karyawan'})
        })
    }
 
    static async UpdateKaryawan (req,res) {
        const {nama,deskripsi,ig,posisi} = req.body
        const namaQuery = Object.keys(req.query)[0] // NamaQuery misal {dede : 1} >>> 'dede'
        const valueQuery = req.query[namaQuery] // Menghasilkan value namaQuery
        const query =  Client.query(await query_updateData(nama,deskripsi,ig,posisi,valueQuery),(err,result) => {
            if(!err) res.status(200).json({message:`data  berhasil di ubah`})
            if(err) res.status(400).json({messageError:'ada kesalahan saat ubah data karyawan'})
         })
    }

    static async deleteKaryawan (req,res) {
        const namaQuery = Object.keys(req.query)[0] // NamaQuery misal {dede : 1} >>> 'dede'
        const valueQuery = req.query[namaQuery] // Menghasilkan value namaQuery
        const query = Client.query(query_deleteData(valueQuery,namaQuery),(err,result) => {
           if(!err) res.status(201).json({message:`data dengan id ${valueQuery}  berhasil dihapus`})
           if(err) res.status(400).json({messageError:'ada kesalahan saat menghapus data  karyawan'})
        })
    }

}


export default Karyawan