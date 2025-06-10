export interface Materia {
  id: string;
  nombre: string;
  descripcion: string;
  color: string;
}

export interface Estudiante {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  tecnicatura: 'Programación' | 'Redes';
  año: '1er Año' | '2do Año' | '3er Año';
  cohorte: string; // Ej: "2024", "2023"
}

export interface Drive {
  id: string;
  estudianteId: string;
  materiaId: string;
  titulo: string;
  linkDrive: string;
  descripcion: string;
  tipoContenido: 'Apuntes' | 'Tareas' | 'Exámenes' | 'Proyectos' | 'Material Extra';
  fechaCreacion: string;
}

export interface FiltrosState {
  busqueda: string;
  materiasSeleccionadas: string[];
  tecnicaturaSeleccionada: 'Todas' | 'Programación' | 'Redes';
}

export interface RootState {
  materias: Materia[];
  estudiantes: Estudiante[];
  drives: Drive[];
  filtros: FiltrosState;
} 