import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { School } from 'lucide-react';
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

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Colegios', href: '/empresas' }];

interface Empresa {
    id: number;
    razon_social: string;
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
    departamento: string;
    provincia: string;
    distrito: string;
}

interface EmpresasProps {
    empresas: Empresa[];
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
    disabled?: boolean;
}

interface ErrorsInterface {
    razonSocial?: string;
    contacto?: string;
    email?: string;
    telefono?: string;
    sede?: string;
    codigo?: string;
    nivel?: string;
    gestion?: string;
    gestionDepartamento?: string;
    departamento?: string;
    provincia?: string;
    distrito?: string;

    [key: string]: string | undefined;
}

const gestionOptions = [
    { label: 'Pública', value: 'PUBLICA' },
    { label: 'Privada', value: 'PRIVADA' },
    { label: 'Convenio', value: 'CONVENIO' },
];

const nivelOptions = [
    { label: 'Inicial', value: 'INICIAL' },
    { label: 'Primaria', value: 'PRIMARIA' },
    { label: 'Secundaria', value: 'SECUNDARIA' },
    { label: 'Superior', value: 'SUPERIOR' },
];

const departamentoOptions = [
    { label: 'Lima', value: 'LIMA' },
    { label: 'Arequipa', value: 'AREQUIPA' },
    { label: 'Cusco', value: 'CUSCO' },
];

const provinciaOptions = [
    { label: 'Lima', value: 'LIMA' },
    { label: 'Arequipa', value: 'AREQUIPA' },
    { label: 'Cusco', value: 'CUSCO' },
];

const distritoOptions = [
    { label: 'Miraflores', value: 'MIRAFLORES' },
    { label: 'San Isidro', value: 'SAN_ISIDRO' },
    { label: 'Barranco', value: 'BARRANCO' },
];

