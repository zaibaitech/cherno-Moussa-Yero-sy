/**
 * Calculator type-specific content — archetypes, element guidance, dhikr
 * practice text. Ported verbatim (all three locales) from asrar-mobile's
 * constants/translations.ts (calculator.results.* keys), which is real
 * authored content already translated into en/fr/ar, not invented here.
 */

import type { TriText } from './buruj';

interface TriList {
  en: string[];
  fr: string[];
  ar: string[];
}

export interface Archetype {
  title: TriText;
  description: TriText;
  qualities: TriList;
}

export const ARCHETYPES: Record<number, Archetype> = {
  1: {
    title: { en: 'The Leader', fr: 'Le Leader', ar: 'القائد' },
    description: {
      en: 'Leadership, independence, pioneering spirit. The number of divine unity (Tawḥīd).',
      fr: "Leadership, indépendance, esprit pionnier. Le nombre de l'unité divine (Tawḥīd).",
      ar: 'القيادة والاستقلالية وروح الريادة. رقم التوحيد الإلهي.',
    },
    qualities: {
      en: ['Initiative', 'Confidence', 'Innovation', 'Self-reliance'],
      fr: ['Initiative', 'Confiance', 'Innovation', 'Autonomie'],
      ar: ['المبادرة', 'الثقة', 'الابتكار', 'الاعتماد على النفس'],
    },
  },
  2: {
    title: { en: 'The Harmonizer', fr: "L'Harmonisateur", ar: 'الموفِّق' },
    description: {
      en: 'Balance, partnership, diplomacy. Represents duality seeking unity.',
      fr: 'Équilibre, partenariat, diplomatie. Représente la dualité cherchant l\'unité.',
      ar: 'التوازن والشراكة والدبلوماسية. يمثل الثنائية الساعية للوحدة.',
    },
    qualities: {
      en: ['Cooperation', 'Sensitivity', 'Patience', 'Mediation'],
      fr: ['Coopération', 'Sensibilité', 'Patience', 'Médiation'],
      ar: ['التعاون', 'الحساسية', 'الصبر', 'الوساطة'],
    },
  },
  3: {
    title: { en: 'The Creator', fr: 'Le Créateur', ar: 'المبدع' },
    description: {
      en: 'Creativity, expression, joy. Sacred trinity of body, mind, and spirit.',
      fr: "Créativité, expression, joie. Trinité sacrée du corps, de l'esprit et de l'âme.",
      ar: 'الإبداع والتعبير والفرح. الثالوث المقدس للجسد والعقل والروح.',
    },
    qualities: {
      en: ['Creativity', 'Communication', 'Optimism', 'Self-expression'],
      fr: ['Créativité', 'Communication', 'Optimisme', 'Expression de soi'],
      ar: ['الإبداع', 'التواصل', 'التفاؤل', 'التعبير عن الذات'],
    },
  },
  4: {
    title: { en: 'The Builder', fr: 'Le Bâtisseur', ar: 'الباني' },
    description: {
      en: 'Stability, foundation, discipline. Four elements, four sacred months.',
      fr: 'Stabilité, fondation, discipline. Quatre éléments, quatre mois sacrés.',
      ar: 'الثبات والأساس والانضباط. أربعة عناصر، أربعة أشهر حرم.',
    },
    qualities: {
      en: ['Organization', 'Practicality', 'Determination', 'Trustworthiness'],
      fr: ['Organisation', 'Praticité', 'Détermination', 'Fiabilité'],
      ar: ['التنظيم', 'العملية', 'العزيمة', 'الموثوقية'],
    },
  },
  5: {
    title: { en: 'The Adventurer', fr: "L'Aventurier", ar: 'المغامر' },
    description: {
      en: 'Freedom, change, versatility. Five pillars of Islam, five daily prayers.',
      fr: 'Liberté, changement, versatilité. Cinq piliers de l\'Islam, cinq prières quotidiennes.',
      ar: 'الحرية والتغيير والتنوع. أركان الإسلام الخمسة، الصلوات الخمس اليومية.',
    },
    qualities: {
      en: ['Adaptability', 'Curiosity', 'Freedom', 'Resourcefulness'],
      fr: ['Adaptabilité', 'Curiosité', 'Liberté', 'Débrouillardise'],
      ar: ['التكيّف', 'الفضول', 'الحرية', 'سعة الحيلة'],
    },
  },
  6: {
    title: { en: 'The Nurturer', fr: 'Le Nourricier', ar: 'الراعي' },
    description: {
      en: 'Love, responsibility, harmony. Six days of creation.',
      fr: 'Amour, responsabilité, harmonie. Six jours de création.',
      ar: 'الحب والمسؤولية والانسجام. أيام الخلق الستة.',
    },
    qualities: {
      en: ['Compassion', 'Service', 'Responsibility', 'Balance'],
      fr: ['Compassion', 'Service', 'Responsabilité', 'Équilibre'],
      ar: ['الرحمة', 'الخدمة', 'المسؤولية', 'التوازن'],
    },
  },
  7: {
    title: { en: 'The Seeker', fr: 'Le Chercheur', ar: 'الباحث' },
    description: {
      en: 'Wisdom, spirituality, introspection. Seven heavens, seven earths.',
      fr: 'Sagesse, spiritualité, introspection. Sept cieux, sept terres.',
      ar: 'الحكمة والروحانية والتأمل الذاتي. سبع سماوات، سبع أرضين.',
    },
    qualities: {
      en: ['Spiritual depth', 'Analysis', 'Contemplation', 'Mysticism'],
      fr: ['Profondeur spirituelle', 'Analyse', 'Contemplation', 'Mysticisme'],
      ar: ['العمق الروحي', 'التحليل', 'التأمل', 'التصوف'],
    },
  },
  8: {
    title: { en: 'The Achiever', fr: "L'Accomplisseur", ar: 'المُنجِز' },
    description: {
      en: 'Power, abundance, manifestation. Eight angels carrying the Throne.',
      fr: 'Pouvoir, abondance, manifestation. Huit anges portant le Trône.',
      ar: 'القوة والوفرة والتجلي. ثمانية ملائكة يحملون العرش.',
    },
    qualities: {
      en: ['Ambition', 'Authority', 'Material success', 'Karma'],
      fr: ['Ambition', 'Autorité', 'Succès matériel', 'Karma'],
      ar: ['الطموح', 'السلطة', 'النجاح المادي', 'الكرما'],
    },
  },
  9: {
    title: { en: 'The Humanitarian', fr: "L'Humanitaire", ar: 'الإنساني' },
    description: {
      en: 'Completion, universal love, enlightenment. The number of completion and perfection.',
      fr: "Achèvement, amour universel, illumination. Le nombre de l'achèvement et de la perfection.",
      ar: 'الاكتمال والحب الشامل والتنوير. رقم الإتمام والكمال.',
    },
    qualities: {
      en: ['Compassion', 'Service to others', 'Wisdom', 'Completion'],
      fr: ['Compassion', 'Service aux autres', 'Sagesse', 'Achèvement'],
      ar: ['الرحمة', 'خدمة الآخرين', 'الحكمة', 'الاكتمال'],
    },
  },
};

