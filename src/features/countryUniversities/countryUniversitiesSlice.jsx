import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryUniList: [],

  deleteToggle: false,
  selectedName: null,
  filters: [],
};

const countryUniversitiesSlice = createSlice({
  name: "countryUni",
  initialState,
  reducers: {
    setCountryUniList(state, action) {
      state.countryUniList = action.payload;
    },

    setDeleteToggle(state, action) {
      state.deleteToggle = action.payload;
    },
    setSelectedName(state, action) {
      state.selectedName = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { setCountryUniList, setDeleteToggle, setSelectedName, setFilters } =
countryUniversitiesSlice.actions;

export default countryUniversitiesSlice.reducer;
