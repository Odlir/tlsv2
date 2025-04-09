import { Head } from '@inertiajs/react';
import { School } from 'lucide-react';
import React, { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

import { Button } from 'primereact/button';
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
        title: 'Colegios',
        href: '/empresas',
    },
];

interface Empresa {
    id: number;
    razonSocial: string;
    contacto: string;
    email: string;
    telefono: string;
    ubigeo: string;
    sede: string;
    codigo: string;
    nivel: string;
    gestion: string;
    gestionDepartamento: string;
    insert_user_id: number;
    edit_user_id: number;
}

interface EmpresasProps {
    empresas: Empresa[];
    totalRecords: number;
    totalPages: number;
}

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
}

interface TreeSelectFieldProps {
    id: string;
    label: string;
}

export default function Empresas({ empresas }: EmpresasProps) {
    const [visible, setVisible] = useState(false);
    const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa[]>(empresas);

    const generoOptions: TreeNode[] = [
        { key: '0', label: 'Masculino', data: 'Masculino' },
        { key: '1', label: 'Femenino', data: 'Femenino' },
    ];

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const _empresas = [...selectedEmpresas];
        const { newData, index } = e;
        _empresas[index] = newData as Empresa;
        setSelectedEmpresas(_empresas);
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

    const TreeSelectField: React.FC<TreeSelectFieldProps> = ({ id, label }) => (
        <div className="mt-4">
            <FloatLabel>
                <TreeSelect
                    inputId={id}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
                    {label}
                </label>
            </FloatLabel>
        </div>
    );

    const headerElement = (
        <div className="align-items-center justify-content-center inline-flex gap-2">
            <span className="white-space-nowrap font-bold">Registrar Colegio </span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Crear" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Colegios" />
            <div className="flex flex-1 flex-col gap-6 rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center gap-3 border-b pb-4">
                    <i className="fas fa-user-friends text-xl text-gray-600" />
                    <School />
                    <h1 className="text-2xl font-bold text-gray-800">Mantenimiento de Colegios</h1>
                </div>

                <div className="mb-4 flex justify-end">
                    <Button label="CREAR COLEGIO" onClick={() => setVisible(true)} />
                </div>

                <div className="card">
                    <DataTable
                        value={selectedEmpresas}
                        tableStyle={{ minWidth: '50rem' }}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete}
                    >
                        <Column field="id" header="Id" />
                        <Column field="razon_social" header="Razón Social" editor={textEditor} />
                        <Column field="contacto" header="Contacto" editor={textEditor} />
                        <Column field="email" header="Correo Personal" editor={treeSelectEditor} />
                        <Column field="telefono" header="Teléfono" editor={textEditor} />
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
                    <div className="space-y-3 rounded-lg border border-gray-300 p-6 shadow-lg dark:border-zinc-700">
                        <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-800 dark:text-white">
                            Ingrese los datos del colegio
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <InputField id="razonSocial" label="Razón Social" type="text" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <InputField id="correoContacto" label="Correo Contacto" type="text" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <InputField id="contacto" label="Contacto" type="text" />
                            <InputField id="telefono" label="Teléfono" type="text" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <InputField id="sede" label="Sede" type="text" />
                            <InputField id="codigo" label="Código" type="text" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <TreeSelectField id="nivel" label="Nivel" />
                            <TreeSelectField id="gestion" label="Gestión" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <TreeSelectField id="gestionDepartamento" label="Gestión Departamento" />
                            <TreeSelectField id="departamento" label="Departamento" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <TreeSelectField id="provincia" label="Provincia" />
                            <TreeSelectField id="distrito" label="Distrito" />
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
}
