import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TestInteresesProps {
    encuestaId: number;
    id: number;
    completada: number;
    personaId: number;
    alumno: string;
    sucursal: string;
    preguntas: Pregunta[];
}

interface Respuesta {
    id: number;
    valor: string;
    icon?: string;
    puntaje?: string;
    seleccionada: boolean;
}
interface Subpregunta {
    id: number;
    nombre: string;
    respuestas: Respuesta[];
    respuestaSeleccionada?: string; // Add this property as optional
}
interface Subpregunta {
    id: number;
    nombre: string;
    respuestas: Respuesta[];
}

interface Pregunta {
    id: number;
    nombre: string;
    area?: string;
    subpreguntas: Subpregunta[];
}

const TestIntereses: React.FC<TestInteresesProps> = ({ id,completada,encuestaId, personaId, alumno, sucursal, preguntas: preguntasIniciales }) => {
    console.log("Completada value:", completada, "Type:", typeof completada);
    const completadaNum = Number(completada);
    const [porcentaje, setPorcentaje] = useState(0);
    const [progreso, setProgreso] = useState(0);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [show, setShow] = useState(completadaNum !== 1);
    const [disabled, setDisabled] = useState(true);
    const [reporteIntereses, setReporteIntereses] = useState<any>(null);
    const [reporteConsolidados, setReporteConsolidados] = useState<any>(null);
    const [cargando, setCargando] = useState(true);

    // Inicializar con las preguntas recibidas del servidor
    useEffect(() => {
        // If the survey is already completed, don't load questions
        if (completadaNum === 1) {
            setCargando(false);
            setShow(false); // Explicitly set show to false
            console.log("Survey is completed, setting show to false");
            return;
        }

        if (preguntasIniciales && preguntasIniciales.length > 0) {
            setPreguntas(preguntasIniciales);
            setCargando(false);
            actualizarProgreso(preguntasIniciales);
        } else {
            // Si no se reciben preguntas, intentar cargarlas
            cargarPreguntas();
        }
    }, [preguntasIniciales, completadaNum]);

    // Función para cargar preguntas desde el servidor si es necesario
    const cargarPreguntas = async () => {
        try {
            const response = await axios.get(`/api/test-intereses/${encuestaId}/${personaId}/preguntas`);
            if (response.data && response.data.preguntas) {
                setPreguntas(response.data.preguntas);
                actualizarProgreso(response.data.preguntas);
            }
            setCargando(false);
        } catch (error) {
            console.error('Error al cargar preguntas:', error);
            setCargando(false);
        }
    };

    // Función para manejar el cambio en las respuestas
    const handleRespuestaChange = (preguntaId: number, subpreguntaId: number, respuestaId: number | string) => {
        const nuevasPreguntas = [...preguntas];
        const preguntaIndex = nuevasPreguntas.findIndex(p => p.id === preguntaId);

        if (preguntaIndex !== -1) {
            const subpreguntaIndex = nuevasPreguntas[preguntaIndex].subpreguntas.findIndex(
                sp => sp.id === subpreguntaId
            );

            if (subpreguntaIndex !== -1) {
                // Check if this is a Si/No question (string respuestaId)
                if (typeof respuestaId === 'string') {
                    // For Si/No questions, store the selection directly
                    nuevasPreguntas[preguntaIndex].subpreguntas[subpreguntaIndex].respuestaSeleccionada = respuestaId;
                } else {
                    // For regular questions with respuestas array
                    // Desmarcar todas las respuestas de esta subpregunta
                    nuevasPreguntas[preguntaIndex].subpreguntas[subpreguntaIndex].respuestas.forEach(
                        r => { r.seleccionada = false; }
                    );

                    // Marcar la respuesta seleccionada
                    const respuestaIndex = nuevasPreguntas[preguntaIndex].subpreguntas[subpreguntaIndex].respuestas.findIndex(
                        r => r.id === respuestaId
                    );

                    if (respuestaIndex !== -1) {
                        nuevasPreguntas[preguntaIndex].subpreguntas[subpreguntaIndex].respuestas[respuestaIndex].seleccionada = true;
                    }
                }
            }
        }

        setPreguntas(nuevasPreguntas);
        actualizarProgreso(nuevasPreguntas);
    };

    const actualizarProgreso = (preguntas: Pregunta[]) => {
        let totalSubpreguntas = 0;
        let completadas = 0;

        preguntas.forEach(pregunta => {
            pregunta.subpreguntas.forEach(subpregunta => {
                totalSubpreguntas++;

                // Check if it's a Si/No question with respuestaSeleccionada property
                if (subpregunta.respuestaSeleccionada === "si" || subpregunta.respuestaSeleccionada === "no") {
                    completadas++;
                }
                // Check regular questions with respuestas array
                else if (subpregunta.respuestas && subpregunta.respuestas.some(r => r.seleccionada)) {
                    completadas++;
                }
            });
        });

        const nuevoPorcentaje = totalSubpreguntas > 0 ? Math.round((completadas / totalSubpreguntas) * 100) : 0;
        setPorcentaje(nuevoPorcentaje);
        setProgreso(completadas);

        // Si se completaron todas las preguntas, habilitar el botón de envío
        setDisabled(completadas < totalSubpreguntas);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Explicitly type the respuestas array
            const respuestas: EncuestaRespuesta[] = [];

            preguntas.forEach(pregunta => {
                pregunta.subpreguntas.forEach(subpregunta => {
                    // For regular questions with respuestas array
                    if (subpregunta.respuestas && !subpregunta.respuestaSeleccionada) {
                        const respuestaSeleccionada = subpregunta.respuestas.find(r => r.seleccionada);
                        if (respuestaSeleccionada) {
                            respuestas.push({
                                estado: 1,
                                pregunta_id: subpregunta.id,
                                respuesta_id: respuestaSeleccionada.id,
                                encuesta_persona_id: id
                            });
                        }
                    }
                    // For Si/No questions
                    else if (subpregunta.respuestaSeleccionada) {
                        // Map "si"/"no" to actual respuesta_id values
                        const respuestaId = subpregunta.respuestaSeleccionada === "si" ? 1 : 2; // Replace with actual IDs

                        respuestas.push({
                            estado: 1,
                            pregunta_id: subpregunta.id,
                            respuesta_id: respuestaId,
                            encuesta_persona_id: id
                        });
                    }
                });
            });

            // Send the data to your API using axios
            await axios.post('/encuestaRespuesta', { respuestas }, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Show success message
            setShow(false);

        } catch (error) {
            console.error('Error al enviar la encuesta:', error);
            alert('Ocurrió un error al enviar la encuesta. Por favor, inténtalo de nuevo.');
        }
    };
    const obtenerReporteIntereses = async () => {
        try {
            const response = await axios.get(`/api/test-intereses/${encuestaId}/${personaId}/reporte`);
            setReporteIntereses(response.data);
        } catch (error) {
            console.error('Error al obtener reporte de intereses:', error);
            // Simulación de datos para desarrollo
            setReporteIntereses({
                encuestaId,
                personaId,
                mensaje: "Reporte de intereses disponible después de completar la encuesta"
            });
        }
    };

    const obtenerReporteConsolidados = async () => {
        try {
            const response = await axios.get(`/api/test-consolidados/${encuestaId}/${personaId}`);
            setReporteConsolidados(response.data);
        } catch (error) {
            console.error('Error al obtener reporte consolidado:', error);
            // Simulación de datos para desarrollo
            setReporteConsolidados({
                encuestaId,
                personaId,
                mensaje: "Reporte consolidado disponible después de completar la encuesta"
            });
        }
    };

    if (cargando) {
        return <div className="flex justify-center items-center p-8">Cargando encuesta...</div>;
    }
    const selectRandomAnswers = () => {
        const nuevasPreguntas = [...preguntas];

        nuevasPreguntas.forEach(pregunta => {
            pregunta.subpreguntas.forEach(subpregunta => {
                // For regular questions with respuestas array
                if (subpregunta.respuestas && subpregunta.respuestas.length > 0) {
                    // Reset all selections
                    subpregunta.respuestas.forEach(r => { r.seleccionada = false; });

                    // Select a random answer
                    const randomIndex = Math.floor(Math.random() * subpregunta.respuestas.length);
                    subpregunta.respuestas[randomIndex].seleccionada = true;
                }
                // For Si/No questions
                else if (subpregunta.nombre.includes("satisfacción") || subpregunta.id === 3) {
                    // Randomly select "si" or "no"
                    subpregunta.respuestaSeleccionada = Math.random() > 0.5 ? "si" : "no";
                }
            });
        });

        setPreguntas(nuevasPreguntas);
        actualizarProgreso(nuevasPreguntas);
    };
    return (
        <div className="test-intereses-container">
            {/* Encabezado rojo */}
            <div className="encabezado-sistema">
                <h1>Sistema de Encuestas</h1>
            </div>
         {/*   <div className="contenedor-boton" style={{ marginBottom: '20px' }}>
                <button
                    type="button"
                    className="boton-test"
                    onClick={selectRandomAnswers}
                >
                    Seleccionar Respuestas Aleatorias (Prueba)
                </button>
            </div>*/}

            {/* Información de la encuesta */}
            <div className="info-encuesta">
                <div className="flex items-center mb-2">
                    <span className="icono-monitor">📺</span>
                    <span
                        className="texto-encuesta">ENCUESTA DE INTERESES : {encuestaId} | {personaId} - {alumno} - {sucursal}</span>
                </div>
            </div>

            {/* Instrucciones */}
            <div className="instrucciones-panel">
                <h3>INSTRUCCIONES</h3>
                <p>A continuación encontrarás una serie de actividades relacionadas con diferentes carreras.</p>
                <p>
                    Recuerda responder a <strong>TODAS</strong> las preguntas con la <strong>opción que refleje mejor tu
                    interés.</strong>
                </p>
                <p>Los resultados ayudarán a conocerse mejor, lo cual puede favorecer tu futura vida profesional.</p>
                <p>No existen respuestas correctas o incorrectas. Contestar todas las preguntas te tomará
                    aproximadamente 20 minutos.</p>
                <p><strong>Muchas gracias.</strong></p>
            </div>

            {/* Avance de la encuesta */}
            {show && (
                <div className="avance-encuesta">
                    <div className="flex items-center">
                        <div className="w-1/4">
                            <strong>Avance de la Encuesta</strong>
                        </div>
                        <div className="w-3/4">
                            <div className="barra-progreso">
                                <div
                                    className="progreso"
                                    style={{ width: `${porcentaje}%` }}
                                ></div>
                            </div>
                            <div className="texto-progreso">
                                {porcentaje}% | Has respondido {progreso} preguntas
                                de {preguntas.reduce((acc, p) => acc + p.subpreguntas.length, 0)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {show ? (
                <form onSubmit={handleSubmit}>
                    {preguntas.map((pregunta) => (
                        <div key={pregunta.id} className="tarjeta-pregunta">
                            <div className="titulo-pregunta">
                                {pregunta.id}. {pregunta.nombre}
                            </div>
                            <div className="grid-subpreguntas">
                                {pregunta.subpreguntas.map((subpregunta) => (
                                    <div key={subpregunta.id} className="subpregunta">
                                        <div className="texto-subpregunta">
                                            {subpregunta.nombre} (*)
                                        </div>
                                        <div className="opciones-respuesta">
                                            {/* Check if this is the third question type (satisfaction question) */}
                                            {subpregunta.nombre.includes("satisfacción") || subpregunta.id === 3 ? (
                                                // Si/No options for the satisfaction question
                                                <>
                                                    <div className="opcion">
                                                        <input
                                                            type="radio"
                                                            id={`respuesta_${pregunta.id}_${subpregunta.id}_no`}
                                                            name={`pregunta_${pregunta.id}_subpregunta_${subpregunta.id}`}
                                                            value="no"
                                                            onChange={() => handleRespuestaChange(pregunta.id, subpregunta.id, "no")}
                                                            checked={subpregunta.respuestaSeleccionada === "no"}
                                                        />
                                                        <label
                                                            htmlFor={`respuesta_${pregunta.id}_${subpregunta.id}_no`}>
                                                            No
                                                        </label>
                                                    </div>
                                                    <div className="opcion">
                                                        <input
                                                            type="radio"
                                                            id={`respuesta_${pregunta.id}_${subpregunta.id}_si`}
                                                            name={`pregunta_${pregunta.id}_subpregunta_${subpregunta.id}`}
                                                            value="si"
                                                            onChange={() => handleRespuestaChange(pregunta.id, subpregunta.id, "si")}
                                                            checked={subpregunta.respuestaSeleccionada === "si"}
                                                        />
                                                        <label
                                                            htmlFor={`respuesta_${pregunta.id}_${subpregunta.id}_si`}>
                                                            Sí
                                                        </label>
                                                    </div>
                                                </>
                                            ) : (
                                                // Regular options for other question types
                                                subpregunta.respuestas.map((respuesta) => (
                                                    <div key={respuesta.id} className="opcion">
                                                        <input
                                                            type="radio"
                                                            id={`respuesta_${pregunta.id}_${subpregunta.id}_${respuesta.id}`}
                                                            name={`pregunta_${pregunta.id}_subpregunta_${subpregunta.id}`}
                                                            value={respuesta.id}
                                                            onChange={() => handleRespuestaChange(pregunta.id, subpregunta.id, respuesta.id)}
                                                            checked={respuesta.seleccionada}
                                                        />
                                                        <label
                                                            htmlFor={`respuesta_${pregunta.id}_${subpregunta.id}_${respuesta.id}`}>
                                                            {respuesta.valor}
                                                        </label>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="contenedor-boton">
                        <button type="submit" disabled={disabled} className="boton-enviar">
                            Enviar Encuesta
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mensaje-exito">
                    <h3>¡FELICITACIONES!</h3>
                    <p>El test fue completado correctamente.</p>
                </div>
            )}

            {/* Reportes (se muestran después de enviar la encuesta) */}
            {!show && (
                <div className="reportes-container">
                </div>
            )}

            {/* CSS para adaptar el diseño al mostrado en la imagen */}
            <style jsx>{`
                .test-intereses-container {
                    font-family: Arial, sans-serif;
                }

                .encabezado-sistema {
                    background-color: #ff0000;
                    color: white;
                    padding: 10px 15px;
                    margin-bottom: 15px;
                }

                .encabezado-sistema h1 {
                    margin: 0;
                    font-size: 18px;
                }

                .info-encuesta {
                    background-color: #f5f5f5;
                    padding: 15px;
                    margin-bottom: 15px;
                }

                .icono-monitor {
                    margin-right: 10px;
                }

                .texto-encuesta {
                    font-weight: bold;
                }

                .instrucciones-panel {
                    background-color: #f5f5f5;
                    padding: 15px;
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                }

                .instrucciones-panel h3 {
                    margin-top: 0;
                }

                .avance-encuesta {
                    background-color: #f5f5f5;
                    padding: 15px;
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                }

                .barra-progreso {
                    background-color: #eee;
                    height: 20px;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .progreso {
                    background-color: #2196F3;
                    height: 100%;
                }

                .texto-progreso {
                    margin-top: 5px;
                    font-size: 14px;
                }

                .tarjeta-pregunta {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    margin-bottom: 15px;
                    padding: 15px;
                }

                .titulo-pregunta {
                    font-weight: bold;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }

                .grid-subpreguntas {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }

                .texto-subpregunta {
                    color: #f44336;
                    margin-bottom: 10px;
                }

                .opciones-respuesta {
                    display: flex;
                    flex-direction: column;
                }

                .opcion {
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                }

                .opcion input {
                    margin-right: 8px;
                }

                .icono-respuesta {
                    margin-left: 5px;
                }

                .contenedor-boton {
                    display: flex;
                    justify-content: center;
                    margin: 30px 0;
                }

                .boton-enviar {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .boton-enviar:disabled {
                    background-color: #ddd;
                    cursor: not-allowed;
                }

                .mensaje-exito {
                    background-color: #dff0d8;
                    border: 1px solid #d6e9c6;
                    color: #3c763d;
                    padding: 15px;
                    margin-bottom: 15px;
                }

                .reportes-container {
                    margin-top: 20px;
                }

                .reporte-card {
                    background-color: #fff;
                    border: 1px solid #ddd;
                    margin-bottom: 15px;
                    padding: 15px;
                }

                .reporte-card h3 {
                    margin-top: 0;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                }

                @media (max-width: 768px) {
                    .grid-subpreguntas {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default TestIntereses;
