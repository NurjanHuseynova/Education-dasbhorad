import { configureStore } from '@reduxjs/toolkit';
import universitiesReducer from '../../features/universities/universitiesSlice'; 

export default configureStore({
  reducer: {
    universities: universitiesReducer,
   
  },
});