import React, {useState, useEffect} from "react";
import "./Loading.css"
import logo from './mainImg.png';


const Loading = () => {
    const [loadingText, setLoadingText] = useState("");
    const colors = ["#FC363E", "#FF9900", "#FED60D", "#72C85A", "#3A70DF", "#3A5EDF", "#5A5FD7", "#5D5D5D", "#5D5D5D", "#5D5D5D"];
    const text = "LOADING···";

    useEffect(() => {
        let index = 1;
        const interval = setInterval(() => {
            setLoadingText(text.slice(0, index));
            index++;
            if (index > text.length) {
                index = 1; // 다시 처음부터 시작
            }
        }, 400); // 300ms마다 텍스트 변경

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 제거
    }, []);

    return(
        <div className="Loading">
            <img src={logo} alt="logo" />
            <p>
                {loadingText.split("").map((char, i) => (
                    <span key={i} style={{ color: colors[i % colors.length] }}>{char}</span>
                ))}
            </p>
        </div>
    )

}
export default Loading;