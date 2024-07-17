import React, { useState, useEffect } from 'react';
import { api } from '../api/token';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import MUIDataTable from "mui-datatables";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import AddRolModal from '../components/AddRolModal';
import EditRolModal from '../components/EditRolModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roles = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [selectedRol, setSelectedRol] = useState(null);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true); 
            try {
                const response = await api.get('/roles');
                setRoles(response.data);
            } catch (error) {
                console.error('Error al cargar roles:', error); 
            }
            setLoading(false); 
        };
    
        fetchRoles();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get('/roles');
            const sortedRoles = response.data.sort((a, b) => a.id - b.id);
            setRoles(sortedRoles);
        } catch (error) {
            console.error('Error al cargar roles:', error);
        }
        setLoading(false);
    }; 

    const handleEditClick = (rowIndex) => {
        const rol = roles[rowIndex];
        setSelectedRol(rol);
        setIsOpenEditModal(true);
    };

    const handleCloseAddModalRoles = (newRol) => {
        if (newRol) {
            fetchData(); 
            toast.success('Rol agregado exitosamente', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setSelectedRol(null);
        setIsOpenAddModal(false);
    };

    const handleCloseEditModalRoles = (updateRol) => {
        if (updateRol) {
            fetchData(); 
            toast.success('Rol actualizado exitosamente', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setSelectedRol(null);
        setIsOpenEditModal(false);
    };

    const columns = [
        {
            name: 'id',
            label: 'Id',
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
            rolName: row.data[1],
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Roles");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Roles.xlsx');
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
                    <button className='btn-primary' onClick={() => setIsOpenAddModal(true)}>Agregar Rol</button>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="max-w-4xl mx-auto">
                        {loading ? (
                            <div className="text-center">Cargando roles...</div>
                        ) : (
                            <MUIDataTable
                                title={"Roles"}
                                data={roles}
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
            {selectedRol && (
                <EditRolModal
                    isOpen={isOpenEditModal}
                    onClose={handleCloseEditModalRoles}
                    rol={selectedRol}
                />
            )}
            <AddRolModal
                isOpen={isOpenAddModal}
                onClose={handleCloseAddModalRoles}
            />
        </div>
    );
};

export default Roles;


//CODIGO ANTES DEL COMMIT 
// import React, { useState, useEffect } from 'react';
// import { api } from '../api/token';
// import Sidebar from '../components/Sidebar';
// import Dashboard from '../components/Dashboard';
// import MUIDataTable from "mui-datatables";
// import EditIcon from '@mui/icons-material/Edit';
// import IconButton from '@mui/material/IconButton';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import AddRolModal from '../components/AddRolModal';
// import EditRolModal from '../components/EditRolModal';

// const Roles = () => {
//     const [sidebarToggle, setSidebarToggle] = useState(false);
//     const [data, setData] = useState([]);
//     const [isOpenEditModal, setIsOpenEditModal] = useState(false);
//     const [selectedRol, setSelectedRol] = useState(null);
//     const [isOpenAddModal, setIsOpenAddModal] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [roles, setRoles] = useState([]);

//     useEffect(() => {
//         const fetchRoles = async () => {
//             setLoading(true); 
//             try {
//                 const response = await api.get('/roles');
//                 setRoles(response.data);
//             } catch (error) {
//                 console.error('Error al cargar roles:', error); 
//             }
//             setLoading(false); 
//         };
    
//         fetchRoles();
//     }, []);

//     const columns = [
//         {
//             name: 'id',
//             label: 'Id',
//             options: {
//                 customBodyRender: (value) => (
//                     <div className="text-center">{value}</div>
//                 ),
//             },
//         },
//         {
//             name: 'rolName',
//             label: 'Rol',
//             options: {
//                 customBodyRender: (value) => (
//                     <div className="text-center">{value}</div>
//                 ),
//             },
//         },
//         {
//             name: 'edit',
//             label: 'Editar',
//             options: {
//                 filter: false,
//                 customBodyRender: (value, tableMeta, updateValue) => (
//                     <div className="flex items-center justify-center">
//                         <IconButton
//                             onClick={() => handleEditClick(tableMeta.rowIndex)}
//                             color="primary"
//                             aria-label="edit"
//                         >
//                             <EditIcon />
//                         </IconButton>
//                     </div>
//                 ),
//             },
//         },
//     ];

//     const handleCustomExport = (rows) => {
//         const exportData = rows.map(row => ({
//             rolName: row.data[1],
//         }));
        
//         const worksheet = XLSX.utils.json_to_sheet(exportData);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Roles");
//         const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//         const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
//         saveAs(data, 'Roles.xlsx');
//     };

//     const handleEditClick = (rowIndex) => {
//         const rol = roles[rowIndex];
//         setSelectedRol(rol);
//         setIsOpenEditModal(true);
//     };

//     const handleNewRolData = (newRol) => {
//         setData([...data, newRol]);
//     };

//     const handleCloseAddModalRoles = () => {
//         setIsOpenAddModal(false);
//     };

//     const handleCloseEditModalRoles = () => {
//         setIsOpenEditModal(false);
//     };

//     return (
//         <div className="flex min-h-screen">
//             <Sidebar sidebarToggle={sidebarToggle} />
//             <div className={`flex flex-col flex-grow p-6 bg-gray-100 ${sidebarToggle ? 'ml-64' : ''}`}>
//                 <Dashboard 
//                     sidebarToggle={sidebarToggle}
//                     setSidebarToggle={setSidebarToggle} 
//                 />
//                 <div className='flex justify-end mt-2'>
//                     <button className='btn-primary' onClick={() => setIsOpenAddModal(true)}>Agregar Rol</button>
//                 </div>
//                 <div className="flex-grow flex items-center justify-center">
//                     <div className="max-w-4xl mx-auto">
//                         {loading ? (
//                             <div className="text-center">Cargando roles...</div>
//                         ) : (
//                             <MUIDataTable
//                                 title={"Roles"}
//                                 data={roles}
//                                 columns={columns}
//                                 options={{
//                                     responsive: "standard",
//                                     selectableRows: "none",
//                                     download: true,
//                                     rowsPerPage: 5,
//                                     rowsPerPageOptions: [5, 10, 15],
//                                     onDownload: (buildHead, buildBody, columns, data) => {
//                                         handleCustomExport(data);
//                                         return false;
//                                     },
//                                     textLabels: {
//                                         body: {
//                                             noMatch: "Lo siento, no se encontraron registros",
//                                             toolTip: "Ordenar",
//                                         },
//                                         pagination: {
//                                             next: "Siguiente",
//                                             previous: "Anterior",
//                                             rowsPerPage: "Filas por página",
//                                             displayRows: "de",
//                                         },
//                                         toolbar: {
//                                             search: "Buscar",
//                                             downloadCsv: "Descargar CSV",
//                                             print: "Imprimir",
//                                             viewColumns: "Mostrar columnas",
//                                             filterTable: "Filtrar tabla",
//                                         },
//                                         filter: {
//                                             all: "Todos",
//                                             title: "FILTROS",
//                                             reset: "REINICIAR",
//                                         },
//                                         viewColumns: {
//                                             title: "Mostrar columnas",
//                                             titleAria: "Mostrar/Ocultar Columnas",
//                                         },
//                                         selectedRows: {
//                                             text: "fila(s) seleccionada(s)",
//                                             delete: "Eliminar",
//                                             deleteAria: "Eliminar fila seleccionada",
//                                         },
//                                     },
//                                 }}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {selectedRol && (
//                 <EditRolModal
//                     isOpen={isOpenEditModal}
//                     onClose={handleCloseEditModalRoles}
//                     rol={selectedRol}
//                 />
//             )}
//             <AddRolModal
//                 isOpen={isOpenAddModal}
//                 onClose={handleCloseAddModalRoles}
//                 onNewRolData={handleNewRolData}
//             />
//         </div>
//     );
// };

// export default Roles;