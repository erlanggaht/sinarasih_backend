import { query_getdata } from "../controllers/karyawan_API.js"
import { Client } from "../models/postgress_connect.js"

// Validasi jika rows tidak di isi
async function defaultValueRows(id) {
    const resultQuery = await Client.query(`${query_getdata} where id = '${id}'`) 
    let getnama =  resultQuery.rows.map((m,i) => {
        console.log(m)
               return JSON.stringify({
                id_ : m.id,
                nama_ : m.nama,
                deskripsi_ : m.deskripsi,
                ig_ : m.ig,
                posisi_ : m.posisi,
               })
            })
   
    return getnama

}


export default defaultValueRows