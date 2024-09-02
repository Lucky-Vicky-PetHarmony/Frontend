import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import "../../styles/slide/Slider.css";
import SlideItem from "./SlideItem";
import axios from "axios";
import loading from "../../assets/slideLoading.png";

const Slider = () => {
    const [slides, setSlides] = useState([]);
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    // 입양동물 상세 페이지로 이동
    const handleMoveAdoption = (desertionNo) => {
        navigate(`/adoption/${desertionNo}`);
    }

    // 슬라이더 데이터 가져오기
    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/public/slides');
                setSlides(response.data);
            } catch (error) {
                console.error("슬라이드를 가져오는 데 실패했습니다:", error);
            }
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
        }
    }, [slides]);

    return (
        <div className="slider">
            {slides.length > 0 ? (
                <Swiper
                    ref={swiperRef}
                    key={slides.length}
                    modules={[Autoplay]}
                    spaceBetween={52}
                    slidesPerView={Math.min(slides.length, 6)}
                    loop={slides.length > 6}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    direction={'horizontal'}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} onClick={() => handleMoveAdoption(slide.desertionNo)}>
                            <SlideItem
                                popFile={slide.popFile}
                                sexCd={slide.sexCd}
                                age={slide.age}
                                noticeNo={slide.noticeNo}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <img className="slider_loading" src={loading} alt="로딩화면" />
            )}
        </div>
    );
};

export default Slider;