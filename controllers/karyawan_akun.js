import { Client } from "../models/postgress_connect.js";
import jwt from "jsonwebtoken";
import Query_Akun from "./query/query_akun.js";
import Query_Api from "./query/query_api.js";
import enkrip_hash, { enkrip_compare } from "../utility/bacrypt.js";
// Query
export const {
  query_getTokenMasterAdmin,
  query_getAkunKaryawan,
  query_addAkunKaryawan,
  query_updateRefreshToken,
  query_updateAksesToken,
} = Query_Akun;

export const { query_addData } = Query_Api;

class Akun_Karyawan {
  // Tambah Akun
  static addAkun = async (req, res) => {
    const {
      username,
      password,
      token,
      nama,
      deskripsi,
      posisi,
      ig,
    } = req.body;

  

    //  Hashing Password
    const password_hash = enkrip_hash(password);

    // Cek Token Master Admin
    const query_ma = Client.query(
      query_getTokenMasterAdmin(token),
      (err, result) => {
        if (result.rowCount === 0) {
          res.status(401).json({
            message:
              "Token Karyawan Salah! silahkan tanyakan ke yg bersangkutan",
          });
        } else {
          const query = Client.query(
            query_addAkunKaryawan(username, password_hash),
            (error, result) => {
              if (result.rowCount > 0) {
                const query_add = Client.query(query_addData(nama, deskripsi, posisi, ig),
                  (err) => {
                    if (!err)
                      res
                        .status(201)
                        .json({ message: "daftar akun karyawan berhasil" });
                    if (err)
                      res.status(400).json({
                        messageError:
                          "ada kesalahan saat memasukan data karyawan",
                      });
                  }
                );
              } else
                res
                  .status(400)
                  .json({ message: "ada kesalahan saat melakukan daftar" });
            }
          );
        }
      }
    );
  };

  static loginAkun = (req, res) => {
    const { username, password } = req.body;

    //    Compare hash Password
    const get_password_compare = Client.query(`SELECT password FROM akun_karyawan where username = '${username}' `,(err, result) => {
      if (result.rowCount < 1)
          res.status(400).json({ message: "username tidak terdaftar" });
        else {
          const password_hash = result.rows[0].password;
          const password_compare = enkrip_compare(password, password_hash); // menghasilkan true atau false

          if (password_compare) {
            const getUser = Client.query(
              query_getAkunKaryawan(username, password_hash), (err, result) => {
                if (result.rowCount === 0)
                  return res
                    .status(401).json({ message: "akun belum terdaftar. silahkan daftar" });
                // Jika Berhasil Login
                const create_refreshtoken = jwt.sign(
                  { name: username },
                  process.env.TOKEN_RAHASIA,
                  {
                    expiresIn: "1h",
                    algorithm: "HS256",
                  },
                  (err, token) => {
                    if (token) {
                      Client.query(query_updateRefreshToken(token, username));
                    }
                    if (err)
                      console.log("ada kesalahan saat membuat refresh_token");
                  }
                );
                const create_accesstoken = jwt.sign(
                  { name: username },
                  process.env.TOKEN_RAHASIA,
                  {
                    expiresIn: "1h",
                    algorithm: "HS256",
                  },
                  (err, token) => {
                    if (token) {
                      Client.query(query_updateAksesToken(token, username));
                      res
                        .status(200)
                        .json({ message: "berhasil login", token: token });
                    }
                    if (err)
                      console.log("ada kesalahan saat membuat access_token");
                  }
                );
              }
            );
          } else res.status(401).json({ message: "Password Salah!" });
        }
      }
    );
  };
}

export default Akun_Karyawan;