type ElementKey = 'fire' | 'water' | 'air' | 'earth';

export const ELEMENT_GUIDANCE: Record<ElementKey, TriText> = {
  fire: {
    en: 'Your fiery nature brings passion and transformation. Channel this energy through focused spiritual practice and righteous action.',
    fr: 'Votre nature ardente apporte passion et transformation. Canalisez cette énergie par une pratique spirituelle concentrée et une action juste.',
    ar: 'تجلب طبيعتك النارية الشغف والتحول. وجّه هذه الطاقة عبر ممارسة روحية مركزة وعمل صالح.',
  },
  water: {
    en: 'Your flowing nature brings depth and intuition. Embrace emotional wisdom and let your heart guide you to divine connection.',
    fr: 'Votre nature fluide apporte profondeur et intuition. Embrassez la sagesse émotionnelle et laissez votre cœur vous guider vers la connexion divine.',
    ar: 'تجلب طبيعتك المتدفقة العمق والحدس. تبنَّ الحكمة العاطفية ودع قلبك يقودك إلى الاتصال الإلهي.',
  },
  air: {
    en: 'Your airy nature brings clarity and communication. Seek knowledge and share wisdom with gentle words and pure intention.',
    fr: 'Votre nature aérienne apporte clarté et communication. Recherchez la connaissance et partagez la sagesse avec des mots doux et une intention pure.',
    ar: 'تجلب طبيعتك الهوائية الوضوح والتواصل. اطلب العلم وشارك الحكمة بكلمات لطيفة ونية صافية.',
  },
  earth: {
    en: 'Your grounded nature brings stability and patience. Build your spiritual foundation through consistent practice and gratitude.',
    fr: 'Votre nature ancrée apporte stabilité et patience. Construisez votre fondation spirituelle par une pratique constante et la gratitude.',
    ar: 'تجلب طبيعتك الراسخة الثبات والصبر. ابنِ أساسك الروحي من خلال ممارسة منتظمة وامتنان.',
  },
};

