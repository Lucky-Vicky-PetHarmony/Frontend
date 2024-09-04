import React, { useState } from "react";
import "../styles/AdoptionDetailPet.css";
import calender from '../asset/detailIcon/calender.png'
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
import paw_bl from '../asset/paw_bl.png'
import dog_bl from '../asset/dog_bl.png'
import cat_bl from '../asset/cat_bl.png'
import axios from "axios";



const AdoptionDetailPet = ({pet, token, userId}) => {
    
    const [petLike, setPetLike] = useState(pet.pet_like);

    const petLikeHandler = () => {
        if(!token&&!userId){
            alert("입양동물 좋아요는 로그인이 필요합니다.")
            return;
        }
        axiosPetLike();
    }

    // TODO: 좋아요처리(좋아요 취소요청인지 활성화요청인지 보내야함)
    const axiosPetLike = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/user/pet-likes`, 
                {
                    userId: userId,                 // 유저 아이디
                    desertionNo: pet.desertion_no,   // 입양 동물 아이디
                    isLiked: !petLike,           // 좋아요 활성화 여부 (true: 좋아요, false: 취소)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            if (response.status === 200) {
                setPetLike(prev => !prev);
            } else {
                console.log("좋아요 실패");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error: ", error);
        }
    };

    return (
        <div className="adoptionDetailPet">
            <div className="adoptionDetailPet_top">
                <div className="adoptionDetailPet_top_tags">
                    {pet.words.map((word, index) => (
                        <div className="tag" key={index}>{word}</div>
                    ))}
                </div>
                <img onClick={() => petLikeHandler()} src={petLike?like_A:like_N} alt="" />
            </div>
            <div className="adoptionDetailPet_bottom">
                <div className="adoptionDetailPet_bottom_pic">
                    <img
                        src={pet.popfile}
                        alt="입양동물 사진" />
                </div>
                <div className="adoptionDetailPet_bottom_info">
                    <div className="adoptionDetailPet_bottom_info_left">
                        <div className="petinfo_elem">
                            <img 
                                src={pet.kind_cd==="개"?
                                    dog_bl:
                                    pet.kind_cd==="고양이"?
                                    cat_bl:paw_bl} 
                                alt="종" />
                            <div className="hint">종</div>
                            <p>{pet.kind_cd}</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={info} alt="종" />
                            <div className="hint">종</div>
                            <p>{pet.kind_cd_detail}</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={color} alt="색" />
                            <div className="hint">색상</div>
                            <p>{pet.color_cd}</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={sex} alt="성별" />
                            <div className="hint">성별</div>
                            <p>{pet.sex_cd}</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={health} alt="중성화 여부" />
                            <div className="hint">중성화 여부</div>
                            <p>{pet.neuter_yn}</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={num} alt="나이" />
                            <div className="hint">나이</div>
                            <p>{pet.age}</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={scale} alt="무게" />
                            <div className="hint">무게</div>
                            <p>{pet.weight}</p>
                        </div>
                        <div className="petinfo_elem">
                            <img src={map} alt="보호 지역" />
                            <div className="hint">보호지역</div>
                            <p>{pet.org_nm}</p>
                        </div>
                    </div>
                    <div className="adoptionDetailPet_bottom_info_right">
                        
                        <div className="info_elem">
                            <img src={calender} alt="" />
                            <div className="info_elem_text">
                                <p>공고 기한</p>
                                <p>{pet.notice_period}</p>
                            </div>
                        </div>
                        
                        <div className="info_elem">
                            <img src={calender} alt="" />
                            <div className="info_elem_text">
                                <p>발견 날짜</p>
                                <p>{pet.happen_dt}</p>
                            </div>
                        </div>
                        
                        <div className="info_elem">
                            <img src={search} alt="" />
                            <div className="info_elem_text">
                                <p>발견 장소</p>
                                <p>{pet.happen_place}</p>
                            </div>
                        </div>
                        
                        <div className="info_elem">
                            <img src={shield} alt="" />
                            <div className="info_elem_text">
                                <p>보호 장소</p>
                                <p>{pet.care_nm}</p>
                            </div>
                        </div>

                        <div className="info_elem special">
                            <img src={light} alt="" />
                            <div className="info_elem_text">
                                <p>특이사항</p>
                                <p>{pet.special_mark}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default AdoptionDetailPet;