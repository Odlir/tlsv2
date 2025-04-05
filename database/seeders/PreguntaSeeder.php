<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Pregunta;
use Illuminate\Database\Seeder;

class PreguntaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $preguntas =
            [
                ["areas_id" => 1, "nombre" => "Realizando estimaciones del clima y fenómenos atmosféricos."],
                ["areas_id" => 1, "nombre" => "Preservando el medio ambiente."],
                ["areas_id" => 1, "nombre" => "Extrayendo y procesando los recursos minerales."],
                ["areas_id" => 1, "nombre" => "Solucionando problemas de producción, manejo y comercialización de cultivos agrícolas."],
                ["areas_id" => 1, "nombre" => "Realizando estudios del cosmos, posición de los astros, movimiento del sol y las estrellas."],
                ["areas_id" => 1, "nombre" => "Aplicando tecnologías innovadoras en procesos relacionados con la agroindustria."],

                ["areas_id" => 2, "nombre" => "Desarrollando nuevos materiales y tecnologías de fabricación aplicadas en el campo textil."],
                ["areas_id" => 2, "nombre" => "Diseñando la infraestructura de carreteras, puentes, edificios."],
                ["areas_id" => 2, "nombre" => "Supervisando, reparando sistemas mecánicos en la industria automotriz."],
                ["areas_id" => 2, "nombre" => "Innovando los productos y procesos de la industria alimentaria."],

                ["areas_id" => 3, "nombre" => "Aplicando el conocimiento científico y la investigación en el campo deportivo."],
                ["areas_id" => 3, "nombre" => "Mejorando la calidad de servicio relacionado a los medios de transporte en general."],
                ["areas_id" => 3, "nombre" => "Brindando servicio a la patria, defender la soberanía e integridad territorial."],
                ["areas_id" => 3, "nombre" => "Brindar cuidado y estabilidad a la nación."],

                ["areas_id" => 4, "nombre" => "Produciendo y controlando la calidad de los medicamentos y productos farmacéuticos."],
                ["areas_id" => 4, "nombre" => "Gestionando procesos para la transformación de materias primas en la industria química."],
                ["areas_id" => 4, "nombre" => "Aplicando modelos matemáticos que busquen soluciones eficientes, en problemas concretos."],
                ["areas_id" => 4, "nombre" => "Investigar sobre procesos y reacciones químicas."],

                ["areas_id" => 5, "nombre" => "Previniendo, diagnosticando y tratando enfermedades en el ser humano."],
                ["areas_id" => 5, "nombre" => "Cuidando la salud y bienestar de las personas."],
                ["areas_id" => 5, "nombre" => "Estudiando a los seres vivos y sus procesos vitales."],
                ["areas_id" => 5, "nombre" => "Previniendo y diagnosticando enfermedades en la salud bucal."],
                ["areas_id" => 5, "nombre" => "Previniendo, diagnosticando y tratando enfermedades en animales."],
                ["areas_id" => 5, "nombre" => "Evaluando, diagnosticando y tratando problemas de salud mental."],

                ["areas_id" => 6, "nombre" => "Mejorando sistemas de informática en función de una necesidad."],
                ["areas_id" => 6, "nombre" => "Implementando conocimientos en mecánica, informática y electrónica para soluciones concretas."],
                ["areas_id" => 6, "nombre" => "Implementando nuevos sistemas eléctricos en procesos industriales."],
                ["areas_id" => 6, "nombre" => "Aplicando conocimientos científicos y matemáticos para resolver problemas técnicos."],

                ["areas_id" => 7, "nombre" => "Representando el arte sobre el escenario, combinando movimientos sonoros y visuales."],
                ["areas_id" => 7, "nombre" => "Realizando una producción cinematográfica."],
                ["areas_id" => 7, "nombre" => "Combinando sonidos e instrumentales según ritmo y melodía."],
                ["areas_id" => 7, "nombre" => "Expresando a través del cuerpo emociones e ideas."],

                ["areas_id" => 8, "nombre" => "Diseñando espacios interiores considerando los acabados y calidad ambientalista."],
                ["areas_id" => 8, "nombre" => "Elaborando planos y diseños tridimensionales."],
                ["areas_id" => 8, "nombre" => "Combinando el arte y el diseño para crear prendas de vestir."],
                ["areas_id" => 8, "nombre" => "Realizando el diseño de afiches, libros, revistas, logotipos, folletos, etc."],
                ["areas_id" => 8, "nombre" => "Creando historias y argumentos envolventes con personajes, escenarios y tramas emocionantes de manera digital."],
                ["areas_id" => 8, "nombre" => "Participando en la animación y creación de personajes."],
                ["areas_id" => 8, "nombre" => "Decorando espacios para que sean cómodos y atractivos."],
                ["areas_id" => 8, "nombre" => "Buscando la armonía de espacios interiores en iluminación, mobiliario, colores y otros accesorios."],
                ["areas_id" => 8, "nombre" => "Creando escenarios en 3D con efectos visuales."],
                ["areas_id" => 8, "nombre" => "Diseñando imágenes con efectos en escenarios que parezcan reales."],
                ["areas_id" => 8, "nombre" => "Diseñando y programando videojuegos en plataformas digitales."],
                ["areas_id" => 8, "nombre" => "Diseñando contenidos digitales y de entretenimiento."],

                ["areas_id" => 9, "nombre" => "Escribiendo un guión de una producción cinematográfica."],
                ["areas_id" => 9, "nombre" => "Creando historias con personajes y tramas con una narrativa entretenida."],
                ["areas_id" => 9, "nombre" => "Escribiendo letras musicales, melodías de anuncios publicitarios."],
                ["areas_id" => 9, "nombre" => "Escribiendo poesía, poemas varios."],

                ["areas_id" => 10, "nombre" => "Explorando la diversidad cultural y el funcionamiento de las sociedades."],
                ["areas_id" => 10, "nombre" => "Descubriendo y analizando los restos de civilizaciones antiguas."],
                ["areas_id" => 10, "nombre" => "Estudiando la forma de ser de las personas a lo largo de la historia."],
                ["areas_id" => 10, "nombre" => "Investigando sobre la vida de los seres humanos en el pasado."],

                ["areas_id" => 11, "nombre" => "Guiando los aprendizajes, contribuyendo al desarrollo intelectual y emocional en la enseñanza."],
                ["areas_id" => 11, "nombre" => "Estudiando las creencias y prácticas religiosas centrado en la fe."],
                ["areas_id" => 11, "nombre" => "Mejorando la calidad de vida en las personas y comunidades."],
                ["areas_id" => 11, "nombre" => "Brindando instrucción y apoyo emocional a las personas."],

                ["areas_id" => 12, "nombre" => "Planificando, organizando, dirigiendo los recursos de una empresa."],
                ["areas_id" => 12, "nombre" => "Aplicando técnicas de preparación y servicios en distintos alimentos y bebidas."],
                ["areas_id" => 12, "nombre" => "Diseñando y gestionando planes turísticos y de entretenimiento."],
                ["areas_id" => 12, "nombre" => "Monitoreando y organizando viajes a turistas."],

                ["areas_id" => 13, "nombre" => "Aplicando las leyes enfocado en la justicia, la ética y la resolución de conflictos."],
                ["areas_id" => 13, "nombre" => "Negociando acuerdos, velando por los intereses nacionales y las relaciones positivas con otras naciones."],
                ["areas_id" => 13, "nombre" => "Gestionando de políticas públicas, analizando las conductas sociales, los cambios en las sociedades."],
                ["areas_id" => 13, "nombre" => "Defendiendo clientes que se encuentren en situación legal complicada."],

                ["areas_id" => 14, "nombre" => "Desarrollando negocios innovadores en el mercado."],
                ["areas_id" => 14, "nombre" => "Actuando sobre el comportamiento de los consumidores y las dinámicas del mercado, promoción de productos."],
                ["areas_id" => 14, "nombre" => "Diseñando sistemas de producción y logística de una empresa."],
                ["areas_id" => 14, "nombre" => "Implementando programas de comercialización digital con innovación empresarial."],

                ["areas_id" => 15, "nombre" => "Capturando imágenes que cuenten una historia y sepan transmitir un mensaje."],
                ["areas_id" => 15, "nombre" => "Realizando estrategias publicitarias, para promocionar productos, servicios, marcas, etc."],
                ["areas_id" => 15, "nombre" => "Realizando películas, documentales y cortometrajes."],
                ["areas_id" => 15, "nombre" => "Difundiendo el contenido de mensajes informativos en cualquier medio de comunicación."],

                ["areas_id" => 16, "nombre" => "Manejando información financiera de una empresa o persona."],
                ["areas_id" => 16, "nombre" => "Evaluando los temas económicos, la producción y distribución de bienes y recursos."],
                ["areas_id" => 16, "nombre" => "Interpretando datos recogidos en aspectos estadísticos de un determinado estudio."],
                ["areas_id" => 16, "nombre" => "Manejando información contable de la empresa."],

                ["areas_id" => 17, "nombre" => "Revisando data desde una computadora."],
                ["areas_id" => 17, "nombre" => "Digitando textos mientras alguien va hablando."],
                ["areas_id" => 17, "nombre" => "Codificando libros dentro de una biblioteca."],
                ["areas_id" => 17, "nombre" => "Gestionando actividades desde una computadora o teléfono."],
            ];

        Pregunta::insert($preguntas);
    }
}
