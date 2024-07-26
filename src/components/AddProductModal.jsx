import React, { useEffect, useState } from "react";
import { api } from "../api/token"; // Usa el módulo api para las llamadas a la API
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    usuarioId: "",
    marca: "",
    cantidad_actual: "",
    cantidad_entrada: "",
    descripcion: "",
    unidadmedidaId: "",
    subcategoriaId: "",
    estadoId: "",
    cantidad_salida: "",
    nombre: "",
    codigo: "",
  });
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProductProfile();
    } else {
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (product) {
      setFormData({
        usuarioId: product.usuarioId || "",
        marca: product.marca || "",
        cantidad_actual: product.cantidad_actual || "",
        cantidad_entrada: product.cantidad_entrada || "",
        descripcion: product.descripcion || "",
        unidadmedidaId: product.unidadmedidaId || "",
        subcategoriaId: product.subcategoriaId || "",
        estadoId: product.estadoId || "",
        cantidad_salida: product.cantidad_salida || "",
        nombre: product.nombre || "",
        codigo: product.codigo || "",
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await api.get("/estados"); // Usa la API para obtener los estados
        setEstados(response.data);
      } catch (error) {
        showToastError("Error al cargar los estados");
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles"); // Usa la API para obtener los roles
        setRoles(response.data);
      } catch (error) {
        showToastError("Error al cargar los roles");
      }
    };

    fetchEstados();
    fetchRoles();
  }, []);

  const fetchProductProfile = async () => {
    setLoading(true);
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const response = await api.get("/productos/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Manejar datos si es necesario
      } else {
        setFormErrors({ fetch: response.data.message });
      }
    } catch (error) {
      setFormErrors({ fetch: "Error al cargar la información del producto." });
    } finally {
      setLoading(false);
    }
  };

  const validateInput = (name, value) => {
    let errorMessage = "";
    if (name === "nombre") {
      const nameRegex = /^[A-Za-z\s-_\u00C0-\u017F]+$/;
      if (!nameRegex.test(value) || /\d/.test(value)) {
        errorMessage = "El nombre no puede contener caracteres especiales.";
      }
    }
    // Añadir otras validaciones si es necesario
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

  const showToastError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCreate = async () => {
    const {
      usuarioId,
      marca,
      cantidad_actual,
      cantidad_entrada,
      descripcion,
      unidadmedidaId,
      subcategoriaId,
      estadoId,
      cantidad_salida,
      nombre,
      codigo,
    } = formData;

    const nombreError = validateInput("nombre", nombre);
    if (nombreError) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        nombre: nombreError,
      }));
      showToastError("Por favor, corrige los errores antes de agregar.");
      return;
    }

    if (
      !usuarioId ||
      !marca ||
      !cantidad_actual ||
      !cantidad_entrada ||
      !descripcion ||
      !unidadmedidaId ||
      !subcategoriaId ||
      !estadoId ||
      !cantidad_salida ||
      !nombre ||
      !codigo
    ) {
      showToastError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      const response = await api.post("/productos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setFormSubmitted(true);
        toast.success("Producto agregado exitosamente", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          resetForm();
          onClose(); // Cerrar el modal después de una operación exitosa
        }, 2000);
      } else {
        showToastError(
          "Ocurrió un error, por favor intenta con valores diferentes."
        );
      }
    } catch (error) {
      showToastError(
        "Ocurrió un error, por favor intenta con valores diferentes."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      usuarioId: "",
      marca: "",
      cantidad_actual: "",
      cantidad_entrada: "",
      descripcion: "",
      unidadmedidaId: "",
      subcategoriaId: "",
      estadoId: "",
      cantidad_salida: "",
      nombre: "",
      codigo: "",
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-fondo bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg sm:w-full md:w-1/4 mt-4 max-h-screen overflow-y-auto">
        <div className="flex justify-end p-2">
          <button onClick={onClose}>
            <FaTimes className="text-black w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center justify-center space-y-4 md:space-y-0 mb-4">
          <div className="w-full md:w-3/4">
            <div className="font-inter ml-2">
              <div className="space-y-2 md:space-y-2 text-left">
                <h6 className="font-bold text-center text-2xl mb-2">
                  Registro Producto
                </h6>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">Usuario ID *</label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="text"
                    name="usuarioId"
                    value={formData.usuarioId}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">Marca *</label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="text"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">
                    Cantidad Actual *
                  </label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="number"
                    name="cantidad_actual"
                    value={formData.cantidad_actual}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">
                    Cantidad Entrada *
                  </label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="number"
                    name="cantidad_entrada"
                    value={formData.cantidad_entrada}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">
                    Descripción *
                  </label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">
                    Unidad de Medida *
                  </label>
                  <select
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    name="unidadmedidaId"
                    value={formData.unidadmedidaId}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una unidad</option>
                    {roles.map((unidad) => (
                      <option key={unidad.id} value={unidad.id}>
                        {unidad.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">
                    Subcategoría *
                  </label>
                  <select
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    name="subcategoriaId"
                    value={formData.subcategoriaId}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione una subcategoría</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">Estado *</label>
                  <select
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    name="estadoId"
                    value={formData.estadoId}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione un estado</option>
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">
                    Cantidad Salida *
                  </label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="number"
                    name="cantidad_salida"
                    value={formData.cantidad_salida}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">Nombre *</label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                  {formErrors.nombre && (
                    <p className="text-red-500 text-xs">{formErrors.nombre}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-bold text-sm">Código *</label>
                  <input
                    className="bg-grisClaro text-sm rounded-lg px-2 h-8"
                    type="text"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    className="btn-primary2"
                    onClick={handleCreate}
                    disabled={loading}
                  >
                    {loading ? "Cargando..." : "Agregar Producto"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductModal;
