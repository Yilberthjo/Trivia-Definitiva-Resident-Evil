export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  era: 'Clásico' | 'Acción' | 'Moderno' | 'Lore y Secretos';
  difficulty: 'Fácil' | 'Media' | 'Difícil' | 'Pesadilla';
  explanation: string;
}

export const CATEGORIES = [
  'Todas las Categorías',
  'Mansión Spencer y Orígenes',
  'La Caída de Raccoon City',
  'Ashford, Islas y Global',
  'Las Plagas y Europa',
  'Bioterrorismo Global y BSAA',
  'Familia Baker y Miranda',
  'Virus, Parásitos y Corporaciones',
  'Armas, Secretos y Lore Oculto'
] as const;

export const QUESTIONS: Question[] = [
  // --- PARTE 1: MANSIÓN SPENCER Y ORÍGENES (RE1, RE0) ---
  {
    id: 1,
    question: "¿En qué año ocurrieron los incidentes de las Montañas Arklay del primer Resident Evil?",
    options: ["1996", "1998", "2000", "1995"],
    correct: 1,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El incidente de las montañas Arklay tuvo lugar en julio de 1998, cuando el equipo Bravo de S.T.A.R.S. fue enviado a investigar los extraños asesinatos caníbales."
  },
  {
    id: 2,
    question: "¿Cómo se llama la mansión donde transcurre principalmente el primer juego?",
    options: ["Mansión Baker", "Mansión Spencer", "Mansión Ashford", "Mansión Salazar"],
    correct: 1,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Fue diseñada por el arquitecto George Trevor bajo encargo del cofundador de Umbrella, Lord Oswell E. Spencer, ocultando laboratorios subterráneos."
  },
  {
    id: 3,
    question: "¿Qué significan las siglas del equipo S.T.A.R.S.?",
    options: [
      "Special Tactics and Rescue Service",
      "Special Terror Attack Rescue Squad",
      "Strategic Tactical Anti-Resident Squad",
      "Special Team and Rescue Support"
    ],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "S.T.A.R.S. significa Special Tactics and Rescue Service, la unidad táctica de élite del Departamento de Policía de Raccoon City fundada en 1996."
  },
  {
    id: 4,
    question: "¿Quién es el traidor líder del equipo Alpha de S.T.A.R.S.?",
    options: ["Barry Burton", "Albert Wesker", "Brad Vickers", "Enrico Marini"],
    correct: 1,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Albert Wesker era en realidad un investigador y agente doble encubierto de la Corporación Umbrella encargado de recolectar datos de combate del Tyrant T-002."
  },
  {
    id: 5,
    question: "¿Cuál es la frase célebre que Barry Burton le dice a Jill al salvarla de la trampa del techo?",
    options: [
      "You are a hero, Jill!",
      "That was close, Jill!",
      "You were almost a Jill Sandwich!",
      "Run, Jill, run!"
    ],
    correct: 2,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Al salvarla de ser aplastada por el techo en la Mansión Spencer, Barry pronuncia la icónica e inolvidable frase 'You were almost a Jill sandwich!'."
  },
  {
    id: 6,
    question: "¿Quién es el compañero convicto de Rebecca Chambers en Resident Evil Zero?",
    options: ["Billy Coen", "Carlos Oliveira", "Steve Burnside", "Ethan Winters"],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Billy Coen es un ex-teniente del Cuerpo de Marines condenado injustamente a pena de muerte que escapó tras el accidente del convoy militar en Arklay."
  },
  {
    id: 7,
    question: "¿Cómo se llama el tren de pasajeros de Umbrella atacado por sanguijuelas en RE0?",
    options: ["Ecliptic Express", "Raccoon Metro 204", "Arklay Commuter", "Spencer Rail"],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Media",
    explanation: "El Ecliptic Express era el tren privado de transporte corporativo de Umbrella que transportaba empleados entre Raccoon City y el Centro de Formación Ejecutiva."
  },
  {
    id: 8,
    question: "¿Cuál de estos personajes era el capitán del equipo Bravo de S.T.A.R.S.?",
    options: ["Richard Aiken", "Forest Speyer", "Enrico Marini", "Kenneth J. Sullivan"],
    correct: 2,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Enrico Marini lideraba el equipo Bravo. Descubrió la existencia de un traidor antes de ser asesinado por la espalda en las cuevas de la mansión por Wesker."
  },
  {
    id: 9,
    question: "¿Cómo se llama la serpiente gigante que acecha en la Mansión Spencer?",
    options: ["Yawn", "Neptune", "Black Tiger", "N结"],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Yawn recibió ese nombre de los investigadores porque parecía 'bostezar' al abrir sus enormes fauces venenosas antes de atacar a sus presas."
  },
  {
    id: 10,
    question: "¿Qué criatura mutante del RE1 original nada en el laboratorio acuático sumergido?",
    options: ["Neptune (Tiburón infectado)", "Del Lago", "Armadura viviente", "Licker acuático"],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Neptune (código FI-03) fue creado inoculando el virus T en tiburones blancos para estudiar su viabilidad como arma biológica marina."
  },
  {
    id: 11,
    question: "¿Quién era Lisa Trevor en el Remake de Resident Evil de 2002?",
    options: [
      "La hija del arquitecto sometida a 30 años de crueles experimentos víricos",
      "Una investigadora renegada de Umbrella",
      "La hermana gemela de Jill Valentine",
      "La esposa secreta de Spencer convertida en zombi"
    ],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Lisa Trevor fue capturada junto a su madre Jessica en 1967. Su increíble resistencia a patógenos llevó accidentalmente al descubrimiento del Virus-G por Birkin."
  },
  {
    id: 12,
    question: "¿Cuál es el modelo exacto del Tyrant al que te enfrentas en el helipuerto de RE1?",
    options: ["T-002", "T-103", "Nemesis T-Type", "Proto-Tyrant (T-001)"],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Media",
    explanation: "El T-002 fue la cúspide del proyecto Arklay con una gran garra y corazón expuesto, mientras que el Proto-Tyrant (T-001) aparece en Resident Evil Zero."
  },
  {
    id: 13,
    question: "¿Qué famosa frase final aparece en el diario del cuidador infectado en RE1?",
    options: [
      "Itchy. Tasty. (Pica. Rico.)",
      "I am becoming a monster",
      "Help me, somebody help me",
      "Blood everywhere"
    ],
    correct: 0,
    category: "Mansión Spencer y Orígenes",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El 'Keeper's Diary' es uno de los documentos más famosos de los videojuegos, detallando el deterioro mental de un empleado hasta la línea 'Itchy. Tasty.'."
  },

  // --- PARTE 2: LA CAÍDA DE RACCOON CITY (RE2, RE3, OUTBREAK) ---
  {
    id: 14,
    question: "¿En qué ciudad ficticia del medio oeste norteamericano se desata el apocalipsis vírico?",
    options: ["Dulvey", "Raccoon City", "Terragrigia", "Lanshiang"],
    correct: 1,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Raccoon City, una próspera ciudad industrial financiada y controlada casi por completo en secreto por la Corporación farmacéutica Umbrella."
  },
  {
    id: 15,
    question: "¿Qué trabajo iba a empezar Leon S. Kennedy en su primer día al llegar a Raccoon City?",
    options: ["Agente del FBI", "Oficial novato de Policía (RPD)", "Guardia de seguridad de Umbrella", "Detective privado"],
    correct: 1,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Leon se graduó en la academia de policía y solicitó ser asignado a Raccoon City tras escuchar sobre los incidentes de Arklay."
  },
  {
    id: 16,
    question: "¿A quién busca Claire Redfield desesperadamente cuando llega en moto a Raccoon City?",
    options: ["A su hermano Chris Redfield", "A su padre", "A su amiga Sherry Birkin", "A Leon S. Kennedy"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Claire viajó a la ciudad buscando a su hermano Chris tras perder contacto telefónico con él después de la disolución de S.T.A.R.S."
  },
  {
    id: 17,
    question: "¿Quién es el científico creador del temible Virus-G?",
    options: ["William Birkin", "James Marcus", "Albert Wesker", "Oswell Spencer"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El Dr. William Birkin desarrolló el Virus-G (Golpe Génesis), capaz de causar mutaciones continuas e impredecibles sin límite celular."
  },
  {
    id: 18,
    question: "¿Cómo se llama el imponente Tyrant vestido con gabardina que persigue a los protagonistas en RE2?",
    options: ["Nemesis", "Mr. X (Tyrant T-103)", "Bandersnatch", "Ustanak"],
    correct: 1,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El T-103 (popularmente conocido como Mr. X) fue lanzado desde un helicóptero con dos misiones: recuperar una muestra del Virus-G y eliminar supervivientes."
  },
  {
    id: 19,
    question: "¿Cómo se llama la hija de William y Annette Birkin que Claire intenta proteger a toda costa?",
    options: ["Ashley", "Sherry", "Moira", "Rose"],
    correct: 1,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Sherry Birkin, de solo 12 años, llevaba un colgante que contenía una muestra intacta del Virus-G oculta por su madre."
  },
  {
    id: 20,
    question: "¿Qué temible enemigo ciego con cerebro expuesto y lengua afilada debutó en los pasillos de la RPD de RE2?",
    options: ["Licker", "Hunter Alpha", "Chimera", "Crimson Head"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Los Lickers son zombis que sufrieron una mutación secundaria conocida como V-ACT; son ciegos pero poseen un oído supersensible y garras letales."
  },
  {
    id: 21,
    question: "¿Quién es el corrupto jefe de policía de la comisaría de Raccoon City financiado por Umbrella?",
    options: ["Brian Irons", "Marvin Branagh", "Kevin Dooley", "David Ford"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Brian Irons recibió sobornos millonarios de Umbrella para encubrir sus experimentos y bloqueó los esfuerzos de S.T.A.R.S. antes de perder el juicio."
  },
  {
    id: 22,
    question: "¿Cómo se llama el dueño de la armería 'Kendo Gun Shop' cerca de la comisaría?",
    options: ["Robert Kendo", "Joseph Frost", "Barry Burton", "Mikhail Victor"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Robert Kendo era un viejo amigo de Barry Burton y el armero que modificó las pistolas 'Samurai Edge' personalizadas para los miembros de S.T.A.R.S."
  },
  {
    id: 23,
    question: "¿Cuál es el objetivo principal y obsesivo del B.O.W. Nemesis en Resident Evil 3?",
    options: [
      "Eliminar a todos los miembros supervivientes de S.T.A.R.S.",
      "Destruir la central eléctrica de la ciudad",
      "Robar la fórmula del Virus-G",
      "Rescatar al equipo de investigación de Umbrella"
    ],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Desarrollado por la división europea de Umbrella, Nemesis fue programado para silenciar a todo miembro de S.T.A.R.S. que pudiera testificar contra la empresa."
  },
  {
    id: 24,
    question: "¿Qué palabra brama Nemesis con voz desgarradora al encontrar a Jill Valentine?",
    options: ["Die!", "S.T.A.R.S.!", "Jill!", "Carnage!"],
    correct: 1,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El grito gutural '¡S.T.A.R.S.!' de Nemesis es una de las firmas sonoras más aterradoras de la historia del género survival horror."
  },
  {
    id: 25,
    question: "¿A qué cuerpo militar privado de rescate y contención de Umbrella pertenece Carlos Oliveira?",
    options: ["U.B.C.S.", "B.S.A.A.", "Neo-Umbrella", "The Connections"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "U.B.C.S. significa Umbrella Biohazard Countermeasure Service, compuesto mayoritariamente por mercenarios y criminales enviados como carne de cañón."
  },
  {
    id: 26,
    question: "¿Cómo muere el miembro del equipo Alpha de S.T.A.R.S. Brad Vickers en el RE3 original frente a la comisaría?",
    options: [
      "Nemesis le atraviesa la cabeza con un tentáculo",
      "Devorado por una jauría de Cerberus",
      "Atrapado en la explosión de una gasolinera",
      "Disparado por Nikolai Zinoviev"
    ],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Media",
    explanation: "En el RE3 de 1999, Nemesis levanta a Brad por el cuello frente a Jill y le clava brutalmente un tentáculo bio-orgánico a través del cráneo."
  },
  {
    id: 27,
    question: "¿Cuál es el nombre del oficial de policía condecorado que ayuda a Leon y Claire en la sala principal de la comisaría antes de sucumbir?",
    options: ["Marvin Branagh", "Kevin Ryman", "Mark Wilkins", "George Hamilton"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El teniente Marvin Branagh rechaza escapar para no poner en riesgo a otros debido a su mordedura mortal y les entrega equipo vital."
  },
  {
    id: 28,
    question: "¿Cómo es destruida Raccoon City el 1 de octubre de 1998 por el gobierno de EE.UU.?",
    options: [
      "Mediante un ataque con misil nuclear / termobárico 'Operación Código Bacillus'",
      "Inundada con un agente químico neurotóxico",
      "Bombardeada con napalm convencional durante tres días",
      "Derrumbada por cargas sísmicas subterráneas"
    ],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El gobierno estadounidense autorizó el lanzamiento de un misil termobárico de esterilización para frenar el contagio a nivel continental."
  },
  {
    id: 29,
    question: "¿Qué personaje de broma jugable en RE2 es un bloque rectangular de comida japonesa armado con un cuchillo?",
    options: ["Tofu", "Wasabi", "Miso", "Nori"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "El 'Tofu Survivor' nació originalmente como un modelo de prueba para testear las físicas de colisión de los personajes en Capcom."
  },
  {
    id: 30,
    question: "¿En qué legendario juego multijugador online cooperativo de 2003 de PS2 encarnas a 8 ciudadanos supervivientes de Raccoon City?",
    options: ["Resident Evil Outbreak", "Resident Evil Survivor", "Resident Evil Dead Aim", "Operation Raccoon City"],
    correct: 0,
    category: "La Caída de Raccoon City",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Resident Evil Outbreak (y su File #2) permitía jugar como Kevin, Cindy, Mark, George, Jim, David, Alyssa y Yoko con medidor de infección en tiempo real."
  },

  // --- PARTE 3: ASHFORD, ISLAS Y GLOBAL (CODE: VERONICA, REVELATIONS) ---
  {
    id: 31,
    question: "¿En qué isla prisión secreta despierta capturada Claire Redfield al inicio de Resident Evil Code: Veronica?",
    options: ["Isla Rockfort", "Isla Sheena", "Isla Zabytij", "Isla de los Muertos"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Claire fue detenida tras infiltrarse en la sede de Umbrella en París y enviada a la prisión militar de la Isla Rockfort, administrada por Alfred Ashford."
  },
  {
    id: 32,
    question: "¿Cómo se llama el joven preso impulsivo armado con pistolas dobles Luger que acompaña a Claire en Code: Veronica?",
    options: ["Steve Burnside", "Billy Coen", "Parker Luciani", "Jake Muller"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Steve Burnside era un joven prisionero cuyo padre fue empleado de Umbrella. Se enamora de Claire antes de ser sometido al virus T-Veronica."
  },
  {
    id: 33,
    question: "¿Qué virus crearon Alexia Ashford y su hermano a partir del Virus Progenitor y genes de hormiga reina?",
    options: ["Virus T-Veronica", "Virus Golgotha", "Virus T-Abyss", "Virus Phobos"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Media",
    explanation: "El virus T-Veronica fue desarrollado por la prodigio Alexia Ashford combinando el virus Progenitor con ADN de hormiga reina y plantas milenarias."
  },
  {
    id: 34,
    question: "¿Durante cuántos años estuvo Alexia Ashford en sueño criogénico para asimilar el virus sin perder la consciencia humana?",
    options: ["15 años", "5 años", "25 años", "10 años"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Difícil",
    explanation: "Alexia descubrió que para que su cuerpo no colapsara en una mutación salvaje debía enfriar su metabolismo durante 15 años en una cápsula criogénica antártica."
  },
  {
    id: 35,
    question: "¿A qué gélido continente viajan Claire y Chris en la segunda mitad de Code: Veronica?",
    options: ["La Antártida", "Groenlandia", "Siberia", "Alaska"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Llegan a la base de transporte y laboratorio secreto de Umbrella en la Antártida, donde Alexia despierta de su letargo."
  },
  {
    id: 36,
    question: "¿Qué crucero de lujo flotante es el escenario principal de Resident Evil Revelations?",
    options: ["Queen Zenobia", "Queen Dido", "Queen Semiramis", "Spencer Voyager"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Media",
    explanation: "El Queen Zenobia, junto con sus barcos gemelos Semiramis y Dido, sirvió de tapadera y laboratorio para la diseminación del mortal virus T-Abyss."
  },
  {
    id: 37,
    question: "¿Qué virus acuático derivado de peces de fosas abisales causa el brote en RE Revelations?",
    options: ["T-Abyss", "T-Deep", "Uroboros Marine", "Plaga Acuática"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Media",
    explanation: "El virus T-Abyss fue sintetizado en la Universidad Marina de Montpellier combinando el virus T con el recién descubierto virus The Abyss de peces abisales."
  },
  {
    id: 38,
    question: "¿Cómo se llama la ciudad flotante artificial futurista que fue aniquilada en el incidente de RE Revelations?",
    options: ["Terragrigia", "Neo-Raccoon", "Aquapolis", "San Jerónimo"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Terragrigia era una metrópolis solar flotante en el mar Mediterráneo que fue destruida con el satélite solar Regia Solis tras un ataque de Il Veltro."
  },
  {
    id: 39,
    question: "¿Quién es la villana principal de Resident Evil Revelations 2, conocida como 'La Supervisora'?",
    options: ["Alex Wesker", "Excella Gionne", "Carla Radames", "Eveline"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Alex Wesker fue la otra superviviente del Proyecto W (niños de Wesker) de Spencer, obsesionada con transferir su mente a un cuerpo inmune al miedo."
  },
  {
    id: 40,
    question: "¿Qué virus utilizado en Revelations 2 reacciona directamente con los niveles de miedo y adrenalina del anfitrión?",
    options: ["Virus T-Phobos", "Virus T-Horror", "Virus Golgotha", "Virus T-Terror"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Difícil",
    explanation: "El T-Phobos detecta los picos de adrenalina y noradrenalina causados por el pánico; si el portador supera un umbral emocional en su pulsera, muta al instante."
  },
  {
    id: 41,
    question: "¿Quién acompaña a Claire Redfield en Revelations 2 como hija de Barry Burton?",
    options: ["Moira Burton", "Polly Burton", "Sherry Birkin", "Natalia Korda"],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Fácil",
    explanation: "Moira Burton, quien se negaba a usar armas de fuego al inicio debido a un traumático accidente infantil en el que disparó accidentalmente a su hermana Polly."
  },
  {
    id: 42,
    question: "¿Qué extraña habilidad tiene la pequeña huérfana Natalia Korda en Revelations 2?",
    options: [
      "Puede percibir la presencia y puntos débiles de los monstruos a través de las paredes",
      "Es inmune a todo tipo de radiación nuclear",
      "Puede hackear terminales electrónicas sin herramientas",
      "Controla a los zombis con telepatía"
    ],
    correct: 0,
    category: "Ashford, Islas y Global",
    era: "Clásico",
    difficulty: "Media",
    explanation: "Natalia tiene una sensibilidad biológica única que le permite detectar el pulso biológico de infectados invisibles (Glasp) y señalar sus núcleos vulnerables."
  },

  // --- PARTE 4: LAS PLAGAS Y EUROPA (RESIDENT EVIL 4 Y REMAKE) ---
  {
    id: 43,
    question: "¿A qué país europeo viaja Leon S. Kennedy en Resident Evil 4 para rescatar a la hija del presidente?",
    options: ["España", "Italia", "Rumanía", "Portugal"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Leon viaja a una zona rural aislada en España donde los aldeanos hablan español y están controlados por un culto parasitario."
  },
  {
    id: 44,
    question: "¿Cómo se llama la hija secuestrada del presidente de Estados Unidos?",
    options: ["Ashley Graham", "Sherry Birkin", "Helena Harper", "Ingrid Hunnigan"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Ashley Graham fue raptada por el grupo de Jack Krauser a la salida de su universidad en Massachusetts bajo órdenes del culto Los Illuminados."
  },
  {
    id: 45,
    question: "¿Cuál es el nombre del parásito ancestral fósil desenterrado por el culto?",
    options: ["Las Plagas", "Virus-C", "Uroboros", "Cadou"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Las Plagas son parásitos fosilizados descubiertos en las minas bajo el castillo de la familia Salazar capaces de controlar la voluntad del sistema nervioso central."
  },
  {
    id: 46,
    question: "¿Quién es el líder supremo del culto 'Los Illuminados' en Resident Evil 4?",
    options: ["Lord Osmund Saddler", "Ramon Salazar", "Bitores Méndez", "Jack Krauser"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Lord Osmund Saddler planeaba infectar a Ashley para enviarla de regreso a Washington e infiltrar el gobierno de EE.UU. desde la Casa Blanca."
  },
  {
    id: 47,
    question: "¿Cómo se llama el octavo castellano de baja estatura y aspecto envejecido que gobierna el castillo?",
    options: ["Ramon Salazar", "Diego Gomez", "Alfred Ashford", "Alcina Dimitrescu"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Ramon Salazar, a pesar de tener tan solo 20 años de edad, tiene el aspecto de un anciano debido a su prematura asimilación biológica con Las Plagas."
  },
  {
    id: 48,
    question: "¿Cuál es el apodo o nombre del colosal alcalde del pueblo rural de Valdelobos?",
    options: ["Bitores Méndez", "El Gigante", "Verdugo", "Garrador"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Bitores Méndez, el gigantesco sacerdote y alcalde del pueblo que muta dividiendo su columna vertebral en un ciempiés humano en el granero."
  },
  {
    id: 49,
    question: "¿Quién es el carismático y misterioso investigador español que ayuda a Leon y fue contratado por Saddler?",
    options: ["Luis Serra Navarro", "Carlos Oliveira", "Mikhail Victor", "Enrico Marini"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Luis Serra fue un brillante bioquímico que trabajó previamente para Umbrella y luego ayudó a Saddler a sintetizar las Plagas de control antes de rebelarse."
  },
  {
    id: 50,
    question: "¿Qué famosa frase en inglés pronuncia Leon S. Kennedy cuando los aldeanos escuchan la campana de la iglesia y se van a misa?",
    options: [
      "Where's everyone going? Bingo?",
      "Party's over, guys!",
      "I guess they don't like visitors",
      "Better luck next time"
    ],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "La famosa línea socarrona de Leon al ver a toda la multitud de Ganados guardar sus hoces y antorchas al toque de la campana."
  },
  {
    id: 51,
    question: "¿Cuál de estos NO es un grito en español que los aldeanos o monjes te lanzan en RE4?",
    options: [
      "¡Quiero tu cerebro, policía!",
      "¡Detrás de ti, imbécil!",
      "¡Un forastero!",
      "¡Morir es vivir!"
    ],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Los aldeanos gritan frases memorables como '¡Detrás de ti, imbécil!', '¡Un forastero!', '¡Te voy a hacer picadillo!', pero nunca 'Quiero tu cerebro'."
  },
  {
    id: 52,
    question: "¿Cómo se llama el letal monstruo bípedo con capacidad de regenerar sus órganos internos en la isla de RE4?",
    options: ["Regenerador / Iron Maiden", "Garrador", "Verdugo", "U-3"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Los Regeneradores respiran con un estremecedor jadeo sibilante y solo mueren destruyendo con mira térmica los parásitos plaga en su interior."
  },
  {
    id: 53,
    question: "¿Cómo se llama el guardaespaldas encapuchado de Salazar con ADN de insecto que te persigue en las alcantarillas?",
    options: ["Verdugo", "Garrador", "Novistador", "Armadura"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Media",
    explanation: "El Verdugo fue creado fusionando genes humanos con los de artrópodos. Puede ser congelado temporalmente con los tanques de nitrógeno líquido."
  },
  {
    id: 54,
    question: "¿Qué frase icónica te dice el Buhonero (Merchant) de Resident Evil 4 al abrir su abrigo?",
    options: [
      "What're ya buyin', stranger?",
      "Welcome to my shop, sir!",
      "Care for some medicine?",
      "Ammo is expensive today!"
    ],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "'What're ya buyin', stranger?' y 'What're ya sellin'?' son dos de las líneas más citadas de la franquicia pronunciadas por el carismático mercader."
  },
  {
    id: 55,
    question: "¿Quién era Jack Krauser para Leon antes de convertirse en mercenario de Wesker y Saddler?",
    options: [
      "Su antiguo camarada militar en la Operación Javier en Sudamérica",
      "Su instructor en la policía de Raccoon City",
      "Un agente del FBI enviado a vigilarlo",
      "El hermano mayor de Sherry Birkin"
    ],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Media",
    explanation: "Leon y Krauser sirvieron juntos en la Operación Javier (narrada en The Darkside Chronicles) en 2002 antes de que Krauser fingiera su muerte en combate."
  },
  {
    id: 56,
    question: "¿Cómo se llama el temible monstruo ciego con garras de acero atadas a las manos que ataca al oír cualquier ruido en el castillo?",
    options: ["Garrador", "Novistador", "Colmillo", "Armadura"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "El Garrador tiene los ojos cosidos y se guía por el sonido. Si corres o tocas una campana cargará implacablemente con sus garras de gladiador."
  },
  {
    id: 57,
    question: "¿Qué vehículo conduce Leon al escapar de la isla en la cinemática final de RE4 junto a Ashley?",
    options: ["Una moto de agua (Jet Ski)", "Un helicóptero Apache", "Un bote a remo", "Un camión blindado"],
    correct: 0,
    category: "Las Plagas y Europa",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Ada Wong le lanza la llave con un osito de peluche a Leon antes de huir en su helicóptero, permitiéndole escapar en la moto de agua mientras la cueva colapsa."
  },

  // --- PARTE 5: BIOTERRORISMO GLOBAL Y BSAA (RESIDENT EVIL 5 Y 6) ---
  {
    id: 58,
    question: "¿En qué continente se desarrolla la trama principal de Resident Evil 5?",
    options: ["África (Kijuju)", "Asia", "Oceanía", "América del Sur"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Transcurre en la región ficticia de Kijuju en África Occidental, donde la corporación farmacéutica Tricell opera en secreto."
  },
  {
    id: 59,
    question: "¿Quién es la agente de la rama africana de la BSAA que acompaña a Chris Redfield en RE5?",
    options: ["Sheva Alomar", "Helena Harper", "Excella Gionne", "Jill Valentine"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Sheva Alomar se unió a la BSAA tras perder a sus padres en un accidente encubierto en una fábrica de Umbrella cuando era una niña."
  },
  {
    id: 60,
    question: "¿Cuál es el nombre del virus de zarcillos negros con el que Albert Wesker planeaba extinguir a los humanos no aptos?",
    options: ["Uroboros", "Virus-C", "Virus Progenitor Puro", "T-Abyss"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "El virus Uroboros fue diseñado a partir del Progenitor para forzar la evolución de la humanidad; los no aptos genéticamente eran consumidos en una masa de gusanos negros."
  },
  {
    id: 61,
    question: "¿Qué dispositivo colocado en el pecho utilizaba Wesker para controlar mentalmente a Jill Valentine en RE5?",
    options: [
      "Un dispositivo cibernético de inyección química continua (P30)",
      "Un microchip implantado en la corteza cerebral",
      "Una plaga subordinada modificada",
      "Un collar de descargas electromagnéticas"
    ],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Media",
    explanation: "El químico P30 otorgaba fuerza y reflejos sobrehumanos pero requería una infusión constante administrada por el aparato en su pecho."
  },
  {
    id: 62,
    question: "¿Qué famosa hazaña de fuerza física casi cómica realiza Chris Redfield en el volcán activo de RE5?",
    options: [
      "Golpear una enorme roca a puñetazos limpios para moverla",
      "Levantar un camión cisterna con una mano",
      "Detener un helicóptero en vuelo tirando de una soga",
      "Nadar a través de un río de lava volcánica"
    ],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "La escena en la que Chris propina puñetazos de boxeo a un peñasco gigante en el cráter para salvar a Sheva se convirtió en el meme legendario 'Boulder Puncher'."
  },
  {
    id: 63,
    question: "¿Cómo se llama la hermosa y ambiciosa directora ejecutiva de la división africana de Tricell aliada con Wesker?",
    options: ["Excella Gionne", "Carla Radames", "Alexia Ashford", "Jessica Sherawat"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Media",
    explanation: "Excella Gionne creía que gobernaría el nuevo mundo junto a Wesker, pero él terminó traicionándola e inoculándole Uroboros para convertirla en Uroboros Aheri."
  },
  {
    id: 64,
    question: "¿Quién es el hijo biológico de Albert Wesker introducido en Resident Evil 6 portador de anticuerpos vitales?",
    options: ["Jake Muller", "Steve Burnside", "Ethan Winters", "Clancy Javis"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Jake Muller, un mercenario que heredó la resistencia celular de Wesker a los patógenos víricos, lo que lo convertía en la única esperanza para la vacuna del Virus-C."
  },
  {
    id: 65,
    question: "¿Qué organización terrorista y culto mundial es la antagonista central en Resident Evil 6?",
    options: ["Neo-Umbrella", "The Family", "Il Veltro", "Los Illuminados"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Media",
    explanation: "Carla Radames fundó Neo-Umbrella para desatar el caos planetario y vengarse de Derek C. Simmons, quien la transformó a la fuerza en un clon de Ada Wong."
  },
  {
    id: 66,
    question: "¿Quién es el consejero de seguridad nacional de EE.UU. que orquestó el ataque bioterrorista en Tall Oaks en RE6?",
    options: ["Derek C. Simmons", "Adam Benford", "Norman", "Morgan Lansdale"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Media",
    explanation: "Derek C. Simmons, líder de la sociedad secreta 'The Family', provocó el ataque vírico para asesinar al presidente Adam Benford antes de que revelara la verdad sobre Raccoon City."
  },
  {
    id: 67,
    question: "¿Cómo se llama el gigantesco bio-arma implacable con brazo biónico intercambiable que persigue a Jake y Sherry en RE6?",
    options: ["Ustanak", "Nemesis", "Rasklapanje", "Haos"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Media",
    explanation: "Ustanak era un voluntario humano fanático de Neo-Umbrella cuyo cuerpo asimiló el Virus-C y se equipaba con taladros, garras y cañones mecánicos."
  },
  {
    id: 68,
    question: "¿Cuál de estos personajes se sacrifica heroicamente al final de la campaña de Chris en RE6 dentro de la plataforma submarina?",
    options: ["Piers Nivans", "Finn Macauley", "Kevin Dooley", "Parker Luciani"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Media",
    explanation: "Piers Nivans se inyectó una muestra concentrada del Virus-C para derrotar al monstruo Haos y lanzó a Chris a la cápsula de escape mientras él se quedaba atrás."
  },
  {
    id: 69,
    question: "¿Qué compañera del Servicio Secreto acompaña a Leon en su campaña de RE6 tras la muerte del presidente?",
    options: ["Helena Harper", "Sheva Alomar", "Claire Redfield", "Rebecca Chambers"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Fácil",
    explanation: "Helena Harper ayudó inadvertidamente a Simmons para salvar a su hermana Deborah secuestrada y buscó redimirse acompañando a Leon."
  },
  {
    id: 70,
    question: "¿Qué ciudad ficticia de China sufre un masivo ataque de misil con gas de Virus-C en el clímax de RE6?",
    options: ["Lanshiang", "Shanghai", "Wuhan", "Shenzhen"],
    correct: 0,
    category: "Bioterrorismo Global y BSAA",
    era: "Acción",
    difficulty: "Media",
    explanation: "Lanshiang se convirtió en una zona de guerra urbana cuando el misil cargado de cápsulas de gas de capullo azul detonó sobre la urbe transformando a miles en zombis."
  },

  // --- PARTE 6: LA FAMILIA BAKER Y MIRANDA (RESIDENT EVIL 7 Y VILLAGE) ---
  {
    id: 71,
    question: "¿Cuál es el nombre del protagonista principal civil de Resident Evil 7: Biohazard y Resident Evil Village?",
    options: ["Ethan Winters", "Clancy Javis", "Karl Heisenberg", "Jack Baker"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "Ethan Winters era un ingeniero de sistemas de Los Ángeles que viajó a Luisiana tras recibir un mensaje de su esposa Mia, desaparecida hacía 3 años."
  },
  {
    id: 72,
    question: "¿En qué estado y localidad sureña de EE.UU. se encuentra la decrépita plantación de la familia Baker?",
    options: ["Dulvey, Luisiana", "Savannah, Georgia", "Arklay, Misuri", "Biloxi, Misisipi"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "La hacienda de los Baker está situada en los pantanosos bayous de Dulvey, en la parroquia rural de Luisiana."
  },
  {
    id: 73,
    question: "¿Qué frase emblemática le grita Jack Baker a Ethan nada más golpearlo y noquearlo por primera vez?",
    options: [
      "Welcome to the family, son! (¡Bienvenido a la familia, hijo!)",
      "Get out of my house!",
      "Die, stranger!",
      "Dinner is served!"
    ],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "El brutal puñetazo en primera persona con la frase 'Welcome to the family, son!' se convirtió instantáneamente en el sello distintivo de RE7."
  },
  {
    id: 74,
    question: "¿Quién era en realidad la anciana silenciosa en silla de ruedas que aparecía por toda la casa de los Baker?",
    options: [
      "Eveline (el bio-arma E-001 envejecida aceleradamente)",
      "La abuela biológica de Jack",
      "La madre de Zoe Baker",
      "Una ilusión fantasmagórica del moho"
    ],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Media",
    explanation: "Eveline padecía un síndrome de envejecimiento celular rápido al privarse de sus inyecciones estabilizadoras, pasando de niña de 10 años a anciana en meses."
  },
  {
    id: 75,
    question: "¿Cómo se llama el hijo psicópata de los Baker aficionado a construir trampas mortales al estilo 'Saw'?",
    options: ["Lucas Baker", "Joe Baker", "Jack Baker Jr.", "Clancy Baker"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "Lucas Baker no estaba mentalmente controlado por Eveline ya que la organización 'The Connections' le suministró un suero a cambio de monitorear a la familia."
  },
  {
    id: 76,
    question: "¿Qué miembro de la familia Baker te ayuda por teléfono y te enseña a fabricar el suero en RE7?",
    options: ["Zoe Baker", "Marguerite Baker", "Mia Winters", "Eve"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "Zoe Baker conservó cierta lucidez y se comunicaba con Ethan desde las cabinas telefónicas repartidas por la mansión para ayudarlo a escapar."
  },
  {
    id: 77,
    question: "¿Cuál es el nombre de la vampiresa de 2,90 metros de altura y dama del castillo en Resident Evil Village?",
    options: ["Lady Alcina Dimitrescu", "Donna Beneviento", "Mother Miranda", "Salvatore Moreau"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "Lady Alcina Dimitrescu es una aristócrata mutada por el parásito Cadou con uñas retráctiles de acero y una condición sanguínea que requiere beber sangre humana."
  },
  {
    id: 78,
    question: "¿Cómo se llama la hija recién nacida de Ethan y Mia Winters secuestrada en Village?",
    options: ["Rosemary (Rose)", "Sherry", "Zoe", "Eveline"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "Rosemary Winters fue despedazada en cuatro frascos por Madre Miranda para ser utilizada como el recipiente perfecto para resucitar a su difunta hija Eva."
  },
  {
    id: 79,
    question: "¿Quién es la líder mística y deidad venerada por los aldeanos de Resident Evil Village?",
    options: ["Madre Miranda", "Lady Dimitrescu", "Donna Beneviento", "Eveline"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "Madre Miranda descubrió el Megamiceto en una cueva tras perder a su hija por la gripe española en 1919 y dedicó un siglo entero a experimentar con el pueblo."
  },
  {
    id: 80,
    question: "¿Qué poder extraordinario posee Karl Heisenberg, el rebelde señor de la fábrica en RE8?",
    options: [
      "Control y manipulación de campos electromagnéticos y metales",
      "Piroquinesis y combustión espontánea",
      "Control mental de insectos carnívoros",
      "Teletransportación a través del moho"
    ],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Media",
    explanation: "Los órganos bio-eléctricos que Heisenberg desarrolló debido al Cadou le permitían controlar cualquier metal como si fuera un potente electroimán."
  },
  {
    id: 81,
    question: "¿Qué terrorífica pesadilla infantil sin armas debes atravesar en la Casa de Donna Beneviento?",
    options: [
      "Un sótano oscuro perseguido por un gigantesco feto monstruoso llorón",
      "Un laberinto de espejos con zombis invisibles",
      "Un pozo lleno de arañas mutantes con cara humana",
      "Una sala de autopsias inundada de ácido"
    ],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Media",
    explanation: "El Baby Monster (feto gigante deforme) de la Casa Beneviento es una de las secuencias más espeluznantes y aclamadas del terror psicológico moderno."
  },
  {
    id: 82,
    question: "¿Qué impactante secreto sobre el propio cuerpo de Ethan Winters se revela en el desenlace de Village?",
    options: [
      "Que murió en RE7 al ser pisoteado por Jack Baker y su cuerpo es una masa viva de Moho",
      "Que era un clon secreto de Albert Wesker",
      "Que estaba infectado con el parásito de Las Plagas desde niño",
      "Que todo era una alucinación en coma dentro del hospital"
    ],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Media",
    explanation: "Ethan murió en los primeros minutos de RE7; el Moho reconstruyó todas sus células, explicándose así cómo podía reimplantarse las manos y pies amputados."
  },
  {
    id: 83,
    question: "¿Cómo se llama el orondo y jovial mercader que viaja en carromato en Resident Evil Village?",
    options: ["El Duque (The Duke)", "El Buhonero", "Mikhail", "Robert"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Fácil",
    explanation: "El Duque proporciona suministros, mejoras de armas y deliciosos platos de cocina campestre que mejoran permanentemente las estadísticas de Ethan."
  },
  {
    id: 84,
    question: "¿Cuál de los cofundadores de Umbrella fue alumno de Madre Miranda en su juventud en Europa del Este?",
    options: ["Oswell E. Spencer", "James Marcus", "Edward Ashford", "Albert Wesker"],
    correct: 0,
    category: "Familia Baker y Miranda",
    era: "Moderno",
    difficulty: "Difícil",
    explanation: "Spencer estudió medicina bajo la tutela de Miranda en los años 50 y se inspiró en el símbolo tallado en el altar del pueblo para crear el logotipo del paraguas de Umbrella."
  },

  // --- PARTE 7: VIRUS, PARÁSITOS Y CORPORACIONES ---
  {
    id: 85,
    question: "¿Cuál fue la flor africana de la que se extrajo originalmente el ancestral Virus Progenitor?",
    options: [
      "Stairway to the Sun (Escalera al Sol / Ndipaya)",
      "Lirio de Raccoon",
      "Rosa de Arklay",
      "Orquídea de Sangre"
    ],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Difícil",
    explanation: "La flor crece exclusivamente en los jardines subterráneos de la civilización Ndipaya; la ingestión de su savia confería fuerza a los reyes si sobrevivían al virus."
  },
  {
    id: 86,
    question: "¿Quiénes fueron los tres fundadores históricos originales de la Corporación Umbrella en 1968?",
    options: [
      "Oswell E. Spencer, James Marcus y Edward Ashford",
      "Albert Wesker, William Birkin y Barry Burton",
      "Brian Irons, Alfred Ashford y Derek Simmons",
      "HUNK, Nikolai Zinoviev y Sergei Vladimir"
    ],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Media",
    explanation: "Lord Oswell E. Spencer, el virólogo Dr. James Marcus y el aristócrata Edward Ashford fundaron Umbrella tras descubrir juntos el potencial del virus Progenitor."
  },
  {
    id: 87,
    question: "¿Qué diferencia biológica fundamental distingue al Virus-G del Virus-T común?",
    options: [
      "El Virus-G causa mutaciones continuas e impredecibles sin estabilización celular",
      "El Virus-G se cura automáticamente con hierbas rojas",
      "El Virus-G solo afecta a perros y cuervos",
      "El Virus-G no altera el ADN del huésped"
    ],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Media",
    explanation: "El Virus-T tiende a necrosar y fijar la forma del organismo, mientras que el Virus-G continúa mutando en formas cada vez más monstruosas en respuesta al daño físico."
  },
  {
    id: 88,
    question: "¿Qué corporación rival farmacéutica multinacional absorbió a los investigadores tras la caída de Umbrella en 2003?",
    options: ["Tricell", "WilPharma", "Neo-Umbrella", "Shen Ya"],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Media",
    explanation: "Tricell (originalmente la compañía naviera Travis Enterprises) financió la adquisición de datos de armas biológicas en el mercado negro a través de Excella Gionne."
  },
  {
    id: 89,
    question: "¿Cómo se llama la siniestra organización criminal fundada por Brandon Bailey responsable de la creación de Eveline?",
    options: ["The Connections (Las Conexiones)", "The Family", "Il Veltro", "Umbrella Corps"],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Difícil",
    explanation: "The Connections es un sindicato del crimen bioterrorista fundado en la década de 1970 que colaboró con H.C.F. (la unidad de Wesker) para el desarrollo de la serie-E."
  },
  {
    id: 90,
    question: "¿Qué es el 'Megamiceto' (Black God) descubierto en las cavernas rumanas en RE Village?",
    options: [
      "Una supercolonia de hongo fúngico milenario que almacena memorias genéticas de todos los que absorbe",
      "Un meteorito alienígena radiactivo",
      "Un acelerador de partículas biológico",
      "Un árbol carnívoro gigante prehistórico"
    ],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Media",
    explanation: "El Megamiceto (Mutamiceto) absorbe los cerebros y cuerpos de quienes mueren a su alrededor, guardando una consciencia colectiva en sus raíces subterráneas."
  },
  {
    id: 91,
    question: "¿Qué es el 'Cadou' desarrollado por Madre Miranda para implantar en los aldeanos?",
    options: [
      "Un parásito nemátodo modificado con el moho del Megamiceto",
      "Un suero químico purificado en frío",
      "Un microchip bio-orgánico",
      "Un extracto de la flor Stairway to the Sun"
    ],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Difícil",
    explanation: "Miranda implantaba el parásito Cadou para buscar un anfitrión compatible; la inmensa mayoría mutaba en feroces licanos y moroaicas sin cerebro."
  },
  {
    id: 92,
    question: "¿Quién era Sergei Vladimir en Resident Evil: The Umbrella Chronicles?",
    options: [
      "Un ex-general soviético leal a Spencer y fuente de ADN para los clones del Tyrant Iván",
      "El creador del virus Nemesis",
      "El padre de Nikolai Zinoviev",
      "El alcalde de la ciudad de Terragrigia"
    ],
    correct: 0,
    category: "Virus, Parásitos y Corporaciones",
    era: "Lore y Secretos",
    difficulty: "Difícil",
    explanation: "Sergei era la mano derecha armada de Spencer y su genoma era de los poquísimos 100% compatibles con el virus T para producir la serie de Tyrants T-103 en masa."
  },

  // --- PARTE 8: ARMAS, SECRETOS Y LORE OCULTO ---
  {
    id: 93,
    question: "¿Qué combinación de hierbas medicinales te otorga la recuperación total de salud en toda la saga clásica?",
    options: [
      "Hierba Verde + Hierba Roja (o 3 Verdes)",
      "Hierba Verde + Hierba Azul",
      "Hierba Roja + Hierba Azul",
      "Hierba Amarilla + Hierba Azul"
    ],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Fácil",
    explanation: "La combinación de Verde + Roja multiplica la efectividad restaurando el 100% de la vitalidad, mientras que la Azul neutraliza el veneno."
  },
  {
    id: 94,
    question: "¿Qué arma de daño descomunal de un solo disparo suele ser la recompensa canónica final para derrotar al jefe?",
    options: ["Lanzacohetes (Rocket Launcher)", "Magnum .50", "Lanzagranadas", "Escopeta de combate"],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Fácil",
    explanation: "Desde Brad Vickers arrojándolo en RE1 hasta Ada en RE2 y RE4, el lanzacohetes con munición infinita o final es el ritual clásico de cierre de la saga."
  },
  {
    id: 95,
    question: "¿Cómo se llama el legendario agente de Umbrella apodado 'Mr. Death' célebre por sobrevivir a toda misión letal?",
    options: ["HUNK", "GHOST", "TOFU", "WOLF"],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Fácil",
    explanation: "HUNK (Special Agent H.U.N.K.) del Servicio de Seguridad de Umbrella (U.S.S.) es el único superviviente de la escuadra Alpha enviada a sustraer el Virus-G a Birkin."
  },
  {
    id: 96,
    question: "¿Qué modelo de pistola personalizada por Robert Kendo portaban los miembros del equipo S.T.A.R.S.?",
    options: [
      "Samurai Edge (Beretta 92F modificada)",
      "Desert Eagle .50 AE",
      "Colt Python",
      "Silver Ghost"
    ],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Media",
    explanation: "La 'Samurai Edge' fue construida a medida por los hermanos Kendo con correderas de acero azulado, empuñaduras de madera de nogal y el emblema de S.T.A.R.S."
  },
  {
    id: 97,
    question: "¿Qué misterioso personaje viste casi siempre con elegante vestido rojo y actúa como espía enigmática?",
    options: ["Ada Wong", "Excella Gionne", "Jill Valentine", "Jessica Sherawat"],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Fácil",
    explanation: "Ada Wong es la mercenaria y espía de identidad oculta que trabaja para organizaciones secretas pero suele salvarle la vida a Leon en secreto."
  },
  {
    id: 98,
    question: "¿Qué objeto tradicionalmente se necesita junto con la máquina de escribir para guardar partida en dificultad clásica?",
    options: ["Cinta de tinta (Ink Ribbon)", "Batería alcalina", "Llave del candado", "Hoja de papel carbón"],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Fácil",
    explanation: "Las cintas de tinta (Ink Ribbons) obligaban a gestionar cuidadosamente los guardados, generando una tensión psicológica inigualable en las salas seguras."
  },
  {
    id: 99,
    question: "¿En qué legendario juego de carreras y disparos de Resident Evil 2 podías jugar con zombis disparando en un minijuego de PS1?",
    options: ["Extreme Battle Mode", "The Mercenaries: Operation Mad Jackal", "Nightmare Mode", "Raid Mode"],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Difícil",
    explanation: "Extreme Battle Mode fue introducido en la versión DualShock de Resident Evil 2, permitiendo jugar como Leon, Claire, Ada y Chris Redfield."
  },
  {
    id: 100,
    question: "¿Qué célebre melodía pacífica suena en los momentos de mayor respiro y alivio para el jugador?",
    options: [
      "Tema de la Sala de Guardado (Save Room Theme)",
      "El vals de la mansión",
      "Escape de Raccoon City",
      "Canto fúnebre de Arklay"
    ],
    correct: 0,
    category: "Armas, Secretos y Lore Oculto",
    era: "Lore y Secretos",
    difficulty: "Fácil",
    explanation: "Las canciones de la Sala Segura (Save Room) con sus acordes suaves de piano y guitarra acústica brindan una de las sensaciones de refugio más amadas del mundo del videojuego."
  }
];
