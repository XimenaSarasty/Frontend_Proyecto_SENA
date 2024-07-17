import React, { useState, useEffect } from 'react';
import { api } from '../api/token';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import MUIDataTable from "mui-datatables";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditInstructorModal from '../components/EditInstructorModal';
import AddInstructorModal from '../components/AddInstructorModal';

const Instructores =()=>{
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [data, setData] = useState([]);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async ()=> {
        setLoading(true); 
        try {
            const response = await api.get('/Instructor', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const InstructoresyCreador = await Promise.all(response.data.map(async (instructor) => {
                const usuarioResponse = await api.get(`/usuarios/${instructor.UsuarioId}`);
                const estadoResponse = await api.get(`/Estado/${instructor.EstadoId}`);
                
                return {
                    ...instructor,
                    usuarioname: usuarioResponse.data.nombre,
                    estadoName: estadoResponse.data.estadoName,
                };
            }));

            InstructoresyCreador.sort((a, b) => a.id - b.id);
            setData(InstructoresyCreador);
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Error al cargar los datos de usuarios', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setLoading(false); 
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (rowIndex) =>{
        const instructor = data[rowIndex];
        setSelectedInstructor(instructor);
        setIsOpenEditModal(true);
    };

    const handleCloseEditModalIntructor = (updateIntructor) => {
        if(updateIntructor){
            fetchData(); 
            toast.success('Instructor actualizado correctamente',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setSelectedInstructor(null);
        setIsOpenEditModal(false);
    };

    const handleOpenAddModal = () => {
        setIsOpenAddModal(true);
    };

    const handleCloseAddModalIntructor = (newIntructor) => {
        if(newIntructor){
            fetchData(); 
            toast.success('Instructor agregado exitosamente', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setSelectedInstructor(null);
        setIsOpenAddModal(false);
    };

    const columsInstructor = [
        {
            name: 'id',
            label: 'ID',
            options: {
                customBodyRender: (value) => (
                    <div className="text-center">{value}</div>
                ),
            },
        },
        {
            name: 'nombre',
            label: 'Nombre',
            options: {
                customBodyRender: (value) => (
                    <div className="text-center">{value}</div>
                ),
            },
        },
        {
            name: 'correo',
            label: 'Correo',
            options: {
                customBodyRender: (value) => (
                    <div className="text-center">{value}</div>
                ),
            },
        },
        {
            name: 'usuarioname',
            label: 'Usuario',
            options: {
                customBodyRender: (value) => (
                    <div className="text-center">{value}</div>
                ),
            },
        },
        {
            name: 'estadoName',
            label: 'Estado',
            options: {
                customBodyRender: (value) => (
                    <div className={clsx('text-center', {
                        'text-sena': value === 'ACTIVO',
                        'text-red-500': value === 'INACTIVO',
                    })}>
                        {value}
                    </div>
                ),
            },
        },
        {
            name: 'edit',
            label: 'Editar',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <div className="flex items-center justify-center">
                        <IconButton
                            onClick={() => handleEditClick(tableMeta.rowIndex)}
                            color="primary"
                            aria-label="edit"
                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                ),
            },
        },
    ];

    const handleCustomExport = (rows) => {
        const exportData = rows.map(row => ({
            id: row.data[0],
            Nombre: row.data[1],
            Correo: row.data[2],
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Instructores");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Instructores.xlsx');
    };

    return(
        <div className="flex min-h-screen">
            <Sidebar sidebarToggle={sidebarToggle} />
            <div className={`flex flex-col flex-grow p-6 bg-gray-100 ${sidebarToggle ? 'ml-64' : ''}`}>
                <Dashboard 
                        sidebarToggle={sidebarToggle}
                        setSidebarToggle={setSidebarToggle} 
                />
                <div className='flex justify-end mt-2'>
                    <button className='btn-primary' onClick={handleOpenAddModal}>Agregar Instructor</button>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-7xl overflow-auto">
                        
                        <MUIDataTable
                                title={"Instructores"}
                                data={data}
                                columns={columsInstructor}
                                options={{
                                    responsive: "standard",
                                    selectableRows: "none",
                                    download: true,
                                    rowsPerPage: 5,
                                    rowsPerPageOptions: [5, 10, 15],
                                    onDownload: (buildHead, buildBody, columns, data) => {
                                        handleCustomExport(data);
                                        return false;
                                    },
                                    textLabels: {
                                        body: {
                                            noMatch: "Lo siento, no se encontraron registros",
                                            toolTip: "Ordenar",
                                        },
                                        pagination: {
                                            next: "Siguiente",
                                            previous: "Anterior",
                                            rowsPerPage: "Filas por página",
                                            displayRows: "de",
                                        },
                                        toolbar: {
                                            search: "Buscar",
                                            downloadCsv: "Descargar CSV",
                                            print: "Imprimir",
                                            viewColumns: "Mostrar columnas",
                                            filterTable: "Filtrar tabla",
                                        },
                                        filter: {
                                            all: "Todos",
                                            title: "FILTROS",
                                            reset: "REINICIAR",
                                        },
                                        viewColumns: {
                                            title: "Mostrar columnas",
                                            titleAria: "Mostrar/Ocultar Columnas",
                                        },
                                        selectedRows: {
                                            text: "fila(s) seleccionada(s)",
                                            delete: "Eliminar",
                                            deleteAria: "Eliminar fila seleccionada",
                                        },
                                    },
                                }}
                            />
                    
                    </div>
                </div>

            </div>

            {selectedInstructor && (
                <EditInstructorModal
                    isOpen={isOpenEditModal}
                    onClose={handleCloseEditModalIntructor}
                    instructor={selectedInstructor}
                />
            )}
            <AddInstructorModal
                isOpen={isOpenAddModal}
                onClose={handleCloseAddModalIntructor}
            />
        </div>
    );

};

export default Instructores;