export const BEST_TIME: Record<ElementKey, TriText> = {
  fire: {
    en: 'Dawn and sunrise (Fajr time) — when fire energy is strongest',
    fr: "Aube et lever du soleil (temps de Fajr) — quand l'énergie du feu est la plus forte",
    ar: 'الفجر والشروق (وقت الفجر) - عندما تكون طاقة النار في أقوى حالاتها',
  },
  water: {
    en: 'Night and before sleep (Isha time) — when water energy flows',
    fr: "Nuit et avant de dormir (temps d'Isha) — quand l'énergie de l'eau coule",
    ar: 'الليل وقبل النوم (وقت العشاء) - عندما تتدفق طاقة الماء',
  },
  air: {
    en: 'Morning and afternoon (Dhuhr to Asr) — when air circulates',
    fr: "Matin et après-midi (Dhuhr à Asr) — quand l'air circule",
    ar: 'الصباح وبعد الظهر (من الظهر إلى العصر) - عندما يتحرك الهواء',
  },
  earth: {
    en: 'Maghrib and grounding moments — when earth stabilizes',
    fr: "Maghrib et moments d'ancrage — quand la terre se stabilise",
    ar: 'المغرب ولحظات التجذّر - عندما تستقر الأرض',
  },
};

export const POWER_DAY: Record<ElementKey, TriText> = {
  fire: { en: 'Tuesday (Mars) and Sunday (Sun)', fr: 'Mardi (Mars) et Dimanche (Soleil)', ar: 'الثلاثاء (المريخ) والأحد (الشمس)' },
  water: { en: 'Monday (Moon) and Friday (Venus)', fr: 'Lundi (Lune) et Vendredi (Vénus)', ar: 'الاثنين (القمر) والجمعة (الزهرة)' },
  air: { en: 'Wednesday (Mercury)', fr: 'Mercredi (Mercure)', ar: 'الأربعاء (عطارد)' },
  earth: { en: 'Thursday (Jupiter) and Saturday (Saturn)', fr: 'Jeudi (Jupiter) et Samedi (Saturne)', ar: 'الخميس (المشتري) والسبت (زحل)' },
};

export const PHRASE_REFLECTION: TriText[] = [
  {
    en: 'What feeling does this phrase evoke in your heart?',
    fr: 'Quel sentiment cette phrase évoque-t-elle dans votre cœur ?',
    ar: 'ما الشعور الذي تثيره هذه العبارة في قلبك؟',
  },
  {
    en: 'How does this phrase connect to your current spiritual journey?',
    fr: 'Comment cette phrase se connecte-t-elle à votre parcours spirituel actuel ?',
    ar: 'كيف ترتبط هذه العبارة برحلتك الروحية الحالية؟',
  },
  {
    en: 'What action or change does this phrase inspire in you?',
    fr: 'Quelle action ou changement cette phrase vous inspire-t-elle ?',
    ar: 'ما الفعل أو التغيير الذي تلهمك به هذه العبارة؟',
  },
];

export const DHIKR_TIMING: TriText[] = [
  { en: 'After Fajr', fr: 'Après Fajr', ar: 'بعد الفجر' },
  { en: 'After Maghrib', fr: 'Après Maghrib', ar: 'بعد المغرب' },
  { en: 'Before sleep', fr: 'Avant de dormir', ar: 'قبل النوم' },
];

export const DHIKR_PREPARATION: TriText[] = [
  { en: 'Make wuḍūʾ', fr: 'Faites le wuḍūʾ', ar: 'توضّأ' },
  { en: 'Face the qibla', fr: 'Faites face à la qibla', ar: 'استقبل القبلة' },
  { en: 'Begin with ṣalawāt on the Prophet ﷺ', fr: 'Commencez par les ṣalawāt sur le Prophète ﷺ', ar: 'ابدأ بالصلاة على النبي ﷺ' },
];

export const DHIKR_ETIQUETTE: TriText[] = [
  { en: 'With presence and humility', fr: 'Avec présence et humilité', ar: 'بحضور وخشوع' },
  { en: 'Count on fingers or tasbīḥ', fr: 'Comptez sur les doigts ou le tasbīḥ', ar: 'عدّ على الأصابع أو بالمسبحة' },
  { en: 'End with duʿāʾ', fr: 'Terminez par le duʿāʾ', ar: 'اختم بالدعاء' },
];
