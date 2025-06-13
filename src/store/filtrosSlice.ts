import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltrosState } from './types';

const estadoInicial: FiltrosState = {
  busqueda: '',
  materiasSeleccionadas: [],
  tecnicaturaSeleccionada: 'Todas'
};

const filtrosSlice = createSlice({
  name: 'filtros',
  initialState: estadoInicial,
  reducers: {
    setBusqueda: (state, action: PayloadAction<string>) => {
      state.busqueda = action.payload;
    },
    setMateriasSeleccionadas: (state, action: PayloadAction<string[]>) => {
      state.materiasSeleccionadas = action.payload;
    },
    toggleMateriaSeleccionada: (state, action: PayloadAction<string>) => {
      const materiaId = action.payload;
      const index = state.materiasSeleccionadas.indexOf(materiaId);
      if (index >= 0) {
        state.materiasSeleccionadas.splice(index, 1);
      } else {
        state.materiasSeleccionadas.push(materiaId);
      }
    },
    setTecnicaturaSeleccionada: (state, action: PayloadAction<'Todas' | 'Programación' | 'Redes'>) => {
      state.tecnicaturaSeleccionada = action.payload;
    },
    limpiarFiltros: (state) => {
      state.busqueda = '';
      state.materiasSeleccionadas = [];
      state.tecnicaturaSeleccionada = 'Todas';
    }
  }
});

export const { 
  setBusqueda, 
  setMateriasSeleccionadas, 
  toggleMateriaSeleccionada, 
  setTecnicaturaSeleccionada, 
  limpiarFiltros 
} = filtrosSlice.actions;
export default filtrosSlice.reducer; 