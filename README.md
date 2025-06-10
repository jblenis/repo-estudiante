# RepoEstudiante 📚

Una aplicación web moderna para gestionar y organizar enlaces de drives de estudiantes avanzados, organizados por materias.

## 🚀 Características

- **Gestión de estudiantes**: Registra estudiantes con diferentes niveles académicos
- **Organización por materias**: Organiza los drives por asignaturas (Matemáticas, Física, Química, etc.)
- **Búsqueda avanzada**: Busca por título, descripción, estudiante o materia
- **Filtros inteligentes**: Filtra por materia específica con chips interactivos
- **Interfaz moderna**: Construida con React, TypeScript, Redux y Material-UI
- **Estado global**: Gestión de estado con Redux Toolkit
- **Datos de ejemplo**: Pre-cargado con estudiantes, materias y drives

## 🛠️ Tecnologías

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Redux Toolkit** (gestión de estado)
- **Material-UI (MUI)** (componentes y diseño)
- **Emotion** (CSS-in-JS)

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repo>
cd repo-estudiante
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar la aplicación**
```bash
npm run dev
```

La aplicación se abrirá en: **http://localhost:3000**

## 📋 Scripts Disponibles

```bash
# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 🏗️ Estructura Redux

### Store State
```typescript
interface RootState {
  materias: Materia[];      // Lista de materias disponibles
  estudiantes: Estudiante[]; // Lista de estudiantes registrados  
  drives: Drive[];          // Lista de drives compartidos
  filtros: {
    materiaSeleccionada: string | null;
    terminoBusqueda: string;
  };
}
```

### Slices
- **materiasSlice**: Gestión de materias (5 materias precargadas)
- **estudiantesSlice**: CRUD de estudiantes 
- **drivesSlice**: CRUD de drives con validaciones
- **filtrosSlice**: Estado de filtros de búsqueda

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] **Redux Store** con 4 slices organizados
- [x] **Material-UI** con tema personalizado
- [x] **Gestión completa** de estudiantes, materias y drives
- [x] **Búsqueda en tiempo real** con filtros dinámicos
- [x] **Chips interactivos** para filtrar por materia
- [x] **Diálogos modales** para formularios
- [x] **Estadísticas visuales** en cards
- [x] **FAB** para acceso rápido
- [x] **Interfaz responsive** y accesible
- [x] **Datos de ejemplo** precargados

### 🔧 Acciones Redux Disponibles

**Materias**
- `agregarMateria(materia)` - Agregar nueva materia
- `eliminarMateria(id)` - Eliminar materia
- `editarMateria(materia)` - Editar materia existente

**Estudiantes** 
- `agregarEstudiante(estudiante)` - Agregar nuevo estudiante
- `eliminarEstudiante(id)` - Eliminar estudiante
- `editarEstudiante(estudiante)` - Editar estudiante

**Drives**
- `agregarDrive(drive)` - Agregar nuevo drive
- `eliminarDrive(id)` - Eliminar drive
- `editarDrive(drive)` - Editar drive

**Filtros**
- `setMateriaSeleccionada(id)` - Filtrar por materia
- `setTerminoBusqueda(termino)` - Buscar texto
- `limpiarFiltros()` - Limpiar todos los filtros

## 🎨 Características de la UI

La aplicación incluye:
- **AppBar Material-UI** con navegación principal
- **Búsqueda avanzada** con TextField e iconos
- **Chips de materias** con colores personalizados
- **Cards de estadísticas** con iconos y métricas
- **Grid responsive** para drives
- **Diálogos modales** con formularios complejos
- **FAB (Floating Action Button)** para acceso rápido
- **Snackbars** para feedback de usuario (próximamente)

## 🚀 Próximos pasos para Backend

Cuando desees conectar con un backend real:

1. **Instalar Axios**:
```bash
npm install axios
```

2. **Crear servicios API** en `src/services/`
3. **Integrar con Redux Toolkit Query** para cache automático
4. **Reemplazar datos mock** con llamadas HTTP

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.