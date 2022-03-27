import axios from "axios";

const instance = axios.create({
  //withCredentials: true,
  baseURL: "http://description/src/php/index.php",
});

export type categoriesType = {
  id: number;
  text: string;
  parent: number | string;
};

export type documentType = {
  text: string;
  flag_image: number;
  flag_pdf: number;
  countpdf: number;
  nameimage: string;
  idimage: number;
  count: number;
};

type commentType = {
  name: string;
  text: string;
  date: string;
};

export type tegType = {
  name: string;
  flag: boolean;
};

export type instructionsType = {
  country: string;
  text: string;
  date: Date;
  teg: string;
};

export type lastDocumentType = {
  id: number;
  category: string;
};

type rezultType<T> = {
  code: string;
  result: Array<T>;
};

type loadType = {
  code: string;
};

export const API = {
  loadtree() {
    return instance
      .get<rezultType<categoriesType>>(`?action=get_categories`)
      .then((response) => response.data);
  },
  loaddocument(id: number) {
    return instance
      .get<rezultType<documentType>>(`?action=load_text&id=` + id)
      .then((response) => response.data);
  },
  loadcomment() {
    return instance
      .get<rezultType<commentType>>(`?action=get_comment`)
      .then((response) => response.data);
  },
  getcomment(FIO: string, text: string, data: string) {
    return instance
      .get<loadType>(
        `?action=set_comment&FIO=` + FIO + `&text=` + text + `&data=` + data
      )
      .then((response) => response.data);
  },
  loadTeg() {
    return instance
      .get<rezultType<tegType>>(`?action=load_teg`)
      .then((response) => response.data);
  },
  loadInstructions(where: string) {
    return instance
      .get<rezultType<instructionsType>>(
        `?action=get_instruction&where=` + where
      )
      .then((response) => response.data);
  },
  getlastDocument() {
    return instance
      .get<rezultType<lastDocumentType>>(`?action=get_lastdocument`)
      .then((response) => response.data);
  },
  addStatistic(id: number, category: string) {
    return instance
      .get<loadType>(`?action=get_statistic&id=` + id + `&category=` + category)
      .then((response) => response.data);
  },
};
