import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Edit } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';

import { ColumnEditorOptions } from 'primereact/column';
import { DataTableRowEditCompleteEvent } from 'primereact/datatable';
import type { TreeNode } from 'primereact/treenode';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Programar Encuestas',
        href: '/empresas',
    },
];

interface Encuestas {
    id: number;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
    seccion: string;
    empresa_sucursal_id: number;
    insert_user_id: number;
    edit_user_id: number;
}

interface EncuestasProps {
    encuestas: Encuestas[];
    totalRecords: number;
    totalPages: number;
}


// interface TreeSelectFieldProps {
//     id: string;
//     label: string;
// }

export default function Encuestas({ encuestas }: EncuestasProps) {
    const [visible, setVisible] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [selectedEncuestas, setSelectedEncuestas] = useState<Encuestas[]>(encuestas);

    const generoOptions: TreeNode[] = [
        { key: '0', label: 'Masculino', data: 'Masculino' },
        { key: '1', label: 'Femenino', data: 'Femenino' },
    ];

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const _encuestas = [...selectedEncuestas];
        const { newData, index } = e;
        _encuestas[index] = newData as Encuestas;
        setSelectedEncuestas(_encuestas);
    };

    const textEditor = (options: ColumnEditorOptions) => (
        <InputText type="text" value={options.value} onChange={(e) => options.editorCallback?.(e.target.value)} />
    );

    const treeSelectEditor = (options: ColumnEditorOptions) => (
        <TreeSelect
            value={options.value}
            onChange={(e) => options.editorCallback?.(e.value)}
            options={generoOptions}
            placeholder="Selecciona género"
        />
    );

    const headerElement = (
        <div className="align-items-center justify-content-center inline-flex gap-2">
            <span className="white-space-nowrap font-bold">Registrar Encuesta</span>
        </div>
    );

    const [formData, setFormData] = useState<{
        colegio: string;
        seccion: string;
        fecha_inicio: Date | null | undefined;
        fecha_fin: Date | null | undefined;
        estado: string;
        excelFile: string | File; // Ahora acepta ambos tipos
    }>({
        colegio: "",
        seccion: "",
        fecha_inicio: null,
        fecha_fin: null,
        estado: "",
        excelFile: "", // Inicialmente es un string vacío
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validateFields = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.colegio) {
            newErrors.colegio = 'El colegio es requerido';
        }

        if (!formData.seccion) {
            newErrors.seccion = 'La sección es requerida';
        }

        if (!formData.fecha_inicio) {
            newErrors.fecha_inicio = 'La fecha de inicio es requerida';
        }

        if (!formData.fecha_fin) {
            newErrors.fecha_fin = 'La fecha de fin es requerida';
        }

        // Validar que fecha_fin sea posterior a fecha_inicio
        if (formData.fecha_inicio && formData.fecha_fin && new Date(formData.fecha_inicio) > new Date(formData.fecha_fin)) {
            newErrors.fecha_fin = 'La fecha de fin debe ser posterior a la fecha de inicio';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const saveEncuesta = async () => {
        if (!validateFields()) {
            return;
        }

        // Crear el objeto FormData
        const formDataToSend = new FormData();

        // Agregar datos al FormData
        const fechaInicio = formData.fecha_inicio instanceof Date
            ? formData.fecha_inicio.toISOString().split("T")[0]
            : formData.fecha_inicio ?? "";

        const fechaFin = formData.fecha_fin instanceof Date
            ? formData.fecha_fin.toISOString().split("T")[0]
            : formData.fecha_fin ?? "";
        formDataToSend.append("fecha_inicio", fechaInicio);
        formDataToSend.append("fecha_fin", fechaFin);
        // Agregar todos los demás campos de formData
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "excelFile" && value !== null && value !== undefined) {
                const formattedValue = value instanceof Date
                    ? value.toISOString().split("T")[0] // Convertir Date a string "YYYY-MM-DD"
                    : String(value); // Convertir otros valores a string

                formDataToSend.append(key, formattedValue);
            }
        });

        // Agregar el archivo si existe
        if (formData.excelFile) {
            formDataToSend.append("excelFile", formData.excelFile);
        }

        try {
            const id = null; // Ajusta esto si estás editando

            if (id) {
                await axios.put(`/encuestas/${id}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post("/encuestas", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            // Cerrar el modal y recargar datos
            setVisible(false);
            window.location.reload();
        } catch (error) {
            console.error("Error al guardar la encuesta", error);
        }
    };



    const footerContent = (
        <div>
            <Button label="Cancelar" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Guardar" onClick={saveEncuesta} autoFocus />
        </div>
    );
    const [empresaSucursales, setEmpresaSucursales] = useState<any[]>([]);
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({ ...formData, colegio: value });

        if (value.length >= 2) {
            try {
                const response = await axios.get('/getEmpresaSucursal', {
                    params: { query: value },
                });
                console.log('Respuesta de la búsqueda:', response.data); // Verifica qué contiene la respuesta
                setEmpresaSucursales(response.data);
            } catch (error) {
                console.error('Error al buscar la empresa sucursal:', error);
            }
        } else {
            setEmpresaSucursales([]);
        }
    };

    const handleSuggestionClick = (empresa: any) => {
        // Actualiza el campo de búsqueda con el nombre de la empresa seleccionada
        setFormData({ ...formData, colegio: empresa.nombre });

        // Limpia las sugerencias
        setEmpresaSucursales([]); // Esto hace que la lista de sugerencias desaparezca inmediatamente

        // Puedes agregar aquí más lógica si necesitas hacer algo más después de la selección
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Encuesta" />
            <div className="flex flex-1 flex-col gap-6 rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center gap-3 border-b pb-4">
                    <i className="fas fa-user-friends text-xl text-gray-600" />
                    <Edit />
                    <h1 className="text-2xl font-bold text-gray-800">Mantenimiento de Encuesta</h1>
                </div>

                <div className="mb-4 flex justify-end">
                    <Button label="CREAR ENCUESTA" onClick={() => setVisible(true)} />
                </div>

                <div className="card">
                    <DataTable
                        value={selectedEncuestas}
                        tableStyle={{ minWidth: '50rem' }}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete}
                    >
                        <Column field="id" header="Id" />
                        <Column field="empresa_sucursal_id" header="Colegio" editor={textEditor} />
                        <Column field="seccion" header="Sección" editor={textEditor} />
                        <Column field="fecha_inicio" header="Fecha de Inicio" editor={treeSelectEditor} />
                        <Column field="fecha_fin" header="Fecha de Fin" editor={treeSelectEditor} />
                        <Column field="estado" header="Estado" editor={textEditor} />
                        <Column field="correo" header="Avance" editor={textEditor} />
                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
                    </DataTable>
                </div>

                <Dialog
                    visible={visible}
                    modal
                    header={headerElement}
                    footer={footerContent}
                    style={{ width: '50rem' }}
                    onHide={() => setVisible(false)}
                >
                    <div className="space-y-7 rounded-lg border border-gray-300 p-6 shadow-lg dark:border-zinc-700">
                        <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-800 dark:text-white">
                            Ingrese los datos de la encuesta
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mt-4">
                                <FloatLabel>
                                    <input
                                        id="colegio"
                                        type="search"
                                        value={formData.colegio}
                                        onChange={handleInputChange}
                                        placeholder="Buscar colegio..."
                                        className={`w-full rounded-md border ${errors?.colegio ? 'border-red-500' : 'border-gray-300'} p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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

                                {errors?.colegio && <small className="text-red-500">{errors.colegio}</small>}

                                {/* Mostrar las sugerencias debajo del campo de búsqueda */}
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
                                    <InputText
                                        id="seccion"
                                        type="text"
                                        value={formData.seccion}
                                        onChange={(e) => setFormData({ ...formData, seccion: e.target.value })}
                                        className={`w-full rounded-md border ${errors?.seccion ? 'border-red-500' : 'border-gray-300'} p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                    />
                                    <label htmlFor="seccion" className="mb-2 block font-semibold text-gray-700">
                                        Sección
                                    </label>
                                </FloatLabel>
                                {errors?.seccion && <small className="text-red-500">{errors.seccion}</small>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FloatLabel>
                                <Calendar
                                    id="fecha_inicio"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.value ?? null);
                                        setFormData((prev) => ({
                                            ...prev,
                                            fecha_inicio: e.value,
                                        }));
                                    }}
                                    selectionMode="single"
                                    readOnlyInput
                                    showButtonBar
                                    showIcon
                                    className={`w-full rounded-md ${errors.fecha_inicio ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                                />
                                <label htmlFor="fecha_inicio" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Fecha Inicio
                                </label>
                                {errors.fecha_inicio && <small className="text-red-500">{errors.fecha_inicio}</small>}
                            </FloatLabel>

                            <FloatLabel>
                                <Calendar
                                    id="fecha_fin"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.value ?? null);
                                        setFormData((prev) => ({
                                            ...prev,
                                            fecha_fin: e.value,
                                        }));
                                    }}
                                    selectionMode="single"
                                    readOnlyInput
                                    showButtonBar
                                    showIcon
                                    className={`w-full rounded-md ${errors.fecha_fin ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                                />
                                <label htmlFor="fecha_fin" className="mb-2 block font-semibold text-gray-700">
                                    Fecha Fin
                                </label>
                                {errors.fecha_fin && <small className="text-red-500">{errors.fecha_fin}</small>}
                            </FloatLabel>
                        </div>

                        <div className="mt-8 rounded-2xl border border-dashed border-blue-400 bg-blue-50 p-6 shadow-sm dark:border-zinc-600 dark:bg-zinc-800">
                            <div className="mb-6">
                                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Descargar Plantilla</h3>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <a
                                        href="/plantillas/importar-alumnos.xlsx"
                                        download
                                        className="inline-block text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
                                    >
                                        importar-alumnos.xlsx
                                    </a>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Hasta 40 alumnos por sección. Para más, sepáralos en otra sección.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-lg font-semibold text-gray-800 dark:text-white">Importar
                                    Alumnos</label>
                                <input
                                    type="file"
                                    accept=".xlsx"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setFormData((prev) => ({ ...prev, excelFile: file }));
                                            console.log("Archivo seleccionado:", file.name);
                                        } else {
                                            console.warn("No se seleccionó ningún archivo");
                                        }
                                    }}
                                    className="block w-full cursor-pointer text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:font-semibold file:text-blue-800 hover:file:bg-blue-200 dark:text-white dark:file:bg-blue-900 dark:file:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
}
