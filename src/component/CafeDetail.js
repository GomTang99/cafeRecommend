import React, { useEffect, useRef, useState } from "react";
import styles from './CafeDetail.module.css';
import { Link, useParams, useNavigate } from "react-router-dom";

const { kakao } = window;

export default function CafeDetail() {
    const { id } = useParams();
    const container = useRef(null); // 지도 데이터 접근
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
    const [showEditPopup, setShowEditPopup] = useState(false); // 수정 요청 팝업 상태
    const [editContent, setEditContent] = useState(""); // 수정 내용 상태

    //카페 데이터 (예시 데이터)
    const cafes = [
        { id : 1, name: "그릿비", region: "울산", category: "뷰맛집", imageUrl: require('../img/view1.jpg'), latitude:35.34521795854005, longtitude:129.32153486193013 },
        { id : 2, name: "롤링커피", region: "울산", category: "커피맛집", imageUrl:  require('../img/coffe1.jpg'), latitude:35.55061889626061, longtitude:129.29369433796782 },
        { id : 3, name: "아베베베이커리", region: "서울", category: "빵맛집", imageUrl:  require('../img/bread1.jpg'), latitude:37.56953587727422, longtitude:126.99993491306338 },
        { id : 4, name: "델문도", region: "제주", category: "뷰맛집", imageUrl: require('../img/view2.jpg'), latitude:33.543694963787615, longtitude:126.66874393114894 },
    ];

    // 선택한 카페 정보 찾기
    const cafe = cafes.find(cafe => cafe.id === parseInt(id));

    useEffect(() => {
        const position = new kakao.maps.LatLng(cafe.latitude, cafe.longtitude); //카페의 좌표로 위치 설정
        const options = {
            center: position,
            level: 3,
        };
        const map = new kakao.maps.Map(container.current, options);

        //마커 생성
        const marker = new kakao.maps.Marker({
            position: position,
        });
        marker.setMap(map);
    }, [cafe.latitude, cafe.longtitude]);

    if (!cafe) {
        return <p>카페 정보를 찾을 수 없습니다.</p>;
    }

    const handleRequestEdit = () => {
        setShowEditPopup(true); // 수정 요청 팝업 열기
    }

    const handleSubmitEdit = (e) => {
        // 수정 요청 로직 (ex: 수정 팝업창 생성)
        e.preventDefault();
        // console.log("수정 요청 내용", editContent);
        setShowEditPopup(false); // 팝업 닫기
        setEditContent(""); // 내용 초기화        
    }

    return (
        <div className={styles.bgImg}>
            <h1 className={styles.header}>
                <Link to="/" className={styles.title}>CAFE 정보</Link>
            </h1>

            <div className={styles.container}>
                <div className={styles.cafeDetail}>
                    <img src={cafe.imageUrl} alt={cafe.name} className={styles.cafeImage} />
                    <h2 className={styles.cafeTitle}>{cafe.name}</h2>
                    <p className={styles.cafeInfo}>{cafe.region} | {cafe.category}</p>
                    <p className={styles.cafeDescription}>{cafe.description}</p>

                    <div style={{ width: "90%", height: "600px", margin: "0 auto" }} ref={container}></div>

                    <button onClick={() => navigate('/cafeList')} className={styles.backButton}>
                        뒤로가기
                    </button>
                    <button onClick={handleRequestEdit} className={styles.editRequestButton}>
                        수정 요청
                    </button>
                </div>
            </div>

            {/* 수정 요청 팝업 */}
            {showEditPopup && (
                <div className={styles.editPopup}>
                    <div className={styles.popupContent}>
                        <span className={styles.closeButton} onClick={() => setShowEditPopup(false)}>×</span>
                        <h2>수정 요청</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="수정 내용을 입력하세요..."
                                rows="4"
                                className={styles.editTextArea}
                                required
                            />
                            <button type="submit" className={styles.submitButton}>제출</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}