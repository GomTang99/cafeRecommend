const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const conn = require('./db'); // 데이터베이스 연결을 위한 모듈
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt'); // bcrypt 모듈 추가
const app = express();
const port = process.env.PORT || 5000; // 포트 번호

app.use(cors()); // CORS 미들웨어 추가
app.use(express.json()); // JSON 데이터 파싱을 위한 미들웨어 등록
app.use(bodyParser.json());

// React 빌드 파일을 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'build')));

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
const upload = multer({ storage });

// 카페 추가 API
app.post('/api/cafes', upload.single('image'), (req, res) => {
    const { name, region, category, location } = req.body;
    const imageUrl = req.file ? req.file.path : null; // 업로드한 이미지의 경로

    const query = 'INSERT INTO cafes (name, region, category, location, image_url) VALUES (?, ?, ?, ?, ?)';
    conn.query(query, [name, region, category, location, imageUrl], (err, result) => {
        if (err) {
            console.error('카페 추가 중 오류 발생:', err);
            return res.status(500).send('서버 오류');
        }
        res.status(201).json({ id: result.insertId, name, region, category, location, image_url: imageUrl });
    });
});

// 카페 목록 조회 API
app.get('/api/cafes', (req, res) => {
    const query = 'SELECT * FROM cafes';
    conn.query(query, (err, results) => {
        if (err) {
            console.error('카페 목록 조회 중 오류 발생:', err);
            return res.status(500).send('서버 오류');
        }
        res.json(results); // 카페 목록을 JSON 형식으로 반환
    });
});



// 회원가입 라우트
app.post("/register", async (req, res) => {
    const email = req.body.user_email;
    const nickname = req.body.user_nickname;
    const password = req.body.user_password;

    console.log("이메일:", email);
    console.log("닉네임:", nickname);
    console.log("비밀번호:", password);

    
    if(!email || !nickname || !password) {
        res.status(400).json({ error : '필수 데이터가 누락 되었습니다.'});
        return;
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (user_email, user_nickname, user_password) VALUES (?, ?, ?)";
    const values = [ email, nickname, hashedPassword ];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.log("데이터 삽입 오류 : ", err);
            res.status(500).json({ error: "회원 가입 오류" });
        } else {
            console.log("데이터 삽입 성공");
            res.status(201).json({ success: true, message: "회원가입이 완료되었습니다." });
        }
    });
});


// 로그인 라우트
app.post("/login", async (req, res) => {
    const { user_email, user_password } = req.body;

    // 사용자 찾기
    conn.query('SELECT * FROM users WHERE user_email = ?', [user_email], async (err, users) => {
        if (err) {
            return res.status(500).json({ message: '서버 오류' });
        }
        if (users.length === 0) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못 되었습니다.' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(user_password, users[0].user_password);
        if (!isMatch) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 잘못 되었습니다.' });
        }

        // JWT 토큰 생성
        const token = jwt.sign({ email: users[0].user_email }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ message: '로그인 성공', token });
    });
});









// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});