import React, {useState, useRef, useEffect} from "react";
import '../../style/boardPost/BoardPostFile.css';
import plusImg from '../../asset/plus.png';
import deleteImg from '../../asset/delete.png';


const BoardPostFile = ({setFiles}) => {
    const [selectedFiles, setSelectedFiles] = useState([]); //선택한 파일 저장
    const fileInputRef = useRef(null); //파일추가하는 input요소를 가리킴

    useEffect(()=> {
        setFiles(selectedFiles);
    }, [selectedFiles]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        //첨부파일을 한번에 6개 초과로 선택한 경우 경고창
        const totalFiles = selectedFiles.length + files.length;

        if (totalFiles > 6) {
            alert("최대 6개까지 파일을 첨부할 수 있습니다.");
            return; // 6개 초과시 추가하지 않고 함수 종료
        }

        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleFileDelete = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handlePlusClick = () => {
        fileInputRef.current.click();
    };

    // 파일 확인용 로그
    // useEffect(() => {
    //     console.log(selectedFiles);

    // }, [selectedFiles]);


    return (
        <div className="BPF">
            <p>
                첨부파일(최대 6장)<span> * png, jpg, jpeg만 첨부가능합니다.</span>
            </p>
            <div className="BPF_files">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="BPF_Files_file">
                        <p>{file.name}</p>
                        <img 
                            src={deleteImg} 
                            alt=""
                            onClick={() => handleFileDelete(index)} />
                    </div>
                ))}
                {/* 6개 이하일때만 */}
                {selectedFiles.length<6 &&(<img 
                    src={plusImg} 
                    alt="" 
                    onClick={() => handlePlusClick()}/>)}
            </div>

            {/* 이미지추가 */}
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
                multiple 
                accept=".png, .jpg, .jpeg"
            />

        </div>
    );
}

export default BoardPostFile;