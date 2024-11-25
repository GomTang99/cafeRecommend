const express = require('express');
const path = require('path'); // path 모듈 추가
const db = require('./db.js'); // db.js에서 연결을 가져옵니다.
const multer = require('multer'); // multer를 가져옵니다.
const app = express();
const port = 5000; // 원하는 포트 번호로 변경 가능

// JSON 데이터 파싱을 위한 미들웨어 등록
app.use(express.json());

// React 빌드 파일을 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'build'))); // build 폴더 경로 설정

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); // index.html 파일 제공
});

// 모든 경로에 대해 index.html 제공
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Multer 설정: 파일 업로드를 위한 미들웨어
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 업로드할 경로 설정
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일 이름 설정
    }
});
const upload = multer({ storage }); // upload 변수를 정의

// 카페 추가 API
app.post('/api/cafes', upload.single('image'), (req, res) => {
    const { name, region, category, location } = req.body;
    const imageUrl = req.file.path; // 업로드한 이미지의 경로

    const query = 'INSERT INTO cafes (name, region, category, location, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, region, category, location, imageUrl], (err, result) => {
        if (err) {
            console.error('카페 추가 중 오류 발생:', err);
            return res.status(500).send('서버 오류');
        }
        res.status(201).json({ id: result.insertId, name, region, category, location, image_url: imageUrl });
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});