import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Users, UserRoundPlus } from 'lucide-react';
//import { useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//
import { useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personas',
        href: '/personas',
    },
];

export default function Personas() {
    const { props } = usePage();
    const personas = props.personas || [];
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);

    ////////////////////
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dt = useRef(null);

    const filterGlobal = (value) => {
        setSearch(value);
    };

    const handleNew = () => {
        console.log('Abrir formulario para agregar nueva persona');
        // Implementa la lógica para agregar una nueva persona
    };

    const handleEdit = (rowData) => {
        console.log('Editar persona:', rowData);
        // Implementa la lógica para editar la persona seleccionada
    };

    const handleDelete = (rowData) => {
        if (window.confirm('¿Estás seguro de eliminar esta persona?')) {
            console.log('Eliminar persona:', rowData);
            // Implementa la lógica para eliminar una persona
        }
    };

    const handleDeleteSelected = () => {
        if (window.confirm('¿Estás seguro de eliminar las personas seleccionadas?')) {
            console.log('Eliminar personas seleccionadas:', selectedProducts);
            // Implementa la lógica para eliminar las personas seleccionadas
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded text onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" severity="danger" rounded text onClick={() => handleDelete(rowData)} />
            </div>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex gap-2">
                <Button label="Nuevo" icon="pi pi-plus" onClick={handleNew} />
                <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={handleDeleteSelected} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <Button label="Exportar" icon="pi pi-upload" severity="success" onClick={() => dt.current.exportCSV()} />
        );
    };

    const header = (
        <div className="flex justify-between items-center">
            <h5 className="m-0">Listado de Personas</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <input
                    type="text"
                    className="p-inputtext p-component"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </span>
        </div>
    );

    const globalFilter = search;

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Nueva Persona</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="mb-4">
                    <h1 className="flex items-center gap-2 text-2xl font-bold">
                        <i className="fas fa-user-friends"></i>
                        <Users />
                        MANTENIMIENTO DE PERSONAS
                    </h1>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="buscar">Buscar</label>
                        <input
                            type="text"
                            id="buscar"
                            className="form-control"
                            placeholder="Buscar por Id/Nombres/Apellidos/Sexo/Correo"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 d-flex justify-content-md-end justify-content-start align-items-end mt-md-0 mt-3">
                        <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                        <Dialog visible={visible} modal header={headerElement} footer={footerContent} style={{ width: '50rem' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                            <p className="m-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </Dialog>
                    </div>
                </div>
                <div className="table-container">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={personas}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} personas"
                        globalFilter={globalFilter}
                        header={header}
                        responsiveLayout="scroll"
                        emptyMessage="No se encontraron personas."
                    >
                        <Column selectionMode="multiple" exportable={false} />
                        <Column field="nombres" header="Nombres" sortable style={{ minWidth: '12rem' }} />
                        <Column field="apellido" header="Apellido" sortable style={{ minWidth: '12rem' }} />
                        <Column field="correo" header="Correo Electrónico" sortable style={{ minWidth: '16rem' }} />
                        <Column field="sexo" header="Sexo" sortable style={{ minWidth: '8rem' }} />
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }} />
                    </DataTable>
                </div>
            </div>
        </AppLayout>
    );
}
