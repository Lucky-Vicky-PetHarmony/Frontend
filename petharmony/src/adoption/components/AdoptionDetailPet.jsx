import React, { useState } from "react";
import "../styles/AdoptionDetailPet.css";
import calender from '../asset/detailIcon/calender.png'
import cat from '../asset/detailIcon/cat.png'
import color from '../asset/detailIcon/color.png'
import health from '../asset/detailIcon/health.png'
import light from '../asset/detailIcon/light.png'
import map from '../asset/detailIcon/map.png'
import num from '../asset/detailIcon/num.png'
import scale from '../asset/detailIcon/scale.png'
import search from '../asset/detailIcon/search.png'
import sex from '../asset/detailIcon/sex.png'
import shield from '../asset/detailIcon/shield.png'
import like_A from '../asset/detailIcon/like_A.png'
import like_N from '../asset/detailIcon/like_N.png'
import info from '../asset/detailIcon/info.png'

const AdoptionDetailPet = () => {

    // TODO: 좋아요처리
    
    const [petLike, setPetLike] = useState(false);

    const petLikeHandler = () => {
        setPetLike(prev => !prev);
    }

    return (
        <div className="adoptionDetailPet">
            <div className="adoptionDetailPet_top">
                <div className="adoptionDetailPet_top_tags">
                    <div className="tag">호기심 많은</div>
                    <div className="tag">돌봄이 필요한</div>
                    <div className="tag">내성적인</div>
                    <div className="tag">내성적인</div>
                    <div className="tag">내성적인</div>
                </div>
                <img onClick={() => petLikeHandler()}src={petLike?like_A:like_N} alt="" />
            </div>
            <div className="adoptionDetailPet_bottom">
                <div className="adoptionDetailPet_bottom_pic">
                    <img
                        src='http://www.animal.go.kr/files/shelter/2024/08/202408131608203.jpg'
                        alt="입양동물 사진" />
                </div>
                <div className="adoptionDetailPet_bottom_info">
                    <div className="adoptionDetailPet_bottom_info_left">
                        <div className="petinfo_elem">
                            <img src={cat} alt="종" />
                            <div className="hint">종</div>
                            <p>고양이</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={info} alt="종" />
                            <div className="hint">종</div>
                            <p>캐벌리어 킹 찰스 스파니엘</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={color} alt="색" />
                            <div className="hint">색상</div>
                            <p>흰/검</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={sex} alt="성별" />
                            <div className="hint">성별</div>
                            <p>남아</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={health} alt="중성화 여부" />
                            <div className="hint">중성화 여부</div>
                            <p>중성화 완료</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={num} alt="나이" />
                            <div className="hint">나이</div>
                            <p>3살</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={scale} alt="무게" />
                            <div className="hint">무게</div>
                            <p>4kg</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={map} alt="보호 지역" />
                            <div className="hint">보호지역</div>
                            <p>서울 노원구</p>
                        </div>
                    </div>
                    <div className="adoptionDetailPet_bottom_info_right">
                        
                        <div className="info_elem">
                            <img src={calender} alt="" />
                            <div className="info_elem_text">
                                <p>공고 기한</p>
                                <p>2024-08-15 ~ 2024-08-15</p>
                            </div>
                        </div>
                        
                        <div className="info_elem">
                            <img src={calender} alt="" />
                            <div className="info_elem_text">
                                <p>발견 날짜</p>
                                <p>2024-08-15</p>
                            </div>
                        </div>
                        
                        <div className="info_elem">
                            <img src={search} alt="" />
                            <div className="info_elem_text">
                                <p>발견 장소</p>
                                <p>청천동 쌍용아파트용 후문 청천 뒷고기 가게 근처</p>
                            </div>
                        </div>
                        
                        <div className="info_elem">
                            <img src={shield} alt="" />
                            <div className="info_elem_text">
                                <p>보호 장소</p>
                                <p>한국동물구조관리협회</p>
                            </div>
                        </div>

                        <div className="info_elem special">
                            <img src={light} alt="" />
                            <div className="info_elem_text">
                                <p>특이사항</p>
                                <p>포유기. 눈못뜸. 우후지장애. 닥스훈트혼종. 코검정. 꼬리단미안됨. 털상태양호. 발라당입양센터 보호중.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default AdoptionDetailPet;