import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Estudiante } from './types';

// Datos iniciales de estudiantes - Ejemplos de ambas Tecnicaturas
const estudiantesIniciales: Estudiante[] = [
  // Estudiantes de Programación
  {
    id: '1',
    nombre: 'Ana García',
    email: 'ana.garcia@estudiante.edu.ar',
    telefono: '+54 11 1234-5678',
    tecnicatura: 'Programación',
    año: '2do Año',
    cohorte: '2023'
  },
  {
    id: '2',
    nombre: 'Carlos Ruiz',
    email: 'carlos.ruiz@estudiante.edu.ar',
    telefono: '+54 11 2345-6789',
    tecnicatura: 'Programación',
    año: '3er Año',
    cohorte: '2022'
  },
  {
    id: '3',
    nombre: 'María López',
    email: 'maria.lopez@estudiante.edu.ar',
    telefono: '+54 11 3456-7890',
    tecnicatura: 'Programación',
    año: '1er Año',
    cohorte: '2024'
  },
  
  // Estudiantes de Redes
  {
    id: '4',
    nombre: 'Juan Pérez',
    email: 'juan.perez@estudiante.edu.ar',
    telefono: '+54 11 4567-8901',
    tecnicatura: 'Redes',
    año: '2do Año',
    cohorte: '2023'
  },
  {
    id: '5',
    nombre: 'Laura Fernández',
    email: 'laura.fernandez@estudiante.edu.ar',
    telefono: '+54 11 5678-9012',
    tecnicatura: 'Redes',
    año: '1er Año',
    cohorte: '2024'
  },
  {
    id: '6',
    nombre: 'Diego Martínez',
    email: 'diego.martinez@estudiante.edu.ar',
    telefono: '+54 11 6789-0123',
    tecnicatura: 'Redes',
    año: '3er Año',
    cohorte: '2022'
  },
  {
    id: '7',
    nombre: 'Sofia Rodríguez',
    email: 'sofia.rodriguez@estudiante.edu.ar',
    telefono: '+54 11 7890-1234',
    tecnicatura: 'Programación',
    año: '1er Año',
    cohorte: '2024'
  },
  {
    id: '8',
    nombre: 'Mateo González',
    email: 'mateo.gonzalez@estudiante.edu.ar',
    telefono: '+54 11 8901-2345',
    tecnicatura: 'Redes',
    año: '2do Año',
    cohorte: '2023'
  }
];

const estudiantesSlice = createSlice({
  name: 'estudiantes',
  initialState: estudiantesIniciales,
  reducers: {
    agregarEstudiante: (state, action: PayloadAction<Omit<Estudiante, 'id'>>) => {
      const nuevoEstudiante: Estudiante = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.push(nuevoEstudiante);
    },
    eliminarEstudiante: (state, action: PayloadAction<string>) => {
      return state.filter(estudiante => estudiante.id !== action.payload);
    },
    editarEstudiante: (state, action: PayloadAction<Estudiante>) => {
      const index = state.findIndex(estudiante => estudiante.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { agregarEstudiante, eliminarEstudiante, editarEstudiante } = estudiantesSlice.actions;
export default estudiantesSlice.reducer; 