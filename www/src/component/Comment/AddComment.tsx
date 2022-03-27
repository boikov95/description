import React from "react";
import { Field, InjectedFormProps } from "redux-form";
import { FormControl } from "../FormControl/FormControl.tsx";
import { required } from "../FormControl/required.tsx";
import s from "../FormControl/FormControl.module.css";
import { commentType } from "../../Redux/commentreducer.ts";

type PropsType = InjectedFormProps<commentType>;

const AddComment: React.FC<PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          className={s.FIO}
          component={FormControl}
          validate={required}
          name={"name"}
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
