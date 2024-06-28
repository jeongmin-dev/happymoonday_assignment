import axios from "@/lib/axios";
import { GetItemsRequest, GetItemsResponse } from "./search.types";
import { createPath } from "@/lib/utils";

export const getItems = async (
  request: GetItemsRequest
): Promise<GetItemsResponse> => {
  const response = await axios.get(`/${createPath(request)}`);
  return response.data;
};
