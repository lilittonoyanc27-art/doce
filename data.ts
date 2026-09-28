export interface BilingualItem {
  id: string;
  es: string;
  arm: string;
  note?: string;
  category?: string;
}

export interface QuestionItem {
  id: number;
  questionEs: string;
  questionArm: string;
  answerEs: string;
  answerArm: string;
}

export interface LessonSection {
  id: string;
  titleEs: string;
  titleArm: string;
  descriptionEs?: string;
  descriptionArm?: string;
  items: BilingualItem[];
}

export const MAIN_TITLE = {
  es: "TEMA 1: LA COMUNICACIÓN Y LOS TEXTOS",
  arm: "ԹԵՄԱ 1․ ՀԱՂՈՐԴԱԿՑՈՒԹՅՈՒՆԸ ԵՎ ՏԵՔՍՏԵՐԸ",
};

export const FULL_TEXT_SENTENCES: BilingualItem[] = [
  {
    id: "ft-1",
    es: "La comunicación es el proceso mediante el cual una persona transmite información a otra.",
    arm: "Հաղորդակցությունը գործընթաց է, որի միջոցով մի մարդ տեղեկություն է փոխանցում մյուսին։",
  },
  {
    id: "ft-2",
    es: "Para comunicarnos podemos utilizar palabras, gestos, imágenes, sonidos o signos.",
    arm: "Հաղորդակցվելու համար մենք կարող ենք օգտագործել բառեր, ժեստեր, պատկերներ, ձայներ կամ նշաններ։",
  },
  {
    id: "ft-3",
    es: "En toda comunicación aparecen varios elementos: el emisor, el receptor, el mensaje, el código, el canal y el contexto.",
    arm: "Յուրաքանչյուր հաղորդակցության մեջ կան մի քանի տարրեր՝ ուղարկող, ստացող, հաղորդագրություն, կոդ, կապուղի և համատեքստ։",
  },
  {
    id: "ft-4",
    es: "Un texto es un conjunto de enunciados relacionados entre sí que transmiten un mensaje completo.",
    arm: "Տեքստը իրար հետ կապված արտահայտությունների կամ նախադասությունների ամբողջություն է, որը փոխանցում է ամբողջական իմաստ։",
  },
  {
    id: "ft-5",
    es: "Los textos pueden ser orales o escritos.",
    arm: "Տեքստերը կարող են լինել բանավոր կամ գրավոր։",
  },
  {
    id: "ft-6",
    es: "Los textos orales se transmiten mediante la voz. Por ejemplo, una conversación, una explicación en clase o una entrevista.",
    arm: "Բանավոր տեքստերը փոխանցվում են ձայնի միջոցով։ Օրինակ՝ զրույց, դասի բացատրություն կամ հարցազրույց։",
  },
  {
    id: "ft-7",
    es: "Los textos escritos se transmiten mediante la escritura. Por ejemplo, una carta, una noticia, un cuento o un mensaje.",
    arm: "Գրավոր տեքստերը փոխանցվում են գրելու միջոցով։ Օրինակ՝ նամակ, լուր, պատմվածք կամ հաղորդագրություն։",
  },
  {
    id: "ft-8",
    es: "Para que un texto esté bien construido debe tener tres propiedades principales: adecuación, coherencia y cohesión.",
    arm: "Լավ կառուցված տեքստը պետք է ունենա երեք հիմնական հատկություն՝ համապատասխանություն, տրամաբանական ամբողջականություն և կապակցվածություն։",
  },
  {
    id: "ft-9",
    es: "La adecuación significa que el texto debe adaptarse a la situación y a la persona con la que hablamos.",
    arm: "Համապատասխանությունը նշանակում է, որ տեքստը պետք է համապատասխանի իրավիճակին և այն մարդուն, ում հետ հաղորդակցվում ենք։",
  },
  {
    id: "ft-10",
    es: "La coherencia significa que las ideas del texto deben estar relacionadas y tener sentido.",
    arm: "Տրամաբանական ամբողջականությունը նշանակում է, որ տեքստի գաղափարները պետք է կապված լինեն միմյանց և իմաստ ունենան։",
  },
  {
    id: "ft-11",
    es: "La cohesión significa que las diferentes partes del texto deben estar bien unidas mediante palabras y conectores.",
    arm: "Կապակցվածությունը նշանակում է, որ տեքստի տարբեր մասերը պետք է ճիշտ միացված լինեն բառերի և կապակցիչների միջոցով։",
  },
  {
    id: "ft-12",
    es: "Los textos también pueden tener diferentes finalidades. Algunos sirven para narrar hechos, otros para describir, explicar, dar instrucciones o defender una opinión.",
    arm: "Տեքստերը կարող են ունենալ նաև տարբեր նպատակներ։ Որոշ տեքստեր պատմում են իրադարձությունների մասին, մյուսները նկարագրում, բացատրում, հրահանգներ տալիս կամ արտահայտում ու պաշտպանում են կարծիք։",
  },
  {
    id: "ft-13",
    es: "En resumen, la comunicación permite intercambiar información y los textos son mensajes organizados que pueden ser orales o escritos.",
    arm: "Ամփոփելով՝ հաղորդակցությունը թույլ է տալիս տեղեկություն փոխանակել, իսկ տեքստերը կազմակերպված հաղորդագրություններ են, որոնք կարող են լինել բանավոր կամ գրավոր։",
  },
];

export const SECTION_1 = {
  id: "sec-1",
  number: "1",
  titleEs: "¿Qué es la comunicación?",
  titleArm: "Ի՞նչ է հաղորդակցությունը։",
  definition: {
    id: "sec1-def",
    es: "Es el proceso de transmitir información.",
    arm: "Դա տեղեկություն փոխանցելու գործընթացն է։",
  },
  mediaPrompt: {
    es: "Podemos comunicarnos mediante:",
    arm: "Կարող ենք հաղորդակցվել միջոցով՝",
  },
  means: [
    { id: "mean-1", es: "palabras", arm: "բառեր" },
    { id: "mean-2", es: "gestos", arm: "ժեստեր" },
    { id: "mean-3", es: "imágenes", arm: "պատկերներ" },
    { id: "mean-4", es: "sonidos", arm: "ձայներ" },
    { id: "mean-5", es: "signos", arm: "նշաններ" },
  ],
};

export const SECTION_2 = {
  id: "sec-2",
  number: "2",
  titleEs: "¿Qué es un texto?",
  titleArm: "Ի՞նչ է տեքստը։",
  definition: {
    id: "sec2-def",
    es: "Un texto es un conjunto organizado de enunciados que transmite un mensaje completo.",
    arm: "Տեքստը կազմակերպված և իրար հետ կապված նախադասությունների ամբողջություն է, որը փոխանցում է ամբողջական հաղորդագրություն։",
  },
};

export const SECTION_3 = {
  id: "sec-3",
  number: "3",
  titleEs: "Texto oral y texto escrito",
  titleArm: "Բանավոր և գրավոր տեքստ",
  oral: {
    titleEs: "Texto oral",
    titleArm: "Բանավոր տեքստ",
    definitionEs: "Se transmite mediante la voz.",
    definitionArm: "Փոխանցվում է ձայնի միջոցով։",
    examplesLabelEs: "Ejemplos:",
    examplesLabelArm: "Օրինակներ՝",
    examples: [
      { id: "oral-1", es: "conversación", arm: "զրույց" },
      { id: "oral-2", es: "entrevista", arm: "հարցազրույց" },
      { id: "oral-3", es: "explicación", arm: "բացատրություն" },
      { id: "oral-4", es: "llamada telefónica", arm: "հեռախոսազանգ" },
    ],
  },
  written: {
    titleEs: "Texto escrito",
    titleArm: "Գրավոր տեքստ",
    definitionEs: "Se transmite mediante la escritura.",
    definitionArm: "Փոխանցվում է գրելու միջոցով։",
    examplesLabelEs: "Ejemplos:",
    examplesLabelArm: "Օրինակներ՝",
    examples: [
      { id: "written-1", es: "carta", arm: "նամակ" },
      { id: "written-2", es: "noticia", arm: "լուր" },
      { id: "written-3", es: "cuento", arm: "պատմվածք" },
      { id: "written-4", es: "correo electrónico", arm: "էլեկտրոնային նամակ" },
      { id: "written-5", es: "mensaje", arm: "հաղորդագրություն" },
    ],
  },
};

