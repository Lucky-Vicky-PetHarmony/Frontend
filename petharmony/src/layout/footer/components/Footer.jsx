import React from "react";
import "../styles/Footer.css";
import layoutLogo from "../../logo/layoutLogo.png";
import github from "../assets/github.png";
import notion from "../assets/notion.png";
import figma from "../assets/figma.png";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_container">
                <img className="footer_logo" src={layoutLogo} alt="" />
                <div className="footer_content">
                    <p>PetHarmony 고객센터 : 010-9135-6897 (평일 09:30 - 18:00, 점심시간 12:50 - 14:10, 주말·공휴일 휴무)</p>
                    <p>이메일 : petHarmony77@gmail.com</p>
                    <p>Copyright ⓒ 럭키비키. All rights reserved.</p>
                    <div className="footer_content_link">
                        <a href="https://github.com/Lucky-Vicky-PetHarmony/Server" target="_blank" rel="noopener noreferrer">
                            <img className="footer_content_link_img" src={github} alt="" />
                        </a>
                        <a href="https://www.notion.so/7ada9908ead14ae09b4862ed85910579?pvs=4" target="_blank" rel="noopener noreferrer">
                            <img className="footer_content_link_img" src={notion} alt="" />
                        </a>
                        <a href="https://www.figma.com/design/S5cuxCOfcWx5O3eFJ19gpT/%EB%9F%AD%ED%82%A4%EB%B9%84%ED%82%A4?node-id=0-1&t=Sb28xxH62iwIDLNP-0" target="_blank" rel="noopener noreferrer">
                            <img className="footer_content_link_img" src={figma} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;