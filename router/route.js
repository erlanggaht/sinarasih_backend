import express from 'express'
import Karyawan from '../controllers/karyawan_API.js'
import Akun_Karyawan from '../controllers/karyawan_akun.js'
import Auth from '../middleware/auth.js'
const router = express.Router()

const {
    Auth_getKaryawan
}
 = Auth

router.get('/',(req,res)=>{
    res.send('Hello ini endpoint API root sinar asih.')
})
// Ambil Data Karyawan
router.get('/getKaryawan',Auth_getKaryawan,Karyawan.getKaryawan)
// Tambah Karyawan 
router.post('/addKaryawan',Karyawan.addKaryawan)
// Update Data
router.put('/updateKaryawan',Karyawan.UpdateKaryawan)
// Delete Karyawan
router.delete('/deleteKaryawan',Karyawan.deleteKaryawan)


//  ------- Akun Karyawan Router

//  register
router.post('/addAkun',Akun_Karyawan.addAkun)

// Login
router.post('/loginAkun', Akun_Karyawan.loginAkun)

export default router