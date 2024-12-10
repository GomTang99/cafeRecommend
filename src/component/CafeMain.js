import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 훅 임포트
import styles from './CafeMain.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Axios 임포트 추가

const images = [
    { id: 1, url: require('../img/slide1.jpg'), link: '/cafeList' },
    { id: 2, url: require('../img/slide2.jpg'), link: '/cafeList' },
    { id: 3, url: require('../img/slide3.jpg'), link: '/cafeList' },
];


export default function CafeMain() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSignupPopup, setShowSignupPopup] = useState(false); // 회원가입 팝업 상태 추가
    const [showLoginPopup, setShowLoginPopup] = useState(false); // 로그인 팝업 상태 추가
    const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false); // 비밀번호 재설정 팝업 상태 추가
    const [emailText, setEmailText] = useState(""); // 이메일 텍스트 상태 추가
    const [emailDomain, setEmailDomain] = useState("gmail.com"); // 이메일 도메인 상태 추가
    const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
    const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태 추가
    const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태 추가
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태 추가
    const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증번호 전송 여부 상태


    const navigate = useNavigate(); // useHistory 훅 사용

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 이미지 변경
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, []);

    const handleImageClick = () => {
        setShowSignupPopup(true); // 회원가입 팝업 표시
    }
    
    const closeSignupPopup = () => {
        setShowSignupPopup(false); // 회원가입 팝업 닫기
    }

    const handleEmailChange = (e) => {
        setEmailText(e.target.value); // 이메일 텍스트 업데이트
    }

    const handleDomainChange = (e) => {
        setEmailDomain(e.target.value); // 이메일 도메인 업데이트
    }

    const handleNicknameChange = (e) => {
        setNickname(e.target.value); // 닉네임 업데이트
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
    
        // 이메일과 도메인 결합
        const fullEmail = `${emailText}@${emailDomain}`;
    
        try {
            const response = await axios.post('http://localhost:5000/register', {
                user_email: fullEmail, // 이메일
                user_nickname: nickname, // 닉네임
                user_password: e.target.password.value, // 비밀번호 입력값
            });
    
            if (response.status === 201) {
                console.log('회원가입이 되었습니다.');  // 회원가입 성공 시 메시지 출력
                setShowSignupPopup(false); // 회원가입 팝업 닫기
                // 추가 작업 (예: 로그인 팝업 열기 등)
            }
        } catch (error) {
            console.error('회원가입 실패:', error.response ? error.response.data.error : error.message);
        }
    };

    const checkEmail = () => {
        console.log(`Checking email: ${emailText}@${emailDomain}`);
        // 실제 API 호출을 통해 이메일 중복을 확인하는 로직 추가
    };

    const checkNickname = () => {
        console.log(`Checking nickname: ${nickname}`);
        // 실제 API 호출을 통해 닉네임 중복을 확인하는 로직 추가
    };

    const closeLoginPopup = () => {
        setShowLoginPopup(false); // 로그인 팝업 닫기
        setShowResetPasswordPopup(false); // 비밀번호 재설정 팝업 닫기
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        // 로그인 처리 로직이 여기에 추가
        navigate('/cafeList'); // CafeList로 이동
    }

    const handleResetPassword = () => {
        setShowResetPasswordPopup(true); // 비밀번호 재설정 팝업 열기
    }

    const handleSendVerificationCode = () => {
        setIsVerificationSent(true); // 인증번호 전송 상태 변경
        console.log(`Sending verification code to: ${emailText}@${emailDomain}`);
        // 실제 API 호출을 통해 인증번호 전송 로직 추가
    }

    const handleResetPasswordSubmit = (e) => {
        e.preventDefault();
        console.log(`New Password: ${newPassword}`);
        // 비밀번호 재설정 처리 로직 추가
        // 비밀번호 재설정이 완료되면 로그인 팝업 열기
        setShowResetPasswordPopup(false); // 비밀번호 재설정 팝업 닫기
        setShowLoginPopup(true); // 로그인 팝업 열기
    }

    

    return (
        <div className={styles.bgImg}>
            <div className={styles.header}>
                <h1>
                    <Link to="/">CAFE 추천</Link>
                </h1>
                <div className={styles.contentWrap}>
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`${styles.contentImg} ${currentIndex === index ? styles.visible : styles.hidden}`}
                            style={{ backgroundImage: `url(${image.url})` }}
                            onClick={handleImageClick}  // 클릭 이벤트 핸들러
                        >
                        </div>
                    ))}
                </div>
            </div>

            {/* 회원가입 팝업 */}
            {showSignupPopup && (
                <div className={styles.registerPopup}>
                    <div className={styles.popupContent}>
                        <span className={styles.closeButton} onClick={closeSignupPopup}>×</span>
                        <h2>회원가입</h2>
                        <form onSubmit={handleSignupSubmit}>
                            <div>
                                <label htmlFor="email">이메일:</label>
                                <div className={styles.emailContainer}>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={emailText}
                                        onChange={handleEmailChange}
                                        required
                                        placeholder="이메일 입력"
                                    />
                                    <select
                                        value={emailDomain}
                                        onChange={handleDomainChange}
                                        className={styles.emailSelect}
                                    >
                                        <option value="gmail.com">@gmail.com</option>
                                        <option value="naver.com">@naver.com</option>
                                        <option value="kakao.com">@kakao.com</option>
                                    </select>
                                    <button type="button" onClick={checkEmail} className={styles.emailCheckButton}>중복 확인</button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="nickname">닉네임:</label>
                                <div className={styles.nicknameContainer}>
                                    <input
                                        type="text"
                                        id="nickname"
                                        name="nickname"
                                        value={nickname}
                                        onChange={handleNicknameChange}
                                        required
                                    />
                                    <button type="button" onClick={checkNickname} className={styles.nicknameCheckButton}>중복 확인</button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password">비밀번호:</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">비밀번호 확인:</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required />
                            </div>
                            <button type="submit">계정 만들기</button>
                        </form>
                    </div>
                </div>
            )}

            {/* 로그인 팝업 */}
            {showLoginPopup && (
                <div className={styles.loginPopup}>
                    <div className={styles.popupContent}>
                        <span className={styles.closeButton} onClick={closeLoginPopup}>×</span>
                        <h2>로그인</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div>
                                <label htmlFor="loginEmail">이메일:</label>
                                <input type="email" id="loginEmail" name="loginEmail" required placeholder="이메일 입력" />
                            </div>
                            <div>
                                <label htmlFor="loginPassword">비밀번호:</label>
                                <input type="password" id="loginPassword" name="loginPassword" required placeholder="비밀번호 입력" />
                            </div>
                            <button type="submit">로그인</button>
                            <button type="button" onClick={handleResetPassword} className={styles.resetPassword} >비밀번호 재설정</button>
                        </form>
                    </div>
                </div>
            )}

            {/* 비밀번호 재설정 팝업 */}
            {showResetPasswordPopup && (
                <div className={styles.resetPasswordPopup}>
                    <div className={styles.popupContent}>
                        <span className={styles.closeButton} onClick={closeLoginPopup}>×</span>
                        <h2>비밀번호 재설정</h2>
                        {!isVerificationSent ? (
                            <form onSubmit={handleSendVerificationCode}>
                                <div>
                                    <label htmlFor="resetEmail">이메일:</label>
                                    <input
                                        type="email"
                                        id="resetEmail"
                                        name="resetEmail"
                                        value={`${emailText}@${emailDomain}`}
                                        readOnly
                                    />
                                </div>
                                <button type="button" onClick={handleSendVerificationCode}>인증번호 보내기</button>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPasswordSubmit}>
                                <div>
                                    <label htmlFor="verificationCode">인증번호:</label>
                                    <input
                                        type="text"
                                        id="verificationCode"
                                        name="verificationCode"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword">새 비밀번호:</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmNewPassword">비밀번호 확인:</label>
                                    <input
                                        type="password"
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">비밀번호 재설정</button>
                            </form>
                        )}
                    </div>
                </div>
            )}            
        </div>
    )
}