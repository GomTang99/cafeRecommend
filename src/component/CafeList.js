import React, { useState } from "react";
import styles from './CafeList.module.css';
import { Link } from 'react-router-dom';

export default function CafeList() {

    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // 카페 데이터
    const cafes = [
        { id : 1, name: "카페1", region: "서울", category: "커피맛집", imageUrl: require('../img/main1.jfif') },
        { id : 2, name: "헤이메르", region: "울산", category: "빵맛집", imageUrl:  require('../img/main2.jfif') },
        { id : 3, name: "카페3", region: "서울", category: "뷰맛집", imageUrl:  require('../img/view1.jpg') },
        { id : 4, name: "카페4", region: "제주", category: "커피맛집", imageUrl: require('../img/view3.jpg') },
    ];

    // 필터링 된 카페 목록
    const filteredCafes = cafes.filter(cafe => {
        const regionMatch = selectedRegion === "all" || cafe.region === selectedRegion;
        const categoryMatch = selectedCategory === "all" || cafe.category === selectedCategory;
        return regionMatch && categoryMatch;
    });

    return (
        <div className={styles.bgImg}>
            <h1 className={styles.header}>
                <Link to="/" className={styles.title}>CAFE 추천 리스트</Link> 
            </h1>

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


            <div className={styles.list_wrap}>
                <div className={styles.cardContainer}>
                    {filteredCafes.map(cafe => (
                        <div key={cafe.id} className={styles.card}>
                            <img src={cafe.imageUrl} alt={cafe.name} className={styles.cardImage} />
                            <h3 className={styles.cardTitle}>{cafe.name}</h3>
                            <p className={styles.cardInfo}>{cafe.region} | {cafe.category}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}