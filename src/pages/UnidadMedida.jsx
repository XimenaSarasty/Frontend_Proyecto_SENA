import React from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import { FaBeer, FaWeight, FaRuler } from "react-icons/fa";

const UnidadMedida = () => {
  const [sidebarToggle, setSidebarToggle] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-fondo">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className={`flex-1 px-32 ${sidebarToggle ? "ml-custom" : ""}`}>
        <Home
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />

        <header className="mb-6 mt-24 text-center bg-fondo p-5 rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-negro">
            Unidades de Medida
          </h1>
          <p className="text-negro mb-4">
            Explora las diversas unidades de medida que utilizamos en diferentes
            contextos.
          </p>
          <p className="text-negro mb-4">
            Las unidades de medida que vamos a utilizar son fundamentales para
            nuestro sistema de inventario. Nos permiten cuantificar y comparar
            diferentes magnitudes de manera precisa. En este contexto, cada
            unidad tiene un papel específico que facilita la interpretación y
            aplicación de nuestros datos.
          </p>
        </header>

        <section>
          <div className="flex space-x-4 justify-start mb-6">
            <div className="w-1/3 bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
              <FaBeer className="text-4xl text-sena mb-2" />
              <h3 className="text-xl font-semibold mb-2">Volumen</h3>
              <p>
                El volumen mide el espacio que ocupa un objeto o sustancia en
                tres dimensiones, y se utiliza para cuantificar líquidos,
                sólidos y gases. Las unidades de medida incluyen litros (L),
                mililitros (ml) y metros cúbicos (m³).
              </p>
            </div>
            <div className="w-1/3 bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
              <FaWeight className="text-4xl text-sena mb-2" />
              <h3 className="text-xl font-semibold mb-2">Peso</h3>
              <p>
                El peso mide la fuerza con la que la gravedad atrae un objeto, y
                se utiliza para cuantificar la masa de sólidos, líquidos y
                gases. Las unidades de medida incluyen kilogramos (kg), gramos
                (g) y toneladas (t).
              </p>
            </div>
            <div className="w-1/3 bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
              <FaRuler className="text-4xl text-sena mb-2" />
              <h3 className="text-xl font-semibold mb-2">Longitud</h3>
              <p>
                La longitud mide la distancia entre dos puntos y se utiliza para
                cuantificar el tamaño de objetos y espacios. Las unidades de
                medida incluyen metros (m), centímetros (cm) y kilómetros (km).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-left text-negro">
            Unidades de Medidas Utilizadas
          </h2>
          <div className="overflow-x-auto flex justify-center items-center">
            <table className="min-w-full max-w-4xl bg-white border border-gris rounded-lg shadow-md text-center">
              <thead className="bg-grisClaro">
                <tr>
                  <th>Tipo</th>
                  <th>Sigla</th>
                  <th>Nombre</th>
                  <th>Equivalencia</th>
                </tr>
              </thead>
              <tbody>
                {/* Sección de Volumen */}
                <tr className="border-t border-grisClaro">
                  <td className="bg-gris" rowSpan="4">
                    Volumen
                  </td>
                  <td>ml</td>
                  <td>Mililitro</td>
                  <td>
                    1 mililitro = 1 centímetro cúbico (cm³) = 0.001 litros (L)
                  </td>
                </tr>
                <tr>
                  <td>gal</td>
                  <td>Galón</td>
                  <td>1 galón = 3.785 litros (L)</td>
                </tr>
                <tr>
                  <td>cm³</td>
                  <td>Centímetro cúbico</td>
                  <td>
                    1 centímetro cúbico = 1 mililitro (mL) = 0.001 litros (L)
                  </td>
                </tr>
                <tr>
                  <td>L</td>
                  <td>Litro</td>
                  <td>
                    1 litro = 1000 mililitros (mL) = 1000 centímetros cúbicos
                    (cm³)
                  </td>
                </tr>

                {/* Separador */}
                <tr className="border-t border-grisClaro">
                  <td colSpan="4"></td>
                </tr>

                {/* Sección de Peso */}
                <tr>
                  <td className="bg-gris" rowSpan="2">
                    Peso
                  </td>
                  <td>oz</td>
                  <td>Onza</td>
                  <td>1 onza = 28.3495 gramos (g)</td>
                </tr>
                <tr>
                  <td>g</td>
                  <td>Gramo</td>
                  <td>
                    1 gramo = 0.001 kilogramos (kg) = 1000 miligramos (mg)
                  </td>
                </tr>

                {/* Separador */}
                <tr className="border-t border-grisClaro">
                  <td colSpan="4"></td>
                </tr>

                {/* Sección de Longitud */}
                <tr>
                  <td className="bg-gris" rowSpan="3">
                    Longitud
                  </td>
                  <td>mm</td>
                  <td>Milímetro</td>
                  <td>1 milímetro = 0.1 centímetros (cm) = 0.001 metros (m)</td>
                </tr>
                <tr>
                  <td>in</td>
                  <td>Pulgada</td>
                  <td>1 pulgada = 2.54 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>cm</td>
                  <td>Centímetro</td>
                  <td>1 centímetro = 10 milímetros (mm) = 0.01 metros (m)</td>
                </tr>

                {/* Separador */}
                <tr className="border-t border-grisClaro">
                  <td colSpan="4"></td>
                </tr>

                {/* Sección de Volumen Adicional */}
                <tr>
                  <td className="bg-gris" rowSpan="9">
                    Volumen Adicional
                  </td>
                  <td>1/4 in</td>
                  <td>1/4 de pulgada</td>
                  <td>1/4 de pulgada = 0.635 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>3/8 in</td>
                  <td>3/8 de pulgada</td>
                  <td>3/8 de pulgada = 0.9525 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>5/8 in</td>
                  <td>5/8 de pulgada</td>
                  <td>5/8 de pulgada = 1.5875 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>7/8 in</td>
                  <td>7/8 de pulgada</td>
                  <td>7/8 de pulgada = 2.2225 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>1 1/4 in</td>
                  <td>1 1/4 de pulgada</td>
                  <td>1 1/4 de pulgada = 3.175 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>1 3/4 in</td>
                  <td>1 3/4 de pulgada</td>
                  <td>1 3/4 de pulgada = 4.445 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>5/16 in</td>
                  <td>5/16 de pulgada</td>
                  <td>5/16 de pulgada = 0.79375 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>1/2 in</td>
                  <td>1/2 de pulgada</td>
                  <td>1/2 de pulgada = 1.27 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>3/4 in</td>
                  <td>3/4 de pulgada</td>
                  <td>3/4 de pulgada = 1.905 centímetros (cm)</td>
                </tr>

                {/* Separador */}
                <tr className="border-t border-grisClaro">
                  <td colSpan="4"></td>
                </tr>

                {/* Sección de Peso Adicional */}
                <tr>
                  <td className="bg-gris" rowSpan="5">
                    Peso Adicional
                  </td>
                  <td>1 in</td>
                  <td>1 pulgada</td>
                  <td>1 pulgada = 2.54 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>1 1/2 in</td>
                  <td>1 1/2 de pulgada</td>
                  <td>1 1/2 de pulgada = 3.81 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>2 in</td>
                  <td>2 pulgadas</td>
                  <td>2 pulgadas = 5.08 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>2 1/2 in</td>
                  <td>2 1/2 de pulgada</td>
                  <td>2 1/2 de pulgada = 6.35 centímetros (cm)</td>
                </tr>
                <tr>
                  <td>3 in</td>
                  <td>3 pulgadas</td>
                  <td>3 pulgadas = 7.62 centímetros (cm)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UnidadMedida;
