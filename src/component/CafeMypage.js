import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './CafeMypage.module.css';

const initialCafes = [
    { id: 1, name: "그릿비", region: "울산", category: "뷰맛집", description: "아름다운 바다를 볼 수 있는 카페", isFavorite: true },
    { id: 2, name: "롤링커피", region: "울산", category: "커피맛집", description: "신선한 커피를 제공하는 카페", isFavorite: false },
    { id: 3, name: "아베베베이커리", region: "서울", category: "빵맛집", description: "맛있는 빵과 디저트를 판매하는 카페", isFavorite: true },
];

export default function CafeMypage() {
    const [cafes, setCafes] = useState(initialCafes);
    const [editCafe, setEditCafe] = useState(null);
    const [newName, setNewName] = useState('');
    const [newRegion, setNewRegion] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const navigate = useNavigate();

    const handleEdit = (cafe) => {
        setEditCafe(cafe.id);
        setNewName(cafe.name);
        setNewRegion(cafe.region);
        setNewCategory(cafe.category);
        setNewDescription(cafe.description);
    };

    const handleUpdate = () => {
        setCafes(cafes.map(cafe => 
            cafe.id === editCafe 
                ? { ...cafe, name: newName, region: newRegion, category: newCategory, description: newDescription }
                : cafe
        ));
        setEditCafe(null);
        setNewName('');
        setNewRegion('');
        setNewCategory('');
        setNewDescription('');
    };

    const handleDelete = (id) => {
        setCafes(cafes.filter(cafe => cafe.id !== id)); // 카페 삭제
    };

    const toggleFavorite = (cafeId) => {
        setCafes(cafes.map(cafe => {
            if (cafe.id === cafeId) {
                return { ...cafe, isFavorite: !cafe.isFavorite }; // 즐겨찾기 상태 토글
            }
            return cafe;
        }));
    };

    return (
        <div className={styles.mypageBgimg}>
            <div className={styles.mypageContainer}>
                <div className={styles.mypageContent}>
                    <h1>내 카페 작성 목록</h1>
                    <ul className={styles.cafeList}>
                        {cafes.map(cafe => (
                            <li key={cafe.id} className={styles.cafeItem}>
                                <h2>{cafe.name}</h2>
                                <span>{cafe.region} | {cafe.category}</span>
                                <span>{cafe.description}</span>
                                <div className={styles.buttonGroup}>
                                    <button onClick={() => handleEdit(cafe)}>수정</button>
                                    <button onClick={() => handleDelete(cafe.id)}>삭제</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {editCafe && (
                        <div className={styles.editForm}>
                            <h2>카페 수정하기</h2>
                            <input 
                                type="text" 
                                value={newName} 
                                onChange={(e) => setNewName(e.target.value)} 
                                placeholder="카페 이름" 
                            />
                            <input 
                                type="text" 
                                value={newRegion} 
                                onChange={(e) => setNewRegion(e.target.value)} 
                                placeholder="지역" 
                            />
                            <input 
                                type="text" 
                                value={newCategory} 
                                onChange={(e) => setNewCategory(e.target.value)} 
                                placeholder="카테고리" 
                            />
                            <input 
                                type="text" 
                                value={newDescription} 
                                onChange={(e) => setNewDescription(e.target.value)} 
                                placeholder="설명" 
                            />
                            <button onClick={handleUpdate}>수정 완료</button>
                            <button onClick={() => setEditCafe(null)}>취소</button>
                        </div>
                    )}
                </div>

                <div className={styles.mypageFavoriteContent}>
                    <h2>즐겨찾기한 카페 목록</h2>
                    <ul className={styles.cafeList}>
                        {cafes.filter(cafe => cafe.isFavorite).map(cafe => (
                            <li key={cafe.id} className={styles.cafeItem}>
                                <h2>{cafe.name}</h2>
                                <button 
                                    className={cafe.isFavorite ? styles.favoriteButtonActive : styles.favoriteButton} 
                                    onClick={() => toggleFavorite(cafe.id)}
                                >
                                    {cafe.isFavorite ? '❤️' : '♡'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className={styles.returnButton} onClick={() => navigate('/')}>돌아가기</button>
            </div>
        </div>
    );
}