export const SECTION_4 = {
  id: "sec-4",
  number: "4",
  titleEs: "Propiedades de un buen texto",
  titleArm: "Լավ տեքստի հատկությունները",
  properties: [
    {
      id: "prop-1",
      nameEs: "Adecuación",
      nameArm: "Համապատասխանություն",
      descEs: "El texto se adapta a la situación y al receptor.",
      descArm: "Տեքստը համապատասխանում է իրավիճակին և ստացողին։",
      exampleLabelEs: "Ejemplo:",
      exampleLabelArm: "Օրինակ՝",
      exampleEs: "No hablamos igual con un amigo que con un profesor.",
      exampleArm: "Մենք չենք խոսում ընկերոջ հետ այնպես, ինչպես ուսուցչի հետ։",
    },
    {
      id: "prop-2",
      nameEs: "Coherencia",
      nameArm: "Տրամաբանական ամբողջականություն",
      descEs: "Las ideas están relacionadas y tienen sentido.",
      descArm: "Գաղափարները կապված են միմյանց և իմաստ ունեն։",
    },
    {
      id: "prop-3",
      nameEs: "Cohesión",
      nameArm: "Կապակցվածություն",
      descEs: "Las partes del texto están unidas mediante conectores y otros recursos.",
      descArm: "Տեքստի մասերը միմյանց հետ կապված են կապակցիչների և այլ միջոցների օգնությամբ։",
      connectorsLabelEs: "Ejemplos de conectores:",
      connectorsLabelArm: "Կապակցիչների օրինակներ՝",
      connectorsSummaryEs: "y, pero, porque, además, después",
      connectorsSummaryArm: "և, բայց, որովհետև, բացի այդ, հետո",
      connectorsList: [
        { id: "conn-1", es: "y", arm: "և" },
        { id: "conn-2", es: "pero", arm: "բայց" },
        { id: "conn-3", es: "porque", arm: "որովհետև" },
        { id: "conn-4", es: "además", arm: "բացի այդ" },
        { id: "conn-5", es: "después", arm: "հետո" },
      ],
    },
  ],
};

export const SECTION_5 = {
  id: "sec-5",
  number: "5",
  titleEs: "Tipos de textos según su finalidad",
  titleArm: "Տեքստերի տեսակները ըստ նպատակի",
  types: [
    {
      id: "type-1",
      termEs: "Narrativo",
      termArm: "Պատմողական",
      descEs: "cuenta hechos.",
      descArm: "պատմում է դեպքեր։",
    },
    {
      id: "type-2",
      termEs: "Descriptivo",
      termArm: "Նկարագրական",
      descEs: "explica cómo es una persona, lugar u objeto.",
      descArm: "նկարագրում է մարդ, վայր կամ առարկա։",
    },
    {
      id: "type-3",
      termEs: "Expositivo",
      termArm: "Բացատրական",
      descEs: "explica información.",
      descArm: "բացատրում է տեղեկություն։",
    },
    {
      id: "type-4",
      termEs: "Instructivo",
      termArm: "Հրահանգչական",
      descEs: "da instrucciones.",
      descArm: "տալիս է հրահանգներ։",
    },
    {
      id: "type-5",
      termEs: "Argumentativo",
      termArm: "Փաստարկային",
      descEs: "defiende una opinión.",
      descArm: "պաշտպանում է կարծիք։",
    },
  ],
};

export const QUESTIONS_AND_ANSWERS: QuestionItem[] = [
  {
    id: 1,
    questionEs: "¿Qué es la comunicación?",
    questionArm: "Ի՞նչ է հաղորդակցությունը։",
    answerEs: "Es el proceso mediante el cual transmitimos información.",
    answerArm: "Դա գործընթաց է, որի միջոցով տեղեկություն ենք փոխանցում։",
  },
  {
    id: 2,
    questionEs: "¿Qué medios podemos utilizar para comunicarnos?",
    questionArm: "Ի՞նչ միջոցներով կարող ենք հաղորդակցվել։",
    answerEs: "Palabras, gestos, imágenes, sonidos y signos.",
    answerArm: "Բառերով, ժեստերով, պատկերներով, ձայներով և նշաններով։",
  },
  {
    id: 3,
    questionEs: "¿Qué es un texto?",
    questionArm: "Ի՞նչ է տեքստը։",
    answerEs: "Es un conjunto de enunciados relacionados que transmite un mensaje completo.",
    answerArm: "Դա իրար հետ կապված նախադասությունների ամբողջություն է, որը փոխանցում է ամբողջական հաղորդագրություն։",
  },
  {
    id: 4,
    questionEs: "¿Qué tipos de textos hay según la forma de transmisión?",
    questionArm: "Ի՞նչ տեսակների են բաժանվում տեքստերը ըստ փոխանցման ձևի։",
    answerEs: "Orales y escritos.",
    answerArm: "Բանավոր և գրավոր։",
  },
  {
    id: 5,
    questionEs: "¿Qué es un texto oral?",
    questionArm: "Ի՞նչ է բանավոր տեքստը։",
    answerEs: "Es un texto que se transmite mediante la voz.",
    answerArm: "Դա տեքստ է, որը փոխանցվում է ձայնի միջոցով։",
  },
  {
    id: 6,
    questionEs: "Da un ejemplo de texto oral.",
    questionArm: "Բե՛ր բանավոր տեքստի օրինակ։",
    answerEs: "Una conversación.",
    answerArm: "Զրույց։",
  },
  {
    id: 7,
    questionEs: "¿Qué es un texto escrito?",
    questionArm: "Ի՞նչ է գրավոր տեքստը։",
    answerEs: "Es un texto que se transmite mediante la escritura.",
    answerArm: "Դա տեքստ է, որը փոխանցվում է գրելու միջոցով։",
  },
  {
    id: 8,
    questionEs: "Da un ejemplo de texto escrito.",
    questionArm: "Բե՛ր գրավոր տեքստի օրինակ։",
    answerEs: "Una carta o una noticia.",
    answerArm: "Նամակ կամ լուր։",
  },
  {
    id: 9,
    questionEs: "¿Cuáles son las tres propiedades principales de un texto?",
    questionArm: "Որո՞նք են տեքստի երեք հիմնական հատկությունները։",
    answerEs: "Adecuación, coherencia y cohesión.",
    answerArm: "Համապատասխանություն, տրամաբանական ամբողջականություն և կապակցվածություն։",
  },
  {
    id: 10,
    questionEs: "¿Qué es la adecuación?",
    questionArm: "Ի՞նչ է համապատասխանությունը։",
    answerEs: "Es adaptar el texto a la situación y al receptor.",
    answerArm: "Տեքստը իրավիճակին և ստացողին համապատասխանեցնելն է։",
  },
  {
    id: 11,
    questionEs: "¿Qué es la coherencia?",
    questionArm: "Ի՞նչ է տրամաբանական ամբողջականությունը։",
    answerEs: "Significa que las ideas tienen relación y sentido.",
    answerArm: "Դա նշանակում է, որ գաղափարները կապված են և իմաստ ունեն։",
  },
  {
    id: 12,
    questionEs: "¿Qué es la cohesión?",
    questionArm: "Ի՞նչ է կապակցվածությունը։",
    answerEs: "Es la unión correcta entre las diferentes partes del texto.",
    answerArm: "Դա տեքստի տարբեր մասերի ճիշտ կապն է։",
  },
  {
    id: 13,
    questionEs: "¿Qué hace un texto narrativo?",
    questionArm: "Ի՞նչ է անում պատմողական տեքստը։",
    answerEs: "Cuenta hechos o acontecimientos.",
    answerArm: "Պատմում է դեպքեր կամ իրադարձություններ։",
  },
  {
    id: 14,
    questionEs: "¿Qué hace un texto descriptivo?",
    questionArm: "Ի՞նչ է անում նկարագրական տեքստը։",
    answerEs: "Describe cómo es una persona, un lugar o un objeto.",
    answerArm: "Նկարագրում է մարդու, վայրի կամ առարկայի հատկանիշները։",
  },
  {
    id: 15,
    questionEs: "¿Qué hace un texto instructivo?",
    questionArm: "Ի՞նչ է անում հրահանգչական տեքստը։",
    answerEs: "Da instrucciones para hacer algo.",
    answerArm: "Տալիս է հրահանգներ որևէ բան կատարելու համար։",
  },
  {
    id: 16,
    questionEs: "¿Qué hace un texto argumentativo?",
    questionArm: "Ի՞նչ է անում փաստարկային տեքստը։",
    answerEs: "Expresa y defiende una opinión.",
    answerArm: "Արտահայտում և պաշտպանում է կարծիք։",
  },
];

export const SHORT_TEXT_PARAGRAPHS: BilingualItem[] = [
  {
    id: "st-1",
    es: "La comunicación es el proceso de transmitir información.",
    arm: "Հաղորդակցությունը տեղեկություն փոխանցելու գործընթացն է։",
  },
  {
    id: "st-2",
    es: "Un texto es un conjunto de enunciados relacionados que transmite un mensaje completo. Los textos pueden ser orales o escritos.",
    arm: "Տեքստը իրար հետ կապված նախադասությունների ամբողջություն է, որը փոխանցում է ամբողջական հաղորդագրություն։ Տեքստերը կարող են լինել բանավոր կամ գրավոր։",
  },
  {
    id: "st-3",
    es: "Para que un texto esté bien construido debe tener adecuación, coherencia y cohesión. También existen diferentes tipos de textos, como narrativos, descriptivos, expositivos, instructivos y argumentativos.",
    arm: "Լավ տեքստը պետք է ունենա համապատասխանություն, տրամաբանական ամբողջականություն և կապակցվածություն։ Գոյություն ունեն նաև տարբեր տեսակի տեքստեր՝ պատմողական, նկարագրական, բացատրական, հրահանգչական և փաստարկային։",
  },
];

