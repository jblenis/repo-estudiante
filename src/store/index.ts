import { configureStore } from '@reduxjs/toolkit';
import materiasReducer from './materiasSlice';
import estudiantesReducer from './estudiantesSlice';
import drivesReducer from './drivesSlice';
import filtrosReducer from './filtrosSlice';

export const store = configureStore({
  reducer: {
    materias: materiasReducer,
    estudiantes: estudiantesReducer,
    drives: drivesReducer,
    filtros: filtrosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 