export default function Empresas({ empresas }: EmpresasProps) {
    const [visible, setVisible] = useState(false);
    const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa[]>(empresas);
    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        razonSocial: '',
        contacto: '',
        email: '',
        telefono: '',
        sede: '',
        codigo: '',
        nivel: null as string | null,
        gestion: null as string | null,
        gestionDepartamento: null as string | null,
        departamento: null as string | null,
        provincia: null as string | null,
        distrito: null as string | null,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState<ErrorsInterface>({});
    const [pagination, setPagination] = useState({
        first: 0,
        rows: 10,
    });

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setPagination({
            first: event.first,
            rows: event.rows,
        });
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const updatedEmpresas = [...selectedEmpresas];
        const { newData, index } = e;
        updatedEmpresas[index] = newData as Empresa;
        setSelectedEmpresas(updatedEmpresas);
    };

    const handleView = (rowData: Empresa) => {
        setFormData({
            razonSocial: rowData.razon_social,
            contacto: rowData.contacto,
            email: rowData.email,
            telefono: rowData.telefono,
            sede: rowData.sede,
            codigo: rowData.codigo,
            nivel: rowData.nivel,
            gestion: rowData.gestion,
            gestionDepartamento: rowData.gestionDepartamento,
            departamento: rowData.departamento,
            provincia: rowData.provincia,
            distrito: rowData.distrito,
        });
        setId(rowData.id ? Number(rowData.id) : null);
        setIsEditing(false);
        setVisible(true);
    };

    const handleEdit = (rowData: Empresa) => {
        setFormData({
            razonSocial: rowData.razon_social,
            contacto: rowData.contacto,
            email: rowData.email,
            telefono: rowData.telefono,
            sede: rowData.sede,
            codigo: rowData.codigo,
            nivel: rowData.nivel,
            gestion: rowData.gestion,
            gestionDepartamento: rowData.gestionDepartamento,
            departamento: rowData.departamento,
            provincia: rowData.provincia,
            distrito: rowData.distrito,
        });
        setId(rowData.id ? Number(rowData.id) : null);
        setIsEditing(true);
        setVisible(true);
    };

    const handleDelete = async (rowData: Empresa) => {
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
                await axios.delete(`/empresas/${rowData.id}`);
                const updatedEmpresas = selectedEmpresas.filter((p) => p.id !== rowData.id);
                setSelectedEmpresas(updatedEmpresas);

                Swal.fire({
                    title: 'Eliminado',
                    text: 'El colegio ha sido eliminado correctamente.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error('Error al eliminar el colegio', error);
                Swal.fire('Error', 'Ocurrió un error al eliminar el colegio.', 'error');
            }
        }
    };

    const saveEmpresas = async () => {
        validateFields();
        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            if (id) {
                await axios.put(`/empresas/${id}`, formData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                Swal.fire({
                    title: 'Actualizado',
                    text: 'El colegio ha sido actualizado correctamente.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                await axios.post('/empresas', formData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                Swal.fire({
                    title: 'Creado',
                    text: 'El colegio ha sido creado correctamente.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
            window.location.reload();
        } catch (error) {
            console.error('Error al guardar el colegio', error);
            Swal.fire('Error', 'Ocurrió un error al guardar el colegio.', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            razonSocial: '',
            contacto: '',
            email: '',
            telefono: '',
            sede: '',
            codigo: '',
            nivel: null,
            gestion: null,
            gestionDepartamento: null,
            departamento: null,
            provincia: null,
            distrito: null,
        });
        setId(null);
        setErrors({});
    };

    const validateFields = () => {
        const newErrors: ErrorsInterface = {};
        if (!formData.razonSocial) newErrors.razonSocial = 'La razón social es requerida';
        if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
        if (!formData.contacto) newErrors.contacto = 'El contacto es requerido';
        if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
        if (!formData.sede) newErrors.sede = 'La sede es requerida';
        if (!formData.codigo) newErrors.codigo = 'El código es requerido';
        if (!formData.nivel) newErrors.nivel = 'El nivel es requerido';
        if (!formData.gestion) newErrors.gestion = 'La gestión es requerida';
        if (!formData.gestionDepartamento) newErrors.gestionDepartamento = 'La gestión de departamento es requerida';
        if (!formData.departamento) newErrors.departamento = 'El departamento es requerido';
        if (!formData.provincia) newErrors.provincia = 'La provincia es requerida';
        if (!formData.distrito) newErrors.distrito = 'El distrito es requerido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const textEditor = (options: ColumnEditorOptions) => (
        <InputText
            type="text"
            value={options.value}
            onChange={(e) => options.editorCallback?.(e.target.value)}
            className="w-full rounded border p-2"
        />
    );

    const TreeSelectField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors, disabled = false }) => {
        const options =
            {
                gestion: gestionOptions,
                nivel: nivelOptions,
                departamento: departamentoOptions,
                provincia: provinciaOptions,
                distrito: distritoOptions,
                gestionDepartamento: gestionOptions,
            }[id] || [];

        return (
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
                        options={options}
                        optionLabel="label"
                        placeholder={`Seleccione ${label.toLowerCase()}`}
                        disabled={disabled || !isEditing}
                        className={`w-full ${errors?.[id] ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <label htmlFor={id} className={`font-medium ${value ? 'text-blue-600' : 'text-gray-700'}`}>
                        {label}
                    </label>
                    {errors?.[id] && (
                        <div className="text-red-500 text-sm mt-1 flex items-center">
                            <i className="pi pi-exclamation-circle mr-1"></i>
                            {errors[id]}
                        </div>
                    )}
                </FloatLabel>
            </div>
        );
    };

    const dialogHeader = (
        <div className="flex items-center gap-2">
            <i className={`pi ${isEditing ? (id ? 'pi-pencil' : 'pi-plus') : 'pi-eye'}`} />
            <span className="text-lg font-bold">{isEditing ? (id ? 'Editar Colegio' : 'Nuevo Colegio') : 'Detalles del Colegio'}</span>
        </div>
    );

    const dialogFooter = (
        <div className="flex justify-end gap-3">
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            {isEditing && (
                <Button
                    label={id ? 'Actualizar' : 'Guardar'}
                    icon={`pi ${id ? 'pi-check' : 'pi-save'}`}
                    onClick={saveEmpresas}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                />
            )}
        </div>
    );

    const filteredEmpresas = selectedEmpresas
        .filter((empresa) => {
            const searchContent =
                `${empresa.razon_social} ${empresa.contacto} ${empresa.email} ${empresa.telefono} ${empresa.sede} ${empresa.codigo} ${empresa.nivel}`.toLowerCase();
            return searchContent.includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => a.id - b.id);

    const paginatedEmpresas = filteredEmpresas.slice(pagination.first, pagination.first + pagination.rows);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Colegios" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center gap-4 border-b pb-4">
                    <div className="rounded-full bg-blue-100 p-3">
                        <School className="text-blue-600" size={24} />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800">Mantenimiento de Colegios</h1>
                </div>

                <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <IconField iconPosition="left" className="w-full md:w-1/2">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            placeholder="Buscar colegio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10"
                        />
                    </IconField>

                    <div className="flex gap-2">
                        <Button
                            label="Nuevo Colegio"
                            icon="pi pi-plus"
                            onClick={() => {
                                resetForm();
                                setIsEditing(true);
                                setVisible(true);
                            }}
                            className="bg-blue-600 text-white hover:bg-blue-700"
                        />
                    </div>
                </div>

                <div className="card shadow-sm">
                    <DataTable
                        value={paginatedEmpresas}
                        tableStyle={{ minWidth: '50rem' }}
                        editMode="row"
                        dataKey="id"
                        onRowEditComplete={onRowEditComplete}
                        paginator={false}
                        stripedRows
                        size="small"
                    >
                        <Column field="id" header="ID" body={(_, { rowIndex }) => pagination.first + rowIndex + 1} style={{ width: '5%' }} />
                        <Column field="razon_social" header="Razón Social" editor={textEditor} style={{ width: '20%' }} />
                        <Column field="contacto" header="Contacto" editor={textEditor} style={{ width: '15%' }} />
                        <Column field="email" header="Correo" editor={textEditor} style={{ width: '15%' }} />
                        <Column field="telefono" header="Teléfono" editor={textEditor} style={{ width: '10%' }} />
                        <Column field="sede" header="Sede" editor={textEditor} style={{ width: '10%' }} />
                        <Column field="nivel" header="Nivel" editor={textEditor} style={{ width: '10%' }} />
                        <Column
                            header="Acciones"
                            body={(rowData) => (
                                <div className="flex justify-center gap-2">
                                    <Button
                                        icon="pi pi-eye"
                                        className="p-button-rounded p-button-success p-button-text"
                                        onClick={() => handleView(rowData)}
                                        tooltip="Ver detalles"
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
                            style={{ width: '15%' }}
                        />
                    </DataTable>

                    <Paginator
                        first={pagination.first}
                        rows={pagination.rows}
                        totalRecords={filteredEmpresas.length}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        onPageChange={onPageChange}
                        className="mt-4 border-t pt-4"
                        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    />
                </div>

                <Dialog
                    visible={visible}
                    modal
                    header={dialogHeader}
                    footer={dialogFooter}
                    style={{ width: '50vw', maxWidth: '800px' }}
                    onHide={() => setVisible(false)}
                    className="rounded-lg"
                    breakpoints={{ '960px': '75vw', '640px': '90vw' }}
                >
                    <div className="space-y-4 p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Razón Social */}
                            <div className="col-span-2">
                                <FloatLabel>
                                    <InputText
                                        id="razonSocial"
                                        type="text"
                                        value={formData.razonSocial}
                                        onChange={(e) => {
                                            setFormData({ ...formData, razonSocial: e.target.value });
                                            if (errors.razonSocial) setErrors({ ...errors, razonSocial: undefined });
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full ${errors.razonSocial ? 'border-red-500' : ''}`}
                                    />
                                    <label htmlFor="razonSocial" className={`font-medium ${formData.razonSocial ? 'text-blue-600' : ''}`}>
                                        Razón Social
                                    </label>
                                    {errors.razonSocial && <small className="text-red-500">{errors.razonSocial}</small>}
                                </FloatLabel>
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="contacto"
                                        type="text"
                                        value={formData.contacto}
                                        onChange={(e) => {
                                            setFormData({ ...formData, contacto: e.target.value });
                                            if (errors.contacto) setErrors({ ...errors, contacto: undefined });
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full ${errors.contacto ? 'border-red-500' : ''}`}
                                    />
                                    <label htmlFor="contacto" className="font-medium">
                                        Contacto
                                    </label>
                                    {errors.contacto && <small className="text-red-500">{errors.contacto}</small>}
                                </FloatLabel>
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (errors.email) setErrors({ ...errors, email: undefined });
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    <label htmlFor="email" className="font-medium">
                                        Correo Electrónico
                                    </label>
                                    {errors.email && <small className="text-red-500">{errors.email}</small>}
                                </FloatLabel>
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="telefono"
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={(e) => {
                                            setFormData({ ...formData, telefono: e.target.value });
                                            if (errors.telefono) setErrors({ ...errors, telefono: undefined });
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full ${errors.telefono ? 'border-red-500' : ''}`}
                                    />
                                    <label htmlFor="telefono" className="font-medium">
                                        Teléfono
                                    </label>
                                    {errors.telefono && <small className="text-red-500">{errors.telefono}</small>}
                                </FloatLabel>
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="sede"
                                        type="text"
                                        value={formData.sede}
                                        onChange={(e) => {
                                            setFormData({ ...formData, sede: e.target.value });
                                            if (errors.sede) setErrors({ ...errors, sede: undefined });
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full ${errors.sede ? 'border-red-500' : ''}`}
                                    />
                                    <label htmlFor="sede" className="font-medium">
                                        Sede
                                    </label>
                                    {errors.sede && <small className="text-red-500">{errors.sede}</small>}
                                </FloatLabel>
                            </div>

                            <div>
                                <FloatLabel>
                                    <InputText
                                        id="codigo"
                                        type="text"
                                        value={formData.codigo}
                                        onChange={(e) => {
                                            setFormData({ ...formData, codigo: e.target.value });
                                            if (errors.codigo) setErrors({ ...errors, codigo: undefined });
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full ${errors.codigo ? 'border-red-500' : ''}`}
                                    />
                                    <label htmlFor="codigo" className="font-medium">
                                        Código
                                    </label>
                                    {errors.codigo && <small className="text-red-500">{errors.codigo}</small>}
                                </FloatLabel>
                            </div>

                            <div>
                                <TreeSelectField
                                    id="nivel"
                                    label="Nivel Educativo"
                                    value={formData.nivel}
                                    onChange={(e) => {
                                        setFormData({ ...formData, nivel: e.value });
                                        if (errors.nivel) setErrors({ ...errors, nivel: undefined });
                                    }}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>

                            <div>
                                <TreeSelectField
                                    id="gestion"
                                    label="Tipo de Gestión"
                                    value={formData.gestion}
                                    onChange={(e) => {
                                        setFormData({ ...formData, gestion: e.value });
                                        if (errors.gestion) setErrors({ ...errors, gestion: undefined });
                                    }}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>

                            <div>
                                <TreeSelectField
                                    id="gestionDepartamento"
                                    label="Gestión Departamento"
                                    value={formData.gestionDepartamento}
                                    onChange={(e) => {
                                        setFormData({ ...formData, gestionDepartamento: e.value });
                                        if (errors.gestionDepartamento)
                                            setErrors({
                                                ...errors,
                                                gestionDepartamento: undefined,
                                            });
                                    }}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>

                            <div>
                                <TreeSelectField
                                    id="departamento"
                                    label="Departamento"
                                    value={formData.departamento}
                                    onChange={(e) => {
                                        setFormData({ ...formData, departamento: e.value });
                                        if (errors.departamento) setErrors({ ...errors, departamento: undefined });
                                    }}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>

                            <div>
                                <TreeSelectField
                                    id="provincia"
                                    label="Provincia"
                                    value={formData.provincia}
                                    onChange={(e) => {
                                        setFormData({ ...formData, provincia: e.value });
                                        if (errors.provincia) setErrors({ ...errors, provincia: undefined });
                                    }}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>

                            <div>
                                <TreeSelectField
                                    id="distrito"
                                    label="Distrito"
                                    value={formData.distrito}
                                    onChange={(e) => {
                                        setFormData({ ...formData, distrito: e.value });
                                        if (errors.distrito) setErrors({ ...errors, distrito: undefined });
                                    }}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </AppLayout>
    );
}
