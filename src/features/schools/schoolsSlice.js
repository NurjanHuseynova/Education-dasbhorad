import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schoolList: [],

  deleteToggle: false,
  selectedId: null,
  filters: [],
};

const schoolsSlice = createSlice({
  name: "schools",
  initialState,
  reducers: {
    setSchoolList(state, action) {
      state.schoolList = action.payload;
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

export const { setSchoolList, setDeleteToggle, setSelectedId, setFilters } =
  schoolsSlice.actions;

export default schoolsSlice.reducer;
