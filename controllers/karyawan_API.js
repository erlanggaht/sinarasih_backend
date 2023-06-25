import { Client } from "../models/postgress_connect.js"
import Query_Api from "./query/query_api.js"


// Query
export const {
    query_getdata,
    query_addData,
    query_deleteData,
    query_updateData,
    query_getdataIdAdmin,
    query_getdataToken
} = Query_Api

class Karyawan {

    static getKaryawan (req,res) {
       const query =  Client.query(query_getdata,(err,result) => {
           if(!err) {
            res.status(200).json(result.rows)
        }
           if(err) res.status(400).send({messageError:'ada kesalahan saat ambil data karyawan'})
       })
   }

   static async getKaryawan_token (req,res) {
    const headers = req.headers
    const Authorization_Bearer = req.headers.authorization && headers.authorization.split(' ')[1]
    
    const queryIfToken =  Client.query(query_getdataToken(Authorization_Bearer), (err,result)=>{
        if(result.rows && result.rowCount > 0) {
          const id_admin = result.rows[0].id
          const query =  Client.query(query_getdataIdAdmin(id_admin),(err,result) => {
              if(!err) {
               res.status(200).json(result.rows)
           }
              if(err) res.status(400).send({messageError:'ada kesalahan saat ambil data karyawan'})
          })
      }
      else  res.status(401).send('No Authorization your data')
     })
   }

 
    static async UpdateKaryawan (req,res) {
        const {nama,deskripsi,ig,posisi,id} = req.body
        const query =  Client.query(await query_updateData(nama,deskripsi,ig,posisi,id),(err,result) => {
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