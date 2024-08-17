import React, { useState, useEffect, useRef } from "react";
import '../../style/boardList/BoardFilter.css'
import dropdownimg from "../../asset/dropdown.png"
import refreshImg from "../../asset/refresh.png"

const BoardFilter = ({setFilter, setPage, resetAll}) => {
    const [filterStatus, setFilterStatus] = useState("date");
    const [filterDropdown, setFilterDropdown] = useState(false);
    const dropdownRef = useRef(null);  // 드롭다운 영역을 참조하기 위한 ref

    const handleDropdown = () => {
        setFilterDropdown(prevState => !prevState);
    }

    const handleFilter = (filtername) => {
        setFilterStatus(filtername);
        setFilterDropdown(false);
        setPage(1);
        setFilter(filtername);
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
        <div className="BF">
            <div className="BF_board_filter" ref={dropdownRef}>
                <div
                    className="BF_board_filter_btn"
                    onClick={() => handleDropdown()}>
                    <p>
                    {filterStatus === "date" ? "최신순"
                    : filterStatus === "views" ? "조회순"
                    : filterStatus === "comments" ? "댓글순"
                    : "기타"}
                    </p>
                    <img src={dropdownimg} alt="" />
                </div>
                {filterDropdown && (<div className="BF_board_filter_dropdown">
                    <div
                        className="BF_board_filter_dropdown_btn"
                        onClick={() => handleFilter("date")}>최신순</div>
                    <div
                        className="BF_board_filter_dropdown_btn"
                        onClick={() => handleFilter("views")}>조회순</div>
                    <div
                        className="BF_board_filter_dropdown_btn"
                        onClick={() => handleFilter("comments")}>댓글순</div>
                    <div
                        className="BF_board_filter_dropdown_btn"
                        onClick={() => handleFilter("scraps")}>스크랩순</div>
                </div>)}
            </div>
            <img 
                className="BF_reset" 
                src={refreshImg} 
                alt="초기화"
                onClick={resetAll}/>
        </div>
    );
}

export default BoardFilter;