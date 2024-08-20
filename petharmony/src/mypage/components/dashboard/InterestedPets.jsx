import React from "react";
import "../../styles/dashboard/InterestedPets.css";
import PetCard from "../../../common/pet/components/PetCard";

const InterestedPets = ({ pets }) => {
    return (
        <div className="interested_pets">
            <p className="ip_title">관심있는 입양동물</p>
            <div className="ip_content">
                <PetCard />
            </div>
        </div>
    )
}

export default InterestedPets;