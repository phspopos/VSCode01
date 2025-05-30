import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    console.log("업로드된 파일:", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("파일을 선택하세요.");
      return;
    }
    // 실제 업로드 로직 (예: 서버, Firebase 등)
    console.log("파일 업로드 처리");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">업로드</button>
    </form>
  );
}

export default FileUpload;