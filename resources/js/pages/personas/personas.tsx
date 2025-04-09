import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Users } from 'lucide-react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { TreeSelect } from 'primereact/treeselect';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { ColumnEditorOptions } from 'primereact/column';
import { DataTableRowEditCompleteEvent } from 'primereact/datatable';

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

interface TreeSelectFieldProps {
    id: string;
    label: string;
    value: string | null;
    onChange: (e: { value: string | null }) => void;
    errors?: Record<string, string | undefined>;
    setErrors?: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>;
}

interface ErrorsInterface {
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    nombres?: string;
    genero?: string;
    correoPersonal?: string;
    dni?: string;
    celular?: string;
}

export default function Personas({ personas }: PersonasProps) {
    const [visible, setVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
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
    const [errors, setErrors] = useState<ErrorsInterface>({});
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const generoOptions = [
        { label: 'Masculino', value: 'MASCULINO' },
        { label: 'Femenino', value: 'FEMENINO' },
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
        setIsEditing(true);
        setVisible(true);
    };

    const handleView = (rowData: Persona) => {
        setApellidoPaterno(rowData.apellido_paterno.split(' ')[0]);
        setApellidoMaterno(rowData.apellido_materno.split(' ')[0]);
        setNombres(rowData.nombres);
        setGenero(rowData.sexo);
        setCorreoPersonal(rowData.correo);
        setDni(rowData.dni);
        setCelular(rowData.celular);
        setId(rowData.id ? Number(rowData.id) : null);
        setIsEditing(false);
        setVisible(true);
    };

    const handleDelete = async (rowData: Persona) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`/personas/${rowData.id}`);
                const updatedPersonas = selectedPersonas.filter((p) => p.id !== rowData.id);
                setSelectedPersonas(updatedPersonas);

                Swal.fire({
                    title: 'Eliminado',
                    text: 'La persona ha sido eliminada.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error('Error al eliminar la persona', error);
                Swal.fire('Error', 'Ocurrió un error al eliminar la persona.', 'error');
            }
        }
    };

    const savePerson = async () => {
        validateFields();
        if (Object.keys(errors).length > 0) {
            return;
        }

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

    const filteredPersonas = selectedPersonas
        .filter((persona) => {
            const fullName =
                `${persona.apellido_paterno} ${persona.apellido_materno} ${persona.nombres} ${persona.sexo} ${persona.correo}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => a.id - b.id);

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

    const TreeSelectField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors }) => (
        <div className="mt-4">
            <FloatLabel>
                <Dropdown
                    inputId={id}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        if (errors && errors[id]) {
                            setErrors({ ...errors, [id]: undefined });
                        }
                    }}
                    options={generoOptions}
                    placeholder="Selecciona género"
                    disabled={!isEditing}
                    className="w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    style={{
                        borderColor: errors && errors[id] ? '#ef4444' : '#d1d5db',
                    }}
                />
                <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
                    {label}
                </label>
                {errors && errors[id] && (
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                        <div className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                            <span className="mr-2 text-orange-500">
                                <i className="pi pi-exclamation-triangle"></i>
                            </span>
                            <span className="text-gray-700">{errors[id]}</span>
                        </div>
                    </div>
                )}
            </FloatLabel>
        </div>
    );

    const headerElement = (
        <div className="align-items-center justify-content-center inline-flex gap-2">
            <span className="white-space-nowrap font-bold">Registrar Persona</span>
        </div>
    );

    const footerContent = (
        <div className="flex justify-end gap-3">{isEditing ? <Button label={id ? 'Editar' : 'Crear'} onClick={savePerson} /> : ''}</div>
    );

    const validateFields = () => {
        const newErrors: ErrorsInterface = {};
        if (!apellidoPaterno) newErrors.apellidoPaterno = 'Completa este campo';
        if (!apellidoMaterno) newErrors.apellidoMaterno = 'Completa este campo';
        if (!nombres) newErrors.nombres = 'Completa este campo';
        if (!genero) newErrors.genero = 'Selecciona un género';
        if (!correoPersonal) newErrors.correoPersonal = 'Completa este campo';
        if (!dni) newErrors.dni = 'Completa este campo';
        if (!celular) newErrors.celular = 'Completa este campo';
        setErrors(newErrors);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personas" />

            <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg">
                <div className="flex items-center gap-4 border-b pb-4">
                    <i className="fas fa-user-friends text-2xl text-indigo-600" />
                    <Users />
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Mantenimiento de Personas</h1>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            placeholder="Buscar persona..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </IconField>

                    <Button
                        label="Crear Persona"
                        className="bg-indigo-600 text-white shadow-md transition duration-300 hover:bg-indigo-700"
                        onClick={() => {
                            resetForm();
                            setIsEditing(true);
                            setVisible(true);
                        }}
                    />
                </div>

                <div className="rounded-xl bg-gray-50 p-6 shadow-md">
                    <DataTable
                        value={filteredPersonas.slice(first, first + rows)}
                        tableStyle={{ minWidth: '50rem' }}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete}
                    >
                        <Column field="id" header="ID" body={(_, { rowIndex }) => first + rowIndex + 1} className="font-medium text-gray-700" />
                        <Column field="apellidos" header="Apellidos" editor={textEditor} />
                        <Column field="nombres" header="Nombres" editor={textEditor} />
                        <Column field="sexo" header="Género" editor={treeSelectEditor} />
                        <Column field="correo" header="Correo Personal" editor={textEditor} />
                        <Column
                            header="Acciones"
                            body={(rowData) => (
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        icon="pi pi-eye"
                                        className="rounded-md bg-green-500 p-2 text-white transition duration-300 hover:bg-green-600"
                                        onClick={() => handleView(rowData)}
                                    />
                                    <Button
                                        icon="pi pi-pencil"
                                        className="rounded-md bg-yellow-500 p-2 text-white transition duration-300 hover:bg-yellow-600"
                                        onClick={() => handleEdit(rowData)}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="rounded-md bg-red-500 p-2 text-white transition duration-300 hover:bg-red-600"
                                        onClick={() => handleDelete(rowData)}
                                    />
                                </div>
                            )}
                        />
                    </DataTable>
                    <Paginator
                        first={first}
                        rows={rows}
                        totalRecords={filteredPersonas.length}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageChange={onPageChange}
                    />
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
                            <div className="relative mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="apellidoPaterno"
                                        type="text"
                                        value={apellidoPaterno}
                                        onChange={(e) => {
                                            setApellidoPaterno(e.target.value);
                                            if (errors.apellidoPaterno) {
                                                setErrors({ ...errors, apellidoPaterno: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                            borderColor: errors.apellidoPaterno ? '#ef4444' : '#d1d5db',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                    />
                                    <label htmlFor="apellidoPaterno" className="mb-2 block font-semibold text-gray-700">
                                        Primer Apellido
                                    </label>
                                    {errors.apellidoPaterno && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.apellidoPaterno}</span>
                                            </div>
                                        </div>
                                    )}{' '}
                                </FloatLabel>
                            </div>
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="apellidoMaterno"
                                        type="text"
                                        value={apellidoMaterno}
                                        onChange={(e) => {
                                            setApellidoMaterno(e.target.value);
                                            if (errors.apellidoMaterno) {
                                                setErrors({ ...errors, apellidoMaterno: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                            borderColor: errors.apellidoMaterno ? '#ef4444' : '#d1d5db',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                    />
                                    <label htmlFor="apellidoMaterno" className="mb-2 block font-semibold text-gray-700">
                                        Segundo Apellido
                                    </label>
                                    {errors.apellidoMaterno && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.apellidoMaterno}</span>
                                            </div>
                                        </div>
                                    )}{' '}
                                </FloatLabel>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="nombres"
                                        type="text"
                                        value={nombres}
                                        onChange={(e) => {
                                            setNombres(e.target.value);
                                            if (errors.nombres) {
                                                setErrors({ ...errors, nombres: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                            borderColor: errors.nombres ? '#ef4444' : '#d1d5db',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                    />
                                    <label htmlFor="nombres" className="mb-2 block font-semibold text-gray-700">
                                        Nombres
                                    </label>
                                    {errors.nombres && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.nombres}</span>
                                            </div>
                                        </div>
                                    )}{' '}
                                </FloatLabel>
                            </div>
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
                                errors={errors}
                                setErrors={setErrors}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="correoPersonal"
                                        type="text"
                                        value={correoPersonal}
                                        onChange={(e) => {
                                            setCorreoPersonal(e.target.value);
                                            if (errors.correoPersonal) {
                                                setErrors({ ...errors, correoPersonal: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                            borderColor: errors.correoPersonal ? '#ef4444' : '#d1d5db',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                    />
                                    <label htmlFor="correoPersonal" className="mb-2 block font-semibold text-gray-700">
                                        Correo Personal
                                    </label>
                                    {errors.correoPersonal && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.correoPersonal}</span>
                                            </div>
                                        </div>
                                    )}{' '}
                                </FloatLabel>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="dni"
                                        type="text"
                                        value={dni}
                                        onChange={(e) => {
                                            setDni(e.target.value);
                                            if (errors.dni) {
                                                setErrors({ ...errors, dni: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                            borderColor: errors.dni ? '#ef4444' : '#d1d5db',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                    />
                                    <label htmlFor="dni" className="mb-2 block font-semibold text-gray-700">
                                        DNI
                                    </label>
                                    {errors.dni && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.dni}</span>
                                            </div>
                                        </div>
                                    )}{' '}
                                </FloatLabel>
                            </div>
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="celular"
                                        type="text"
                                        value={celular}
                                        onChange={(e) => {
                                            setCelular(e.target.value);
                                            if (errors.celular) {
                                                setErrors({ ...errors, celular: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                            borderColor: errors.celular ? '#ef4444' : '#d1d5db',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                    />
                                    <label htmlFor="celular" className="mb-2 block font-semibold text-gray-700">
                                        Celular
                                    </label>
                                    {errors.celular && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.celular}</span>
                                            </div>
                                        </div>
                                    )}{' '}
                                </FloatLabel>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
}
