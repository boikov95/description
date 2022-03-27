import React, { useState } from "react";
import s from "./Tree.module.css";
import child from "../../photo/41px.png";
import { NavLink } from "react-router-dom";
import { usetree } from "../../Redux/userSelector.ts";

type TreeCategoryType = {
  loadtree: Array<usetree>;
};

const TreeCategory: React.FC<TreeCategoryType> = (props) => {
  return (
    <ul className={s.d_tree_container}>
      {props.loadtree.map((tree) => (
        <TreeNode key={tree.id} node={tree} />
      ))}
    </ul>
  );
};

type TreeNodeType = {
  node: usetree;
};
const TreeNode: React.FC<TreeNodeType> = (props) => {
  const [childVisible, setChildVisible] = useState(false);
  const hasChild = props.node.children.length ? true : false;

  return (
    <li className={s.d_tree_node}>
      <NavLink to={`/document/${props.node.id}`} activeClassName={s.activeLink}>
        <div className={s.uzel} onClick={() => setChildVisible((v) => !v)}>
          <NavLink
            to={`/document/${props.node.id}`}
            onClick={(e) => e.preventDefault()}
          >
            {hasChild && (
              <div
                className={
                  s.d_photochild + " " + (childVisible ? s.active : "")
                }
              >
                <img className={s.photochild} src={child} />
              </div>
            )}
          </NavLink>
          <div className={s.col + " " + (!hasChild && s.cdvig)}>
            <img className={s.country} src={props.node.photo} />
            {props.node.text}
          </div>
        </div>
      </NavLink>
      {hasChild && childVisible && (
        <TreeCategory loadtree={props.node.children} />
      )}
    </li>
  );
};

export default TreeCategory;
