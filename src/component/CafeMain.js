import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 훅 임포트
import styles from './CafeMain.module.css';
import { Link } from 'react-router-dom';

const images = [
    { id: 1, url: require('../img/slide1.jpg'), link: '/cafeList' },
    { id: 2, url: require('../img/slide2.jpg'), link: '/cafeList' },
    { id: 3, url: require('../img/slide3.jpg'), link: '/cafeList' },
];

export default function CafeMain() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSignupPopup, setShowSignupPopup] = useState(false); // 회원가입 팝업 상태 추가
    const [showLoginPopup, setShowLoginPopup] = useState(false); // 로그인 팝업 상태 추가
    const [emailText, setEmailText] = useState(""); // 이메일 텍스트 상태 추가
    const [emailDomain, setEmailDomain] = useState("gmail.com"); // 이메일 도메인 상태 추가
    const [nickname, setNickname] = useState(""); // 닉네임 상태 추가

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

    const handleSignupSubmit = (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        // 여기서 회원가입 처리 로직을 추가하고 로그인 팝업 보여주기
        console.log(`가입할 이메일: ${emailText}@${emailDomain}, 닉네임: ${nickname}`); // 가입할 정보 출력
        setShowSignupPopup(false); // 회원가입 팝업 닫기
        setShowLoginPopup(true); // 로그인 팝업 열기
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
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        // 로그인 처리 로직이 여기에 추가
        navigate('/cafeList'); // CafeList로 이동
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
                <div className={styles.loginPopup}>
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
                                    <button type="button" onClick={checkEmail} className={styles.checkButton}>중복 확인</button>
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
                                    <button type="button" onClick={checkNickname} className={styles.checkButton}>중복 확인</button>
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
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}