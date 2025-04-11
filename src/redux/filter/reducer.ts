import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  roleIds: number[];
  sectorIds: number[];
  batchIds: number[];
  interestIds: number[];
  cities: string[];
  in_my_favorited: boolean;
  in_mentor: boolean;
  have_investestment: boolean;
  keyword: string;
  page: number;
  page_size: number;
}

const initialState: FilterState = {
  roleIds: [],
  sectorIds: [],
  batchIds: [],
  interestIds: [],
  cities: [],
  in_my_favorited: false,
  in_mentor: false,
  have_investestment: false,
  keyword: '',
  page: 1,
  page_size: 10,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setRoleIds(state, action: PayloadAction<number[]>) {
      state.roleIds = action.payload;
    },
    setSectorIds(state, action: PayloadAction<number[]>) {
      state.sectorIds = action.payload;
    },
    setBatchIds(state, action: PayloadAction<number[]>) {
      state.batchIds = action.payload;
    },
    setInterestIds(state, action: PayloadAction<number[]>) {
      state.interestIds = action.payload;
    },
    setCities(state, action: PayloadAction<string[]>) {
      state.cities = action.payload;
    },
    setInMyFavorited(state, action: PayloadAction<boolean>) {
      state.in_my_favorited = action.payload;
    },
    setInMentor(state, action: PayloadAction<boolean>) {
      state.in_mentor = action.payload;
    },
    setHaveInvestestment(state, action: PayloadAction<boolean>) {
      state.have_investestment = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.page_size = action.payload;
    },
    resetFilter() {
      return initialState;
    },
  },
});

export const {
  setRoleIds,
  setSectorIds,
  setBatchIds,
  setInterestIds,
  setCities,
  setInMyFavorited,
  setInMentor,
  setHaveInvestestment,
  setKeyword,
  setPage,
  setPageSize,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
