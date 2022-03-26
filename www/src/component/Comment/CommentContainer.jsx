import React from "react";
import { connect } from "react-redux";
import { addcommentBD, getcomment } from "../../Redux/commentreducer";
import Comment from "./Comment.jsx";
import s from "./Comment.module.css";
import tooglephoto from "../../photo/loading.gif";

class CommentContainer extends React.Component {
  componentDidMount() {
    this.props.getcomment();
  }

  render() {
    if (this.props.comment.length === 0)
      return (
        <div>
          <img className={s.photoload} src={tooglephoto} />
        </div>
      );

    return <Comment {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    comment: state.comment.comment,
  };
};

export default connect(mapStateToProps, { getcomment, addcommentBD })(
  CommentContainer
);
