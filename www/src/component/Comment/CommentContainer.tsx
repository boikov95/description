import React from "react";
import { connect } from "react-redux";
import {
  addcommentBD,
  commentType,
  getcomment,
} from "../../Redux/commentreducer.ts";
import Comment from "./Comment.tsx";
import s from "./Comment.module.css";
import tooglephoto from "../../photo/loading.gif";
import { AppStateType } from "../../Redux/redux-store.ts";

type MapStateToPropsType = {
  comment: Array<commentType>;
};

type MapDispatchToPropsType = {
  getcomment: () => void;
  addcommentBD: (formData: commentType) => void;
};

class CommentContainer extends React.Component<
  MapStateToPropsType & MapDispatchToPropsType
> {
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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    comment: state.comment.comment,
  };
};

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, { getcomment, addcommentBD })(CommentContainer);
