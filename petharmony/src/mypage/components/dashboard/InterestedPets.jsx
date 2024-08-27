import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard/InterestedPets.css";
import PetCard from "../../../main/components/PetCard";

const InterestedPets = ({ token }) => {
    // 내가 관심있는 입양 동물 상태
    const [pets, setPets] = useState([]);

    // 관심있는 입양동물 가져오기  (수정 예정)
    useEffect(() => {
        const fetchInterestedPet = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/interestedPets', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPets(response.data);
            } catch (error) {
                console.error("관심있는 동물 조회하는데 오류가 발생 :", error);
            }
        };
        fetchInterestedPet();
    }, [token]);

    return (
        <div className="interested_pets">
            <p className="ip_title">관심있는 입양동물</p>
            <div className="ip_content">
                {pets.map(pet => (
                    <PetCard key={pet.desertionNo} pet={pet} />
                ))}
            </div>
        </div>
    )
}

export default InterestedPets;