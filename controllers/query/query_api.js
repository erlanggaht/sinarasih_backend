import capitalize from "../../utility/capitalize.js"
import defaultValueRows from "../../utility/getDefaultValueRows.js"

class Query_Api {

    // Query Ambil Data
    static query_getdata = 'SELECT * FROM data_karyawan'

    // Query Ambil Data Bedasarkan Token
    static query_getdataToken = (Authorization_Bearer) => {
        return `SELECT * FROM akun_karyawan where akses_token = '${Authorization_Bearer}'`
    }

    // Query Ambil Data Berdasarkan Token ID Admin
    static query_getdataIdAdmin = (id_admin) => {
        return `SELECT * FROM data_karyawan where id = '${id_admin}' `
    }

    // Query Ambil Data Berdasarkan ID dan nama  
    static query_getDataNama = (id,nama) => {
        return `SELECT * FROM data_karyawan WHERE id=${id} AND nama=${nama}   `
    }

    // Query Masukan Data
    static query_addData =  (nama,deskripsi,posisi,ig) => {
     return  `INSERT INTO data_karyawan (id,nama,deskripsi,posisi,ig) VALUES(default,'${nama}','${deskripsi}','${posisi}','${ig}')`
        
    } 


    // Query Update Data
    static query_updateData =  (nama,deskripsi,ig,posisi,id) => {
        return `UPDATE data_karyawan set
        nama = '${nama}',
        deskripsi = '${deskripsi}',
        ig = '${ig}',
        posisi = '${posisi}'
        where id = ${id}
        `
       } 


    // Query Hapus Data 
    static query_deleteData = (id,nama) =>  {
        return `DELETE from data_karyawan where id = ${id} and nama = '${capitalize(nama)}' `
    }

}


export default Query_Api