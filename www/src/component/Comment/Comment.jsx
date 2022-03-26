import React from "react";
import s from "./Comment.module.css";
import user from "../../photo/usernew.jpg";
import { reduxForm, reset } from "redux-form";
import AddComment from "./AddComment.jsx";
import Scrollbars from "react-custom-scrollbars";

const ReduxFormComment = reduxForm({
  form: "comment",
})(AddComment);

const Comment = (props) => {
  const submit = (formData, dispatch) => {
    props.addcommentBD(formData);
    dispatch(reset("comment"));
  };

  return (
    <div>
      <div className={s.readcomment}>
        <Scrollbars style={{ width: "100%", height: "100%" }}>
          {props.comment.map((comment, index) => {
            return (
              <div
                key={index}
                className={s.mainblock + " " + (comment.visible ? s.vis : "")}
              >
                <div className={s.block_one}>
                  <img className={s.photocomment} src={user} />
                  <div className={s.date}>{comment.date_add}</div>
                </div>
                <div className={s.block_two}>
                  <div className={s.namecomment}>{comment.name}</div>
                  <div className={s.textcomment}>{comment.text}</div>
                </div>
              </div>
            );
          })}
        </Scrollbars>
      </div>

      <div className={s.addcomment}>
        <ReduxFormComment onSubmit={submit} />
      </div>
    </div>
  );
};

export default Comment;
