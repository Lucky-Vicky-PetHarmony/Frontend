import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import "../../styles/slide/Slider.css";
import SlideItem from "./SlideItem";
import axios from "axios";
import loading from "../../assets/slideLoading.png";

const Slider = () => {
    // 슬라이더 저장할 상태
    const [slides, setSlides] = useState([]);

    // 슬라이더 데이터 가져오기
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/public/slides');
                setSlides(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("슬라이드를 가져오는 데 실패했습니다:", error);
            }
        };
        fetchSlides();
    }, [setSlides]);


    return (
        <div className="slider">
            <Swiper
                modules={[Autoplay]}                       // Autoplay 모듈 추가
                spaceBetween={52}                          // 간격 : 52
                slidesPerView={Math.min(slides.length, 6)} // 슬라이드 개수에 맞춰 slidesPerView를 조정
                loop={slides.length > 6}                   // 슬라이드 개수가 6개 이상일 때만 loop 모드 활성화
                autoplay={{
                    delay: 1000,                           // 1초마다 자동으로 슬라이드 전환
                    disableOnInteraction: false,
                }}
                speed={1000}                               // 슬라이드 전환 속도 : 1초
                direction={'horizontal'}                   // 슬라이드 방향 : 수평
            >
                {slides?.length > 0 ? (
                    slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <SlideItem
                                popFile={slide.popFile}
                                sexCd={slide.sexCd}
                                age={slide.age}
                                noticeNo={slide.noticeNo}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    // 데이터가 없을 경우 || 로딩중일때
                    <img className="slider_loading" src={loading} alt="로딩화면" />
                )}
            </Swiper>
        </div>
    );
};

export default Slider;