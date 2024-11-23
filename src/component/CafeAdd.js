import React, { useState } from "react"
import styles from './CafeAdd.module.css';

export default function CafeAdd() {

    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const cafeData = {
            name,
            region,
            category,
            location,
            image,
        };

        // 카페 데이터 처리 로직 (예: API에 전송)
        console.log('카페 추가:', cafeData);
        // 폼 초기화
        setName('');
        setRegion('');
        setCategory('');
        setLocation('');
        setImage(null);
    };
    
    return (
        <div className={styles.bgImg}>
            <div className={styles.form}>
                <h1>카페 작성 폼</h1>
                <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">카페 이름:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="region">지역:</label>
                    <select
                        id="region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        required
                    >
                        <option value="">선택하세요</option>
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

                <div className={styles.formGroup}>
                <label htmlFor="category">카테고리:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">선택하세요</option>
                        <option value="뷰맛집">뷰 맛집</option>
                        <option value="빵맛집">빵 맛집</option>
                        <option value="커피맛집">커피 맛집</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">위치 (예: 주소명):</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="주소"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="image">사진 업로드:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>작성하기</button>
            </form>
            </div>
        </div>
);
}