import { createSelector } from "reselect";
import { categoriesType, tegType } from "../api/api.ts";
import { AppStateType } from "./redux-store.ts";

const getTree = (state: AppStateType) => {
  return state.auth.tree;
};

const getTeg = (state: AppStateType) => {
  return state.instructions.tegi;
};

const getSearch = (state: AppStateType) => {
  return state.instructions.search;
};

const getInstruction = (state: AppStateType) => {
  return state.instructions.instructions;
};

export const instructionsSelector = createSelector(
  getTeg,
  getInstruction,
  getSearch,
  (tegi, instructions, search) => {
    let instruction = tegi.filter((u) => u.flag);
    if (instruction.length == 0 && search.length == 0) return instructions;

    return instructions.filter((el) => {
      if (
        instruction.reduce((acc: number, prev: tegType): any => {
          if (el.teg.indexOf(prev.name) != -1) {
            return acc + 1;
          }
        }, 0) === instruction.length &&
        el.text.toUpperCase().indexOf(search.toUpperCase()) != -1
      )
        return el;
    });
  }
);

export const loadCountryInstructions = createSelector(getTree, (tree) => {
  return tree.filter((element) => element.parent === "#");
});

export type usetree = {
  id: number;
  text: string;
  photo: string;
  children: Array<usetree>;
};

export const loadTree = createSelector(getTree, (tree) => {
  let usetree = [] as Array<usetree>;

  let poisk = (el: usetree, searchId: categoriesType) => {
    if (el.id === searchId.parent) {
      el.children.push({
        id: searchId.id,
        text: searchId.text,
        photo:
          "http://description/src/php/index.php?action=load_countryimage&id=" +
          searchId.id,
        children: [],
      });
      return true;
    } else if (el.children) {
      el.children.map((array) => poisk(array, searchId));
    }
  };

  tree.map((element) => {
    if (element.parent == "#") {
      usetree.push({
        id: element.id,
        text: element.text,
        photo:
          "http://description/src/php/index.php?action=load_countryimage&id=" +
          element.id,
        children: [],
      });
    } else {
      for (let i = 0; i < element.id; i++) {
        if (typeof usetree[i] === "undefined") break;
        if (poisk(usetree[i], element)) break;
      }
      // usetree.map((position) => {
      //   poisk(position, element);
      // });
    }
  });

  let sortArray = (x: any, y: any) => {
    return x.text.localeCompare(y.text);
  };

  return usetree.sort(sortArray);
});
