import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Users } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';

import { ColumnEditorOptions } from 'primereact/column';
import { DataTableRowEditCompleteEvent } from 'primereact/datatable';
import type { TreeNode } from 'primereact/treenode';
import type { TreeSelectChangeEvent } from 'primereact/treeselect';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Personas', href: '/personas' }];

interface Persona {
    id: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    sexo: string;
    correo: string;
    dni: string;
    celular: string;
}

interface PersonasProps {
    personas: Persona[];
    totalRecords: number;
    totalPages: number;
}

interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TreeSelectFieldProps {
    id: string;
    label: string;
    value: string | null;
    onChange: (e: TreeSelectChangeEvent) => void;
}

export default function Personas({ personas }: PersonasProps) {
    const [visible, setVisible] = useState(false);
    const [selectedPersonas, setSelectedPersonas] = useState<Persona[]>(personas);
    const [id, setId] = useState<number | null>(null);
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [nombres, setNombres] = useState('');
    const [genero, setGenero] = useState<string | null>(null);
    const [correoPersonal, setCorreoPersonal] = useState('');
    const [dni, setDni] = useState('');
    const [celular, setCelular] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const generoOptions: TreeNode[] = [
        { key: 'MASCULINO', label: 'MASCULINO', data: 'MASCULINO' },
        { key: 'FEMENINO', label: 'FEMENINO', data: 'FEMENINO' },
    ];

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const _personas = [...selectedPersonas];
        const { newData, index } = e;
        _personas[index] = newData as Persona;
        setSelectedPersonas(_personas);
    };

    const handleEdit = (rowData: Persona) => {
        setApellidoPaterno(rowData.apellido_paterno.split(' ')[0]);
        setApellidoMaterno(rowData.apellido_materno.split(' ')[0]);
        setNombres(rowData.nombres);
        setGenero(rowData.sexo);
        setCorreoPersonal(rowData.correo);
        setDni(rowData.dni);
        setCelular(rowData.celular);
        setId(rowData.id ? Number(rowData.id) : null);
        setVisible(true);
    };

    const savePerson = async () => {
        const personData = {
            apellidoPaterno,
            apellidoMaterno,
            nombres,
            genero,
            correoPersonal,
            dni,
            celular,
        };

        try {
            if (id) {
                await axios.put(`/personas/${id}`, personData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                await axios.post('/personas', personData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar la persona', error);
        }
    };

    const filteredPersonas = selectedPersonas.filter((persona) => {
        const fullName = `${persona.apellido_paterno} ${persona.apellido_materno} ${persona.nombres} ${persona.sexo} ${persona.correo}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    }).sort((a, b) => a.id - b.id);


    const resetForm = () => {
        setApellidoPaterno('');
        setApellidoMaterno('');
        setNombres('');
        setGenero(null);
        setCorreoPersonal('');
        setDni('');
        setCelular('');
        setId(null);
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

    const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange }) => (
        <div className="mt-4">
            <FloatLabel>
                <InputText
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    style={{ textTransform: 'none' }}
                    className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
                    {label}
                </label>
            </FloatLabel>
        </div>
    );

    const TreeSelectField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange }) => (
        <div className="mt-4">
            <FloatLabel>
                <TreeSelect
                    inputId={id}
                    value={value}
                    onChange={onChange}
                    options={generoOptions}
                    placeholder="Selecciona género"
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
            <span className="white-space-nowrap font-bold">Registrar Persona</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label={id ? 'Editar' : 'Crear'} onClick={() => savePerson()}/>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personas" />

            <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 p-8 shadow-lg">
                <div className="flex items-center gap-4 border-b pb-4">
                    <i className="fas fa-user-friends text-2xl text-indigo-600" />
                    <Users />
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Mantenimiento de Personas</h1>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText placeholder="Buscar persona..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </IconField>

                    <Button
                        label="Crear Persona"
                        className="bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
                        onClick={() => {
                            resetForm();
                            setVisible(true);
                        }}
                    />
                </div>

                <div className="rounded-xl bg-white p-6 shadow-xl">
                    <DataTable
                        value={filteredPersonas}
                        tableStyle={{ minWidth: '50rem' }}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete}
                    >
                        <Column field="id" header="ID" className="font-medium text-gray-700" />
                        <Column field="apellidos" header="Apellidos" editor={textEditor} />
                        <Column field="nombres" header="Nombres" editor={textEditor} />
                        <Column field="sexo" header="Género" editor={treeSelectEditor} />
                        <Column field="correo" header="Correo Personal" editor={textEditor} />
                        <Column
                            header="Acciones"
                            body={(rowData) => (
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        icon="pi pi-pencil"
                                        className="rounded-md bg-green-600 p-2 text-white hover:bg-green-700"
                                        onClick={() => handleEdit(rowData)}
                                    />
                                </div>
                            )}
                        />
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
                    <div className="space-y-5 rounded-lg border border-gray-300 p-8 shadow-2xl">
                        <h2 className="text-center text-3xl font-semibold text-gray-800">Ingrese los datos de la persona</h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="apellidoPaterno"
                                        type="text"
                                        value={apellidoPaterno}
                                        onChange={(e) => setApellidoPaterno(e.target.value)}
                                        style={{ textTransform: 'none' }}
                                        className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <label htmlFor="apellidoPaterno" className="mb-2 block font-semibold text-gray-700">
                                        Primer Apellido
                                    </label>
                                </FloatLabel>
                            </div>
                            {/*<InputField
                                id="apellidoPaterno"
                                label="Primer Apellido"
                                type="text"
                                value={apellidoPaterno}
                                onChange={(e) => setApellidoPaterno(e.target.value)}
                            />*/}
                            <InputField
                                id="apellidoMaterno"
                                label="Segundo Apellido"
                                type="text"
                                value={apellidoMaterno}
                                onChange={(e) => setApellidoMaterno(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <InputField id="nombres" label="Nombres" type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                            <TreeSelectField
                                id="genero"
                                label="Género"
                                value={genero}
                                onChange={(e) => {
                                    if (typeof e.value === 'string') {
                                        setGenero(e.value);
                                    } else {
                                        setGenero(null);
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-6 sm:grid-cols-1">
                            <InputField
                                id="correoPersonal"
                                label="Correo Electrónico"
                                type="email"
                                value={correoPersonal}
                                onChange={(e) => setCorreoPersonal(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <InputField id="dni" label="DNI" type="text" value={dni} onChange={(e) => setDni(e.target.value)} />
                            <InputField id="celular" label="Celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
}
