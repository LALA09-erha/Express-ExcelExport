
// // import user model
const conn = require('./database/connect');

const findAll = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM items', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}

const insert = (data) => {

    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO items SET ?', data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}

// get item berdasarkan nama

const getnamaitem = () => {
    return new Promise((resolve, reject) => {
        conn.query('select namaitem from items', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });}

//mengambil jumlah item yanng dipilih
const getjumlahitem = () => {
    return new Promise((resolve, reject) => {
        conn.query('select jumlahitem from items ', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);

            }
        });
    });
}

//update jumlah item
const updatejumlahitem = () => {
    return new Promise((resolve, reject) => {
        conn.query('select namaitem from items', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


module.exports = { findAll, insert , getnamaitem ,updatejumlahitem}