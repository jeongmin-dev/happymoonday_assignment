export interface CommonResponse {
  CODE: string;
  MESSAGE: string;
}

export interface Item {
  prdct_cl_nm: string;
  manage_no_year: string;
  prdct_nm_korean: string;
  prdct_nm_eng: string;
  prdct_stndrd: string;
  mnfct_year: string;
  matrl_technic: string;
  prdct_detail: string;
  writr_nm: string;
  main_image: string;
  thumb_image: string;
}

export interface GetItemsRequest {
  startIdx: number;
  endIdx: number;
  category?: string;
  year?: string;
  keyword?: string;
}

export interface GetCommonResponse {
  RESULT: CommonResponse;
}

export interface GetItemsResponse {
  RESULT: CommonResponse;
  SemaPsgudInfoKorInfo: {
    list_total_count: number;
    RESULT: CommonResponse;
    row: Item[];
  };
}
