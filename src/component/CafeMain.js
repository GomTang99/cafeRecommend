import React, { useState, useEffect } from 'react';
import styles from './CafeMain.module.css';
import { Link, useNavigate } from 'react-router-dom';

const images = [
    { id: 1, url: require('../img/slide1.jpg'), link: '/cafeList' },
    { id: 2, url: require('../img/slide2.jpg'), link: '/cafeList' },
    { id: 3, url: require('../img/slide3.jpg'), link: '/cafeList' },
];

export default function CafeMain() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();  // useNavigate 훅 사용

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 이미지 변경
        return () => clearInterval(interval); //컴포넌트 언마운트 시 인터벌 정리
    }, []);

    const handleImageClick = (link) => {
        navigate(link); // URL을 변경하면서 해당 링크로 이동
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
                            onClick={() => handleImageClick(image.link)}  // 클릭 이벤트 핸들러 추가
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}