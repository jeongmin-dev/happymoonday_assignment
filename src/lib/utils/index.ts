import { GetItemsRequest } from "../services/apis/search.types";

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const createPath = (request: GetItemsRequest) => {
  const valueMap = Object.entries(request)
    .map(([_, value]) => {
      if (value === "") {
        return "";
      }
      return value;
    })
    .join("/");

  return valueMap;
};
