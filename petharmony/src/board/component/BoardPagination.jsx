import React from "react";
import '../style/BoardPagination.css';
import arrowimg from '../asset/arrow.png';


const BoardPagination = () => {

    return (
        <div className="boardpagination">
            <img className="boardpagination_arrow_left" src={arrowimg} alt="" />
            <div className="boardpagination_pagenumber">
                <p className="active">1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>
            <img className="boardpagination_arrow_right" src={arrowimg} alt="" />
        </div>
    );
}

export default BoardPagination;