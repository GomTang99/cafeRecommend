const mysql = require('mysql2');
const path = require('path'); // path 모듈 추가


//Database connection pool
const conn = mysql.createConnection({  // mysql 접속 설정
    host: '127.0.0.1',
    port: '3306',
    user: 'root', // MySQL 사용자 이름
    password: 'root', // MySQL 비밀번호
    database: 'cafeDB', // 사용할 데이터베이스 이름
});


// 데이터베이스 연결
conn.connect((err) => {
    if (err) {
        console.log('DB 연결 실패');
    }else {
    console.log('DB 연결');
    }
});

module.exports = conn;