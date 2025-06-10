import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Fab,
  Paper,
  InputAdornment,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Drawer,
  IconButton,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  OpenInNew as OpenInNewIcon,
  FolderOpen as FolderOpenIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { RootState } from './store';
import { agregarDrive } from './store/drivesSlice';
import { setBusqueda, toggleMateriaSeleccionada, setTecnicaturaSeleccionada, limpiarFiltros } from './store/filtrosSlice';
import { Drive } from './store/types';

function App() {
  const dispatch = useDispatch();
  
  // Estados de Redux
  const { drives, materias, estudiantes, filtros } = useSelector((state: RootState) => ({
    drives: state.drives,
    materias: state.materias,
    estudiantes: state.estudiantes,
    filtros: state.filtros
  }));

  // Estados locales para diálogos
  const [dialogoDriveAbierto, setDialogoDriveAbierto] = useState(false);
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [driveSeleccionado, setDriveSeleccionado] = useState<Drive | null>(null);

  // Estados para formularios
  const [formularioDrive, setFormularioDrive] = useState<Partial<Drive>>({
    estudianteId: '',
    materiaId: '',
    titulo: '',
    linkDrive: '',
    descripcion: '',
    tipoContenido: 'Apuntes'
  });

  // Filtrar estudiantes por tecnicatura
  const estudiantesFiltrados = estudiantes.filter(estudiante => {
    return filtros.tecnicaturaSeleccionada === 'Todas' || 
           estudiante.tecnicatura === filtros.tecnicaturaSeleccionada;
  });

  // Filtrar materias basadas en la tecnicatura seleccionada
  const materiasFiltradas = materias.filter(materia => {
    if (filtros.tecnicaturaSeleccionada === 'Todas') return true;
    
    // Materias comunes aparecen en ambas carreras
    const esComun = materia.descripcion.includes('(COMÚN)');
    const esDeTecnicatura = materia.descripcion.includes(`(${filtros.tecnicaturaSeleccionada.toUpperCase()})`);
    
    return esComun || esDeTecnicatura;
  });

  // Filtrar drives basado en los filtros actuales
  const drivesFiltrados = drives.filter(drive => {
    const estudiante = estudiantes.find(e => e.id === drive.estudianteId);
    const materia = materias.find(m => m.id === drive.materiaId);

    // Filtro por tecnicatura
    const coincideTecnicatura = filtros.tecnicaturaSeleccionada === 'Todas' || 
      estudiante?.tecnicatura === filtros.tecnicaturaSeleccionada;

    // Filtro por búsqueda
    const coincideBusqueda = filtros.busqueda === '' || 
      drive.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      drive.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      estudiante?.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      materia?.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase());

    // Filtro por materias seleccionadas
    const coincideMateria = filtros.materiasSeleccionadas.length === 0 || 
      filtros.materiasSeleccionadas.includes(drive.materiaId);

    return coincideTecnicatura && coincideBusqueda && coincideMateria;
  });

  const handleSubmitDrive = () => {
    if (formularioDrive.estudianteId && formularioDrive.materiaId && formularioDrive.titulo && formularioDrive.linkDrive) {
      dispatch(agregarDrive(formularioDrive as Omit<Drive, 'id' | 'fechaCreacion'>));
      setFormularioDrive({
        estudianteId: '',
        materiaId: '',
        titulo: '',
        linkDrive: '',
        descripcion: '',
        tipoContenido: 'Apuntes'
      });
      setDialogoDriveAbierto(false);
    }
  };

  const obtenerMateria = (materiaId: string) => {
    return materias.find(m => m.id === materiaId);
  };

  const abrirDrawer = (drive: Drive) => {
    setDriveSeleccionado(drive);
    setDrawerAbierto(true);
  };

  const cerrarDrawer = () => {
    setDrawerAbierto(false);
    setDriveSeleccionado(null);
  };

  // Estadísticas
  const totalEstudiantes = estudiantesFiltrados.length;
  const totalDrives = drivesFiltrados.length;
  const estudiantesPorTecnicatura = {
    Programación: estudiantes.filter(e => e.tecnicatura === 'Programación').length,
    Redes: estudiantes.filter(e => e.tecnicatura === 'Redes').length
  };

  return (
    <>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RepoEstudiante - UNAHUR
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Estadísticas Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Total Estudiantes
                    </Typography>
                    <Typography variant="h4">
                      {totalEstudiantes}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FolderOpenIcon sx={{ mr: 1, color: 'secondary.main' }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Total Drives
                    </Typography>
                    <Typography variant="h4">
                      {totalDrives}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ mr: 1, color: 'success.main' }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Prog.
                    </Typography>
                    <Typography variant="h4">
                      {estudiantesPorTecnicatura.Programación}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      Redes
                    </Typography>
                    <Typography variant="h4">
                      {estudiantesPorTecnicatura.Redes}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros y búsqueda */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar por título, descripción, estudiante o materia..."
                value={filtros.busqueda}
                onChange={(e) => dispatch(setBusqueda(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Tecnicatura</InputLabel>
                <Select
                  value={filtros.tecnicaturaSeleccionada}
                  onChange={(e: SelectChangeEvent) => dispatch(setTecnicaturaSeleccionada(e.target.value as 'Todas' | 'Programación' | 'Redes'))}
                  label="Tecnicatura"
                >
                  <MenuItem value="Todas">Todas las Tecnicaturas</MenuItem>
                  <MenuItem value="Programación">Tecnicatura en Programación</MenuItem>
                  <MenuItem value="Redes">Tecnicatura en Redes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => dispatch(limpiarFiltros())}
              >
                Limpiar Filtros
              </Button>
            </Grid>
          </Grid>

          {/* Chips de materias filtradas */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Materias disponibles ({materiasFiltradas.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {materiasFiltradas.map((materia) => (
                <Chip
                  key={materia.id}
                  label={materia.nombre}
                  onClick={() => dispatch(toggleMateriaSeleccionada(materia.id))}
                  color={filtros.materiasSeleccionadas.includes(materia.id) ? 'primary' : 'default'}
                  variant={filtros.materiasSeleccionadas.includes(materia.id) ? 'filled' : 'outlined'}
                  size="small"
                  sx={{ 
                    backgroundColor: filtros.materiasSeleccionadas.includes(materia.id) ? materia.color : 'transparent',
                    borderColor: materia.color,
                    '&:hover': {
                      backgroundColor: materia.color + '20'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Tabla de Drives */}
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backgroundColor: '#1e1e1e',
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem', py: 2, width: '45%' }}>
                  Drive
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem', width: '25%' }}>
                  Estudiante
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem', width: '20%' }}>
                  Materia
                </TableCell>
                <TableCell sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem', width: '10%' }}>
                  Fecha
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivesFiltrados.map((drive) => {
                const estudiante = estudiantes.find(e => e.id === drive.estudianteId);
                const materia = obtenerMateria(drive.materiaId);
                
                return (
                  <TableRow
                    key={drive.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      },
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {/* Drive Column */}
                    <TableCell sx={{ py: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          component="a"
                          href={drive.linkDrive}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            backgroundColor: materia ? materia.color + '20' : 'primary.light',
                            color: materia ? materia.color : 'primary.main',
                            width: 40,
                            height: 40,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: materia ? materia.color + '30' : 'primary.light',
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          <FolderOpenIcon fontSize="small" />
                        </Avatar>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            variant="body1"
                            onClick={() => abrirDrawer(drive)}
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 400,
                              cursor: 'pointer',
                              '&:hover': {
                                color: materia ? materia.color : 'primary.main',
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            {drive.titulo}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Estudiante Column */}
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {estudiante?.nombre}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          - {estudiante?.cohorte}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Materia Column */}
                    <TableCell>
                      {materia && (
                        <Chip
                          label={materia.nombre}
                          size="small"
                          sx={{
                            backgroundColor: materia.color + '20',
                            color: materia.color,
                            border: `1px solid ${materia.color}40`,
                            fontWeight: 500,
                          }}
                        />
                      )}
                    </TableCell>

                    {/* Fecha Column */}
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {drive.fechaCreacion}
                      </Typography>
                    </TableCell>


                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {drivesFiltrados.length === 0 && (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <FolderOpenIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              No se encontraron drives
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {filtros.busqueda || filtros.materiasSeleccionadas.length > 0 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Agrega el primer drive haciendo clic en el botón +'}
            </Typography>
          </Paper>
        )}
      </Container>

      {/* FAB para agregar drive */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setDialogoDriveAbierto(true)}
      >
        <AddIcon />
      </Fab>

      {/* Dialog para agregar Drive */}
      <Dialog open={dialogoDriveAbierto} onClose={() => setDialogoDriveAbierto(false)} maxWidth="md" fullWidth>
        <DialogTitle>Agregar Nuevo Drive</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Estudiante</InputLabel>
                <Select
                  value={formularioDrive.estudianteId || ''}
                  onChange={(e) => setFormularioDrive({ ...formularioDrive, estudianteId: e.target.value })}
                  label="Estudiante"
                >
                  {estudiantesFiltrados.map((estudiante) => (
                    <MenuItem key={estudiante.id} value={estudiante.id}>
                      {estudiante.nombre} ({estudiante.tecnicatura})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Materia</InputLabel>
                <Select
                  value={formularioDrive.materiaId || ''}
                  onChange={(e) => setFormularioDrive({ ...formularioDrive, materiaId: e.target.value })}
                  label="Materia"
                >
                  {materiasFiltradas.map((materia) => (
                    <MenuItem key={materia.id} value={materia.id}>
                      {materia.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                value={formularioDrive.titulo || ''}
                onChange={(e) => setFormularioDrive({ ...formularioDrive, titulo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Link de Google Drive"
                value={formularioDrive.linkDrive || ''}
                onChange={(e) => setFormularioDrive({ ...formularioDrive, linkDrive: e.target.value })}
                placeholder="https://drive.google.com/drive/folders/..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                value={formularioDrive.descripcion || ''}
                onChange={(e) => setFormularioDrive({ ...formularioDrive, descripcion: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogoDriveAbierto(false)}>Cancelar</Button>
          <Button onClick={handleSubmitDrive} variant="contained">Agregar</Button>
        </DialogActions>
      </Dialog>

      {/* Drawer para mostrar información detallada del Drive */}
      <Drawer
        anchor="right"
        open={drawerAbierto}
        onClose={cerrarDrawer}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            backgroundColor: '#1e1e1e',
            color: 'text.primary',
          },
        }}
      >
        {driveSeleccionado && (
          <Box sx={{ p: 3 }}>
            {/* Header del Drawer */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Información del Drive
              </Typography>
              <IconButton onClick={cerrarDrawer} sx={{ color: 'text.primary' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

            {/* Información del Drive */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    backgroundColor: obtenerMateria(driveSeleccionado.materiaId)?.color + '20' || 'primary.light',
                    color: obtenerMateria(driveSeleccionado.materiaId)?.color || 'primary.main',
                    width: 48,
                    height: 48,
                  }}
                >
                  <FolderOpenIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {driveSeleccionado.titulo}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {driveSeleccionado.fechaCreacion}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
                {driveSeleccionado.descripcion}
              </Typography>

              {/* Información del Estudiante */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                  Estudiante:
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {estudiantes.find(e => e.id === driveSeleccionado.estudianteId)?.nombre}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  - {estudiantes.find(e => e.id === driveSeleccionado.estudianteId)?.cohorte}
                </Typography>
              </Box>

              {/* Información de la Materia */}
              {obtenerMateria(driveSeleccionado.materiaId) && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                    Materia:
                  </Typography>
                  <Chip
                    label={obtenerMateria(driveSeleccionado.materiaId)?.nombre}
                    sx={{
                      backgroundColor: obtenerMateria(driveSeleccionado.materiaId)?.color + '20',
                      color: obtenerMateria(driveSeleccionado.materiaId)?.color,
                      border: `1px solid ${obtenerMateria(driveSeleccionado.materiaId)?.color}40`,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              )}

              {/* Botón para abrir el Drive */}
              <Button
                variant="contained"
                fullWidth
                startIcon={<OpenInNewIcon />}
                href={driveSeleccionado.linkDrive}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: obtenerMateria(driveSeleccionado.materiaId)?.color || 'primary.main',
                  '&:hover': {
                    backgroundColor: obtenerMateria(driveSeleccionado.materiaId)?.color + 'dd' || 'primary.dark',
                  },
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                Abrir Drive en Google
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </>
  );
}

export default App; 