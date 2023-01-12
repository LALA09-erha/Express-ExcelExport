
// // import user model
const { get } = require('http');
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
const updatejumlahitemfix = (data,data_2) => {
    // console.log(data.toString(),data_2);
    return new Promise((resolve, reject) => {
        conn.query('UPDATE items SET jumlahitem=? WHERE namaitem=?',[data.toString(),data_2], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);

            }
        });
    });
}

//update jumlah item
const updatejumlahitem = (data) => {    
    // console.log(data);
    return new Promise((resolve, reject) => {
        conn.query('select * from items where namaitem=?',[data], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


module.exports = { findAll, insert , getnamaitem ,updatejumlahitem,updatejumlahitemfix}