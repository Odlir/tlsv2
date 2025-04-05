import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { useState } from 'react';
import { UserRoundPlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personas',
        href: '/personas',
    },
];

interface Persona {
    id: number;
    nombres: string;
    apellidos: string;
    sexo: string;
    correo: string;
}

interface PageProps {
    personas: Persona[];
}

export default function Personas() {
    const { props } = usePage<PageProps>();
    const personas = props.personas || [];
    const [search, setSearch] = useState('');

    // 👇 El filtrado se hace directamente, sin estados extra ni efectos secundarios
    const filteredPersonas = personas.filter((p) =>
        `${p.id} ${p.nombres} ${p.apellidos} ${p.sexo} ${p.correo}`.toLowerCase().includes(search.toLowerCase()),
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
                        <Link href="/crud-persona" className="btn btn-secondary">
                            <UserRoundPlus />
                        </Link>
                    </div>
                </div>

                <div className="table-container">
                    <table className="table-bordered table-hover table">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Apellidos</th>
                                <th>Nombres</th>
                                <th>Sexo</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPersonas.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <Link href={`/detalle-persona?id=${p.id}`}>{p.id}</Link>
                                    </td>
                                    <td>{p.apellidos}</td>
                                    <td>{p.nombres}</td>
                                    <td>{p.sexo}</td>
                                    <td>{p.correo}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link href={`/detalle-persona?id=${p.id}`} className="btn btn-sm btn-outline-primary">
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                            <Link href={`/crud-persona?id=${p.id}`} className="btn btn-sm btn-outline-warning">
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(p.id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPersonas.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        No se encontraron personas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );

    function eliminar(id: number) {
        if (confirm('¿Estás seguro de eliminar esta persona?')) {
            Inertia.post('/ruta-eliminar', { id });
            console.log('Eliminar persona con ID:', id);
        }
    }
}
