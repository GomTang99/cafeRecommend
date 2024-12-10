import React, { useState } from "react";
import styles from './CafeList.module.css';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";

export default function CafeList() {

    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAlert, setShowAlert] = useState(false); // 알림 상태 추가
    const [favorites, setFavorites] = useState([]); // 즐겨찾기 상태 알림 추가

    // 카페 데이터
    // const cafes = [
    //     { id : 1, name: "그릿비", region: "울산", category: "뷰맛집", imageUrl: require('../img/view1.jpg') },
    //     { id : 2, name: "롤링커피", region: "울산", category: "커피맛집", imageUrl:  require('../img/coffe1.jpg') },
    //     { id : 3, name: "아베베베이커리", region: "서울", category: "빵맛집", imageUrl:  require('../img/bread1.jpg') },
    //     { id : 4, name: "델문도", region: "제주", category: "뷰맛집", imageUrl: require('../img/view2.jpg') },
    // ];

    useEffect(() => {
        fetch('/api/cafes')
            .then(response => response.json())
            .then(data => setCafes(data))
            .catch(error => console.error('Error fetching cafes:', error));
    }, []);

    // 필터링 된 카페 목록
    const filteredCafes = cafes.filter(cafe => {
        const regionMatch = selectedRegion === "all" || cafe.region === selectedRegion;
        const categoryMatch = selectedCategory === "all" || cafe.category === selectedCategory;
        return regionMatch && categoryMatch;
    });

    const handleAlertClick = () => {
        // setAlertMessage(`${cafe.name} : 수정 요청 내용`); // 카페 이름과 수정 내용을 설정
        setShowAlert(true); // 알림 팝업 표시
    }

    const closeAlert = () => {
        setShowAlert(false); // 알림 팝업 닫기
    }

    const toggleFavorite = (cafeId) => {
        if (favorites.includes(cafeId)) {
            setFavorites(favorites.filter(id => id !== cafeId)); // 즐겨찾기에서 제거
        } else {
            setFavorites([...favorites, cafeId]); // 즐겨찾기에 추가
        }
    };

    return (
        <div className={styles.bgImg}>
            <h1 className={styles.header}>
                <Link to="/" className={styles.title}>CAFE 추천 리스트</Link>                
                <ul className={styles.navList}>
                <li>
                    <button onClick={handleAlertClick} className={styles.alram}>
                        <FaBell size={24} />
                    </button>
                </li>
                <li>
                    <Link to="/mypage" className={styles.CafeMypage}>마이페이지</Link>
                </li>
            </ul>
            </h1>
            
            <div className={styles.selectContainer}>
                <div className={styles.categorySelect}>
                    <label htmlFor="region">지역 선택:</label>
                    <select 
                        id="region" 
                        value={selectedRegion} 
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="all">모두 보기</option>
                        <option value="서울">서울</option>
                        <option value="인천">인천</option>
                        <option value="경기">경기</option>
                        <option value="부산">부산</option>
                        <option value="대구">대구</option>
                        <option value="울산">울산</option>
                        <option value="세종">세종</option>
                        <option value="강원">강원</option>
                        <option value="경남">경남</option>
                        <option value="경북">경북</option>
                        <option value="전남">전남</option>
                        <option value="전북">전북</option>
                        <option value="충남">충남</option>
                        <option value="충북">충북</option>
                        <option value="제주">제주</option>
                    </select>
                </div>

                <div className={styles.categorySelect}>
                    <label htmlFor="category">맛집 선택:</label>
                    <select 
                        id="category" 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">모두 보기</option>
                        <option value="뷰맛집">뷰 맛집</option>
                        <option value="빵맛집">빵 맛집</option>
                        <option value="커피맛집">커피 맛집</option>
                    </select>
                </div>
            </div>


        <div className={styles.list_wrap}>
            <div className={styles.cardContainer}>
            {filteredCafes.map(cafe => (
                <div key={cafe.id} className={styles.card}>
                <Link to={`/cafe/${cafe.id}`} className={styles.cardLink}>
                    <img src={cafe.imageUrl} alt={cafe.name} className={styles.cardImage} />
                    <h3 className={styles.cardTitle}>{cafe.name}</h3>
                    <p className={styles.cardInfo}>{cafe.region} | {cafe.category}</p>
                </Link>
                <button 
                    className={favorites.includes(cafe.id) ? styles.favoriteButtonActive : styles.favoriteButton} 
                    onClick={() => toggleFavorite(cafe.id)}
                >
                {favorites.includes(cafe.id) ? '❤️' : '♡'}
                </button>
            </div>
    ))}
</div>
            </div>
            <div className={styles.addButtonContainer}>
                <Link to="/cafeadd" className={styles.addButton}>
                    작성하기
                </Link>
            </div>

            {/* 알림 팝업 */}
            {showAlert && (
                <div className={styles.alertPopup}>
                    <div className={styles.alertContent}>
                        <span className={styles.closeButton} onClick={closeAlert}>×</span>
                        <h2 className={styles.popupTitle}>알림</h2>
                        <ul>
                            <li>
                                <button className={styles.alertLink} onClick={closeAlert}>수정 요청 내용</button>
                            </li> 
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
}