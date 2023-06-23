import capitalize from "../utility/capitalize.js"
import defaultValueRows from "../utility/getDefaultValueRows.js"

class Query {

    // Query Ambil Data
    static query_getdata = 'SELECT * FROM data_karyawan'


    // Query Ambil Data Berdasarkan ID dan nama  
    static query_getDataNama = (id,nama) => {
        return `SELECT * FROM data_karyawan WHERE id=${id} AND nama=${nama}   `
    }

    // Query Masukan Data
    static query_addData =  (nama,deskripsi,posisi,ig) => {
     return  `INSERT INTO data_karyawan (id,nama,deskripsi,posisi,ig) VALUES(default,'${nama}','${deskripsi}','${posisi}','${ig}')`
        
    } 


    // Query Update Data
    static query_updateData = async (nama,deskripsi,posisi,ig,image,valueQuery) => {
        
        const getDefaultValues = JSON.parse(await defaultValueRows(valueQuery))
        const {id_, nama_, deskripsi_ ,ig_ ,posisi_ } = getDefaultValues

        return `UPDATE data_karyawan set
        nama = '${!nama ? nama_ : nama}',
        deskripsi = '${!deskripsi ? deskripsi_: deskripsi}',
        ig = '${!ig ? ig_ : ig}',
        posisi = '${!posisi ? posisi_ : posisi}'
        where id = ${valueQuery}
        `
       } 


    // Query Hapus Data 
    static query_deleteData = (id,nama) =>  {
        return `DELETE from data_karyawan where id = ${id} and nama = '${capitalize(nama)}' `
    }


}


export default Query