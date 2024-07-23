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
import EditFichasModal from '../components/EditFichasModal';
import AddFichasModal from '../components/AddFichasModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fichas = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [data, setData] = useState([]);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [selectedFicha, setSelectedFicha] = useState(null);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true); 
        try {
            const response = await api.get('/Fichas', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const FichasConDetalles = await Promise.all(response.data.map(async (ficha) => {
                const usuarioResponse = await api.get(`/usuarios/${ficha.UsuarioId}`);
                const estadoResponse = await api.get(`/Estado/${ficha.EstadoId}`);

                return {
                    ...ficha,
                    usuarioname: usuarioResponse.data.nombre,
                    estadoName: estadoResponse.data.estadoName,
                };
            }));

            FichasConDetalles.sort((a, b) => a.id - b.id);
            setData(FichasConDetalles);
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

    const columnsFicha = [
        {
            name: 'NumeroFicha',
            label: 'Número de Ficha',
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

    const handleEditClick = (rowIndex) => {
        const ficha = data[rowIndex];
        setSelectedFicha(ficha);
        setIsOpenEditModal(true);
    };

    const handleCloseEditModalFicha = (updateFicha) => {
        if (updateFicha) {
            fetchData(); 
            toast.success('Ficha actualizada correctamente', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setIsOpenEditModal(false);
        setSelectedFicha(null);
    };

    const handleOpenAddModal = () => {
        setIsOpenAddModal(true);
    };

    const handleCloseAddModalFicha = (newFicha) => {
        if(newFicha){
            fetchData(); 
            toast.success('Ficha agregada exitosamente', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setSelectedFicha(null);
        setIsOpenAddModal(false);
    };

    const handleCustomExport = (rows) => {
        const exportData = rows.map(row => ({
            NumeroFicha: row.data[0],
            Estado: row.data[1],
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Fichas");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Fichas.xlsx');
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar sidebarToggle={sidebarToggle} />
            <div className={`flex flex-col flex-grow p-6 bg-gray-100 ${sidebarToggle ? 'ml-64' : ''} mt-16`}>
                <Dashboard
                    sidebarToggle={sidebarToggle}
                    setSidebarToggle={setSidebarToggle}
                />
                <div className='flex justify-end mt-2'>
                    <button className='btn-primary' onClick={handleOpenAddModal}>Agregar Ficha</button>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-7xl overflow-auto">
                        {loading ? (
                            <div className="text-center">Cargando Fichas...</div>
                        ) : (
                            <MUIDataTable
                                title={"Fichas"}
                                data={data}
                                columns={columnsFicha}
                                options={{
                                    responsive: "standard",
                                    selectableRows: "none",
                                    download: true,
                                    rowsPerPage: 5,
                                    rowsPerPageOptions: [5, 10, 15],
                                    setRowProps: (row, dataIndex, rowIndex) => {
                                        return {
                                            style: { padding: '2px 0' }
                                        };
                                    },
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
                        )}
                    </div>
                </div>
            </div>

            {selectedFicha && (
                <EditFichasModal
                    isOpen={isOpenEditModal}
                    onClose={handleCloseEditModalFicha}
                    ficha={selectedFicha}
                />
            )}
            <AddFichasModal
                isOpen={isOpenAddModal}
                onClose={handleCloseAddModalFicha}
            />
        </div>
    );
};

export default Fichas;
