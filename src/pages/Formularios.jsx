import React, { useState } from "react";
import Navbardark from "../components/Navbardark";
import fondo from "/logoSena.png";
import siga from "/Siga.png";

const Formularios = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    Documento: "",
  });

  const validateInput = (name, value) => {
    let errorMessage = "";
    if (name === "nombre") {
      const nameRegex = /^[A-Za-z\s-_\u00C0-\u017F]+$/;
      if (!nameRegex.test(value) || /\d/.test(value)) {
        errorMessage = "El nombre no puede contener caracteres especiales.";
      }
    } else if (name === "correo") {
      const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!correoRegex.test(value)) {
        errorMessage = "El correo debe ser un correo válido.";
      }
    } else if (name === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[a-zA-Z0-9!@#$%^&*?]{8,}$/;
      if (!passwordRegex.test(value)) {
        errorMessage =
          "La contraseña debe contener una mayúscula, una minúscula, un carácter especial, y entre 8 a 20 caracteres.";
      }
    }
    return errorMessage;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateInput(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen bg-fondo">
      <Navbardark />
      <div
        className={`flex flex-col flex-grow w-full p-6 bg-fondo ${
          sidebarToggle ? "ml-64" : ""
        } mt-16`}
      >
        <div className="flex-grow">
          <div className=" mx-auto">
            <div className={"bg-white shadow-lg px-4 py-3 w-full mb-2"}>
              <div className="flex items-center justify-between text-sm w-auto">
                <img
                  className="w-20 h-20 object-cover ml-2"
                  src={fondo}
                  alt="logoSena"
                />
                <div className="flex flex-col items-center">
                  <span className="text-black font-semibold hidden md:inline">
                    SERVICIO NACIONAL DE APRENDIZAJE SENA
                  </span>
                  <span className="text-black font-semibold hidden md:inline">
                    GESTIÓN DE INFRAESTRUCTURA Y LOGÍSTICA
                  </span>
                  <span className="text-black font-semibold hidden md:inline">
                    FORMATO DE SOLICITUD DE SALIDA DE BIENES PARA EL USO DE LOS
                  </span>
                  <span className="text-black font-semibold hidden md:inline">
                    CUENTADANTES QUE TIENEN VÍNCULO CON LA ENTIDAD
                  </span>
                </div>
                <img
                  className="flex justify-end w-auto h-14 object-cover ml-2"
                  src={siga}
                  alt="siga"
                />
                <div className="flex flex-col">
                  <span className="text-black font-semibold hidden md:inline">
                    SBHNo.:
                  </span>
                  <span className="text-black font-semibold hidden md:inline">
                    Versión: 04
                  </span>
                  <span className="text-black font-semibold hidden md:inline">
                    Código: GIL-F-014
                  </span>
                </div>
              </div>
            </div>

            <div className={"bg-white shadow-lg px-4 py-3 w-full"}>
              <div className="flex flex-col space-y-4 md:space-y-0 text-sm w-full">
                <div className="w-full font-inter text-left">
                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row justify-between gap-x-4">
                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Fecha de Solicitud *
                        </label>
                        <input
                          className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                          type="date"
                          name="nombre"
                          //   value={formData.nombre}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">Área *</label>
                        <input
                          className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                          type="text"
                          name="Documento"
                          //   value={formData.Documento}
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-x-4">
                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Código Regional
                        </label>
                        <input
                          className="bg-grisClaro text-sm text-noEdit rounded-lg px-2 h-8"
                          type="text"
                          name="correo"
                          value="5"
                          readOnly
                        />
                     </div>

                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Nombre Regional
                        </label>
                        <input
                          className="bg-grisClaro text-sm text-noEdit rounded-lg px-2 h-8"
                          type="text"
                          name="password"
                          value="Antioquia"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-x-4">
                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Código Centro de Costos
                        </label>
                        <input
                          className="bg-grisClaro text-sm text-noEdit rounded-lg px-2 h-8"
                          type="text"
                          name="correo"
                          value="920510"
                          readOnly
                        />                    
                      </div>

                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Nombre Centro de Costos
                        </label>
                        <input
                          className="bg-grisClaro text-sm text-noEdit rounded-lg px-2 h-8"
                          type="text"
                          name="password"
                          value="Centro Tecnólogico del Mobiliario"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-x-4">
                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Nombre de jefe de oficina o coordinador de área: *
                        </label>
                        <input
                          className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                          type="text"
                          name="name"
                          value=""
                          onChange={handleInputChange}
                        />
                        {formErrors.name && (
                          <div className="text-red-400 text-sm mt-1 px-2">
                            {formErrors.name}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Cédula *
                        </label>
                        <input
                          className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                          type="text"
                          name="Documento"
                          value=""
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={10}
                        />
                        {formErrors.Documento && (
                          <div className="text-red-400 text-sm mt-1 px-2">
                            {formErrors.Documento}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-x-4">
                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Nombre del servidor público a quien se le asignará el
                          bien *
                        </label>
                        <input
                          className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                          type="text"
                          name="correo"
                          value=""
                          onChange={handleInputChange}
                        />
                        {formErrors.correo && (
                          <div className="text-red-400 text-sm mt-1 px-2">
                            {formErrors.correo}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col min-w-[200px] w-full md:w-1/2">
                        <label className="mb-1 font-bold text-sm">
                          Cédula *
                        </label>
                        <input
                          className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                          type="text"
                          name="Documento"
                          value=""
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          maxLength={10}                          
                        />
                        {formErrors.Documento && (
                          <div className="text-red-400 text-sm mt-1 px-2">
                            {formErrors.Documento}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col min-w-[200px]  w-full md:w-1/2">
                      <label className="mb-1 font-bold text-sm">
                        Código de grupo o ficha de caracterización *
                      </label>
                      <input
                        className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                        type="text"
                        name="Documento"
                        value=""
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        maxLength={6}
                      />
                      {formErrors.Documento && (
                        <div className="text-red-400 text-sm mt-1 px-2">
                          {formErrors.Documento}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formularios;
