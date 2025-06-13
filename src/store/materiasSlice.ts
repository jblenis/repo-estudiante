import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Materia } from './types';

// Materias de ambas Tecnicaturas según planes de estudios oficiales
const materiasIniciales: Materia[] = [
  // === MATERIAS COMUNES (Primer Año - Segundo Cuatrimestre) ===
  {
    id: '1',
    nombre: 'Matemática para informática I',
    descripcion: 'CB - Fundamentos matemáticos (COMÚN)',
    color: '#9E9E9E'
  },
  {
    id: '2',
    nombre: 'Introducción a lógica y problemas computacionales',
    descripcion: 'AyL - Pensamiento lógico (COMÚN)',
    color: '#9E9E9E'
  },
  {
    id: '3',
    nombre: 'Organización de computadoras I',
    descripcion: 'ASdyR - Arquitectura y hardware (COMÚN)',
    color: '#9E9E9E'
  },
  {
    id: '4',
    nombre: 'Nuevos entornos y lenguajes',
    descripcion: 'Gral. - Tecnologías emergentes (COMÚN)',
    color: '#9E9E9E'
  },

  // === TECNICATURA EN PROGRAMACIÓN ===
  // Tercer Cuatrimestre (352 hs)
  {
    id: '5',
    nombre: 'Taller de lenguajes de marcado y tecnologías web',
    descripcion: 'TC - HTML, CSS, JavaScript (PROGRAMACIÓN)',
    color: '#2196F3'
  },
  {
    id: '6',
    nombre: 'Programación estructurada',
    descripcion: 'AyL - Fundamentos de programación (PROGRAMACIÓN)',
    color: '#2196F3'
  },
  {
    id: '7',
    nombre: 'Matemática para Informática II',
    descripcion: 'CB - Matemática avanzada (PROGRAMACIÓN)',
    color: '#2196F3'
  },
  {
    id: '8',
    nombre: 'Inglés I',
    descripcion: 'Gral. - Inglés técnico (COMÚN)',
    color: '#9E9E9E'
  },

  // Cuarto Cuatrimestre (288 hs)
  {
    id: '9',
    nombre: 'Bases de Datos',
    descripcion: 'ISBDySI - SQL, diseño de BD (COMÚN)',
    color: '#9E9E9E'
  },
  {
    id: '10',
    nombre: 'Programación con objetos I',
    descripcion: 'AyL - POO, clases, herencia (PROGRAMACIÓN)',
    color: '#2196F3'
  },
  {
    id: '11',
    nombre: 'Estructuras de datos',
    descripcion: 'TC - Listas, pilas, colas, árboles (PROGRAMACIÓN)',
    color: '#2196F3'
  },

  // Quinto Cuatrimestre (288 hs)
  {
    id: '13',
    nombre: 'Programación con objetos II',
    descripcion: 'AyL - Patrones, polimorfismo (PROGRAMACIÓN)',
    color: '#2196F3'
  },
  {
    id: '16',
    nombre: 'Inglés II',
    descripcion: 'Gral. - Inglés técnico avanzado (COMÚN)',
    color: '#9E9E9E'
  },

  // Tercer Año
  {
    id: '17',
    nombre: 'Construcción de interfaces de usuario',
    descripcion: 'ISBDySI - UI/UX, frontend (PROGRAMACIÓN)',
    color: '#2196F3'
  },
  {
    id: '18',
    nombre: 'Estrategias de persistencia',
    descripcion: 'ISBDySI - ORM, bases de datos avanzadas (PROGRAMACIÓN)',
    color: '#2196F3'
  },
  {
    id: '19',
    nombre: 'Elementos de ingeniería de software',
    descripcion: 'ISBDySI - Metodologías, testing (PROGRAMACIÓN)',
    color: '#2196F3'
  },

  // === TECNICATURA EN REDES ===
  // Segundo Cuatrimestre específico para Redes
  {
    id: '20',
    nombre: 'Taller de intérpretes de comandos',
    descripcion: 'AyL - Bash, PowerShell, scripting (REDES)',
    color: '#FF5722'
  },
  {
    id: '21',
    nombre: 'Organización de computadoras II',
    descripcion: 'ASdyR - Hardware avanzado (REDES)',
    color: '#FF5722'
  },
  {
    id: '22',
    nombre: 'Sistemas de telecomunicación',
    descripcion: 'ASdyR - Comunicaciones, señales (REDES)',
    color: '#FF5722'
  },

  // Tercer Cuatrimestre Redes (384 hs)
  {
    id: '23',
    nombre: 'Redes de computadoras',
    descripcion: 'ASdyR - TCP/IP, routing, switching (REDES)',
    color: '#FF5722'
  },
  {
    id: '24',
    nombre: 'Sistemas Operativos',
    descripcion: 'ASdyR - Linux, Windows Server (REDES)',
    color: '#FF5722'
  },
  {
    id: '25',
    nombre: 'Operaciones I',
    descripcion: 'TC - Administración de sistemas (REDES)',
    color: '#FF5722'
  },

  // Cuarto Cuatrimestre Redes (288 hs)
  {
    id: '26',
    nombre: 'Redes avanzadas',
    descripcion: 'ASdyR - VLAN, QoS, protocolos avanzados (REDES)',
    color: '#FF5722'
  },

  // Quinto Cuatrimestre Redes (256 hs)
  {
    id: '27',
    nombre: 'Seguridad de la información',
    descripcion: 'ASdyR - Firewall, VPN, criptografía (REDES)',
    color: '#FF5722'
  },
  {
    id: '28',
    nombre: 'Laboratorio de sistemas operativos y redes',
    descripcion: 'ASdyR - Prácticas avanzadas (REDES)',
    color: '#FF5722'
  },
  {
    id: '29',
    nombre: 'Operaciones II',
    descripcion: 'TC - Administración avanzada (REDES)',
    color: '#FF5722'
  }
];

const materiasSlice = createSlice({
  name: 'materias',
  initialState: materiasIniciales,
  reducers: {
    agregarMateria: (state, action: PayloadAction<Omit<Materia, 'id'>>) => {
      const nuevaMateria: Materia = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.push(nuevaMateria);
    },
    eliminarMateria: (state, action: PayloadAction<string>) => {
      return state.filter(materia => materia.id !== action.payload);
    },
    editarMateria: (state, action: PayloadAction<Materia>) => {
      const index = state.findIndex(materia => materia.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { agregarMateria, eliminarMateria, editarMateria } = materiasSlice.actions;
export default materiasSlice.reducer; 