import React, { useState } from "react";
import '../../style/boardView/BoardContent.css';
import pinNoneImg from '../../asset/pin_none.png'
import pinActiveImg from '../../asset/pin_active.png'
import pinGrayImg from '../../asset/pin_gray.png'
import commImg from '../../asset/comment.png'
import viewImg from '../../asset/view.png'
import dogImg from '../../asset/dog.png'
import sosImg from '../../asset/sos.png'



const BoardContent = () => {

    const [pin, setPin] = useState(false);

    const pinToggle = () => {
        setPin(prevState => !prevState);
    }

    return (
        <div className="board_content">

            {/* 카테고리, pin */}
            <div className="bc_1">
                <div className="bc_1_category">입양</div>
                <img 
                    src={pin ? pinActiveImg : pinNoneImg} 
                    alt=""
                    onClick={() => pinToggle()} />
            </div>

            {/* 제목, 작성자 */}
            <div className="bc_2">
                <p className="bc_2_title">제 강아지 귀엽죠?</p>
                <p className="bc_2_writer">김*은</p>
            </div>

            {/* 조회수, 댓글수, pin수, 작성시간(수정시간) */}
            <div className="bc_3">
                <div className="bc_3_left">
                    <div className="bc_3_left_elem">
                        <img src={viewImg} alt="조회수" />
                        <p>160</p>
                    </div>
                    <div className="bc_3_left_elem">
                        <img src={commImg} alt="댓글" />
                        <p>13</p>
                    </div>
                    <div className="bc_3_left_elem">
                        <img src={pinGrayImg} alt="핀" />
                        <p>2</p>
                    </div>
                </div>
                <div className="bc_3_right">2024.07.08 12:30</div>
            </div>

            {/* 내용 */}
            <div className="bc_4">
            우리 가족은 루시와 함께 많은 추억을 쌓고 있습니다. 저녁이 되면 가족 모두가 거실에 모여 루시와 놀아주거나, 소파에 함께 누워 TV를 보는 시간이 가장 행복한 순간입니다. 루시는 우리가 무슨 말을 하는지 다 이해하는 것처럼 고개를 갸우뚱거리며 쳐다보곤 하는데, 그 모습이 너무 귀여워서 웃음이 끊이지 않습니다.

            루시는 단순한 반려동물이 아닌, 우리 가족의 일원이 되었습니다. 그녀의 존재는 우리 집에 따뜻함과 행복을 가져다주고 있습니다. 보호소에서의 생활이 어땠는지 모르겠지만, 이제 루시는 영원히 사랑받을 집을 찾았습니다. 앞으로도 루시와 함께 더 많은 추억을 만들어가고 싶습니다. 루시가 우리 가족에게 온 것은 정말 큰 축복이자, 우리의 삶을 더욱 풍요롭게 해주는 선물입니다.

            입양을 고민하는 모든 분들께, 강아지들이 우리에게 주는 사랑은 정말 말로 다 표현할 수 없을 정도로 큽니다. 새로운 가족을 맞이하게 된다면, 그들의 사랑스러운 눈빛과 따뜻한 마음을 절대 후회하지 않을 거예요. 루시와 함께하는 매일이 소중한 선물처럼 느껴지며, 앞으로도 우리 가족은 루시와 함께 더 많은 사랑과 행복을 나누고 싶습니다.
            </div>

            {/* 첨부파일 */}
            <div className="bc_5">
                <img src={dogImg} alt="게시물첨부파일" />
                <img src={dogImg} alt="게시물첨부파일" />
                <img src={dogImg} alt="게시물첨부파일" />
                <img src={dogImg} alt="게시물첨부파일" />
                <img src={dogImg} alt="게시물첨부파일" />
                <img src={dogImg} alt="게시물첨부파일" />
            </div>

            {/* 신고 */}
            <div className="bc_6">
                <img src={sosImg} alt="" />
                <p>신고</p>
            </div>

        </div>
    );
}

export default BoardContent;