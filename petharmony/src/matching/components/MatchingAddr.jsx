import React, { useEffect, useState } from "react";
import "../styles/MatchingAddr.css";

const MatchingAddr = ({ setAddr, existAddr }) => {
    const [existStyle, setExistStyle] = useState(false);
    const [inputAddress, setInputAddress] = useState(""); // 추가: 입력된 주소 상태

    useEffect(() => {
        const loadKakaoMap = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(initializeMapAndPostcode);
            }
        };

        loadKakaoMap();
    }, []);

    const setExistAddr = () => {
        setAddr(existAddr);
        setInputAddress(existAddr); // 수정: 기존 주소를 input에 설정
        setExistStyle(true);
    }

    const initializeMapAndPostcode = () => {
        const execDaumPostcode = () => {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    const addr = data.address; // 최종 주소 변수

                    // 주소 정보를 상태에 저장
                    setInputAddress(addr);

                    // 주소로 상세 정보를 검색
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(data.address, function (results, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === window.kakao.maps.services.Status.OK) {
                            const result = results[0]; // 첫번째 결과의 값을 활용

                            // 해당 주소에 대한 좌표를 받아서
                            const coords = new window.kakao.maps.LatLng(result.y, result.x);
                            const mapContainer = document.getElementById('map');
                            const mapOption = {
                                center: coords,
                                level: 5,
                            };

                            // 지도를 보여준다.
                            mapContainer.style.display = "block";
                            const map = new window.kakao.maps.Map(mapContainer, mapOption);

                            // 마커를 결과값으로 받은 위치로 옮긴다.
                            new window.kakao.maps.Marker({
                                position: coords,
                                map: map
                            });

                            // 주소를 부모 컴포넌트로 전달
                            setAddr(addr);
                        }
                    });
                }
            }).open();
        };

        // 해당 함수에 대한 이벤트 리스너 추가
        document.getElementById('searchButton').addEventListener('click', execDaumPostcode);
    };

    return (
        <div className="MA">
            <div className="MA_input">
                <p>주소검색 버튼을 이용해서 주소를 검색해주세요:)</p>
                <input 
                    className="MA_input_addr" 
                    type="text" 
                    id="address" 
                    placeholder="주소" 
                    readOnly 
                    value={inputAddress} // 수정: 상태값을 사용
                />
                <input className="MA_input_btn" type="button" id="searchButton" value="주소 검색" />
               {existAddr !== "Empty Address" && (
                   <div className="Existing_address" onClick={setExistAddr}>기존 주소 사용하기</div>
               )}
            </div>
            <div className="map" id="map" ></div>
        </div>
    );
}

export default MatchingAddr;