import React from "react";
import { Field } from "redux-form";
import { FormControl } from "../FormControl/FormControl.jsx";
import { required } from "../FormControl/required.jsx";
import s from "../FormControl/FormControl.module.css";

const AddComment = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          className={s.FIO}
          component={FormControl}
          validate={required}
          name={"FIO"}
          placeholder={"Введите ФИО"}
        />
      </div>
      <div>
        <Field
          className={s.text}
          component={FormControl}
          validate={required}
          name={"text"}
          placeholder={"Введите текст комментария"}
        />
      </div>
      <div>
        <button
          className={s.publish}
          disabled={props.invalid || props.submitting || props.pristine}
        >
          Добавить комментарий
        </button>
      </div>
    </form>
  );
};

export default AddComment;
