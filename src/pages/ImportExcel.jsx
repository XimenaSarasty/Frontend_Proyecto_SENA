import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import MUIDataTable from "mui-datatables";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IoCloudUploadOutline } from "react-icons/io5";
import LinearProgress from '@mui/material/LinearProgress';
import * as XLSX from 'xlsx';

const ImportExcel = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [thumbnailHtml, setThumbnailHtml] = useState('');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const html = XLSX.utils.sheet_to_html(worksheet);

      // Aplicar estilos personalizados
      const styledHtml = styleHtml(html);

      setThumbnailHtml(styledHtml);
    };
    reader.readAsArrayBuffer(file);
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 1000);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const styleHtml = (html) => {
    // Añadir clases de TailwindCSS y estilos en línea
    const styledHtml = html.replace(/<table/g, '<table class="table-auto border-collapse border border-gray-400"')
      .replace(/<th/g, '<th class="border border-gray-300 bg-gray-200 px-2 py-1 text-center text-sm"')
      .replace(/<td/g, '<td class="border border-gray-300 px-2 py-1 text-sm"')
      .replace(/<\/td>/g, '</td>')
      .replace(/<\/th>/g, '</th>');      
    return styledHtml;
  };

  const columns = [
    {
      name: 'ID',
      label: 'ID',
    },
    {
      name: 'name',
      label: 'Nombre',
    },
    {
      name: 'preview',
      label: 'Vista previa',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton onClick={() => handlePreviewClick(tableMeta.rowData)}>
              <VisibilityIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const data = [
    {
      ID: 1,
      name: 'Documento ejemplo',
      preview: 'vista',
    },
  ];

  const options = {
    filterType: 'checkbox',
  };

  const handlePreviewClick = (rowData) => {
    console.log('Vista previa para:', rowData);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className={`flex flex-col flex-grow p-6 bg-gray-100 ${sidebarToggle ? 'ml-64' : ''}`}>
        <Dashboard
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div className='flex justify-center mt-11'>
          <div 
            className={`flex flex-col justify-center items-center text-center w-1/2 mb-4 bg-white rounded-lg border-2 border-dashed ${dragActive ? 'border-blue-500' : 'border-gray-300'} p-4`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <IoCloudUploadOutline className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Arrastra el archivo excel aquí</p>
            <button 
              onClick={handleUpload} 
              className="btn-primary2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Subir archivo
            </button>
          </div>
        </div>
        {uploading && <LinearProgress className="h-2 w-full mb-4" color="primary" />}
        <div className="flex flex-grow">
          <div className="w-1/2 mt-2 pr-2">
            <MUIDataTable
              title={'Lista de Documentos Excel'}
              data={data}
              columns={columns}
              options={options}
            />
          </div>
          <div className="w-1/2 pl-2 h-full flex justify-center items-center">
            <div className="flex justify-center p-2">
              <div
                className="border border-gray-300 p-2 overflow-auto"
                style={{ maxHeight: '600px', maxWidth: '600px', transform: 'scale(0.6)', transformOrigin: 'top left' }}
                dangerouslySetInnerHTML={{ __html: thumbnailHtml }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExcel;



//CODIGO POR SI LA EMBARRO
// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Dashboard from '../components/Dashboard';
// import MUIDataTable from "mui-datatables";

// import IconButton from '@mui/material/IconButton';
// import { VisibilityIcon } from '@mui/icons-material/Visibility';
// import { IoCloudUploadOutline } from "react-icons/io5";
// import LinearProgress from '@mui/material/LinearProgress';
// import * as XLSX from 'xlsx';

// const ImportExcel = () => {
//   const [sidebarToggle, setSidebarToggle] = useState(false);
//   const [thumbnailHtml, setThumbnailHtml] = useState('');
//   const [file, setFile] = useState(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const handleUpload = () => {
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const html = XLSX.utils.sheet_to_html(worksheet);

//       // Aplicar estilos personalizados
//       const styledHtml = styleHtml(html);

//       setThumbnailHtml(styledHtml);
//     };
//     reader.readAsArrayBuffer(file);
//     setUploading(true);
//     setTimeout(() => {
//       setUploading(false);
//     }, 1000);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setDragActive(true);
//   };

//   const handleDragLeave = (event) => {
//     event.preventDefault();
//     setDragActive(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setDragActive(false);
//     if (event.dataTransfer.files && event.dataTransfer.files[0]) {
//       setFile(event.dataTransfer.files[0]);
//     }

//   };

//   const styleHtml = (html) => {
//     // Añadir clases de TailwindCSS y estilos en línea
//     const styledHtml = html.replace(/<table/g, '<table class="table-auto border-collapse border border-gray-400"')
//       .replace(/<th/g, '<th class="border border-gray-300 bg-gray-200 px-2 py-1 text-center text-sm"')
//       .replace(/<td/g, '<td class="border border-gray-300 px-2 py-1 text-sm"')
//       .replace(/<\/td>/g, '</td>')
//       .replace(/<\/th>/g, '</th>');      
//     return styledHtml;
//   };

//   const columns = [
//     {
//         name: 'id',
//         label: 'ID',
//         // options: {
//         //     customBodyRender: () => (
//         //         <div className="text-center">1</div>
//         //     ),
//         // },
//     },
//     {
//         name: 'nombre',
//         label: 'Nombre',
//         // options: {
//         //     customBodyRender: () => (
//         //         <div className="text-center">Excel</div>
//         //     ),
//         // },
//     },
//     {
//       name: 'preview',
//       label: 'Vista previa',
//       options: {
//         customBodyRender: (value, tableMeta, updateValue) => {
//           return (
//             <IconButton onClick={() => handlePreviewClick (tableMeta.rowData)}>
//               <VisibilityIcon />
//             </IconButton>
//           );
//         },
//       },
//     },
//   ];

//   const data = [
//     {
//       ID: 1,
//       name: 'Documento ejemplo',
//       preview: 'vista',
//     },
//   ];
  
//   const options = {
//     filterType: 'checkbox',
//   };

//   const handlePreviewClick = (rowData) => {
//     console.log('Vista previa para:', rowData);
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar sidebarToggle={sidebarToggle} />
//       <div className={`flex flex-col flex-grow p-6 bg-gray-100 ${sidebarToggle ? 'ml-64' : ''}`}>
//         <Dashboard
//           sidebarToggle={sidebarToggle}
//           setSidebarToggle={setSidebarToggle}
//         />        
//         <div className='flex justify-center'>
//           <div 
//             className={`flex flex-col justify-center items-center text-center w-1/2 mb-4 bg-white rounded-lg border-2 border-dashed ${dragActive ? 'border-blue-500' : 'border-gray-300'} p-4`}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//             onDrop={handleDrop}
//           >
//             <IoCloudUploadOutline className="h-16 w-16 text-gray-400 mb-4" />
//             <p className="text-gray-500 mb-4">Arrastra el archivo excel aquí</p>
//             <button 
//               onClick={handleUpload} 
//               className="btn-primary2 px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Subir archivo
//             </button>
//           </div>
//         </div>
//         {uploading && <LinearProgress className="h-2 w-full mb-4" color="primary" />}
//         <div className="flex flex-grow">
//           <div className="w-1/2 mt-2 pr-2">
//                 <MUIDataTable
//                   title={'Lista de Documentos Excel'}
//                   data={data}
//                   columns={columns}
//                   options={options}
//                 />


//             {/* <MUIDataTable
//               title={"Documentos Excel"}
//               data={[]} // Aquí va la data que quieres mostrar en la tabla
//               columns={columns}
//               options={{
//                 responsive: "standard",
//                 selectableRows: "none",
//                 download: true,
//                 rowsPerPage: 5,
//                 rowsPerPageOptions: [5, 10, 15],
//                 onDownload: () => {
//                   handleCustomExport();
//                   return false;
//                 },
//                 textLabels: {
//                   body: {
//                     noMatch: "Lo siento, no se encontraron registros",
//                     toolTip: "Ordenar",
//                   },
//                   pagination: {
//                     next: "Siguiente",
//                     previous: "Anterior",
//                     rowsPerPage: "Filas por página",
//                     displayRows: "de",
//                   },
//                   toolbar: {
//                     search: "Buscar",
//                     downloadCsv: "Descargar CSV",
//                     print: "Imprimir",
//                     viewColumns: "Mostrar columnas",
//                     filterTable: "Filtrar tabla",
//                   },
//                   filter: {
//                     all: "Todos",
//                     title: "FILTROS",
//                     reset: "REINICIAR",
//                   },
//                   viewColumns: {
//                     title: "Mostrar columnas",
//                     titleAria: "Mostrar/Ocultar Columnas",
//                   },
//                   selectedRows: {
//                     text: "fila(s) seleccionada(s)",
//                     delete: "Eliminar",
//                     deleteAria: "Eliminar fila seleccionada",
//                   },
//                 },
//               }}
//             /> */}



//           </div>
//           <div className="w-1/2 pl-2">
//             <div className="flex justify-center p-2">
//               <div
//                 className="border border-gray-300 p-2 overflow-auto"
//                 style={{ maxHeight: '600px', maxWidth: '600px', transform: 'scale(0.6)', transformOrigin: 'top left' }}
//                 dangerouslySetInnerHTML={{ __html: thumbnailHtml }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImportExcel;