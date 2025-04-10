import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Users } from 'lucide-react';
import { Button } from 'primereact/button';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

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

    [key: string]: string | undefined;
}

const generoOptions = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Femenino', value: 'FEMENINO' },
];

export default function Personas({ personas }: PersonasProps) {
    const [visible, setVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPersonas, setSelectedPersonas] = useState<Persona[]>(personas);
    const [id, setId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        genero: null as string | null,
        correoPersonal: '',
        dni: '',
        celular: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState<ErrorsInterface>({});
    const [pagination, setPagination] = useState({
        first: 0,
        rows: 5,
    });

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setPagination({
            first: event.first,
            rows: event.rows,
        });
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const updatedPersonas = [...selectedPersonas];
        const { newData, index } = e;
        updatedPersonas[index] = newData as Persona;
        setSelectedPersonas(updatedPersonas);
    };

    const handleView = (rowData: Persona) => {
        setFormData({
            apellidoPaterno: rowData.apellido_paterno.split(' ')[0],
            apellidoMaterno: rowData.apellido_materno.split(' ')[0],
            nombres: rowData.nombres,
            genero: rowData.sexo,
            correoPersonal: rowData.correo,
            dni: rowData.dni,
            celular: rowData.celular,
        });
        setId(rowData.id ? Number(rowData.id) : null);
        setIsEditing(false);
        setVisible(true);
    };

    const handleEdit = (rowData: Persona) => {
        setFormData({
            apellidoPaterno: rowData.apellido_paterno.split(' ')[0],
            apellidoMaterno: rowData.apellido_materno.split(' ')[0],
            nombres: rowData.nombres,
            genero: rowData.sexo,
            correoPersonal: rowData.correo,
            dni: rowData.dni,
            celular: rowData.celular,
        });
        setId(rowData.id ? Number(rowData.id) : null);
        setIsEditing(true);
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

        try {
            if (id) {
                await axios.put(`/personas/${id}`, formData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                await axios.post('/personas', formData, {
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar la persona', error);
        }
    };

    const resetForm = () => {
        setFormData({
            apellidoPaterno: '',
            apellidoMaterno: '',
            nombres: '',
            genero: null,
            correoPersonal: '',
            dni: '',
            celular: '',
        });
        setId(null);
    };

    const validateFields = () => {
        const newErrors: ErrorsInterface = {};
        if (!formData.apellidoPaterno) newErrors.apellidoPaterno = 'Completa este campo';
        if (!formData.apellidoMaterno) newErrors.apellidoMaterno = 'Completa este campo';
        if (!formData.nombres) newErrors.nombres = 'Completa este campo';
        if (!formData.genero) newErrors.genero = 'Selecciona un género';
        if (!formData.correoPersonal) newErrors.correoPersonal = 'Completa este campo';
        if (!formData.dni) newErrors.dni = 'Completa este campo';
        if (!formData.celular) newErrors.celular = 'Completa este campo';
        setErrors(newErrors);
    };

    const textEditor = (options: ColumnEditorOptions) => (
        <InputText type="text" value={options.value} onChange={(e) => options.editorCallback?.(e.target.value)} className="w-full" />
    );

    const TreeSelectField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors }) => (
        <div className="mt-4">
            <FloatLabel>
                <Dropdown
                    inputId={id}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        if (errors?.[id] && setErrors) {
                            setErrors({ ...errors, [id]: undefined });
                        }
                    }}
                    options={generoOptions}
                    placeholder="Selecciona género"
                    disabled={!isEditing}
                    // className={`w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    //     errors?.[id] ? 'border-red-500' : 'border-gray-300'
                    // }`}

                    style={{
                        textTransform: 'none',
                    }}
                    className={`w-full rounded-md border  shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                        errors?.[id] ? 'border-2 border-red-500 shadow-md ring-2 ring-red-300' : 'border-gray-300'
                    }`}
                />
                <label htmlFor={id} className="mb-2 block font-semibold text-gray-700">
                    {label}
                </label>
                {errors?.[id] && (
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

    const dialogHeader = (
        <div className="inline-flex items-center justify-center gap-2">
            <span className="font-bold whitespace-nowrap">Registrar Persona</span>
        </div>
    );

    const dialogFooter = (
        <div className="flex justify-end gap-3">
            {isEditing && <Button label={id ? 'Editar' : 'Crear'} onClick={savePerson} className="bg-indigo-600 text-white hover:bg-indigo-700" />}
        </div>
    );

    const filteredPersonas = selectedPersonas
        .filter((persona) => {
            const fullName =
                `${persona.apellido_paterno} ${persona.apellido_materno} ${persona.nombres} ${persona.sexo} ${persona.correo}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => a.id - b.id);

    const paginatedPersonas = filteredPersonas.slice(pagination.first, pagination.first + pagination.rows);

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
                    <IconField iconPosition="left" className="w-1/2">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            placeholder="Buscar persona..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </IconField>

                    <Button
                        label="Crear Persona"
                        icon="pi pi-plus"
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
                        value={paginatedPersonas}
                        tableStyle={{ minWidth: '50rem' }}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete}
                        paginator={false}
                    >
                        <Column
                            field="id"
                            header="ID"
                            body={(_, { rowIndex }) => pagination.first + rowIndex + 1}
                            className="font-medium text-gray-700"
                        />
                        <Column field="apellidos" header="Apellidos" editor={textEditor} />
                        <Column field="nombres" header="Nombres" editor={textEditor} />
                        <Column field="sexo" header="Género" editor={textEditor} />
                        <Column field="correo" header="Correo Personal" editor={textEditor} />
                        <Column
                            header="Acciones"
                            body={(rowData) => (
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        icon="pi pi-eye"
                                        className="p-button-rounded p-button-success p-button-text"
                                        onClick={() => handleView(rowData)}
                                        tooltip="Ver"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                    <Button
                                        icon="pi pi-pencil"
                                        className="p-button-rounded p-button-warning p-button-text"
                                        onClick={() => handleEdit(rowData)}
                                        tooltip="Editar"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-rounded p-button-danger p-button-text"
                                        onClick={() => handleDelete(rowData)}
                                        tooltip="Eliminar"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                </div>
                            )}
                        />
                    </DataTable>

                    <Paginator
                        first={pagination.first}
                        rows={pagination.rows}
                        totalRecords={filteredPersonas.length}
                        rowsPerPageOptions={[5, 10, 20]}
                        onPageChange={onPageChange}
                        className="mt-4"
                    />
                </div>

                <Dialog
                    visible={visible}
                    modal
                    header={dialogHeader}
                    footer={dialogFooter}
                    style={{ width: '50rem' }}
                    onHide={() => setVisible(false)}
                    className="rounded-lg"
                >
                    <div className="space-y-3 rounded-lg border border-gray-300 p-8 shadow-lg dark:border-zinc-700">
                        <h2 className="text-center text-3xl font-semibold text-gray-800">
                            {isEditing ? (id ? 'Editar Persona' : 'Crear Nueva Persona') : 'Detalles de la Persona'}
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="relative mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="apellidoPaterno"
                                        type="text"
                                        value={formData.apellidoPaterno}
                                        onChange={(e) => {
                                            setFormData({ ...formData, apellidoPaterno: e.target.value });
                                            if (errors.apellidoPaterno) {
                                                setErrors({ ...errors, apellidoPaterno: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.apellidoPaterno ? 'border-2 border-red-500 shadow-md ring-2 ring-red-300' : 'border-gray-300'
                                        }`}
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
                                    )}
                                </FloatLabel>
                            </div>

                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="apellidoMaterno"
                                        type="text"
                                        value={formData.apellidoMaterno}
                                        onChange={(e) => {
                                            setFormData({ ...formData, apellidoMaterno: e.target.value });
                                            if (errors.apellidoMaterno) {
                                                setErrors({ ...errors, apellidoMaterno: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.apellidoMaterno ? 'border-2 border-red-500 shadow-md ring-2 ring-red-300' : 'border-gray-300'
                                        }`}
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
                                    )}
                                </FloatLabel>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="nombres"
                                        type="text"
                                        value={formData.nombres}
                                        onChange={(e) => {
                                            setFormData({ ...formData, nombres: e.target.value });
                                            if (errors.nombres) {
                                                setErrors({ ...errors, nombres: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.nombres ? 'border-2 border-red-500 shadow-md ring-2 ring-red-300' : 'border-gray-300'
                                        }`}
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
                                    )}
                                </FloatLabel>
                            </div>

                            <TreeSelectField
                                id="genero"
                                label="Género"
                                value={formData.genero}
                                onChange={(e) => {
                                    setFormData({ ...formData, genero: e.value });
                                    if (errors.genero) {
                                        setErrors({ ...errors, genero: undefined });
                                    }
                                }}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        </div>

                        <div className="mt-8">
                            <FloatLabel>
                                <InputText
                                    id="correoPersonal"
                                    type="email"
                                    value={formData.correoPersonal}
                                    onChange={(e) => {
                                        setFormData({ ...formData, correoPersonal: e.target.value });
                                        if (errors.correoPersonal) {
                                            setErrors({ ...errors, correoPersonal: undefined });
                                        }
                                    }}
                                    disabled={!isEditing}
                                    style={{
                                        textTransform: 'none',
                                    }}
                                    className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                        errors.correoPersonal ? 'border-2 border-red-500 shadow-md ring-2 ring-red-300' : 'border-gray-300'
                                    }`}
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
                                )}
                            </FloatLabel>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="dni"
                                        type="text"
                                        value={formData.dni}
                                        onChange={(e) => {
                                            setFormData({ ...formData, dni: e.target.value });
                                            if (errors.dni) {
                                                setErrors({ ...errors, dni: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.dni ? 'border-2 border-red-500 shadow-md ring-2 ring-red-300' : 'border-gray-300'
                                        }`}
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
                                    )}
                                </FloatLabel>
                            </div>

                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="celular"
                                        type="text"
                                        value={formData.celular}
                                        onChange={(e) => {
                                            setFormData({ ...formData, celular: e.target.value });
                                            if (errors.celular) {
                                                setErrors({ ...errors, celular: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        style={{
                                            textTransform: 'none',
                                        }}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.celular ? 'border-2 border-red-500 shadow-md ring-2 ring-red-300' : 'border-gray-300'
                                        }`}
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
                                    )}
                                </FloatLabel>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
}
