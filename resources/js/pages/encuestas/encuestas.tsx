import { Head } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import React, { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

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

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
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

    const InputField: React.FC<InputFieldProps> = ({ id, label, type }) => (
        <div className="mt-4">
            <FloatLabel>
                <InputText
                    id={id}
                    type={type}
                    className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
                    {label}
                </label>
            </FloatLabel>
        </div>
    );

    // const TreeSelectField: React.FC<TreeSelectFieldProps> = ({ id, label }) => (
    //     <div className="mt-4">
    //         <FloatLabel>
    //             <TreeSelect
    //                 inputId={id}
    //                 className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //             />
    //             <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
    //                 {label}
    //             </label>
    //         </FloatLabel>
    //     </div>
    // );

    const headerElement = (
        <div className="align-items-center justify-content-center inline-flex gap-2">
            <span className="white-space-nowrap font-bold">Registrar Encuesta</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Crear" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
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
                            <InputField id="colegio" label="Colegio" type="text" />
                            <InputField id="seccion" label="Sección" type="text" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FloatLabel>
                                <Calendar
                                    id="fechaInicio"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.value ?? null)}
                                    selectionMode="single"
                                    readOnlyInput
                                    showButtonBar
                                    showIcon
                                    className="w-full rounded-md border-gray-300 focus:ring-blue-500"
                                />

                                <label htmlFor="fechaInicio" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Fecha Inicio
                                </label>
                            </FloatLabel>
                            <FloatLabel>
                                <Calendar
                                    id="fechaFin"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.value ?? null)}
                                    selectionMode="single"
                                    readOnlyInput
                                    showButtonBar
                                    showIcon
                                    className="w-full rounded-md border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor="fechaFin" className="mb-2 block font-semibold text-gray-700">
                                    Fecha Fin
                                </label>
                            </FloatLabel>
                        </div>
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
                            <label className="mb-2 block text-lg font-semibold text-gray-800 dark:text-white">Importar Alumnos</label>
                            <input
                                type="file"
                                accept=".xlsx"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        console.log('Archivo seleccionado:', file.name);
                                    } else {
                                        console.warn('No se seleccionó ningún archivo');
                                    }
                                }}
                                className="block w-full cursor-pointer text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:font-semibold file:text-blue-800 hover:file:bg-blue-200 dark:text-white dark:file:bg-blue-900 dark:file:text-white"
                            />

                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
}
