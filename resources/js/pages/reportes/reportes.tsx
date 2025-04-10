import { useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { BarChart } from 'lucide-react';
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import * as XLSX from 'xlsx';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: '/reportes',
    },
];
interface Encuesta {
    id: number;
    seccion: string;
}
interface Persona {
    nombre_completo: string;
    dni: string;
    correo: string;
    celular: string;

}
interface EncuestaStatus {
    encuesta_nombre: string;
    estado: string;
    completada: number;
    fecha_completada: string;
    persona: Persona;
}


export default function Reportes() {
    const [formData, setFormData] = useState({
        colegio: '',
    });

    const [encuestaStatus, setEncuestaStatus] = useState<EncuestaStatus[]>([]);

    const [empresaSucursales, setEmpresaSucursales] = useState([]);
    const [encuestas, setEncuestas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedEncuestaId, setSelectedEncuestaId] = useState<number | null>(null);
    const [selectedEncuestaName, setSelectedEncuestaName] = useState<string | null>(null);
    const handleEncuestaSelect = (encuesta: Encuesta) => {
        // Actualizamos los estados con los valores correctos
        setSelectedEncuestaId(encuesta.id); // Ahora `id` es un número
        setSelectedEncuestaName(encuesta.seccion); // Ahora `seccion` es un string
        setEncuestas([]); // Limpiamos las encuestas
    };
    const downloadExcelWithLinks = () => {
        try {
            // Assuming you already have the data in your component
            // If not, you'll need to fetch it first
            const data = []; // Replace with your actual data source

            // If you need to fetch the data first:
            // const response = await axios.get('/api/your-existing-endpoint');
            // const data = response.data;

            // Create worksheet data
            const worksheetData = data.map(item => ({
                'Encuesta ID': item.encuesta_id,
                'Persona ID': item.persona_id,
                'Nombre': item.nombre || 'N/A',
                'Link': `${window.location.origin}/exportar/intereses/${item.encuesta_id}/${item.persona_id}`
            }));

            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(worksheetData);

            // Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Links');

            // Generate Excel file and download
            XLSX.writeFile(workbook, 'survey_links.xlsx');
        } catch (error) {
            console.error('Error generating Excel file:', error);
        }
    };

    const handleVerEstatus = async () => {
        if (!selectedEncuestaId) {
            console.log('No hay encuesta seleccionada');
            return;
        }

        try {
            // Solicitar los datos de la encuesta desde el backend
            const response = await axios.get('/getEstatusEncuesta', {
                params: { encuestaId: selectedEncuestaId },
            });

            // Asegúrate de que la respuesta es un arreglo
            if (Array.isArray(response.data)) {
                setEncuestaStatus(response.data); // Guardar la respuesta en el estado
            } else {
                console.error('La respuesta no es un arreglo');
            }
        } catch (error) {
            console.error('Error al obtener el estado de la encuesta:', error);
        }
    };
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, colegio: value });

        // Solo realiza la búsqueda si el valor tiene 2 o más caracteres
        if (value.length >= 2) {
            try {
                // Solicitud a la API para buscar empresas sucursales
                const response = await axios.get('/getEmpresaSucursal', {
                    params: { query: value },
                });
                console.log('Respuesta de la búsqueda:', response.data);
                setEmpresaSucursales(response.data); // Actualiza las sucursales de la empresa
            } catch (error) {
                console.error('Error al buscar la empresa sucursal:', error);
            }
        } else {
            setEmpresaSucursales([]); // Limpia las sucursales si el valor tiene menos de 2 caracteres
        }
    };

    const handleSuggestionClick = async (empresa: any) => {
        // Actualiza el campo de búsqueda con el nombre de la empresa seleccionada
        setFormData({ ...formData, colegio: empresa.nombre });

        // Limpia las sugerencias
        setEmpresaSucursales([]);

        // Ahora, realiza una solicitud para obtener las encuestas de esa empresa
        try {
            const response = await axios.get(`/getEncuestas`, {
                params: { empresaSucursalId: empresa.id },
            });
            console.log('Encuestas de la empresa:', response.data);
            setEncuestas(response.data); // Actualiza las encuestas relacionadas con la empresa seleccionada
        } catch (error) {
            console.error('Error al obtener las encuestas:', error);
        }
    };

    const headerElement = (
        <div className="align-items-center justify-content-center inline-flex gap-2">
            <span className="white-space-nowrap font-bold">Reporte</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Crear" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    const EncuestaStatusTable = ({ encuestaStatus }: { encuestaStatus: EncuestaStatus[] }) => {
        // Template para mostrar la bola roja o verde dependiendo de completada
        const estadoTemplate = (rowData: any) => {
            return rowData.estado === '1' ? 'Completada' : 'En Proceso';
        };

        const completadaTemplate = (rowData: any) => {
            return rowData.completada === 1 ? 'Sí' : 'No';
        };

        // Template para las bolas rojas y verdes
        const bolaTemplate = (rowData: any) => {
            const color = rowData.completada === 1 ? 'green' : 'red';
            return <span style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />;
        };

        // Template para los enlaces de los reportes (intereses y consolidados)
        const reporteInteresesTemplate = (rowData: any) => {
            const encuestaId = rowData.encuesta_id;
            const personaId = rowData.persona_id;

            // Use route() helper if you're using Inertia
            const url = route('reportes.exportar.intereses', { encuestaId, personaId });

            return <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
        };

        const reporteConsolidadosTemplate = (rowData: any) => {
            const encuestaId = rowData.encuesta_id;
            const personaId = rowData.persona_id;

            const url = `-`;
            return <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
        };

        return (
            <div className="card">
                <h3>Estado de la Encuesta</h3>
                <DataTable value={encuestaStatus} paginator rows={5} responsiveLayout="scroll">
                    <Column field="encuesta_nombre" header="Encuesta" />

                    <Column field="completada" header="Completada" body={completadaTemplate} />
                    <Column field="persona.nombre_completo" header="Persona" />
                    <Column field="persona.dni" header="DNI" />
                    <Column field="persona.correo" header="Correo" />

                    {/* Columnas adicionales con bola roja o verde */}
                    <Column header="INTERESES" body={bolaTemplate} />
                    <Column header="TALENTOS" body={bolaTemplate} />
                    <Column header="TEMPERAMENTOS" body={bolaTemplate} />

                    {/* Columnas de reporte con enlaces dinámicos */}
                    <Column header="REPORTE INTERESES" body={reporteInteresesTemplate} />
                    <Column header="REPORTE CONSOLIDADO" body={reporteConsolidadosTemplate} />
                </DataTable>
            </div>
        );
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reportes" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center gap-3 border-b pb-4">
                    <i className="fas fa-user-friends text-xl text-gray-600" />
                    <BarChart />
                    <h1 className="text-2xl font-bold text-gray-800">Link de Encuestas</h1>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="mt-4">
                        <FloatLabel>
                            <input
                                id="colegio"
                                type="search"
                                value={formData.colegio}
                                onChange={handleInputChange}
                                placeholder="Buscar colegio..."
                                className={`w-full rounded-md border ${empresaSucursales.length > 0 ? 'border-blue-500' : 'border-gray-300'} p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                            <label
                                htmlFor="colegio"
                                className={`absolute top-3 left-3 transform transition-all duration-200 ease-in-out ${
                                    formData.colegio ? '-translate-y-6 scale-75' : ''
                                } mb-2 block font-semibold text-gray-700 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75`}
                            >
                                Colegio
                            </label>
                        </FloatLabel>

                        {/* Muestra las opciones de colegios encontrados */}
                        {empresaSucursales.length > 0 && formData.colegio.length >= 2 && (
                            <div className="mt-2 rounded-md border border-gray-300 bg-white shadow-lg">
                                <ul className="space-y-2">
                                    {empresaSucursales.map((empresa: any) => (
                                        <li
                                            key={empresa.id}
                                            className="cursor-pointer rounded-md p-2 hover:bg-blue-100"
                                            onClick={() => handleSuggestionClick(empresa)} // Manejo de selección
                                        >
                                            {empresa.nombre} ({empresa.codigo})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <FloatLabel>
                            <input
                                id="encuesta"
                                type="search"
                                value={selectedEncuestaName ?? ''} // Usamos un valor por defecto si es null
                                placeholder="Buscar encuesta..."
                                className={`w-full rounded-md border ${encuestas.length > 0 ? 'border-blue-500' : 'border-gray-300'} p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                            <label
                                htmlFor="encuesta"
                                className={`absolute top-3 left-3 mb-2 block transform font-semibold text-gray-700 transition-all duration-200 ease-in-out peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 ${selectedEncuestaName ? '-translate-y-6 scale-75' : ''}`}
                            >
                                Encuesta
                            </label>
                        </FloatLabel>

                        {encuestas.length > 0 && !selectedEncuestaName && (
                            <div className="mt-2 rounded-md border border-gray-300 bg-white shadow-lg">
                                <ul className="space-y-2">
                                    {encuestas.map((encuesta: any) => (
                                        <li
                                            key={encuesta.id}
                                            className="cursor-pointer rounded-md p-2 hover:bg-blue-100"
                                            onClick={() => handleEncuestaSelect(encuesta)} // Se ejecuta al seleccionar una encuesta
                                        >
                                            {encuesta.seccion} ({encuesta.id})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap justify-start gap-4 md:justify-end">
                    <div>
                        <div className="mt-4 flex flex-wrap justify-start gap-4 md:justify-end">
                            <Button
                                label="Ver Estatus"
                                onClick={handleVerEstatus} // Llamamos a la función para obtener el estado
                                style={{ backgroundColor: 'green', color: 'white' }}
                            />
                            {/* Otros botones si los tienes */}
                            <Button label="Descargar Links para Encuestas" onClick={downloadExcelWithLinks} />
                            <Button label="Exportar" onClick={() => setVisible(true)} />
                        </div>

                        {/*{encuestaStatus && (
                            <div>
                                <h3>Estado de la Encuesta</h3>
                                <ul>
                                    {encuestaStatus.map((status: EncuestaStatus) => (
                                        <li key={status.encuesta_nombre}>
                                            <strong>{status.encuesta_nombre}:</strong> {status.estado} - Completada: {status.completada === 1 ? 'Sí' : 'No'} -
                                            Fecha: {status.fecha_completada} -
                                            Persona: {status.persona.nombre_completo} -
                                            DNI: {status.persona.dni} -
                                            Correo: {status.persona.correo}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}*/}
                    </div>
                </div>
                {encuestaStatus && (
                    <EncuestaStatusTable encuestaStatus={encuestaStatus} />
                )}

                <Dialog
                    visible={visible}
                    modal
                    header={headerElement}
                    footer={footerContent}
                    style={{ width: '50rem' }}
                    onHide={() => {
                        if (!visible) return;
                        setVisible(false);
                    }}
                />
            </div>
        </AppLayout>
    );
}