// Flat list of all flashcard items for flashcard drill mode
export const ALL_FLASHCARD_ITEMS: { id: string; es: string; arm: string; category: string }[] = [
  { id: "fc-1", es: "La comunicación", arm: "Հաղորդակցություն", category: "Հասկացություններ" },
  { id: "fc-2", es: "transmitir información", arm: "տեղեկություն փոխանցել", category: "Հասկացություններ" },
  { id: "fc-3", es: "palabras", arm: "բառեր", category: "Միջոցներ" },
  { id: "fc-4", es: "gestos", arm: "ժեստեր", category: "Միջոցներ" },
  { id: "fc-5", es: "imágenes", arm: "պատկերներ", category: "Միջոցներ" },
  { id: "fc-6", es: "sonidos", arm: "ձայներ", category: "Միջոցներ" },
  { id: "fc-7", es: "signos", arm: "նշաններ", category: "Միջոցներ" },
  { id: "fc-8", es: "el emisor", arm: "ուղարկող", category: "Տարրեր" },
  { id: "fc-9", es: "el receptor", arm: "ստացող", category: "Տարրեր" },
  { id: "fc-10", es: "el mensaje", arm: "հաղորդագրություն", category: "Տարրեր" },
  { id: "fc-11", es: "el código", arm: "կոդ", category: "Տարրեր" },
  { id: "fc-12", es: "el canal", arm: "կապուղի", category: "Տարրեր" },
  { id: "fc-13", es: "el contexto", arm: "համատեքստ", category: "Տարրեր" },
  { id: "fc-14", es: "un texto", arm: "տեքստ", category: "Տեքստ" },
  { id: "fc-15", es: "textos orales", arm: "բանավոր տեքստեր", category: "Տեքստերի ձևեր" },
  { id: "fc-16", es: "textos escritos", arm: "գրավոր տեքստեր", category: "Տեքստերի ձևեր" },
  { id: "fc-17", es: "la voz", arm: "ձայն", category: "Բանավոր" },
  { id: "fc-18", es: "la escritura", arm: "գրություն / գրելը", category: "Գրավոր" },
  { id: "fc-19", es: "conversación", arm: "զրույց", category: "Օրինակներ" },
  { id: "fc-20", es: "entrevista", arm: "հարցազրույց", category: "Օրինակներ" },
  { id: "fc-21", es: "explicación", arm: "բացատրություն", category: "Օրինակներ" },
  { id: "fc-22", es: "llamada telefónica", arm: "հեռախոսազանգ", category: "Օրինակներ" },
  { id: "fc-23", es: "carta", arm: "նամակ", category: "Օրինակներ" },
  { id: "fc-24", es: "noticia", arm: "լուր", category: "Օրինակներ" },
  { id: "fc-25", es: "cuento", arm: "պատմվածք", category: "Օրինակներ" },
  { id: "fc-26", es: "correo electrónico", arm: "էլեկտրոնային նամակ", category: "Օրինակներ" },
  { id: "fc-27", es: "adecuación", arm: "համապատասխանություն", category: "Հատկություններ" },
  { id: "fc-28", es: "coherencia", arm: "տրամաբանական ամբողջականություն", category: "Հատկություններ" },
  { id: "fc-29", es: "cohesión", arm: "կապակցվածություն", category: "Հատկություններ" },
  { id: "fc-30", es: "conectores", arm: "կապակցիչներ", category: "Հատկություններ" },
  { id: "fc-31", es: "y, pero, porque, además, después", arm: "և, բայց, որովհետև, բացի այդ, հետո", category: "Կապակցիչներ" },
  { id: "fc-32", es: "Texto narrativo — cuenta hechos", arm: "Պատմողական տեքստ — պատմում է դեպքեր", category: "Տեսակներ" },
  { id: "fc-33", es: "Texto descriptivo — explica cómo es una persona, lugar u objeto", arm: "Նկարագրական տեքստ — նկարագրում է մարդ, վայր կամ առարկա", category: "Տեսակներ" },
  { id: "fc-34", es: "Texto expositivo — explica información", arm: "Բացատրական տեքստ — բացատրում է տեղեկություն", category: "Տեսակներ" },
  { id: "fc-35", es: "Texto instructivo — da instrucciones", arm: "Հրահանգչական տեքստ — տալիս է հրահանգներ", category: "Տեսակներ" },
  { id: "fc-36", es: "Texto argumentativo — defiende una opinión", arm: "Փաստարկային տեքստ — պաշտպանում է կարծիք", category: "Տեսակներ" },
];
