import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  highSchoolList: [],

  deleteToggle: false,
  selectedId: null,
  filters: [],
};

const highSchoolsSlice = createSlice({
  name: "highSchools",
  initialState,
  reducers: {
    setHighSchoolList(state, action) {
      state.highSchoolList = action.payload;
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

export const { setHighSchoolList, setDeleteToggle, setSelectedId, setFilters } =
  highSchoolsSlice.actions;

export default highSchoolsSlice.reducer;
