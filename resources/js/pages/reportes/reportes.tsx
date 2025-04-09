import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart } from 'lucide-react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { TreeSelect } from 'primereact/treeselect';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reportes',
        href: '/reportes',
    },
];

export default function Reportes() {
    const [visible, setVisible] = useState(false);

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

    interface TreeSelectFieldProps {
        id: string;
        label: string;
    }

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
                    <TreeSelectField id="gestionDepartamento" label="Colegio" />
                    <TreeSelectField id="departamento" label="Encuesta" />
                </div>

                <div className="mt-4 flex flex-wrap justify-start gap-4 md:justify-end">
                    <Button label="Links para Encuestas" onClick={() => setVisible(true)} />
                    <Button label="Exportar" onClick={() => setVisible(true)} />
                    <Button label="Ver Estatus" onClick={() => setVisible(true)} />
                </div>

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
