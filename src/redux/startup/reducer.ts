import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StartupState {
  statuses: number[];
  investmentStatuses: number[];
  targetAmounts: number[];
  totalInvestments: number[];
  amountsCollected: number[];
  keyword: string;
  page: number;
  page_size: number;
}

const initialState: StartupState = {
  statuses: [],
  investmentStatuses: [],
  targetAmounts: [],
  totalInvestments: [],
  amountsCollected: [],
  keyword: ' ',
  page: 1,
  page_size: 10,
};

const startupSlice = createSlice({
  name: 'startup',
  initialState,
  reducers: {
    setStatuses(state, action: PayloadAction<number[]>) {
      state.statuses = action.payload;
    },
    setInvestmentStatuses(state, action: PayloadAction<number[]>) {
      state.investmentStatuses = action.payload;
    },
    setTargetAmounts(state, action: PayloadAction<number[]>) {
      state.targetAmounts = action.payload;
    },
    setTotalInvestments(state, action: PayloadAction<number[]>) {
      state.totalInvestments = action.payload;
    },
    setAmountsCollected(state, action: PayloadAction<number[]>) {
      state.amountsCollected = action.payload;
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
  setStatuses,
  setInvestmentStatuses,
  setTargetAmounts,
  setTotalInvestments,
  setAmountsCollected,
  setKeyword,
  setPage,
  resetFilter,
  setPageSize,
} = startupSlice.actions;

export default startupSlice.reducer;
