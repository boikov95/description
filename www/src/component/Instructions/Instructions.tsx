import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  UIEvent,
} from "react";
import s from "./Instructions.module.css";
import Scrollbars from "react-custom-scrollbars";
import { instructionsType } from "../../api/api.ts";

type InstructionsType = {
  instructions: Array<instructionsType>;
  instructionsId: string;
  dateInstruction: instructionsType;
  addInstructionsNew: (where: string) => void;
  loadInstructions: (where: string) => void;
};

const Instructions: React.FC<InstructionsType> = (props) => {
  const [updateIns, setupdateIns] = useState(false);

  const useDidMountEffect = (func: any, deps: any) => {
    const didMount = useRef(false);
    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };

  useDidMountEffect(() => {
    props.loadInstructions("a.id" + props.instructionsId);
  }, [props.instructionsId]);

  useDidMountEffect(() => {
    if (updateIns) {
      props.addInstructionsNew(
        "a.id" +
          props.instructionsId +
          " and b.date<(select STR_TO_DATE('" +
          props.dateInstruction.date +
          "', '%d.%m.%Y %H:%i'))"
      );
    }
  }, [updateIns]);

  // useEffect(() => {
  //     childactive.current.addEventListener('scroll', updateIn);
  //     //return () =>   childactive.current.removeEventListener('scroll', updateIn);
  // }, [])

  const updateIn = (e: UIEvent<HTMLDivElement>) => {
    if (
      e.currentTarget.scrollHeight -
        (e.currentTarget.scrollTop + window.innerHeight - 50) <
      1
    ) {
      setupdateIns(true);
    } else {
      setupdateIns(false);
    }
  };

  return (
    <div className={s.blockscroll}>
      <Scrollbars onScroll={updateIn} style={{ width: "100%", height: "100%" }}>
        {props.instructions.map((element, index) => {
          return (
            <div key={index} className={s.block}>
              <div className={s.country}>{element.country.toUpperCase()}</div>
              <span className={s.text}>{element.text}</span>
              <div className={s.dateteg}>
                <div className={s.date}>Дата: {element.date}</div>
                {element.teg && (
                  <div className={s.teg}>
                    {element.teg.split(" ").map((el, index) => {
                      return (
                        <span key={index} className={s.textteg}>
                          {el}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Scrollbars>
    </div>
  );
};

export default Instructions;
