/**
 * EL SALMO PROHIBIDO DE LA PROSPERIDAD - BASE DE DATOS DEVOCIONAL Y CONTENIDO
 * Textos sagrados, manuscritos de 1930, oráculo angélico, bonos y devocionario de 60 días.
 * Idioma: Español Neutro (Devocional Solemne y Acolhedor)
 */

const SACRED_DATA = {
  // --- SALMO PROHIBIDO PRINCIPAL ---
  salmo: {
    titulo: "El Salmo Prohibido de la Prosperidad",
    subtitulo: "Frecuencia Inversa Redescubierta en San Giovanni Rotondo (1930)",
    frecuenciaBase: "528 Hz (Frecuencia de Sanación Áurea y Transmutación)",
    tiempoEstimado: "7 minutos diarios",
    versos: [
      {
        num: 1,
        latin: "In te, Domine, speravi; non confundar in aeternum in iustitia tua.",
        espanol: "En ti, Señor de los Ejércitos, he depositado mi esperanza; que el ruido del mundo jamás confunda mi espíritu, pues tu justicia es muro inexpugnable ante toda escasez.",
        guia: "Inhala profundamente. Siente cómo la frecuencia disuelve la pesadumbre del pecho."
      },
      {
        num: 2,
        latin: "Exsurge, Michael Princeps Gloriosissime, et dissipa tenebras inopiae.",
        espanol: "Levántate, San Miguel, Príncipe Gloriosísimo del Cielo: desciende con tu espada de fuego azul y corta toda atadura invisible, toda estática y toda interferencia que bloquea la providencia en mi hogar.",
        guia: "Visualiza un rayo de luz dorada penetrando tu hogar y limpiando toda energía de deuda."
      },
      {
        num: 3,
        latin: "Non timebis a timore nocturno, a sagitta volante in die, a negotio perambulante in tenebris.",
        espanol: "No temeré al terror de las deudas inesperadas, ni a la saeta del gasto imprevisto, ni a la plaga de la ruina que camina en la oscuridad; mil caerán a mi lado, mas a mi morada no se acercará.",
        guia: "Exhala con fuerza soltando el miedo al futuro económico."
      },
      {
        num: 4,
        latin: "Aperi, Domine, cataractas coeli, et effunde super nos benedictionem copiosam.",
        espanol: "Abre, Señor, las cataratas del cielo sobre mis manos y mi trabajo. Que lo poco se multiplique como los panes y los peces, y que la abundancia fluya limpia como río de agua viva.",
        guia: "Abre las palmas de tus manos hacia arriba en señal de santa receptividad."
      },
      {
        num: 5,
        latin: "Sub alis Archangeli requiescit anima mea; omnis aerumnosa unda cessabit.",
        espanol: "Bajo las alas del Santo Arcángel descansa mi alma atribulada. Todo rumor de ruina cesa, todo teléfono amenazante enmudece y la paz de Cristo toma el gobierno de mis finanzas.",
        guia: "Repite mentalmente: Mi casa está bajo el amparo celestial."
      },
      {
        num: 6,
        latin: "Quoniam angelis suis mandabit de te, ut custodiant te in omnibus viis tuis.",
        espanol: "Porque a sus santos Ángeles mandará cerca de ti, para que te guíen en toda decisión, abran puertas donde los hombres cerraron candados y restauren lo que los años de langosta devoraron.",
        guia: "Siente el calor en tu corazón: una señal de que tu Ángel Guardián está activo."
      },
      {
        num: 7,
        latin: "Fides mea scutum est; fons providientiae numquam exhaurietur.",
        espanol: "Mi fe es escudo impenetrable. La fuente divina nunca se agota; donde ayer había sequía y preocupación, hoy brotan los manantiales de la bendición inagotable.",
        guia: "Agradece por adelantado el milagro económico que ya viene en camino."
      },
      {
        num: 8,
        latin: "Fiat, fiat, amen. In nomine Patris, et Filii, et Spiritus Sancti.",
        espanol: "Que así sea sellado en el Cielo y en la Tierra. Ninguna interferencia humana o terrenal podrá romper este pacto. Amén. Amén. Amén.",
        guia: "Permanece 30 segundos en silencio receptivo mientras la vibración se asienta."
      }
    ]
  },

  // --- MANUSCRITO HISTÓRICO DE 1930 ---
  manuscrito: {
    origen: "Convento de Santa Maria delle Grazie, San Giovanni Rotondo (Foggia, Italia)",
    fechaDescubrimiento: "12 de Octubre de 1930",
    custodioOriginal: "Padre Pío de Pietrelcina y Fray Leone de Monte Sant'Angelo",
    contextoHistorico: `En el otoño de 1930, en medio de la gran crisis económica que sacudió a Europa, el humilde fraile de Pietrelcina recibió a un anciano monje custodio del Santuario de San Miguel en el Monte Gargano.

Aquel monje traía un pergamino del siglo VIII escrito en latín antiguo con anotaciones musicales en tetragrama gregoriano. El texto revelaba una advertencia profética: en los tiempos venideros, el aire del mundo se llenaría de "voces invisibles de metal y chispas eléctricas" (la interferencia electromagnética moderna) que ensordecerían el oído espiritual de los hombres.

Para romper este muro de estática, los antiguos monjes no gritaban más fuerte: usaban la 'Frecuencia Inversa', una cadencia acústica de 528 Hz y armónicos sagrados que neutraliza la disonancia terrenal y abre un túnel directo hacia el Arcángel San Miguel. Padre Pío aconsejó rezarlo y escucharlo a puerta cerrada, asegurando: "Quien sintonice esta vibración sagrada no conocerá la quiebra ni la humillación de la mesa vacía".`,
    declaracionAutenticidad: "Transcripción fiel preservada de los archivos devocionales de San Giovanni Rotondo. Prohibida su alteración o uso frívolo."
  },

  // --- BONO 1: EL LLAMADO DE MI ÁNGEL ($27) ---
  bono1: {
    titulo: "El Llamado de Mi Ángel",
    subtitulo: "Guía de Conexión Directa e Identificación de Señales del Arcángel Miguel",
    valorOriginal: "$27 USD (Incluido Gratis)",
    descripcion: "Aprende a reconocer cuándo tu Ángel te está advirtiendo de un peligro financiero o guiándote hacia una oportunidad providencial.",
    capitulos: [
      {
        titulo: "1. La Verdad Oculta de tu Custodio Celestial",
        contenido: `Desde el instante de tu concepción, se te asignó un Arcángel custodio de la legión de San Miguel. Él no duerme, no se cansa y conoce cada factura, cada dolor y cada lágrima que has derramado por la noche.

Sin embargo, el 98% de las personas nunca reciben su ayuda porque intentan comunicarse a través de la queja y la angustia. La queja vibra en la frecuencia de la escasez. Cuando activas el Salmo en Frecuencia Inversa, limpias el canal y permites que tu Ángel asuma la batalla por ti.`
      },
      {
        titulo: "2. Las 5 Señales Inequívocas de San Miguel en tu Hogar",
        contenido: `San Miguel se comunica a través de señales físicas en tu entorno cotidiano. Aprende a distinguirlas:
• Una pluma blanca o clara en un lugar inesperado (automóvil, pasillo, billetera).
• Un aroma súbito a rosas frescas o incienso sin causa natural (el perfume místico del Padre Pío).
• Un calor repentino y consolador en el centro del pecho en momentos de máxima incertidumbre.
• Sincronías numéricas repetitivas (como 333, 444, 528 o 777 en boletas, horas y números de cuenta).
• Una sensación de alivio instantáneo que borra la opresión de las deudas sin explicación lógica.`
      },
      {
        titulo: "3. La Invocación Matutina de Protección Áurea",
        contenido: `Cada mañana, antes de mirar tu teléfono celular, coloca tu mano derecha en tu pecho y di en voz baja:
"San Miguel adelante, San Miguel atrás, San Miguel a mi derecha, San Miguel a mi izquierda. Con tu espada bendita corta hoy todo gasto imprevisto, todo engaño humano y abre las puertas del trabajo bien recompensado. Amén."`
      }
    ],
    oraculo: [
      {
        id: 1,
        titulo: "La Espada de Fuego Azul",
        simbolo: "⚔️",
        significado: "Corte Inmediato de Ataduras Financieras",
        mensaje: "San Miguel está cortando una sangría de dinero invisible en tu vida. Una deuda o gasto parasitario está a punto de disolverse. Mantén la calma y no tomes decisiones precipitadas por miedo.",
        accion: "Hoy no te quejes de ningún precio. Bendice cada moneda que salga de tus manos.",
        versiculo: "Éxodo 14:14 — El Señor peleará por vosotros, y vosotros estaréis tranquilos."
      },
      {
        id: 2,
        titulo: "La Pluma de la Providencia",
        simbolo: "🪶",
        significado: "Llegada de una Ayuda Inesperada",
        mensaje: "Recibirás una respuesta positiva de donde menos lo imaginas. Alguien recordará una deuda contigo o se abrirá una vía de ingresos que creías cerrada.",
        accion: "Revisa tus documentos y papeles importantes; hay algo olvidado que vale dinero o alivio.",
        versiculo: "Salmo 91:4 — Con sus plumas te cubrirá, y debajo de sus alas estarás seguro."
      },
      {
        id: 3,
        titulo: "El Escudo de Bronce Celestial",
        simbolo: "🛡️",
        significado: "Protección Contra la Envidia y Mal de Ojo",
        mensaje: "Las malas miradas de personas cercanas han querido entorpecer tu prosperidad. El escudo de San Miguel ha sido puesto sobre tu puerta. Su mala energía se devuelve transmutada en bendición para ti.",
        accion: "Mantén en secreto tus próximos planes económicos. La bendición ama el silencio.",
        versiculo: "Isaías 54:17 — Ninguna arma forjada contra ti prosperará."
      },
      {
        id: 4,
        titulo: "La Balanza de la Justicia Divina",
        simbolo: "⚖️",
        significado: "Compensación de Todo lo que te Arrebataron",
        mensaje: "El cielo ha visto las injusticias que has sufrido: negocios mal pagados, préstamos no devueltos, esfuerzos no valorados. Se acerca el tiempo de la retribución al triple.",
        accion: "Escribe en un papel las deudas que otros tienen contigo y entrégalas a San Miguel.",
        versiculo: "Jeremías 29:11 — Porque yo sé los pensamientos que tengo acerca de vosotros, pensamientos de paz y no de mal."
      },
      {
        id: 5,
        titulo: "El Cáliz de la Gracia Inagotable",
        simbolo: "🏆",
        significado: "Multiplicación de la Despensa y el Pan",
        mensaje: "Así como la viuda de Sarepta nunca vio agotarse su tinaja de aceite, tu refrigerador y tu mesa no conocerán la escasez. Dios bendice el sustento de los suyos.",
        accion: "Regala un kilo de alimento no perecedero o ayuda con pan a quien tenga hambre hoy.",
        versiculo: "Filipenses 4:19 — Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria."
      },
      {
        id: 6,
        titulo: "La Llave de Oro del Rey Salomón",
        simbolo: "🔑",
        significado: "Puertas Cerradas que se Abren de Golpe",
        mensaje: "Un trámite, herencia, crédito justo o venta que estaba congelada por trabas burocráticas recibirá una orden divina de desbloqueo en los próximos días.",
        accion: "Pronuncia tres veces: 'Donde el hombre dice no, Dios dice hoy se abre'.",
        versiculo: "Apocalipsis 3:8 — He puesto delante de ti una puerta abierta, la cual nadie puede cerrar."
      }
    ]
  },

  // --- BONO 2: EL MANTO DE SAN JOSÉ ($37) ---
  bono2: {
    titulo: "El Manto de San José",
    subtitulo: "Protocolo de 7 Pasos de Blindaje Financiero y Protección del Hogar",
    valorOriginal: "$37 USD (Incluido Gratis)",
    descripcion: "La fórmula milenaria de los artesanos galileos para erradicar las emergencias destructivas y consagrar los ingresos de la familia.",
    pasos: [
      {
        numero: 1,
        titulo: "El Sello del Umbral",
        detalle: "San José fue el custodio y protector físico del Niño Dios y la Virgen María. Cada noche, bendice la puerta de entrada de tu hogar diciendo: 'Bajo el manto del humilde carpintero, ningún ladrón de paz, de salud ni de dinero cruzará este umbral'.",
        practica: "Toca con tu mano el marco de tu puerta principal mientras lo declaras."
      },
      {
        numero: 2,
        titulo: "La Sanación del Dinero Heredado",
        detalle: "Muchos crecieron escuchando 'el dinero es sucio' o 'nosotros nacimos pobres y moriremos pobres'. Esas frases son maldiciones invisibles. Escribe estas falsedades y quémalas simbólicamente, sustituyéndolas por la verdad: 'El oro y la plata son del Señor'.",
        practica: "Destruye mentalmente los límites de escasez impuestos por tus antepasados."
      },
      {
        numero: 3,
        titulo: "La Alacena de Nazaret",
        detalle: "Nunca permitas que tu salero o tu recipiente de azúcar queden totalmente vacíos. En la tradición bíblica, guardar un puñado de sal bendecida en la cocina simboliza la alianza perpetua de abundancia que no se desvanece.",
        practica: "Revisa tu cocina y mantén siempre reservas ordenadas con gratitud."
      },
      {
        numero: 4,
        titulo: "El Blindaje contra Gastos Imprevistos",
        detalle: "Antes de pagar cualquier cuenta urgente (un mecánico, un médico, una avería), bendice el dinero diciendo: 'Va con tristeza, regresa con alegría multiplicado por diez'. San José intercede para que las averías domésticas no sean recurrentes.",
        practica: "Haz la señal de la cruz sobre tus recibos antes de pagarlos."
      },
      {
        numero: 5,
        titulo: "La Consagración de la Herramienta de Trabajo",
        detalle: "Sea un computador, un teléfono, un delantal, unas llaves o un automóvil: todo lo que usas para ganar el sustento debe ser bendecido con el Manto de San José para que nunca falle en el momento clave.",
        practica: "Pon tus manos sobre tu herramienta laboral y pide destreza y clientela honorable."
      },
      {
        numero: 6,
        titulo: "El Escudo contra Deudas Usureras",
        detalle: "Si estás atrapado en préstamos abusivos o intereses asfixiantes, encomienda esa deuda específica a San José 'Terror de los Demonios'. Pide que se abran acuerdos de pago compasivos y plazos que puedas asumir sin asfixiar a tu familia.",
        practica: "Enciende la vela del Altar y anota el monto exacto de la deuda con nombre del acreedor."
      },
      {
        numero: 7,
        titulo: "La Consagración Total de la Familia",
        detalle: "Reza la novena corta de San José cada mes. Una familia amparada bajo su manto no pasa vergüenza pública ni hambre jamás.",
        practica: "Repite: 'San José custodio de la divina providencia, vela por mi casa y mi sustento'."
      }
    ],
    checklistHogar: [
      { id: "chk1", texto: "Puerta principal del hogar consagrada con la bendición del umbral." },
      { id: "chk2", texto: "Billetera y cartera libres de recibos viejos, boletos rotos o desorden." },
      { id: "chk3", texto: "Alacena limpia y provista con símbolo de grano y sal perpetua." },
      { id: "chk4", texto: "Herramienta principal de sustento / trabajo bendecida con oración." },
      { id: "chk5", texto: "Lista de deudas prioritarias depositada con fe en el Altar de San Miguel." },
      { id: "chk6", texto: "Pacto de no quejarse por 7 días consecutivos completado." },
      { id: "chk7", texto: "Oración de la noche realizada junto a la familia o en silencio devoto." }
    ]
  },

  // --- BONO 3: LAS 3 PALABRAS ANTES DE DORMIR ($27) ---
  bono3: {
    titulo: "Las 3 Palabras Antes de Dormir",
    subtitulo: "Ritual Nocturno de Activación Subconsciente y Paz Profunda",
    valorOriginal: "$27 USD (Incluido Gratis)",
    descripcion: "El secreto que Padre Pío enseñaba a los peregrinos agobiados por el insomnio y la angustia de las deudas para despertar con soluciones claras.",
    palabras: [
      {
        latina: "FÍAT",
        traduccion: "Hágase la Voluntad Divina",
        profundidad: "La primera palabra apaga la arrogancia del ego que cree que debe resolverlo todo solo. Al decir 'Fíat', desarmas la angustia que sube tu presión arterial. Dices: 'Señor, hoy hice lo humanamente posible; lo imposible te pertenece a ti'.",
        instruccion: "Pronúnciala respirando hondo al acostar tu cabeza en la almohada."
      },
      {
        latina: "CUSTÓDI",
        traduccion: "Guarda y Protege",
        profundidad: "La segunda palabra convoca el campamento de Ángeles alrededor de tu cama. Impide que las pesadillas de ruina, el miedo al día siguiente o la estática electromagnética de los teléfonos penetren tu mente en el sueño delta.",
        instruccion: "Pronúnciala cerrando suavemente los ojos, relajando la mandíbula y los hombros."
      },
      {
        latina: "TRÁNSFERO",
        traduccion: "Transfiero la Carga",
        profundidad: "La tercera palabra es la orden mística de entrega: 'Transfiero mis deudas, mis dudas y mis batallas a la bóveda inagotable de Dios'. La mente no se duerme buscando soluciones ansiosas, sino descansando en la certeza de que ya fueron resueltas.",
        instruccion: "Pronúnciala en un suspiro suave antes de entrar en el sueño profundo."
      }
    ],
    ritualPasos: [
      "1. Apaga la luz de la habitación y desconecta o aleja el celular al menos a 2 metros de tu almohada.",
      "2. Activa el modo de audio nocturno (frecuencia relajante a volumen suave).",
      "3. Coloca una mano sobre tu corazón y otra sobre tu vientre.",
      "4. Susurra con devoción: FÍAT... CUSTÓDI... TRÁNSFERO.",
      "5. Si despiertas a las 3:00 a.m. con sobresalto, no mires la hora: repite mentalmente CUSTÓDI y duérmete en paz."
    ]
  },

  // --- DEVOCIONARIO DE LOS 60 DÍAS (LOCK-IN ANTI-REEMBOLSO) ---
  jornada60Dias: [
    // FASE 1: DÍAS 1-7 (Limpieza de Estática y Desbloqueo)
    { dia: 1, fase: 1, titulo: "El Despertar de la Frecuencia", versiculo: "Salmo 34:17", citaPadrePio: "Reza, ten fe y no te preocupes. La preocupación es inútil.", tarea: "Escucha el Salmo completo en Frecuencia Inversa y enciende tu primera vela en el Altar." },
    { dia: 2, fase: 1, titulo: "Disolución de la Estática", versiculo: "Isaías 41:10", citaPadrePio: "¿No sabes que Dios se ocupa de ti más que tú mismo?", tarea: "Pasa 5 minutos sin mirar pantallas tras escuchar el Salmo." },
    { dia: 3, fase: 1, titulo: "El Escudo del Arcángel", versiculo: "Salmo 91:11", citaPadrePio: "Tu ángel custodio nunca te abandona; habla con él a menudo.", tarea: "Consulta el Oráculo de Señales de San Miguel para hoy." },
    { dia: 4, fase: 1, titulo: "Corte de Lazos de Deuda", versiculo: "Proverbios 3:5-6", citaPadrePio: "La oración es la mejor arma que tenemos; es una llave que abre el corazón de Dios.", tarea: "Escribe tu mayor carga económica en el Altar de Peticiones." },
    { dia: 5, fase: 1, titulo: "Purificación del Hogar", versiculo: "Josué 24:15", citaPadrePio: "Que la paz de Jesús reine siempre en tu corazón y en tu familia.", tarea: "Realiza el Sello del Umbral en la puerta principal de tu casa." },
    { dia: 6, fase: 1, titulo: "El Silencio Sagrado", versiculo: "1 Reyes 19:12", citaPadrePio: "En el murmullo de la brisa suave, allí está Dios.", tarea: "Escucha el Salmo con auriculares para una inmersión acústica total." },
    { dia: 7, fase: 1, titulo: "Sello de los Primeros 7 Días", versiculo: "Génesis 2:2", citaPadrePio: "Has dado el paso más difícil: salir de la duda. Ahora comienza la cosecha.", tarea: "¡Primer gran hito cumplido! Desbloqueas la Medalla de San Miguel de los 7 Días." },

    // FASE 2: DÍAS 8-21 (Apertura de Caminos Financieros y Hábitos Áureos)
    { dia: 8, fase: 2, titulo: "La Semilla de la Confianza", versiculo: "Lucas 17:6", citaPadrePio: "La fe mueve montañas porque no mira el tamaño del problema, sino a Dios.", tarea: "Bendice mentalmente a tres personas que hoy te cobren o te atiendan." },
    { dia: 9, fase: 2, titulo: "El Perfume de Rosas", versiculo: "2 Corintios 2:15", citaPadrePio: "Mi perfume es una señal de que estoy rezando a tu lado ante el Sagrario.", tarea: "Presta atención a aromas súbitos de flores o paz inexplicable." },
    { dia: 10, fase: 2, titulo: "La Sanación de los Recuerdos", versiculo: "Filipenses 3:13", citaPadrePio: "Olvida el pasado; confíalo a la misericordia divina.", tarea: "Perdona a quien te haya defraudado económicamente en el pasado." },
    { dia: 11, fase: 2, titulo: "La Mesa Proveedora", versiculo: "Salmo 23:5", citaPadrePio: "El Señor prepara tu mesa incluso en presencia de tus angustias.", tarea: "Agradece por cada bocado en tu mesa hoy antes de comer." },
    { dia: 12, fase: 2, titulo: "La Sabiduría de San José", versiculo: "Mateo 1:24", citaPadrePio: "Ama a San José; él cuidará de tus recursos con maestría de artesano.", tarea: "Lee el Paso 4 del Manto de San José sobre blindaje de gastos." },
    { dia: 13, fase: 2, titulo: "El Sueño Reparador", versiculo: "Salmo 4:8", citaPadrePio: "En paz me acostaré y asimismo dormiré, porque solo tú me haces vivir confiado.", tarea: "Aplica las 3 Palabras antes de dormir (Fíat, Custódi, Tránsfero)." },
    { dia: 14, fase: 2, titulo: "La Fortaleza de las Dos Semanas", versiculo: "Efesios 6:10", citaPadrePio: "Manténte firme. El enemigo intenta tentar con impaciencia cuando el milagro está cerca.", tarea: "Desbloqueas el Sello de Fortaleza de los 14 Días." },
    { dia: 15, fase: 2, titulo: "La Multiplicación del Esfuerzo", versiculo: "Juan 6:11", citaPadrePio: "Da lo poco que tienes a Jesús; Él sabe cómo saciar a la multitud.", tarea: "Bendice tu billetera y tus medios de pago con una breve oración." },
    { dia: 16, fase: 2, titulo: "El Escudo de la Verdad", versiculo: "Juan 8:32", citaPadrePio: "La verdad os hará libres de toda trampa de engaño.", tarea: "Evita hablar de deudas o escasez durante todo el día de hoy." },
    { dia: 17, fase: 2, titulo: "Llamada a la Providencia", versiculo: "Mateo 7:7", citaPadrePio: "Pide con humildad y con perseverancia infantil; el Padre no da piedras por pan.", tarea: "Escucha el Salmo en modo nocturno con el timer en 15 minutos." },
    { dia: 18, fase: 2, titulo: "La Mirada del Ángel", versiculo: "Hebreos 1:14", citaPadrePio: "Los ángeles son servidores enviados para ayudar a los herederos de la salvación.", tarea: "Observa las sincronías y números que se repitan en tu jornada." },
    { dia: 19, fase: 2, titulo: "Liberación de la Envidia", versiculo: "Santiago 3:16", citaPadrePio: "Alégrate del bien del prójimo y tu propio bien se duplicará.", tarea: "Felicita con sinceridad el éxito financiero de un conocido." },
    { dia: 20, fase: 2, titulo: "La Vigilia de la Alianza", versiculo: "Habacuc 2:3", citaPadrePio: "Aunque la visión tarde, espérala; ciertamente vendrá y no tardará.", tarea: "Renueva tu vela votiva en el Altar para la gran consagración de mañana." },
    { dia: 21, fase: 2, titulo: "Consagración de los 21 Días — Hito Mayor", versiculo: "Daniel 10:12", citaPadrePio: "Desde el primer día que dispusiste tu corazón a entender, tus palabras fueron oídas.", tarea: "¡Has completado el ciclo biológico y espiritual de 21 días! El hábito áureo está sellado." },

    // FASE 3: DÍAS 22-40 (Blindaje, Crecimiento y Fidelidad)
    { dia: 22, fase: 3, titulo: "El Maná Diario", versiculo: "Éxodo 16:4", citaPadrePio: "Dios da el pan para cada día. No cargues con el de mañana hoy.", tarea: "Apunta un testimonio o señal pequeña recibida hasta hoy." },
    { dia: 25, fase: 3, titulo: "Paz en la Tormenta", versiculo: "Marcos 4:39", citaPadrePio: "Jesús duerme en tu barca, pero jamás naufragarás.", tarea: "Escucha el Salmo con el corazón sereno ante cualquier noticia." },
    { dia: 30, fase: 3, titulo: "Primer Mes Cumplido (Treinta Días de Gracia)", versiculo: "Salmo 103:2", citaPadrePio: "Bendice, alma mía, al Señor, y no olvides ninguno de sus favores.", tarea: "Desbloqueas la Medalla de Plata del Padre Pío." },
    { dia: 35, fase: 3, titulo: "El Manto Extendido", versiculo: "Rut 3:9", citaPadrePio: "San José extiende su manto sobre quien trabaja con rectitud.", tarea: "Repasa el checklist del Manto de San José en la Bóveda." },
    { dia: 40, fase: 3, titulo: "La Cuarentena Sagrada", versiculo: "Mateo 4:2", citaPadrePio: "Tras el desierto de cuarenta días, los ángeles vinieron y le servían.", tarea: "Celebra haber roto todo patrón de abandono o pereza espiritual." },

    // FASE 4: DÍAS 41-60 (Consagración Eterna y Plenitud de la Garantía)
    { dia: 45, fase: 4, titulo: "Ríos de Agua Viva", versiculo: "Juan 7:38", citaPadrePio: "De tu interior brotarán soluciones y nuevas ideas de prosperidad.", tarea: "Toma nota de cualquier idea de negocio o ahorro que surja." },
    { dia: 50, fase: 4, titulo: "El Jubileo del Espíritu", versiculo: "Levítico 25:10", citaPadrePio: "El año de la gracia del Señor es hoy en tu vida.", tarea: "Comparte con una persona amada un consejo de paz sin criticar." },
    { dia: 55, fase: 4, titulo: "La Muralla de Fuego", versiculo: "Zacarías 2:5", citaPadrePio: "Yo seré para ella muro de fuego alrededor, dice el Señor.", tarea: "Revisa cuántos milagros pequeños han ocurrido desde el día 1." },
    { dia: 60, fase: 4, titulo: "Gran Coronación de la Consagración (Día 60)", versiculo: "2 Timoteo 4:7", citaPadrePio: "He peleado la buena batalla, he acabado la carrera, he guardado la fe.", tarea: "¡Consagración Absoluta! Has completado los 60 días de garantía divina. Tu canal celestial está permanentemente blindado." }
  ],

  // --- MEDALLAS DESBLOQUEABLES ---
  medallas: [
    { diaRequerido: 1, nombre: "Sello del Neófito", icono: "🌱", desc: "Primer paso hacia la purificación de la estática." },
    { diaRequerido: 3, nombre: "Voz en el Silencio", icono: "🕊️", desc: "Tres días de sintonía armónica con San Miguel." },
    { diaRequerido: 7, nombre: "Sello de los 7 Días", icono: "🔥", desc: "Primera semana completa: limpieza de interferencias." },
    { diaRequerido: 14, nombre: "Escudo de San Miguel", icono: "🛡️", desc: "Dos semanas de blindaje ininterrumpido en el hogar." },
    { diaRequerido: 21, nombre: "Pacto de los 21 Días", icono: "⚔️", desc: "Hábito espiritual sellado; caminos financieros abiertos." },
    { diaRequerido: 30, nombre: "Manto de San José", icono: "👑", desc: "Un mes de consagración total: providencia establecida." },
    { diaRequerido: 60, nombre: "Corona de Padre Pío", icono: "✨", desc: "Consagración Magna de los 60 Días cumplida a cabalidad." }
  ],

  // --- PREGUNTAS FRECUENTES Y ACOGIDA PASTORAL (HERMANA CLARA) ---
  faqPastoral: [
    {
      pregunta: "¿Por qué no he visto caer dinero del cielo en los primeros 3 días?",
      respuesta: "Querido hermano/a en la fe: Dios no es un cajero automático ni actúa mediante magia terrenal. El Padre Pío solía decir que antes de sembrar trigo nuevo, hay que retirar las piedras y las espinas del campo. Los primeros días de la Frecuencia Inversa limpian la estática electromagnética, calman el cortisol y detienen las sangrías invisibles de dinero. Ten paciencia: el fruto llega a quien persevera con paz en el corazón."
    },
    {
      pregunta: "¿Es pecado ante Dios pedir por abundancia y dinero?",
      respuesta: "No, en absoluto. Pedir por codicia o soberbia es vanidad, pero pedir para pagar tus deudas legítimas, dar un techo digno a tus hijos, tener salud y no depender de la humillación es santa justicia. San José fue carpintero y administró con honradez la casa de Jesús. Dios quiere hijos e hijas prósperos para que sean canales de bendición en la tierra."
    },
    {
      pregunta: "¿Qué hago si siento dudas, miedo o tentación de rendirme?",
      respuesta: "Esa duda es precisamente la estática espiritual queriendo que vuelvas a la vieja frecuencia del agobio. Cuando sientas ese impulso, no te aisles: abre el Altar, enciende tu vela, escucha el Salmo por 7 minutos y susurra las 3 Palabras: Fíat, Custódi, Tránsfero. Estamos orando contigo en comunidad espiritual."
    },
    {
      pregunta: "¿Tengo que rezar a una hora específica?",
      respuesta: "El Salmo es especialmente poderoso al despertar (para blindar la jornada antes de que el mundo te bombardee de noticias y preocupaciones) o justo antes de dormir (para activar la reprogramación en sueño delta). Sin embargo, cualquier momento en que sientas opresión es propicio."
    },
    {
      pregunta: "¿Cómo sé que el Arcángel San Miguel me ha escuchado?",
      respuesta: "La primera señal no suele ser un cheque en la puerta, sino una paz sobrenatural que desciende sobre tu pecho, eliminando la taquicardia y la angustia. A partir de esa paz, verás pequeñas sincronías: una factura que se pospone con gracia, una llamada de trabajo, un descuento inesperado o una pluma en tu camino."
    }
  ]
};

// Exportar para acceso global en el navegador
if (typeof window !== "undefined") {
  window.SACRED_DATA = SACRED_DATA;
}
