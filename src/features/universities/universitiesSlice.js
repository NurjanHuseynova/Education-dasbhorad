import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniList: [],
  selectedUni: null,
  viewModal: false,
  deleteToggle: false,
  selectedId: null,
  filters: [],
};

const universitiesSlice = createSlice({
  name: "universities",
  initialState,
  reducers: {
    setUniList(state, action) {
      state.uniList = action.payload;
    },
    setSelectedUni(state, action) {
      state.selectedUni = action.payload;
    },
    setViewModal(state, action) {
      state.viewModal = action.payload;
    },
    setDeleteToggle(state, action) {
      state.deleteToggle = action.payload;
    },
    setSelectedId(state, action) {
      state.selectedId = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
   
  },
});

export const {
  setUniList,
  setSelectedUni,
  setViewModal,
  setDeleteToggle,
  setSelectedId,
  setFilters,
} = universitiesSlice.actions;

export default universitiesSlice.reducer;
