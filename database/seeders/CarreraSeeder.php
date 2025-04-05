<?php

namespace Database\Seeders;

//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Carrera;
use Illuminate\Database\Seeder;

class CarreraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $carreras =
            [
                [
                    "nombre" => "ING. AGROINDUSTRIAL",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería enfocada en la agroindustria y la optimización de los procesos productivos en el campo.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. ACUÍCOLA",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería enfocada en la acuicultura, el manejo de especies acuáticas y la producción sostenible.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. AMBIENTAL",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería enfocada en la protección del medio ambiente y el manejo sostenible de los recursos naturales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. PESQUERA",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería que abarca la explotación y gestión sostenible de los recursos pesqueros.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. AGRÍCOLA",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería enfocada en el desarrollo y la mejora de los procesos agrícolas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. GEOLÓGICA",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería dedicada al estudio de la Tierra, los recursos naturales y la mitigación de desastres geológicos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                ["nombre" => "ING. AGRÓNOMA",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería enfocada en la producción agrícola, mejoramiento de cultivos y tecnología agrícola.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. FORESTAL",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería que se dedica al manejo sostenible de los recursos forestales y la conservación de bosques.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. GEOGRÁFICA",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería relacionada con el análisis geográfico, estudios de territorio y planificación del espacio.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. DE MINAS",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería dedicada a la explotación de minerales, optimización de procesos mineros y seguridad industrial.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "INGENIERÍA DE PETRÓLEOS",
                    "areas_id" => 1,
                    "descripcion" => "Ingeniería especializada en la extracción, procesamiento y explotación de recursos petroleros.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ZOOTECNIA",
                    "areas_id" => 1,
                    "descripcion" => "Carrera enfocada en la crianza, cuidado y producción animal, buscando la optimización de los recursos zootécnicos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "VETERINARIA",
                    "areas_id" => 1,
                    "descripcion" => "Carrera dedicada al estudio y cuidado de la salud animal, previniendo y tratando enfermedades en animales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "AGRONOMÍA",
                    "areas_id" => 1,
                    "descripcion" => "Carrera centrada en la ciencia y tecnología para mejorar la productividad agrícola y la sostenibilidad.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "METEOROLOGÍA",
                    "areas_id" => 1,
                    "descripcion" => "Carrera que se ocupa del estudio del clima y la atmósfera para predecir fenómenos meteorológicos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ASTRONOMÍA",
                    "areas_id" => 1,
                    "descripcion" => "Carrera dedicada al estudio de los astros, el universo y los fenómenos cósmicos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ASTROFÍSICA",
                    "areas_id" => 1,
                    "descripcion" => "Carrera centrada en el estudio de las leyes físicas del universo y los cuerpos celestes.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "METEORÓLOGO",
                    "areas_id" => 1,
                    "descripcion" => "Especialista en el análisis y pronóstico de las condiciones meteorológicas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "ING. CIVIL",
                    "areas_id" => 2,
                    "descripcion" => "Ingeniería dedicada a la planificación, diseño, construcción y mantenimiento de infraestructuras como puentes, edificios, y carreteras.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. INDUSTRIAL",
                    "areas_id" => 2,
                    "descripcion" => "Carrera centrada en la optimización de procesos industriales, gestión de recursos y mejora de la productividad en fábricas y plantas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. METALÚRGICO",
                    "areas_id" => 2,
                    "descripcion" => "Ingeniería enfocada en el estudio y procesamiento de metales, con aplicaciones en la industria automotriz, aeronáutica y construcción.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. NAVAL",
                    "areas_id" => 2,
                    "descripcion" => "Carrera que abarca el diseño, construcción y mantenimiento de embarcaciones y sistemas navales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. AUTOMOTRIZ",
                    "areas_id" => 2,
                    "descripcion" => "Ingeniería dedicada al diseño, fabricación y mantenimiento de vehículos automotrices y sus sistemas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. ALIMENTARIA",
                    "areas_id" => 2,
                    "descripcion" => "Carrera que se centra en el desarrollo, producción y control de calidad de productos alimenticios.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. AGROINDUSTRIAL",
                    "areas_id" => 2,
                    "descripcion" => "Ingeniería enfocada en la transformación de productos agrícolas en productos procesados para consumo y distribución.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. TEXTIL",
                    "areas_id" => 2,
                    "descripcion" => "Ingeniería dedicada a la producción, diseño y comercialización de productos textiles, además de la mejora de los procesos de fabricación.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "ING. DE TRANSPORTE",
                    "areas_id" => 3,
                    "descripcion" => "Carrera dedicada a la planificación, diseño y gestión de sistemas de transporte, tanto terrestres como aéreos y marítimos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "CIENCIAS DEL DEPORTE",
                    "areas_id" => 3,
                    "descripcion" => "Carrera enfocada en la investigación, desarrollo y aplicación de técnicas para la mejora del rendimiento físico y salud en el ámbito deportivo.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "OFICIAL DE LA FAP",
                    "areas_id" => 3,
                    "descripcion" => "Carrera en la Fuerza Aérea del Perú (FAP) que forma oficiales para la defensa aérea y el mantenimiento de la seguridad nacional en el espacio aéreo.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "EP",
                    "areas_id" => 3,
                    "descripcion" => "Carrera dedicada a la formación de oficiales para la gestión, organización y defensa de la nación, operando en diferentes fuerzas armadas y servicios de emergencia.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "MGP",
                    "areas_id" => 3,
                    "descripcion" => "Carrera dirigida a formar oficiales para la Marina de Guerra del Perú (MGP), con enfoque en defensa naval y seguridad marítima.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "PNP",
                    "areas_id" => 3,
                    "descripcion" => "Carrera que forma oficiales para la Policía Nacional del Perú (PNP), con énfasis en seguridad pública y prevención del crimen.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "MATEMÁTICAS PURAS",
                    "areas_id" => 4,
                    "descripcion" => "Carrera enfocada en el estudio abstracto de las matemáticas, incluyendo álgebra, cálculo, geometría, teoría de números y más.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "QUÍMICA",
                    "areas_id" => 4,
                    "descripcion" => "Carrera dedicada al estudio de la composición, estructura, propiedades y reacciones de la materia.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "FÍSICA",
                    "areas_id" => 4,
                    "descripcion" => "Carrera centrada en el estudio de las leyes fundamentales de la naturaleza, incluyendo mecánica, termodinámica y electromagnetismo.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "GEOFÍSICO",
                    "areas_id" => 4,
                    "descripcion" => "Carrera que se especializa en el estudio físico de la tierra, utilizando métodos geofísicos para la exploración de recursos naturales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "QUÍMICO FARMACÉUTICO",
                    "areas_id" => 4,
                    "descripcion" => "Carrera que combina la química y la farmacología para el desarrollo, fabricación y control de medicamentos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. QUÍMICA",
                    "areas_id" => 4,
                    "descripcion" => "Carrera orientada al diseño y optimización de procesos industriales relacionados con la química, para la producción de bienes y servicios.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ING. PETROQUÍMICA",
                    "areas_id" => 4,
                    "descripcion" => "Carrera centrada en la producción y transformación de productos petroquímicos, derivados del petróleo y gas natural.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "MEDICINA HUMANA",
                    "areas_id" => 5,
                    "descripcion" => "Carrera dedicada al diagnóstico, tratamiento y prevención de enfermedades en los seres humanos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ODONTOLOGÍA",
                    "areas_id" => 5,
                    "descripcion" => "Carrera centrada en la prevención, diagnóstico y tratamiento de enfermedades bucales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "MEDICINA VETERINARIA",
                    "areas_id" => 5,
                    "descripcion" => "Carrera dedicada a la atención médica de animales, incluyendo diagnóstico, tratamiento y prevención de enfermedades.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "OBSTETRICIA",
                    "areas_id" => 5,
                    "descripcion" => "Carrera dedicada a la atención de las mujeres durante el embarazo, parto y postparto.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ENFERMERÍA",
                    "areas_id" => 5,
                    "descripcion" => "Carrera enfocada en el cuidado de la salud de los pacientes, incluyendo atención primaria y preventiva.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "NUTRICIÓN",
                    "areas_id" => 5,
                    "descripcion" => "Carrera dedicada a la investigación y aplicación de principios alimenticios para mejorar la salud humana.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "TECNOLOGÍA MÉDICA",
                    "areas_id" => 5,
                    "descripcion" => "Carrera orientada a la aplicación de tecnologías médicas para diagnóstico y tratamiento de enfermedades.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "PSICOLOGÍA CLÍNICA",
                    "areas_id" => 5,
                    "descripcion" => "Carrera dedicada al diagnóstico y tratamiento de trastornos psicológicos y emocionales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "INGENIERÍA INFORMÁTICA",
                    "areas_id" => 6,
                    "descripcion" => "Carrera enfocada en el desarrollo de software, sistemas y redes informáticas para diversos sectores.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "INGENIERÍA ELECTRÓNICA",
                    "areas_id" => 6,
                    "descripcion" => "Carrera que abarca el diseño, desarrollo y mantenimiento de sistemas electrónicos, tanto en hardware como en software.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "INGENIERÍA DE SISTEMAS",
                    "areas_id" => 6,
                    "descripcion" => "Carrera que se centra en el diseño, implementación y gestión de sistemas informáticos para empresas y organizaciones.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "INGENIERÍA MECATRÓNICA",
                    "areas_id" => 6,
                    "descripcion" => "Carrera que combina la ingeniería mecánica, electrónica y de control, enfocándose en la automatización y los sistemas inteligentes.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "INGENIERÍA DE TELECOMUNICACIONES",
                    "areas_id" => 6,
                    "descripcion" => "Carrera centrada en el diseño y mantenimiento de sistemas de comunicación y redes, tanto a nivel nacional como internacional.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "INGENIERÍA DE SOFTWARE",
                    "areas_id" => 6,
                    "descripcion" => "Carrera especializada en el desarrollo y gestión de software, garantizando la calidad y funcionalidad en aplicaciones informáticas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "DANZA FOLCLÓRICA",
                    "areas_id" => 7,
                    "descripcion" => "Carrera dedicada al estudio y ejecución de danzas tradicionales y folklóricas de diferentes culturas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "BALLET",
                    "areas_id" => 7,
                    "descripcion" => "Carrera enfocada en la técnica y expresión del ballet clásico y moderno como una disciplina artística.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "DANZA MODERNA",
                    "areas_id" => 7,
                    "descripcion" => "Carrera orientada a las técnicas de la danza moderna, combinando estilos contemporáneos y de vanguardia.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "COREOGRAFÍA",
                    "areas_id" => 7,
                    "descripcion" => "Carrera dedicada a la creación y dirección de coreografías para diferentes disciplinas de danza y presentaciones artísticas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ARTE DRAMÁTICO: ACTOR - ACTRIZ",
                    "areas_id" => 7,
                    "descripcion" => "Carrera enfocada en la formación de actores y actrices para el teatro, cine y televisión, desarrollando habilidades en interpretación.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "CANTANTE O SOLISTA",
                    "areas_id" => 7,
                    "descripcion" => "Carrera orientada a la formación vocal para la interpretación musical en diversas géneros y presentaciones.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "MÚSICO",
                    "areas_id" => 7,
                    "descripcion" => "Carrera dedicada al estudio, práctica y ejecución de diferentes instrumentos musicales y composición.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "PRODUCCIÓN DE CINE, RADIO Y TV",
                    "areas_id" => 7,
                    "descripcion" => "Carrera que aborda la creación, producción y gestión de contenidos para cine, televisión y medios radiales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "EDUCACIÓN ARTÍSTICO – MUSICAL",
                    "areas_id" => 7,
                    "descripcion" => "Carrera enfocada en la enseñanza de las artes musicales y su aplicación pedagógica en diversos niveles educativos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "ARQUITECTURA",
                    "areas_id" => 8,
                    "descripcion" => "Carrera enfocada en el diseño y planificación de espacios, estructuras y edificaciones, integrando estética y funcionalidad.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "DIRECCIÓN Y DISEÑO GRÁFICO",
                    "areas_id" => 8,
                    "descripcion" => "Carrera que abarca el diseño visual, creando soluciones gráficas para comunicar mensajes a través de imágenes, tipografías y colores.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "DISEÑO DE INTERIORES",
                    "areas_id" => 8,
                    "descripcion" => "Carrera orientada a la creación y optimización de espacios interiores, equilibrando estética, funcionalidad y confort.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "DISEÑO DE MODAS",
                    "areas_id" => 8,
                    "descripcion" => "Carrera dedicada al diseño y la creación de prendas de vestir, siguiendo tendencias y estilos, con enfoque en la creatividad y la innovación.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ANIMACIÓN DIGITAL",
                    "areas_id" => 8,
                    "descripcion" => "Carrera enfocada en la creación de personajes, entornos y efectos visuales mediante herramientas digitales, para cine, videojuegos y medios interactivos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "DIRECCIÓN Y GESTIÓN DE PROYECTOS DE VIDEOJUEGOS",
                    "areas_id" => 8,
                    "descripcion" => "Carrera orientada a la planificación, coordinación y supervisión de proyectos relacionados con el desarrollo de videojuegos, desde la idea inicial hasta su lanzamiento.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "DISEÑO DE VIDEOJUEGOS Y ENTRETENIMIENTO DIGITAL",
                    "areas_id" => 8,
                    "descripcion" => "Carrera dedicada a la creación y desarrollo de videojuegos, plataformas interactivas y contenido de entretenimiento digital.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "NOVELISTA",
                    "areas_id" => 9,
                    "descripcion" => "Carrera orientada a la creación literaria, con énfasis en la escritura de novelas que exploran diferentes géneros y estilos narrativos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "LITERATURA",
                    "areas_id" => 9,
                    "descripcion" => "Carrera dedicada al estudio de la literatura, abarcando análisis, crítica literaria y creación de obras literarias en diversos géneros.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "GUIONISTA DE TV O TEATRO",
                    "areas_id" => 9,
                    "descripcion" => "Carrera enfocada en la creación de guiones para televisión o teatro, desarrollando historias y diálogos que capturen al público.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "COMPOSITOR MUSICAL",
                    "areas_id" => 9,
                    "descripcion" => "Carrera dedicada a la creación, composición y arreglo de obras musicales para distintos medios, incluyendo cine, televisión, y producciones en vivo.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "FILOSOFÍA",
                    "areas_id" => 10,
                    "descripcion" => "Carrera dedicada al estudio de los fundamentos del pensamiento humano, abordando cuestiones éticas, epistemológicas y ontológicas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "LINGÜÍSTICA",
                    "areas_id" => 10,
                    "descripcion" => "Carrera centrada en el estudio del lenguaje humano, sus estructuras, sonidos, significados y su evolución a lo largo del tiempo.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "HISTORIA",
                    "areas_id" => 10,
                    "descripcion" => "Carrera orientada al estudio de los eventos pasados, analizando las causas y consecuencias de los procesos históricos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "GEOGRAFÍA",
                    "areas_id" => 10,
                    "descripcion" => "Carrera dedicada al estudio de los espacios geográficos, la interacción de los seres humanos con su entorno y los fenómenos naturales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ANTROPOLOGÍA",
                    "areas_id" => 10,
                    "descripcion" => "Carrera enfocada en el estudio de la humanidad, sus orígenes, evolución, y la diversidad cultural y social de las sociedades humanas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ARQUEOLOGÍA",
                    "areas_id" => 10,
                    "descripcion" => "Carrera orientada al estudio y análisis de las civilizaciones antiguas a través de sus restos materiales y monumentos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "SOCIOLOGÍA",
                    "areas_id" => 10,
                    "descripcion" => "Carrera que se dedica al estudio de la sociedad humana, sus estructuras, relaciones y comportamientos, buscando comprender fenómenos sociales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "TRABAJO SOCIAL",
                    "areas_id" => 11,
                    "descripcion" => "Carrera centrada en el apoyo a individuos, familias y comunidades, ayudando a mejorar su bienestar social y emocional.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "EDUCACIÓN: INICIAL",
                    "areas_id" => 11,
                    "descripcion" => "Carrera dedicada a la formación de los primeros educadores de niños en su etapa temprana, promoviendo su desarrollo integral.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "EDUCACIÓN: PRIMARIA",
                    "areas_id" => 11,
                    "descripcion" => "Carrera enfocada en la enseñanza básica a nivel primario, proporcionando a los niños las bases fundamentales para su educación futura.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "EDUCACIÓN: SECUNDARIA",
                    "areas_id" => 11,
                    "descripcion" => "Carrera orientada a la formación de maestros para la enseñanza en niveles secundarios, proporcionando herramientas para guiar el desarrollo de los adolescentes.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "PSICOLOGÍA EDUCATIVA",
                    "areas_id" => 11,
                    "descripcion" => "Carrera dedicada al estudio de los procesos de aprendizaje, comportamiento y desarrollo de los estudiantes en el entorno educativo.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "PSICÓLOGOS FORENSES",
                    "areas_id" => 11,
                    "descripcion" => "Carrera que combina el conocimiento psicológico con el ámbito legal, evaluando e interviniendo en situaciones legales y judiciales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "TEÓLOGOS",
                    "areas_id" => 11,
                    "descripcion" => "Carrera orientada al estudio profundo de la religión, sus doctrinas, prácticas y el impacto de la fe en las sociedades.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "SACERDOTES RELIGIOSOS – PASTORES",
                    "areas_id" => 11,
                    "descripcion" => "Carrera dirigida a la formación espiritual y pastoral, encargándose del cuidado y orientación religiosa de comunidades.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "ADMINISTRACIÓN DE EMPRESAS",
                    "areas_id" => 12,
                    "descripcion" => "Carrera orientada a la formación de líderes empresariales, capaces de gestionar y dirigir organizaciones de manera eficiente.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ADMINISTRACIÓN DE SERVICIOS",
                    "areas_id" => 12,
                    "descripcion" => "Carrera enfocada en la gestión de servicios, desde la creación hasta la entrega, buscando la satisfacción del cliente y la calidad.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ADMINISTRACIÓN HOTELERA",
                    "areas_id" => 12,
                    "descripcion" => "Carrera orientada a la gestión y operación de hoteles, cubriendo aspectos como la atención al cliente, gestión financiera y marketing.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "GASTRONOMÍA HOTELERÍA Y TURISMO",
                    "areas_id" => 12,
                    "descripcion" => "Carrera que integra la gastronomía, la hotelería y el turismo, con el objetivo de formar profesionales en la atención y gestión de servicios turísticos y alimentarios.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "DERECHO",
                    "areas_id" => 13,
                    "descripcion" => "Carrera enfocada en la interpretación, aplicación y defensa de las leyes en diversos ámbitos legales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "CIENCIAS POLÍTICAS",
                    "areas_id" => 13,
                    "descripcion" => "Carrera que estudia los sistemas políticos, las estructuras de poder y las relaciones internacionales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "ADMINISTRACIÓN DE EMPRESAS",
                    "areas_id" => 14,
                    "descripcion" => "Carrera enfocada en la gestión de recursos, toma de decisiones y optimización de procesos en empresas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "MARKETING ESTRATÉGICO E INNOVACIÓN",
                    "areas_id" => 14,
                    "descripcion" => "Carrera centrada en el análisis del mercado y la creación de estrategias de marketing innovadoras.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "DIRECCIÓN DE NEGOCIOS DIGITALES E INNOVACIÓN",
                    "areas_id" => 14,
                    "descripcion" => "Carrera enfocada en la gestión de negocios digitales, con énfasis en la innovación tecnológica y la transformación digital.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "COMUNICACIÓN AUDIOVISUAL MULTIMEDIA",
                    "areas_id" => 15,
                    "descripcion" => "Carrera enfocada en la creación y producción de contenidos multimedia para diferentes plataformas.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "FOTOGRAFÍA Y DIRECCIÓN DE LA IMAGEN",
                    "areas_id" => 15,
                    "descripcion" => "Carrera que enseña la captura, edición y dirección de la imagen fotográfica y audiovisual.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "PUBLICIDAD Y MARKETING DIGITAL",
                    "areas_id" => 15,
                    "descripcion" => "Carrera enfocada en la creación de estrategias publicitarias y marketing en el entorno digital.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "COMUNICACIÓN AUDIOVISUAL",
                    "areas_id" => 15,
                    "descripcion" => "Carrera centrada en la producción y difusión de contenidos audiovisuales para diferentes medios.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "FOTOGRAFÍA E IMAGEN DIGITAL",
                    "areas_id" => 15,
                    "descripcion" => "Carrera que enseña la técnica y creatividad en fotografía digital y la producción de imágenes visuales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "PUBLICIDAD Y MEDIOS DIGITALES",
                    "areas_id" => 15,
                    "descripcion" => "Carrera enfocada en el diseño y la gestión de campañas publicitarias en medios digitales.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "CINEMATOGRAFÍA",
                    "areas_id" => 15,
                    "descripcion" => "Carrera que estudia la producción y dirección de películas y contenido audiovisual.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "CONTABILIDAD",
                    "areas_id" => 16,
                    "descripcion" => "Carrera enfocada en el registro, análisis y control de las finanzas de una empresa.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ECONOMÍA",
                    "areas_id" => 16,
                    "descripcion" => "Carrera que estudia los principios, las políticas y la gestión de los recursos económicos a nivel micro y macro.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "FINANZAS",
                    "areas_id" => 16,
                    "descripcion" => "Carrera que se centra en la gestión y planificación de los recursos financieros de empresas y organizaciones.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "ESTADÍSTICA",
                    "areas_id" => 16,
                    "descripcion" => "Carrera enfocada en el análisis y la interpretación de datos numéricos para la toma de decisiones.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                [
                    "nombre" => "SECRETARIADO",
                    "areas_id" => 17,
                    "descripcion" => "Carrera enfocada en el manejo administrativo y organizativo de tareas dentro de una oficina o empresa.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
                [
                    "nombre" => "BIBLIOTECOLOGÍA",
                    "areas_id" => 17,
                    "descripcion" => "Carrera que estudia la gestión, conservación y organización de información en bibliotecas y archivos.",
                    "imagen" => "carreras/diseño/arquitectura_de_interiores.jpg"
                ],
            ];

        Carrera::insert($carreras);

//        $carreraTrabajo = [
//            [
//                "carrera_id" => 1,
//                "trabajo" => "Empresas de construcción y mobiliarias"
//            ],
//            [
//                "carrera_id" => 1,
//                "trabajo" => "Empresas retail y/o tiendas por departamento"
//            ],
//            [
//                "carrera_id" => 1,
//                "trabajo" => "Departamento de diseño y arquitectura de empresas"
//            ],
//            [
//                "carrera_id" => 1,
//                "trabajo" => "Estudios y talleres de diseño interior"
//            ],
//            [
//                "carrera_id" => 1,
//                "trabajo" => "Talleres y tiendas de mobiliario"
//            ],
//            [
//                "carrera_id" => 1,
//                "trabajo" => "Desarrollo de empresa propia"
//            ],
//            [
//                "carrera_id" => 1,
//                "trabajo" => "Trabajo de consultorías y freelance"
//            ],
//            [
//                "carrera_id" => 2,
//                "trabajo" => "Agencias de publicidad ATL, BTL y digitales"
//            ],
//            [
//                "carrera_id" => 2,
//                "trabajo" => "Empresas de marketing, comunicación y servicios publicitarios"
//            ],
//            [
//                "carrera_id" => 2,
//                "trabajo" => "Desarrollo de empresa propia, trabajo de consultorías y freelance"
//            ],
//            [
//                "carrera_id" => 2,
//                "trabajo" => "Casas realizadoras"
//            ],
//            [
//                "carrera_id" => 2,
//                "trabajo" => "Estudios de diseño"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Empresas de coolhunting y forecasting"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Empresas de diseño y desarrollo de envases y empaques"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Laboratorios de fabricación o prototipado digital"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Emprendimiento personal"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Departamentos de innovación en todo tipo de empresas"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Empresas de producción industrial de consumo masivo"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Estudios de diseño de producto y diseño industrial"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Talleres y empresas de diseño de mobiliario"
//            ],
//            [
//                "carrera_id" => 3,
//                "trabajo" => "Consultoría de diseño"
//            ],
//            [
//                "carrera_id" => 4,
//                "trabajo" => "Productoras y realizadoras audiovisuales para cine y TV"
//            ],
//            [
//                "carrera_id" => 4,
//                "trabajo" => "Empresa de desarrollo de productos multimedia y digitales"
//            ],
//            [
//                "carrera_id" => 4,
//                "trabajo" => "Agencias de publicidad ATL/BTL y digitales"
//            ],
//            [
//                "carrera_id" => 4,
//                "trabajo" => "Consultoras de negocios de innovación digital"
//            ],
//            [
//                "carrera_id" => 4,
//                "trabajo" => "Desarrollo de empresa propia, trabajo de consultorías y freelance"
//            ],
//            [
//                "carrera_id" => 5,
//                "trabajo" => "Estudios de Animación"
//            ],
//            [
//                "carrera_id" => 5,
//                "trabajo" => "Distribuidoras de videojuegos"
//            ],
//            [
//                "carrera_id" => 5,
//                "trabajo" => "Empresas de desarrollo de juegos y/o de aplicaciones multimedia"
//            ],
//            [
//                "carrera_id" => 5,
//                "trabajo" => "Agencias de diseño de proyectos web"
//            ],
//            [
//                "carrera_id" => 5,
//                "trabajo" => "Empresas de publicidad"
//            ],
//            [
//                "carrera_id" => 6,
//                "trabajo" => "Empresas de diseño, indumentaria y accesorios"
//            ],
//            [
//                "carrera_id" => 6,
//                "trabajo" => "Asesoría y consultoría de diseño, moda o imagen, styling"
//            ],
//            [
//                "carrera_id" => 6,
//                "trabajo" => "Empresas de marketing, comunicación y servicios publicitarios"
//            ],
//            [
//                "carrera_id" => 6,
//                "trabajo" => "Empresas de producción industrial en el sector de indumentaria, textil y/o accesorios"
//            ],
//            [
//                "carrera_id" => 6,
//                "trabajo" => "Talleres y tiendas de mobiliario"
//            ],
//            [
//                "carrera_id" => 6,
//                "trabajo" => "Desarrollo de empresa propia, trabajo de consultorías y freelance"
//            ],
//            [
//                "carrera_id" => 6,
//                "trabajo" => "Tiendas comerciales locales y/o transnacionales de indumentaria y accesorios del sector retail"
//            ],
//            [
//                "carrera_id" => 7,
//                "trabajo" => "Agencias de publicidad ATL, BTL y digitales"
//            ],
//            [
//                "carrera_id" => 7,
//                "trabajo" => "Empresas de marketing, comunicación y servicios publicitarios"
//            ],
//            [
//                "carrera_id" => 7,
//                "trabajo" => "Desarrollo de empresa propia, trabajo de consultorías y freelance"
//            ],
//            [
//                "carrera_id" => 7,
//                "trabajo" => "Casas realizadoras"
//            ],
//            [
//                "carrera_id" => 7,
//                "trabajo" => "Estudios de diseño"
//            ],
//            [
//                "carrera_id" => 8,
//                "trabajo" => "Emprendimiento propio, consultoría y/o freelance"
//            ],
//            [
//                "carrera_id" => 8,
//                "trabajo" => "Creación de nuevos productos y/o startups"
//            ],
//            [
//                "carrera_id" => 8,
//                "trabajo" => "Agencias de publicidad ATL, BTL y digitales"
//            ],
//            [
//                "carrera_id" => 8,
//                "trabajo" => "Centrales de medios y/o agencias de medios"
//            ],
//            [
//                "carrera_id" => 8,
//                "trabajo" => "Departamentos de publicidad y marketing de empresas"
//            ],
//            [
//                "carrera_id" => 8,
//                "trabajo" => "Área de medios y post producción en agencias de publicidad"
//            ],
//            [
//                "carrera_id" => 8,
//                "trabajo" => "Medios de comunicación tradicionales y online"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Organizaciones transnacionales"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Curaduría de exposiciones fotográficas"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Estudios de fotografía y agencias de moda"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Agencias de publicidad y marketing"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Empresa propia"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Diarios, revistas especializadas y medios digitales"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Productoras audiovisuales de eventos"
//            ],
//            [
//                "carrera_id" => 9,
//                "trabajo" => "Empresas privadas y públicas"
//            ],
//            [
//                "carrera_id" => 10,
//                "trabajo" => "Canales de televisión, cable y streaming"
//            ],
//            [
//                "carrera_id" => 10,
//                "trabajo" => "Productoras audiovisuales y eventos"
//            ],
//            [
//                "carrera_id" => 10,
//                "trabajo" => "Áreas de comunicación en empresas privadas y públicas"
//            ],
//            [
//                "carrera_id" => 10,
//                "trabajo" => "Agencias de comunicación, relaciones públicas y publicidad"
//            ],
//            [
//                "carrera_id" => 10,
//                "trabajo" => "Empresas cinematográficas"
//            ],
//            [
//                "carrera_id" => 10,
//                "trabajo" => "Formación de empresas propias o desarrollo de contenidos para web"
//            ],
//            [
//                "carrera_id" => 11,
//                "trabajo" => "Productoras y distruibuidoras de cine"
//            ],
//            [
//                "carrera_id" => 11,
//                "trabajo" => "Canales y programas de TV"
//            ],
//            [
//                "carrera_id" => 11,
//                "trabajo" => "Productoras teatrales y de espectáculos"
//            ],
//            [
//                "carrera_id" => 11,
//                "trabajo" => "Empresas de post-producción, animación y efectos visuales"
//            ],
//            [
//                "carrera_id" => 11,
//                "trabajo" => "Emprendimiento propio"
//            ],
//            [
//                "carrera_id" => 11,
//                "trabajo" => "Plataformas multipantalla: canales de cable o streaming"
//            ],
//            [
//                "carrera_id" => 12,
//                "trabajo" => "Áreas de marketing, comerciales e innovación"
//            ],
//            [
//                "carrera_id" => 12,
//                "trabajo" => "Áreas de nuevos productos o servicios"
//            ],
//            [
//                "carrera_id" => 12,
//                "trabajo" => "Consultoría en marketing e innovación"
//            ],
//            [
//                "carrera_id" => 12,
//                "trabajo" => "Empresas que brindan servicios de cambio e innovación para el área comercial"
//            ],
//            [
//                "carrera_id" => 12,
//                "trabajo" => "Emprendimiento personal"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Áreas de desarrollo de nuevos negocios e innovación"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Áreas de compras"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Consultorías y desarrollo de negocio propio"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Empresas de investigación de mercados"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Área de business intelligence"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Áreas de gestión humana"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Área de responsabilidad social"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Áreas de coolhuntin y forecasting"
//            ],
//            [
//                "carrera_id" => 13,
//                "trabajo" => "Áreas de proyectos de inersión y banca"
//            ],
//            [
//                "carrera_id" => 14,
//                "trabajo" => "Empresas o Departamentos de Marketing"
//            ],
//            [
//                "carrera_id" => 14,
//                "trabajo" => "Áreas de desarrollo digital"
//            ],
//            [
//                "carrera_id" => 14,
//                "trabajo" => "Consultoría y desarrollo de negocio propio"
//            ],
//            [
//                "carrera_id" => 14,
//                "trabajo" => "Áreas de e-Commerce"
//            ],
//            [
//                "carrera_id" => 14,
//                "trabajo" => "Áreas de marketing digital"
//            ],
//            [
//                "carrera_id" => 14,
//                "trabajo" => "Áreas de innovación Incubadora de Marketing"
//            ],
//            [
//                "carrera_id" => 14,
//                "trabajo" => "Áreas de gestión estratégica y desarrollo de proyectos"
//            ],
//        ];
//
//        CarreraTrabajo::insert($carreraTrabajo);
    }
}
