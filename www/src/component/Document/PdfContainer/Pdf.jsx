import React, { useState } from "react";
import s from "./../Document.module.css";

const Pdf = (props) => {
  const [pdfNumber, setPdfNumber] = useState(0);

  return (
    <div className={s.block_managment}>
      {props.pdf.length > 1 && (
        <div className={s.all_managment}>
          <div className={s.text_managment}>PDF документы:</div>
          {props.pdf.map((element, index) => (
            <span
              className={
                s.managment + " " + (index === pdfNumber ? s.active : "")
              }
              key={index}
              onClick={() => setPdfNumber(index)}
            >
              {index + 1}
            </span>
          ))}
        </div>
      )}
      <embed
        className={s.pdfBD}
        key={props.pdf[pdfNumber].src}
        src={props.pdf[pdfNumber].src}
      />
    </div>
  );
};

export default Pdf;
