import { configureStore } from '@reduxjs/toolkit';
import universitiesReducer from '../../features/universities/universitiesSlice'; 
import schoolsReducer from '../../features/schools/schoolsSlice'; 
import highSchoolsReducer from '../../features/highSchools/highSchoolsSlice'; 



export default configureStore({
  reducer: {
    universities: universitiesReducer,
    schools: schoolsReducer,
    highSchools: highSchoolsReducer,

   
  },
});