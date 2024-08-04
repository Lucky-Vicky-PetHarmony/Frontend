import React, { useState, useEffect, useRef } from "react";
import '../style/BoardFilter.css'
import dropdownimg from "../asset/dropdown.png"

const BoardFilter = () => {
    const [filterStatus, setFilterStatus] = useState("최신순");
    const [filterDropdown, setFilterDropdown] = useState(false);
    const dropdownRef = useRef(null);  // 드롭다운 영역을 참조하기 위한 ref


    const handleDropdown = () => {
        setFilterDropdown(prevState => !prevState);
    }

    const handleFilter = (filtername) => {
        setFilterStatus(filtername);
        setFilterDropdown(false);
    }

    // 드롭다운 이외의 영역을 클릭했을 때 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setFilterDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="board_filter" ref={dropdownRef}>
            <div 
                className="board_filter_btn"
                onClick={() => handleDropdown()}>
                <p>{filterStatus}</p>
                <img src={dropdownimg} alt="" />
            </div>
            {filterDropdown && (<div className="board_filter_dropdown">
                <div 
                    className="board_filter_dropdown_btn"
                    onClick={() => handleFilter("최신순")}>최신순</div>
                <div 
                    className="board_filter_dropdown_btn"
                    onClick={() => handleFilter("조회순")}>조회순</div>
                <div 
                    className="board_filter_dropdown_btn"
                    onClick={() => handleFilter("댓글순")}>댓글순</div>
                <div 
                    className="board_filter_dropdown_btn"
                    onClick={() => handleFilter("스크랩순")}>스크랩순</div>
            </div>)}
        </div>
    );
}

export default BoardFilter;