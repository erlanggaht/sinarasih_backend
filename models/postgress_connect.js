import  pg  from 'pg'
const {Pool} = pg

class Konfigurasi {

    // Konek DB
        Client = new Pool({
            host:process.env.HOST_DB,
            user:process.env.USER_DB,
            password : process.env.PASSWORD_DB,
            port : process.env.PORT_DB,
            database : process.env.DATABASE_DB
        })

}

export const {Client} = new Konfigurasi

export default Konfigurasi