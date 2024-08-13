import React, { useState, useEffect, useRef } from "react";
import '../../style/boardList/BoardFilter.css'
import dropdownimg from "../../asset/dropdown.png"

const BoardFilter = ({setFilter}) => {
    const [filterStatus, setFilterStatus] = useState("최신순");
    const [filterDropdown, setFilterDropdown] = useState(false);
    const dropdownRef = useRef(null);  // 드롭다운 영역을 참조하기 위한 ref


    const handleDropdown = () => {
        setFilterDropdown(prevState => !prevState);
    }

    const handleFilter = (filtername) => {
        setFilterStatus(filtername);
        setFilterDropdown(false);

        // 부모 컴포넌트의 setFilter 함수 호출
        switch (filtername) {
            case "최신순":
                setFilter("date"); // 최신순
                break;
            case "조회순":
                setFilter("views"); // 조회수순
                break;
            case "댓글순":
                setFilter("comments"); // 댓글순
                break;
            // case "스크랩순": // 부기능
            //     setFilter("scrap"); // 스크랩순 정렬 기준 (예시로 추가)
            //     break;
            default:
                setFilter("date");
                break;
        }
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