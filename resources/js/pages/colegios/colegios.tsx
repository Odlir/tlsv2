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
import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import { ProgressSpinner } from 'primereact/progressspinner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Colegios',
        href: '/empresas',
    },
];
interface Departamento {
    id: number;
    nombre: string;
}

interface Provincia {
    id: number;
    nombre: string;
}

interface Distrito {
    id: number;
    nombre: string;
}
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
    gestion_departamento: string;
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
}

interface ErrorsInterface {
    razon_Social?: string;
    contacto?: string;
    email?: string;
    telefono?: string;
    sede?: string;
    codigo?: string;
    nivel?: string;
    gestion?: string;
    gestion_departamento?: string;
    departamento?: string;
    provincia?: string;
    distrito?: string;

    [key: string]: string | undefined;
}


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
        nivel: '',
        gestion: null as string | null,
        gestion_departamento: null as string | null,
        departamento: null as string | null,
        provincia: null as string | null,
        distrito: null as string | null,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState<ErrorsInterface>({});
    const [pagination, setPagination] = useState({
        first: 0,
        rows: 5,
    });
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [distritos, setDistritos] = useState<Distrito[]>([]);
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
        setDataLoading(true);

        const ubigeo = rowData.ubigeo || '';
        const departamento = ubigeo.slice(0, 2) + '0000';
        const provincia = ubigeo.slice(0, 4) + '00';
        const distrito = ubigeo;

        // Hacer visible el modal con el indicador de carga
        setVisible(true);

        // Cargar primero las provincias
        axios.get(`/provincias/${departamento}`)
            .then(provinciaResponse => {
                setProvincias(provinciaResponse.data);

                // Luego cargar los distritos
                return axios.get(`/distritos/${provincia}`);
            })
            .then(distritoResponse => {
                setDistritos(distritoResponse.data);

                // Establecer todos los datos del formulario
                setFormData({
                    razonSocial: rowData.razon_social,
                    contacto: rowData.contacto,
                    email: rowData.email,
                    telefono: rowData.telefono,
                    sede: rowData.sede,
                    codigo: rowData.codigo,
                    nivel: rowData.nivel,
                    gestion: rowData.gestion,
                    gestion_departamento: rowData.gestion_departamento,
                    departamento: departamento,
                    provincia: provincia,
                    distrito: distrito,
                });

                setId(rowData.id ? Number(rowData.id) : null);
                setIsEditing(false);

                // Ocultar el indicador de carga
                setDataLoading(false);
            })
            .catch(error => {
                console.error("Error cargando datos para visualización:", error);
                setDataLoading(false);
            });
    };

    const handleEdit = (rowData: Empresa) => {
        const ubigeo = rowData.ubigeo || '';
        const departamento = ubigeo.slice(0, 2) + '0000'; // Departamento con los primeros 2 dígitos + 0000
        const provincia = ubigeo.slice(0, 4) + '00'; // Provincia con los primeros 4 dígitos + 00
        const distrito = ubigeo; // El código completo es el distrito

        console.log(departamento);
        console.log(provincia);
        console.log(distrito);

        setFormData({
            razonSocial: rowData.razon_social,
            contacto: rowData.contacto,
            email: rowData.email,
            telefono: rowData.telefono,
            sede: rowData.sede,
            codigo: rowData.codigo,
            nivel: rowData.nivel,
            gestion: rowData.gestion,
            gestion_departamento: rowData.gestion_departamento,
            departamento: departamento, // Set Departamento
            provincia: provincia, // Set Provincia
            distrito: distrito, // Set Distrito
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
            } else {
                await axios.post('/empresas', formData, {
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
            razonSocial: '',
            contacto: '',
            email: '',
            telefono: '',
            sede: '',
            codigo: '',
            nivel: '',
            gestion: null,
            gestion_departamento: null,
            departamento: null,
            provincia: null,
            distrito: null,
        });
        setId(null);
    };

    const validateFields = () => {
        const newErrors: ErrorsInterface = {};
        if (!formData.razonSocial) newErrors.razonSocial = 'Completa este campo';
        if (!formData.email) newErrors.email = 'Completa este campo';
        if (!formData.contacto) newErrors.contacto = 'Completa este campo';
        if (!formData.telefono) newErrors.telefono = 'Selecciona un género';
        if (!formData.sede) newErrors.sede = 'Completa este campo';
        if (!formData.codigo) newErrors.codigo = 'Completa este campo';
        if (!formData.nivel) newErrors.nivel = 'Completa este campo';
        if (!formData.gestion) newErrors.gestion = 'Completa este campo';
        if (!formData.gestion_departamento) newErrors.gestion_departamento = 'Completa este campo';
        if (!formData.departamento) newErrors.departamento = 'Completa este campo';
        if (!formData.provincia) newErrors.provincia = 'Completa este campo';
        if (!formData.distrito) newErrors.distrito = 'Completa este campo';
        setErrors(newErrors);
    };
    const [dataLoading, setDataLoading] = useState(false);

    const textEditor = (options: ColumnEditorOptions) => (
        <InputText type="text" value={options.value} onChange={(e) => options.editorCallback?.(e.target.value)} className="w-full" />);

    const TreeSelectField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors }) => {
        const gestionOptions = [
            { label: 'Privada', value: 'privada' },
            { label: 'Pública de Gestión Directa', value: 'publica_gestion_directa' },
            { label: 'Pública de Gestión Privada', value: 'publica_gestion_privada' }
        ];

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
                        options={gestionOptions}
                        placeholder="Selecciona tipo de gestión"
                        disabled={!isEditing}
                        className={`w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors?.[id] ? 'border-red-500' : 'border-gray-300'
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
    };

    const GestionDepartamentoField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors }) => {
        const gestionDepartamentoOptions = [
            { label: 'Asociación civil / Inst. Benéfica', value: 'Asociacion civil / Inst.Benefica' },
            { label: 'Comunidad', value: 'Comunidad' },
            { label: 'Comunidad o asociación religiosa', value: 'Comunidad o asociacion religiosa' },
            { label: 'Convenio con Sector Educacion', value: 'Convenio con Sector Educacion' },
            { label: 'Cooperativo', value: 'Cooperativo' },
            { label: 'Empresa (Fiscalizado)', value: 'Empresa (Fiscalizado)' },
            { label: 'Municipalidad', value: 'Municipalidad' },
            { label: 'Otro sector público (FF.AA.)', value: 'Otro sector publico (FF.AA.)' },
            { label: 'Particular', value: 'Particular' },
            { label: 'Sector Educación', value: 'Sector Educacion' }
        ];


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
                        options={gestionDepartamentoOptions}
                        placeholder="Selecciona tipo de gestión departamento"
                        disabled={!isEditing}
                        className={`w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors?.[id] ? 'border-red-500' : 'border-gray-300'
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
    };


    const DepartamentoField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors }) => {
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
                        disabled={!isEditing}
                        options={departamentos.map(dep => ({ label: dep.nombre, value: dep.id }))}
                        placeholder="Selecciona un departamento"
                        className={`w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors?.[id] ? 'border-red-500' : 'border-gray-300'
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
    };

    const ProvinciaField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors }) => {
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
                        disabled={!isEditing}
                        options={provincias.map(prov => ({ label: prov.nombre, value: prov.id }))}
                        placeholder="Selecciona una provincia"
                        className={`w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors?.[id] ? 'border-red-500' : 'border-gray-300'
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
    };

    const DistritoField: React.FC<TreeSelectFieldProps> = ({ id, label, value, onChange, errors, setErrors }) => {
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
                        disabled={!isEditing}
                        options={distritos.map(dist => ({ label: dist.nombre, value: dist.id }))}
                        placeholder="Selecciona un distrito"
                        className={`w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors?.[id] ? 'border-red-500' : 'border-gray-300'
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
    };
    useEffect(() => {
        axios.get('/departamentos')
            .then(response => {
                setDepartamentos(response.data);
            })
            .catch(error => {
                console.error("Error fetching departamentos:", error);
            });
    }, []);

    useEffect(() => {
        if (formData.departamento) {
            axios.get(`/provincias/${formData.departamento}`)
                .then(response => {
                    setProvincias(response.data);
                    // No resetear el valor de provincia cuando estamos en modo edición
                    // y ya tenemos un valor establecido
                    if (!isEditing || !formData.provincia) {
                        setFormData(prev => ({ ...prev, provincia: '' }));
                        setDistritos([]);
                    }
                })
                .catch(error => {
                    console.error("Error fetching provincias:", error);
                });
        }
    }, [formData.departamento, isEditing]);

    // Cargar distritos cuando la provincia cambia
    useEffect(() => {
        if (formData.provincia) {
            axios.get(`/distritos/${formData.provincia}`)
                .then(response => {
                    setDistritos(response.data);
                    // No resetear el valor de distrito cuando estamos en modo edición
                    // y ya tenemos un valor establecido
                    if (!isEditing || !formData.distrito) {
                        setFormData(prev => ({ ...prev, distrito: '' }));
                    }
                })
                .catch(error => {
                    console.error("Error fetching distritos:", error);
                });
        }
    }, [formData.provincia, isEditing]);

    const dialogHeader = (
        <div className="inline-flex items-center justify-center gap-2">
            <span className="font-bold whitespace-nowrap">Registrar Colegio</span>
        </div>
    );

    const dialogFooter = (
        <div className="flex justify-end gap-3">
            {isEditing && <Button label={id ? 'Editar' : 'Crear'} onClick={saveEmpresas} className="bg-indigo-600 text-white hover:bg-indigo-700" />}
        </div>
    );

    const filteredEmpresas = selectedEmpresas
        .filter((empresa) => {
            const fullName =
                `${empresa.email} ${empresa.contacto} ${empresa.sede} ${empresa.nivel} ${empresa.telefono}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        })
        .sort((a, b) => a.id - b.id);

    const paginatedEmpresas = filteredEmpresas.slice(pagination.first, pagination.first + pagination.rows);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Colegios" />

            <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg">
                <div className="flex items-center gap-4 border-b pb-4">
                    <i className="fas fa-user-friends text-2xl text-indigo-600" />
                    <School />
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Mantenimiento de Colegios</h1>
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
                        label="Crear Colegios"
                        icon="pi pi-plus"
                        className="bg-indigo-600 text-white shadow-md transition duration-300 hover:bg-indigo-700"
                        onClick={() => {
                            resetForm();
                            setIsEditing(true);
                            setVisible(true);
                        }}
                    />
                </div>

                <div className="card">
                    <DataTable
                        value={paginatedEmpresas}
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
                        <Column field="razon_social" header="Razón Social" editor={textEditor} />
                        <Column field="contacto" header="Contacto" editor={textEditor} />
                        <Column field="email" header="Correo Personal" editor={textEditor} />
                        <Column field="telefono" header="Teléfono" editor={textEditor} />
                        <Column
                            header="Acciones"
                            body={(rowData) => (
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        icon="pi pi-eye"
                                        className="rounded-md bg-green-500 p-2 text-white transition duration-300 hover:bg-green-600"
                                        onClick={() => handleView(rowData)}
                                        tooltip="Ver"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                    <Button
                                        icon="pi pi-pencil"
                                        className="rounded-md bg-yellow-500 p-2 text-white transition duration-300 hover:bg-yellow-600"
                                        onClick={() => handleEdit(rowData)}
                                        tooltip="Editar"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="rounded-md bg-red-500 p-2 text-white transition duration-300 hover:bg-red-600"
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
                        totalRecords={filteredEmpresas.length}
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

                    {dataLoading ? (
                        <div className="flex justify-content-center">
                            <ProgressSpinner style={{ width: '50px', height: '50px' }} />
                        </div>
                    ) : (
                    <div className="space-y-3 rounded-lg border border-gray-300 p-8 shadow-lg dark:border-zinc-700">
                        <h2 className="text-center text-3xl font-semibold text-gray-800">
                            {isEditing ? (id ? 'Editar Colegio' : 'Crear Nuevo Colegio') : 'Detalles de Colegio'}
                        </h2>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <div className="relative mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="razonSocial"
                                        type="text"
                                        value={formData.razonSocial}
                                        onChange={(e) => {
                                            setFormData({ ...formData, razonSocial: e.target.value });
                                            if (errors.razonSocial) {
                                                setErrors({ ...errors, razonSocial: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.razonSocial ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    <label htmlFor="razonSocial" className="mb-2 block font-semibold text-gray-700">
                                        Razón Social
                                    </label>
                                    {errors.razonSocial && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div
                                                className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.razonSocial}</span>
                                            </div>
                                        </div>
                                    )}
                                </FloatLabel>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                            <div className="relative mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="email"
                                        type="text"
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (errors.correoContacto) {
                                                setErrors({ ...errors, email: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    <label htmlFor="email" className="mb-2 block font-semibold text-gray-700">
                                        Correo Contacto
                                    </label>
                                    {errors.email && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div
                                                className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.email}</span>
                                            </div>
                                        </div>
                                    )}
                                </FloatLabel>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="relative mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="contacto"
                                        type="text"
                                        value={formData.contacto}
                                        onChange={(e) => {
                                            setFormData({ ...formData, contacto: e.target.value });
                                            if (errors.contacto) {
                                                setErrors({ ...errors, contacto: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.contacto ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    <label htmlFor="contacto" className="mb-2 block font-semibold text-gray-700">
                                        Contacto
                                    </label>
                                    {errors.contacto && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div
                                                className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.contacto}</span>
                                            </div>
                                        </div>
                                    )}
                                </FloatLabel>
                            </div>

                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="telefono"
                                        type="text"
                                        value={formData.telefono}
                                        onChange={(e) => {
                                            setFormData({ ...formData, telefono: e.target.value });
                                            if (errors.telefono) {
                                                setErrors({ ...errors, telefono: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.telefono ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    <label htmlFor="telefono" className="mb-2 block font-semibold text-gray-700">
                                        Teléfono
                                    </label>
                                    {errors.telefono && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div
                                                className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.telefono}</span>
                                            </div>
                                        </div>
                                    )}
                                </FloatLabel>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="relative mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="sede"
                                        type="text"
                                        value={formData.sede}
                                        onChange={(e) => {
                                            setFormData({ ...formData, sede: e.target.value });
                                            if (errors.sede) {
                                                setErrors({ ...errors, sede: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.sede ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    <label htmlFor="sede" className="mb-2 block font-semibold text-gray-700">
                                        Sede
                                    </label>
                                    {errors.sede && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div
                                                className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.sede}</span>
                                            </div>
                                        </div>
                                    )}
                                </FloatLabel>
                            </div>

                            <div className="mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="codigo"
                                        type="text"
                                        value={formData.codigo}
                                        onChange={(e) => {
                                            setFormData({ ...formData, codigo: e.target.value });
                                            if (errors.codigo) {
                                                setErrors({ ...errors, codigo: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.codigo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    <label htmlFor="codigo" className="mb-2 block font-semibold text-gray-700">
                                        Código
                                    </label>
                                    {errors.codigo && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div
                                                className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.codigo}</span>
                                            </div>
                                        </div>
                                    )}
                                </FloatLabel>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="relative mt-4">
                                <FloatLabel>
                                    <InputText
                                        id="nivel"
                                        type="text"
                                        value={formData.nivel}
                                        onChange={(e) => {
                                            setFormData({ ...formData, nivel: e.target.value });
                                            if (errors.nivel) {
                                                setErrors({ ...errors, nivel: undefined });
                                            }
                                        }}
                                        disabled={!isEditing}
                                        className={`w-full rounded-md border p-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                            errors.nivel ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    <label htmlFor="nivel" className="mb-2 block font-semibold text-gray-700">
                                        Nivel
                                    </label>
                                    {errors.nivel && (
                                        <div className="absolute top-0 right-0 mt-2 mr-2">
                                            <div
                                                className="flex items-center rounded border border-gray-200 bg-white p-2 shadow-md">
                                                <span className="mr-2 text-orange-500">
                                                    <i className="pi pi-exclamation-triangle"></i>
                                                </span>
                                                <span className="text-gray-700">{errors.nivel}</span>
                                            </div>
                                        </div>
                                    )}
                                </FloatLabel>
                            </div>

                            <div className="mt-4">
                                <TreeSelectField
                                    id="gestion"
                                    label="Gestión"
                                    value={formData.gestion}
                                    onChange={(e) => {
                                        setFormData({ ...formData, gestion: e.value });
                                        if (errors.gestion) {
                                            setErrors({ ...errors, gestion: undefined });
                                        }
                                    }}
                                    errors={errors}
                                    setErrors={setErrors}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <GestionDepartamentoField
                                id="gestion_departamento"
                                label="Gestion de Departamento"
                                value={formData.gestion_departamento}
                                onChange={(e) => {
                                    setFormData({ ...formData, gestion_departamento: e.value });
                                    if (errors.gestion_departamento) {
                                        setErrors({ ...errors, gestion_departamento: undefined });
                                    }
                                }}
                                errors={errors}
                                setErrors={setErrors}
                            />

                            <DepartamentoField
                                id="departamento"
                                label="Departamento"
                                value={formData.departamento}
                                onChange={(e) => setFormData({ ...formData, departamento: e.value })}
                                errors={errors}
                                setErrors={setErrors}
                            />



                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <ProvinciaField
                                id="provincia"
                                label="Provincia"
                                value={formData.provincia} // Esto es el valor que se mostrará como seleccionado
                                onChange={(e) => setFormData({ ...formData, provincia: e.value })} // Actualiza el valor de la provincia
                                errors={errors}
                                setErrors={setErrors}
                            />
                            <DistritoField
                                id="distrito"
                                label="Distrito"
                                value={formData.distrito}
                                onChange={(e) => setFormData({ ...formData, distrito: e.value })}
                                errors={errors}
                                setErrors={setErrors}
                            />
                        </div>
                    </div>  )}
                </Dialog>
            </div>
        </AppLayout>
    );
}
