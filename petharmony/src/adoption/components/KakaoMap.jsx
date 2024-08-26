import React, { useEffect, useState } from "react";
import "../styles/KakaoMap.css";
import location from '../asset/detailIcon/location.png'


const {kakao} = window;

const KakaoMap = ({care_addr, care_nm}) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [coords, setCoords] = useState({ lat: null, lng: null });


    useEffect(() => {

        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 4,
            };

            const newMap = new window.kakao.maps.Map(container, options);
            setMap(newMap);

            const newMarker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(33.450701, 126.570667),
            });
            setMarker(newMarker);

            // 마커를 지도에 표시
            newMarker.setMap(newMap);

            // 검색한 주소로 이동
            searchAddr(newMap, newMarker);
        })
        
    }, []);

    const searchAddr = (mapInstance, markerInstance) => {
        // 주소검색
        new kakao.maps.services.Geocoder().addressSearch(
            `${care_addr}`, // 보호소 주소를 여기에 입력 {/* 바꿔야함 */}ㄴ
            function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                    const currentPos = new window.kakao.maps.LatLng(
                        result[0].y,
                        result[0].x
                    );

                    // 검색된 좌표를 상태로 저장
                    setCoords({ lat: result[0].y, lng: result[0].x });

                    mapInstance.panTo(currentPos);

                    markerInstance.setMap(null);
                    markerInstance.setPosition(currentPos);
                    markerInstance.setMap(mapInstance);
                }
            }
        );
    };
    
    return (
        <div className="adoptionDetailShelter_location">
                <div className="adoptionDetailShelter_location_top">
                    <div 
                        className="location_top_left"
                        onClick={() => 
                            {window.open(`https://map.kakao.com/link/map/${care_nm},${coords.lat},${coords.lng}`, "_blank");}}
                        >
                        <img src={location} alt="" />
                        <p>{care_nm}</p>
                    </div>
                    <div className="location_top_right">
                        <p onClick={() => 
                            {window.open(`https://map.kakao.com/link/to/${care_nm},${coords.lat},${coords.lng}`, "_blank");}}>🔍  길찾기</p>
                        <p onClick={() => 
                            { window.open(`https://map.kakao.com/link/roadview/${coords.lat},${coords.lng}`, "_blank");
                        }}>📍  로드뷰</p>
                    </div>
                </div>
                <div id="map" className="kakaomap">
            </div>
        </div>
    );
}

export default KakaoMap;