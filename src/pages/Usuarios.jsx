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
import EditUserModal from '../components/EditUserModal';
import AddUserModal from '../components/AddUserModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usuarios = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [data, setData] = useState([]);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true); 
        try {
            const response = await api.get('/usuarios', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const usuariosConRolesYEstados = await Promise.all(response.data.map(async (usuario) => {
                const rolResponse = await api.get(`/roles/${usuario.RolId}`);
                const estadoResponse = await api.get(`/Estado/${usuario.EstadoId}`);
                
                return {
                    ...usuario,
                    rolName: rolResponse.data.rolName,
                    estadoName: estadoResponse.data.estadoName,
                };
            }));

            usuariosConRolesYEstados.sort((a, b) => a.id - b.id);
            setData(usuariosConRolesYEstados);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        setLoading(false); 
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        {
            name: 'id',
            label: 'id',
            options: {
                customBodyRender: (value) => (
                    <div className="text-center">{value}</div>
                ),
            },
        },
        {
            name: 'Documento',
            label: 'Documento',
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
            name: 'rolName',
            label: 'Rol',
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
        const user = data[rowIndex];
        setSelectedUser(user);
        setIsOpenEditModal(true);
    };

    const handleCloseEditModal = (updatedUser) => {
        if (updatedUser) {
            const updatedData = data.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            );
    
            setData(updatedData);
            toast.success('Usuario actualizado exitosamente', {
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
        setSelectedUser(null);
        fetchData();
    };
   
    const handleOpenAddModal = () => {
        setIsOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setIsOpenAddModal(false);
    };

    const handleCustomExport = (rows) => {
        const exportData = rows.map(row => ({
            id: row.data[0],
            Nombre: row.data[2],
            Correo: row.data[3],
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Usuarios.xlsx');
    };

    const handleNewUserData = (newUser) => {
        setData([...data, newUser]);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar sidebarToggle={sidebarToggle} />
            <div className={`flex flex-col flex-grow p-6 bg-gray-100 ${sidebarToggle ? 'ml-64' : ''}`}>
                <Dashboard 
                    sidebarToggle={sidebarToggle}
                    setSidebarToggle={setSidebarToggle} 
                />
                <div className='flex justify-end mt-2'>
                    <button className='btn-primary' onClick={handleOpenAddModal}>Agregar Usuario</button>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-7xl overflow-auto">
                        {loading ? (
                            <div className="text-center">Cargando usuarios...</div>
                        ) : (
                            <MUIDataTable
                                title={"Usuarios"}
                                data={data}
                                columns={columns}
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
                        )}
                    </div>
                </div>
            </div>
            {selectedUser && (
                <EditUserModal
                    isOpen={isOpenEditModal}
                    onClose={handleCloseEditModal}
                    user={selectedUser}
                />
            )}
            <AddUserModal
                isOpen={isOpenAddModal}
                onClose={handleCloseAddModal}
                onNewUserData={handleNewUserData}
            />
        </div>
    );
};

export default Usuarios;
