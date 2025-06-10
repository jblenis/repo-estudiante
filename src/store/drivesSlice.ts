import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Drive } from './types';

// Datos iniciales de drives - Ejemplos de ambas Tecnicaturas
const drivesIniciales: Drive[] = [
  // === DRIVES DE PROGRAMACIÓN ===
  {
    id: '1',
    estudianteId: '1', // Ana García - Programación
    materiaId: '6',
    titulo: 'Apuntes de Programación Estructurada',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo1-prog-estructurada',
    descripcion: 'Algoritmos, estructuras de control, funciones y modularización en C',
    tipoContenido: 'Apuntes',
    fechaCreacion: '2024-03-15'
  },
  {
    id: '2',
    estudianteId: '2', // Carlos Ruiz - Programación
    materiaId: '17',
    titulo: 'App React - Construcción de Interfaces',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo2-react-ui',
    descripcion: 'Aplicación completa con React, Material-UI y diseño responsive',
    tipoContenido: 'Proyectos',
    fechaCreacion: '2024-04-20'
  },
  {
    id: '3',
    estudianteId: '3', // María López - Programación
    materiaId: '10',
    titulo: 'Ejercicios de POO - Programación con Objetos I',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo3-poo1',
    descripcion: 'Prácticas de clases, herencia, polimorfismo con Java',
    tipoContenido: 'Tareas',
    fechaCreacion: '2024-04-25'
  },
  {
    id: '4',
    estudianteId: '7', // Sofia Rodríguez - Programación
    materiaId: '5',
    titulo: 'Proyecto Web - Taller de Lenguajes de Marcado',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo4-web-taller',
    descripcion: 'Sitio web responsive con HTML5, CSS3 y JavaScript vanilla',
    tipoContenido: 'Proyectos',
    fechaCreacion: '2024-05-01'
  },
  {
    id: '5',
    estudianteId: '1', // Ana García - Programación
    materiaId: '11',
    titulo: 'Implementación de Estructuras de Datos',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo5-estructuras',
    descripcion: 'Código de listas enlazadas, árboles binarios y algoritmos de ordenamiento',
    tipoContenido: 'Proyectos',
    fechaCreacion: '2024-05-10'
  },

  // === DRIVES DE REDES ===
  {
    id: '6',
    estudianteId: '4', // Juan Pérez - Redes
    materiaId: '23',
    titulo: 'Configuración de Redes de Computadoras',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo6-redes-config',
    descripcion: 'Prácticas de routing, switching, configuración de equipos Cisco',
    tipoContenido: 'Proyectos',
    fechaCreacion: '2024-05-15'
  },
  {
    id: '7',
    estudianteId: '5', // Laura Fernández - Redes
    materiaId: '20',
    titulo: 'Scripts de Administración - Taller de Intérpretes',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo7-scripts-admin',
    descripcion: 'Colección de scripts en Bash y PowerShell para administración de sistemas',
    tipoContenido: 'Proyectos',
    fechaCreacion: '2024-05-20'
  },
  {
    id: '8',
    estudianteId: '6', // Diego Martínez - Redes
    materiaId: '27',
    titulo: 'Documentación de Seguridad de la Información',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo8-seguridad',
    descripcion: 'Políticas de seguridad, configuración de firewall y análisis de vulnerabilidades',
    tipoContenido: 'Material Extra',
    fechaCreacion: '2024-06-01'
  },
  {
    id: '9',
    estudianteId: '8', // Mateo González - Redes
    materiaId: '24',
    titulo: 'Laboratorio Sistemas Operativos',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo9-lab-so',
    descripcion: 'Prácticas con Linux Ubuntu Server y Windows Server 2022',
    tipoContenido: 'Proyectos',
    fechaCreacion: '2024-06-05'
  },
  {
    id: '10',
    estudianteId: '4', // Juan Pérez - Redes
    materiaId: '25',
    titulo: 'Manual de Operaciones I',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo10-operaciones1',
    descripcion: 'Procedimientos de administración de sistemas y resolución de incidentes',
    tipoContenido: 'Apuntes',
    fechaCreacion: '2024-06-10'
  },

  // === DRIVES DE MATERIAS COMUNES ===
  {
    id: '11',
    estudianteId: '3', // María López - Programación
    materiaId: '1',
    titulo: 'Resúmenes Matemática para Informática I',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo11-matematica1',
    descripcion: 'Teoría de conjuntos, lógica proposicional y álgebra booleana',
    tipoContenido: 'Apuntes',
    fechaCreacion: '2024-06-15'
  },
  {
    id: '12',
    estudianteId: '5', // Laura Fernández - Redes
    materiaId: '9',
    titulo: 'Proyecto Final - Base de Datos',
    linkDrive: 'https://drive.google.com/drive/folders/ejemplo12-bd-proyecto',
    descripcion: 'Sistema de gestión de inventario con MySQL, normalización y triggers',
    tipoContenido: 'Proyectos',
    fechaCreacion: '2024-06-20'
  }
];

const drivesSlice = createSlice({
  name: 'drives',
  initialState: drivesIniciales,
  reducers: {
    agregarDrive: (state, action: PayloadAction<Omit<Drive, 'id' | 'fechaCreacion'>>) => {
      const nuevoDrive: Drive = {
        ...action.payload,
        id: Date.now().toString(),
        fechaCreacion: new Date().toISOString().split('T')[0]
      };
      state.push(nuevoDrive);
    },
    eliminarDrive: (state, action: PayloadAction<string>) => {
      return state.filter(drive => drive.id !== action.payload);
    },
    editarDrive: (state, action: PayloadAction<Drive>) => {
      const index = state.findIndex(drive => drive.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { agregarDrive, eliminarDrive, editarDrive } = drivesSlice.actions;
export default drivesSlice.reducer; 