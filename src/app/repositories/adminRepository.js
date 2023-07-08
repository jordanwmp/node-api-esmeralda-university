/**
 * NO REPOSITORIO FICAM AS INFORMAÇÕES
 * REFERENTES AO BANCO DE DADOS, COMO O SQL
 */
import conexao from "../database/conexao.js";


class AdminRepository {

    create(newAdmin) {
        const sql = "INSERT INTO admin SET ?;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, newAdmin, (error, result) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            })
        })
    }

    findAll() {
        const sql = "SELECT * FROM admin;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result)
            })
        })
    }

    findById(id) {
        const sql = "SELECT * FROM admin WHERE id=?;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (error, result) => {
                if (error) {
                    return reject(error)
                }

                return resolve(result)
            })
        })
    }

    findByEmailAndPassword(email, password) {
        const sql = "SELECT * FROM admin WHERE email=? AND password =?;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, [email, password], (error, result) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            })
        })
    }
    
    update(id, admin) {
        const sql = "UPDATE admin SET ? WHERE id=?;";
        return new Promise((resolve, reject) => {

            conexao.query(sql, [admin, id], (error, result) => {
                if (error) {
                    return reject(error)
                } else {
                    return resolve(result)
                }
            })

        })
    }

    delete(id) {
        const sql = "DELETE FROM admin WHERE id=?;";
        return new Promise((resolve, reject) => {
            conexao.query(sql, id, (error, result) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            })
        })
    }
}

export default new AdminRepository()