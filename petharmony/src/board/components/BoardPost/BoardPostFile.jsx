import React, {useState, useRef, useEffect} from "react";
import '../../style/boardPost/BoardPostFile.css';
import plusImg from '../../asset/plus.png';
import XImg from '../../asset/X.png';


//새롭게 추가한 이미지만 setFiles에 저장 -> 기존의 이미지는 undefined로 배열의 자리만 차지하도록 되어있음
//기존 이미지에서 삭제되는 이미지는 setDeleteImages에 이미지 번호만 저장함(imageId)

const BoardPostFile = ({setFiles, isEdit, setDeleteImages, existingImages}) => {

    const [selectedFiles, setSelectedFiles] = useState(existingImages); // 선택한 파일(화면에 보여줄)
    const fileInputRef = useRef(null); //파일추가하는 input요소를 가리킴


    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        //첨부파일을 한번에 6개 초과로 선택한 경우 경고창
        const totalFiles = selectedFiles.length + files.length;
        if (totalFiles > 6) {
            alert("최대 6개까지 파일을 첨부할 수 있습니다.");
            return; // 6개 초과시 추가하지 않고 함수 종료
        }

        // 선택한 파일 미리보기
        const filesWithPreview = files.map(file => ({
            file,
            preview: URL.createObjectURL(file) // 파일 객체를 URL로 변환하여 미리보기용으로 저장
        }));

        setSelectedFiles(prevFiles => [...prevFiles, ...filesWithPreview]);
    };

    const handleFileDelete = (index) => {
        const fileToDelete = selectedFiles[index];

        // 기존 이미지라면 setDeleteImages에 추가
        if (isEdit && fileToDelete.imageId) {
            setDeleteImages(prev => [...prev, fileToDelete.imageId]);
        }

        // 삭제된 자리에는 undefined를 남겨 기존 이미지 자리를 보존
        setSelectedFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = undefined;
            return updatedFiles;
        });
    };

    //파일추가버튼
    const handlePlusClick = () => {
        fileInputRef.current.click();
    };

    // selectedFiles가 변경될 때마다 부모 컴포넌트에 파일 목록 업데이트
    useEffect(() => {
        const newFiles = selectedFiles
            .filter(fileObj => fileObj && fileObj.file) // 기존 이미지를 제외한 새 파일만 포함
            .map(fileObj => fileObj.file);
        setFiles(newFiles);
    }, [selectedFiles, setFiles]);

    return (
        <div className="BPF">
            <p>
                첨부파일(최대 6장)<span> * png, jpg, jpeg만 첨부가능합니다.</span>
            </p>
            <div className="BPF_files">
                {selectedFiles.map((file, index) => (file && (
                    <div key={index} className="BPF_Files_file">
                        <img 
                            className="BPF_Files_file_img"
                            src={file.imageUrl || file.preview}
                            alt={`첨부파일 ${index+1}`}/>
                        <img 
                            className="BPF_Files_file_delete"
                            src={XImg} 
                            alt=""
                            onClick={() => handleFileDelete(index)} />
                    </div>
                )))}
                {/* 6개 이하일때만 */}
                {selectedFiles.filter(file => file !== undefined).length < 6 &&(
                    <div 
                        className="BPF_files_plus"
                        onClick={() => handlePlusClick()}>
                        <img 
                        src={plusImg} 
                        alt="" />
                    </div>
                )}
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