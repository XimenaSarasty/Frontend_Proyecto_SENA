import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import MUIDataTable from "mui-datatables";
import { api } from '../api/token';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';

const Usuarios = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/usuarios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  // Definir las columnas para MUI-Datatables
  const columns = [
    {
      name: 'Documento',
      label: 'Documento',
    },
    {
      name: 'nombre',
      label: 'Nombre',
    },
    {
      name: 'correo',
      label: 'Correo',
    },
    {
      name: 'RolId',
      label: 'Rol',
    },
    {
      name: 'estado',
      label: 'Estado',
      options: {
        customBodyRender: (value) => {
          return (
            <span
              className={clsx(
                'font-inter', 
                {
                  'text-sena': value !== 'Activo', 
                }
              )}
            >
              {value || 'Activo'}
            </span>
          );
        }
      }
    },
    {
      name: 'edit',
      label: 'Edit',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton
              onClick={() => handleEditClick(tableMeta.rowIndex)}
              color="primary"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          );
        }
      }
    }
  ];
  
  const handleEditClick = (rowIndex) => {
    const userId = data[rowIndex].id; 
    console.log('Editar usuario con ID:', userId);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className={`flex flex-col flex-grow p-6 bg-gray-100 ${sidebarToggle ? 'ml-64' : ''}`}>
        <Dashboard 
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle} 
        />
        <div className="mt-16"> {/* Ajusta el margen superior según necesites */}
          <MUIDataTable
            title={"Usuarios"}
            data={data}
            columns={columns}
            options={{
              responsive: "standard",
              selectableRows: "none", // Opcional, depende de tus necesidades
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Usuarios;

//CODIGO POR SI LA EMBARRO
