import { Client } from "../models/postgress_connect.js";
import Query_Akun from "./query/query_akun.js";
import Query_Api from "./query/query_api.js";
import cloudinary from "cloudinary";

// Query
export const {
  query_getdata,
  query_addData,
  query_deleteData,
  query_updateData,
  query_getdataIdAdmin,
  query_getdataToken,
} = Query_Api;

export const { query_getTokenMasterAdmin } = Query_Akun;

class Karyawan {
  static getKaryawan(req, res) {
  
    const query = Client.query(query_getdata, (err, result) => {
      if (!err) {
        res.status(200).json(result.rows);
      }
      if (err)
        res
          .status(400)
          .send({ messageError: "ada kesalahan saat ambil data karyawan" });
    });
  }

  static async getKaryawan_token(req, res) {
    const headers = req.headers;
    const Authorization_Bearer = req.headers.authorization && headers.authorization.split(" ")[1];

    const queryIfToken = Client.query(
      query_getdataToken(Authorization_Bearer),
      (err, result) => {
        if (result.rows && result.rowCount > 0) {
          const id_admin = result.rows[0].id;
          const query = Client.query(
            query_getdataIdAdmin(id_admin),
            (err, result) => {
              if (!err) {
                res.status(200).json(result.rows);
              }
              if (err)
                res
                  .status(400)
                  .send({
                    messageError: "ada kesalahan saat ambil data karyawan",
                  });
            }
          );
        } else res.status(401).send("No Authorization your data");
      }
    );
  }

  static async UpdateKaryawan(req, res) {
    const { nama, deskripsi, ig, posisi, id, CloudinaryID } = req.body;
    // Cloudinary Setup >>> Get Optimize Image
    const response = await cloudinary.v2.api.resource_by_asset_id([
      CloudinaryID,
    ]);
    var url_Image = response.secure_url;
    var toArray = url_Image.split("/upload/");
    toArray.splice(1, 0, "/upload/f_auto,q_auto/");
    var OptimizeImage = toArray.join("");

    const query = Client.query(
      await query_updateData(nama, deskripsi, ig, posisi, id, OptimizeImage),
      (err, result) => {
        if (result.rowCount > 0)
          res.status(200).json({ message: `data  berhasil di ubah` });
        else
          res
            .status(400)
            .json({ messageError: "ada kesalahan saat ubah data karyawan" });
      }
    );
  }

  static async deleteKaryawan(req, res) {
    const { nama, id, token } = req.body;

    const getTokenMasterAdmin = Client.query(
      query_getTokenMasterAdmin(token),
      (err, result) => {
        if (result.rowCount < 1) {
          res
            .status(401)
            .json({
              message:
                "token tidak valid dengan token ijin perusahaan. silahkan hubungi admin atau owner",
            });
        } else {
          const query = Client.query(
            query_deleteData(id, nama),
            (err, result) => {
              if (result.rowCount > 0) {
                const delete_akun = Client.query(
                  `DELETE FROM akun_karyawan where id = '${id}' `,
                  (err, result) => {
                    if (result.rowCount > 0) {
                      res
                        .status(202)
                        .json({
                          message: `data dengan nama ${nama}  berhasil dihapus`,
                        });
                    }
                  }
                );
              } else {
                res
                  .status(400)
                  .json({
                    message:
                      "ada kesalahan saat menghapus data karyawan. hubungi admin",
                  });
              }
            }
          );
        }
      }
    );
  }
}

export default Karyawan;
