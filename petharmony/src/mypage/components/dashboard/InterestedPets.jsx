import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/InterestedPets.css";
import PetCard from "../../../common/pet/components/PetCard";
import useAuthStore from "../../../store/useAuthStore";

const InterestedPets = () => {
    const { userId } = useAuthStore();

    const [pets, setPets] = useState([]);

    // 관심있는 입양동물
    useEffect(() => {
        const fetchInterestedPet = async () => {
            try {
                const response = await axiosInstance.get(`/api/user/interestedPets/${userId ? userId : 0}`);
                setPets(response.data);
            } catch (error) {
                console.error("관심있는 동물 조회하는데 오류가 발생 :", error);
            }
        };
        fetchInterestedPet();
    }, []);

    return (
        <div className="interested_pets">
            <p className="ip_title">관심있는 입양동물</p>
            <div className="ip_content">
                {pets.map((pet, index) => (
                    <PetCard key={index} pet={pet} userId={userId} />
                ))}
            </div>
        </div>
    )
}

export default InterestedPets;