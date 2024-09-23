import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosConfig";
import "../../styles/dashboard/InterestedPets.css";
import PetCard from "../../../common/pet/components/PetCard";
import useAuthStore from "../../../store/useAuthStore";
import BoardPagination from "../../../board/components/boardList/BoardPagination";

const InterestedPets = () => {
    const { userId } = useAuthStore();

    const [pets, setPets] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchInterestedPet = async () => {
            try {
                const response = await axiosInstance.get(`/api/user/interestedPets/${userId}?page=${currentPage - 1}&size=4`);
                setPets(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("관심있는 동물 조회하는데 오류가 발생 :", error);
            }
        };
        fetchInterestedPet();
    }, [currentPage]);

    return (
        <div className="interested_pets">
            <p className="ip_title">관심있는 입양동물</p>
            <div className="ip_content">
                {pets.map((pet, index) => (
                    <PetCard key={index} pet={pet} userId={userId} customClass="custom_pet_card" />
                ))}
            </div>
            <BoardPagination
                customClass="custom_board_pagination"
                setPage={setCurrentPage}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </div>
    );
}

export default InterestedPets;