import React, { useState, useRef, useEffect } from "react";
import '../../style/boardList/BoardSearch.css';
import searchImg from "../../asset/search.png";
import arrowimg from "../../asset/arrow.png"


const BoardSearch = ({setSearchFilter, setSearchText, axiosBoardList, setPage}) => {

    const [searchFilterStatus, setsearchFilterStatus] = useState("제목");
    const [searchFilterDropdown, setSearchFilterDropdown] = useState(false);
    const dropdownRef = useRef(null);  // 드롭다운 영역을 참조하기 위한 ref

    const searchClick = () => {
        setPage(1);
        axiosBoardList();
    }

    
    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    }

    const handleDropdown = () => {
        setSearchFilterDropdown(prevState => !prevState);
    }

    const handleFilter = (filtername) => {
        setsearchFilterStatus(filtername);
        setSearchFilterDropdown(false);

        switch (filtername) {
            case "제목":
                setSearchFilter("title"); // 제목으로 검색
                break;
            case "내용":
                setSearchFilter("content"); // 내용으로 검색
                break;
            case "제목+내용":
                setSearchFilter("titleContent"); // 제목+내용으로 검색
                break;
            default:
                setSearchFilter("title");
                break;
        }
    }

    // 드롭다운 이외의 영역을 클릭했을 때 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSearchFilterDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="BS">
            {/* 검색필터 */}
            <div 
                className="BS_filter"
                onClick={() => handleDropdown()}>
                <p>{searchFilterStatus}</p>
                <img src={arrowimg} alt="" />
            </div>
            {/* 드롭다운 */}
            {searchFilterDropdown && (
                <div className="BS_dropdown" ref={dropdownRef}>
                    <div 
                        className="BS_dropdown_btn"
                        onClick={() => handleFilter("제목")}>제목</div>
                    <div 
                        className="BS_dropdown_btn"
                        onClick={() => handleFilter("내용")}>내용</div>
                    <div 
                        className="BS_dropdown_btn"
                        onClick={() => handleFilter("제목+내용")}>제목+내용</div>
                </div>)}
            <div className="board_search">
                <input 
                    type="text" 
                    placeholder="검색어를 입력하세요"
                    onChange={handleSearchText}
                    />
                <img 
                    src={searchImg} 
                    alt="" 
                    onClick={() => searchClick()}/>
            </div>
        </div>
    );
}

export default BoardSearch;