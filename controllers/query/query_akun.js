class Query_Akun {

    // Query Get data token master admin
    static query_getTokenMasterAdmin(token) {
        return `SELECT * FROM master_admin where token = '${token}' `
    }

    // Query Tambah Akun Karyawan 
    static query_addAkunKaryawan(username,password) {
        return `INSERT INTO akun_karyawan (id,username,password) values(default,
            '${username}', 
            '${password}'
            )`
    }

    //  Query Get akun karyawan berdasar nama dan password
    static query_addAkunKaryawan(username,password) {
        return  `SELECT * FROM akun_karyawan where username = '${username}' and password = '${password}'`

    }

    // Query Masukan refreshToken
    static query_updateRefreshToken(token,username) {
        return   `UPDATE akun_karyawan set refresh_token = '${token}' where username = '${username}'`

    }  

    static query_updateAksesToken(token,username) {
        return `UPDATE akun_karyawan set akses_token = '${token}' where username = '${username}' `

    }  



}


export default Query_Akun