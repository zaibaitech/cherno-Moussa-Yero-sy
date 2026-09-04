/**
 * Name-based relationship compatibility — the "authentic 4-method" system.
 *
 * Ported from asrar-mobile: utils/relationshipCompatibility.ts (algorithm)
 * and types/compatibility.ts (RelationshipCompatibility and friends). This
 * is purely algorithmic — no cheikh attribution on this feature in the
 * source app (only Sadaqah/Istikhara content carries that), so it's ported
 * as-is with no content-rights concerns.
 *
 * Reuses the same abjad Kabir total as the "Who Am I"/Istikhara engine
 * (calculateHadadKabir from ./coreCalculations) — each person's own name
 * only, mother's name is not used for compatibility (matches asrar-mobile's
 * buildDestiny(arabicName, undefined, ABJAD_MAGHRIBI) call site).
 */

import { calculateHadadKabir } from './coreCalculations';
import { PLANETARY_RULERS, PLANETARY_RELATIONSHIPS } from './compatibility-constants';

export type Element = 'fire' | 'water' | 'air' | 'earth';
type TriText = { en: string; fr: string; ar: string };

const modIndex = (value: number, mod: number): number => {
  const result = value % mod;
  return result === 0 ? mod : result;
};

// ============================================================================
// 1. Spiritual Destiny (mod 9)
// ============================================================================

export interface SpiritualDestinyResult {
  method: 'spiritual-destiny';
  remainder: number;
  score: number;
  quality: 'excellent' | 'good' | 'moderate' | 'challenging';
  qualityArabic: string;
  qualityFrench: string;
  description: string;
  descriptionFrench: string;
  descriptionArabic: string;
  color: string;
}

export function calculateSpiritualDestiny(total1: number, total2: number): SpiritualDestinyResult {
  const sum = total1 + total2 + 7;
  const remainder = sum % 9 === 0 ? 9 : sum % 9;

  const scoreMap: Record<number, { score: number; quality: SpiritualDestinyResult['quality']; qualityArabic: string; qualityFrench: string }> = {
    1: { score: 65, quality: 'moderate', qualityArabic: 'متوسط', qualityFrench: 'Modéré' },
    2: { score: 70, quality: 'good', qualityArabic: 'جيد', qualityFrench: 'Bon' },
    3: { score: 40, quality: 'challenging', qualityArabic: 'العداوة', qualityFrench: 'Difficile' },
    4: { score: 70, quality: 'good', qualityArabic: 'جيد', qualityFrench: 'Bon' },
    5: { score: 60, quality: 'moderate', qualityArabic: 'متوسط', qualityFrench: 'Modéré' },
    6: { score: 55, quality: 'challenging', qualityArabic: 'تحدي', qualityFrench: 'Difficile' },
    7: { score: 95, quality: 'excellent', qualityArabic: 'ممتاز', qualityFrench: 'Excellent' },
    8: { score: 90, quality: 'excellent', qualityArabic: 'ممتاز جداً', qualityFrench: 'Très excellent' },
    9: { score: 45, quality: 'challenging', qualityArabic: 'الإنتهاء', qualityFrench: 'Difficile' },
  };

  const descriptions: Record<number, TriText> = {
    1: { en: 'New beginnings and fresh energy. This pairing initiates new chapters together.', fr: 'Nouveaux départs et énergie fraîche. Ce duo initie de nouveaux chapitres ensemble.', ar: 'بدايات جديدة وطاقة متجددة. هذا الزوج يبدأ فصولاً جديدة معاً.' },
    2: { en: 'Balance and duality. Both individuals complement each other through cooperation.', fr: 'Équilibre et dualité. Les deux individus se complètent par la coopération.', ar: 'توازن وثنائية. كلا الطرفين يكمل الآخر من خلال التعاون.' },
    3: { en: 'Friction and discord. This pairing faces fundamental differences that require careful navigation.', fr: 'Friction et discorde. Ce duo fait face à des différences fondamentales nécessitant une navigation prudente.', ar: 'احتكاك وخلاف. هذا الزوج يواجه اختلافات أساسية تتطلب تعاملاً حذراً.' },
    4: { en: 'Stability and structure. A grounded partnership built on solid foundations.', fr: 'Stabilité et structure. Un partenariat ancré construit sur des bases solides.', ar: 'استقرار وبنية. شراكة متأصلة مبنية على أسس صلبة.' },
    5: { en: 'Dynamic change and adaptability. This pairing thrives on variety and movement.', fr: 'Changement dynamique et adaptabilité. Ce duo prospère dans la variété et le mouvement.', ar: 'تغيير ديناميكي وقابلية للتكيف. هذا الزوج يزدهر بالتنوع والحركة.' },
    6: { en: 'Responsibility and service. May require effort but builds strong commitment.', fr: "Responsabilité et service. Peut nécessiter des efforts mais renforce l'engagement.", ar: 'مسؤولية وخدمة. قد يتطلب جهداً لكن يبني التزاماً قوياً.' },
    7: { en: 'Spiritual harmony and wisdom. An ideal match with deep understanding.', fr: 'Harmonie spirituelle et sagesse. Un match idéal avec une compréhension profonde.', ar: 'انسجام روحاني وحكمة. توافق مثالي مع فهم عميق.' },
    8: { en: 'Abundance and manifestation. This pair has strong potential for achievement.', fr: 'Abondance et manifestation. Ce couple a un fort potentiel de réussite.', ar: 'وفرة وتجسيد. هذا الثنائي لديه إمكانات قوية للإنجاز.' },
    9: { en: 'Cycle ending and completion. This connection may represent a karmic conclusion or natural closure.', fr: 'Fin de cycle et achèvement. Cette connexion peut représenter une conclusion karmique ou une clôture naturelle.', ar: 'نهاية دورة وإتمام. هذا الارتباط قد يمثل خاتمة كارمية أو إغلاقاً طبيعياً.' },
  };

  const result = scoreMap[remainder];
  const desc = descriptions[remainder];
  const colors: Record<string, string> = { excellent: 'green', good: 'blue', moderate: 'yellow', challenging: 'orange' };

  return {
    method: 'spiritual-destiny',
    remainder,
    score: result.score,
    quality: result.quality,
    qualityArabic: result.qualityArabic,
    qualityFrench: result.qualityFrench,
    description: desc.en,
    descriptionFrench: desc.fr,
    descriptionArabic: desc.ar,
    color: colors[result.quality],
  };
}

// ============================================================================
// 2. Elemental Temperament (mod 4)
// ============================================================================

export interface ElementalTemperamentResult {
  method: 'elemental-temperament';
  remainder: number;
  sharedElement: Element;
  sharedElementArabic: string;
  sharedElementFrench: string;
  score: number;
  quality: 'harmonious' | 'complementary' | 'balanced' | 'dynamic';
  qualityArabic: string;
  qualityFrench: string;
  description: string;
  descriptionFrench: string;
  descriptionArabic: string;
  color: string;
}

export function calculateElementalTemperament(total1: number, total2: number): ElementalTemperamentResult {
  const sum = total1 + total2;
  const remainder = sum % 4 === 0 ? 4 : sum % 4;

  const elementMap: Record<number, { element: Element; elementArabic: string; elementFrench: string; score: number; quality: ElementalTemperamentResult['quality']; qualityArabic: string; qualityFrench: string }> = {
    1: { element: 'fire', elementArabic: 'نار', elementFrench: 'feu', score: 85, quality: 'dynamic', qualityArabic: 'ديناميكي', qualityFrench: 'Dynamique' },
    2: { element: 'earth', elementArabic: 'تراب', elementFrench: 'terre', score: 90, quality: 'complementary', qualityArabic: 'تكميلي', qualityFrench: 'Complémentaire' },
    3: { element: 'air', elementArabic: 'هواء', elementFrench: 'air', score: 75, quality: 'balanced', qualityArabic: 'متوازن', qualityFrench: 'Équilibré' },
    4: { element: 'water', elementArabic: 'ماء', elementFrench: 'eau', score: 80, quality: 'harmonious', qualityArabic: 'متناغم', qualityFrench: 'Harmonieux' },
  };

  const descriptions: Record<Element, TriText> = {
    fire: { en: 'Passionate and energetic chemistry. Both partners bring enthusiasm and drive.', fr: 'Chimie passionnée et énergique. Les deux partenaires apportent enthousiasme et dynamisme.', ar: 'كيمياء عاطفية ونشطة. كلا الشريكين يجلبان الحماس والدافع.' },
    water: { en: 'Emotional depth and intuitive connection. A nurturing and empathetic bond.', fr: 'Profondeur émotionnelle et connexion intuitive. Un lien nourricier et empathique.', ar: 'عمق عاطفي واتصال حدسي. رابطة راعية ومتعاطفة.' },
    air: { en: 'Intellectual stimulation and clear communication. Mental compatibility is strong.', fr: 'Stimulation intellectuelle et communication claire. La compatibilité mentale est forte.', ar: 'تحفيز فكري وتواصل واضح. التوافق العقلي قوي.' },
    earth: { en: 'Practical stability and reliable support. A grounded, lasting partnership.', fr: 'Stabilité pratique et soutien fiable. Un partenariat ancré et durable.', ar: 'استقرار عملي ودعم موثوق. شراكة متأصلة ودائمة.' },
  };

  const result = elementMap[remainder];
  const desc = descriptions[result.element];
  const colors: Record<Element, string> = { fire: 'red', water: 'blue', air: 'cyan', earth: 'green' };

  return {
    method: 'elemental-temperament',
    remainder,
    sharedElement: result.element,
    sharedElementArabic: result.elementArabic,
    sharedElementFrench: result.elementFrench,
    score: result.score,
    quality: result.quality,
    qualityArabic: result.qualityArabic,
    qualityFrench: result.qualityFrench,
    description: desc.en,
    descriptionFrench: desc.fr,
    descriptionArabic: desc.ar,
    color: colors[result.element],
  };
}

// ============================================================================
// 3. Planetary Cosmic (mod 7)
// ============================================================================

export interface PlanetaryCosmicResult {
  method: 'planetary-cosmic';
  person1Planet: { name: string; nameArabic: string; element: Element };
  person2Planet: { name: string; nameArabic: string; element: Element };
  relationship: 'friendly' | 'neutral' | 'opposing';
  relationshipArabic: string;
  relationshipFrench: string;
  score: number;
  quality: 'excellent' | 'good' | 'moderate' | 'challenging';
  qualityArabic: string;
  qualityFrench: string;
  description: string;
  descriptionFrench: string;
  descriptionArabic: string;
  color: string;
}

export function calculatePlanetaryCosmic(total1: number, total2: number): PlanetaryCosmicResult {
  const planet1 = PLANETARY_RULERS[(total1 % 7) as keyof typeof PLANETARY_RULERS];
  const planet2 = PLANETARY_RULERS[(total2 % 7) as keyof typeof PLANETARY_RULERS];

  let relationship: PlanetaryCosmicResult['relationship'];
  let relationshipArabic: string;
  let relationshipFrench: string;
  let score: number;
  let quality: PlanetaryCosmicResult['quality'];
  let qualityArabic: string;
  let qualityFrench: string;

  const planetRelations = PLANETARY_RELATIONSHIPS[planet1.name];

  if (planet1.name === planet2.name) {
    relationship = 'friendly'; relationshipArabic = 'صديق'; relationshipFrench = 'Amical';
    score = 100; quality = 'excellent'; qualityArabic = 'ممتاز'; qualityFrench = 'Excellent';
  } else if (planetRelations.friendly.includes(planet2.name)) {
    relationship = 'friendly'; relationshipArabic = 'صديق'; relationshipFrench = 'Amical';
    score = 85; quality = 'excellent'; qualityArabic = 'ممتاز'; qualityFrench = 'Excellent';
  } else if (planetRelations.neutral.includes(planet2.name)) {
    relationship = 'neutral'; relationshipArabic = 'محايد'; relationshipFrench = 'Neutre';
    score = 65; quality = 'good'; qualityArabic = 'جيد'; qualityFrench = 'Bon';
  } else {
    relationship = 'opposing'; relationshipArabic = 'متعارض'; relationshipFrench = 'Opposé';
    score = 45; quality = 'challenging'; qualityArabic = 'تحدي'; qualityFrench = 'Difficile';
  }

  const descriptions: Record<PlanetaryCosmicResult['relationship'], TriText> = {
    friendly: { en: `${planet1.name} and ${planet2.name} are harmonious celestial allies. Their cosmic energies flow smoothly together.`, fr: `${planet1.name} et ${planet2.name} sont des alliés célestes harmonieux. Leurs énergies cosmiques s'harmonisent parfaitement.`, ar: `${planet1.nameArabic} و ${planet2.nameArabic} حلفاء سماويون متناغمون. طاقاتهم الكونية تتدفق بسلاسة معاً.` },
    neutral: { en: `${planet1.name} and ${planet2.name} maintain balanced cosmic positions. Requires conscious effort for alignment.`, fr: `${planet1.name} et ${planet2.name} maintiennent des positions cosmiques équilibrées. Nécessite un effort conscient pour l'alignement.`, ar: `${planet1.nameArabic} و ${planet2.nameArabic} يحافظان على مواقع كونية متوازنة. يتطلب جهداً واعياً للتوافق.` },
    opposing: { en: `${planet1.name} and ${planet2.name} have challenging cosmic aspects. Growth comes through navigating differences.`, fr: `${planet1.name} et ${planet2.name} ont des aspects cosmiques difficiles. La croissance vient en naviguant les différences.`, ar: `${planet1.nameArabic} و ${planet2.nameArabic} لديهما جوانب كونية صعبة. النمو يأتي من خلال التعامل مع الاختلافات.` },
  };

  const desc = descriptions[relationship];
  const colors: Record<string, string> = { excellent: 'green', good: 'blue', moderate: 'yellow', challenging: 'orange' };

  return {
    method: 'planetary-cosmic',
    person1Planet: planet1,
    person2Planet: planet2,
    relationship,
    relationshipArabic,
    relationshipFrench,
    score,
    quality,
    qualityArabic,
    qualityFrench,
    description: desc.en,
    descriptionFrench: desc.fr,
    descriptionArabic: desc.ar,
    color: colors[quality],
  };
}

// ============================================================================
// 4. Daily Interaction (letter-counting elemental distribution)
// ============================================================================

const LETTER_ELEMENTS: Record<string, Element> = {
  ا: 'fire', ه: 'fire', ط: 'fire', م: 'fire', ف: 'fire', ش: 'fire', ذ: 'fire',
  ب: 'air', و: 'air', ي: 'air', ن: 'air', ض: 'air', ظ: 'air', غ: 'air',
  ج: 'water', ز: 'water', ك: 'water', س: 'water', ق: 'water', ث: 'water', خ: 'water',
  د: 'earth', ح: 'earth', ل: 'earth', ع: 'earth', ر: 'earth', ص: 'earth', ت: 'earth',
  ة: 'earth',
};

export interface ElementDistribution {
  fire: number;
  air: number;
  water: number;
  earth: number;
}

export function calculateLetterElementDistribution(arabicText: string): ElementDistribution {
  const normalized = arabicText.replace(/[ًٌٍَُِّْ\s]/g, '');
  const letters = [...normalized];
  const total = letters.length;
  const counts = { fire: 0, air: 0, water: 0, earth: 0 };

  letters.forEach((letter) => {
    const element = LETTER_ELEMENTS[letter];
    if (element) counts[element]++;
  });

  return {
    fire: total > 0 ? Math.round((counts.fire / total) * 100) : 0,
    air: total > 0 ? Math.round((counts.air / total) * 100) : 0,
    water: total > 0 ? Math.round((counts.water / total) * 100) : 0,
    earth: total > 0 ? Math.round((counts.earth / total) * 100) : 0,
  };
}

export function getDominantElement(dist: ElementDistribution): Element {
  const elements: Element[] = ['fire', 'air', 'water', 'earth'];
  let maxElement: Element = 'fire';
  let maxValue = 0;
  elements.forEach((element) => {
    if (dist[element] > maxValue) {
      maxValue = dist[element];
      maxElement = element;
    }
  });
  return maxElement;
}

export interface DailyInteractionResult {
  method: 'daily-interaction';
  person1Distribution: ElementDistribution;
  person2Distribution: ElementDistribution;
  person1Dominant: Element;
  person2Dominant: Element;
  person1DominantArabic: string;
  person2DominantArabic: string;
  person1DominantFrench: string;
  person2DominantFrench: string;
  interactionType: 'harmonious' | 'complementary' | 'challenging' | 'neutral';
  interactionTypeArabic: string;
  interactionTypeFrench: string;
  score: number;
  quality: 'excellent' | 'good' | 'moderate' | 'challenging';
  qualityArabic: string;
  qualityFrench: string;
  description: string;
  descriptionFrench: string;
  descriptionArabic: string;
  color: string;
}

const ELEMENT_NAMES: Record<Element, { ar: string; fr: string }> = {
  fire: { ar: 'نار', fr: 'Feu' },
  air: { ar: 'هواء', fr: 'Air' },
  water: { ar: 'ماء', fr: 'Eau' },
  earth: { ar: 'تراب', fr: 'Terre' },
};

const DAILY_PAIR_DESCRIPTIONS: Record<string, TriText> = {
  'fire-fire': { en: 'Both partners share Fire energy. Expect passion, enthusiasm, and dynamic action in daily life. May need to manage intensity.', fr: "Les deux partenaires partagent l'énergie du Feu. Attendez-vous à la passion, l'enthousiasme et l'action dynamique au quotidien. Peut nécessiter de gérer l'intensité.", ar: 'كلا الشريكين يشتركان في طاقة النار. توقع الشغف والحماس والعمل الديناميكي في الحياة اليومية. قد يحتاج لإدارة الحدة.' },
  'air-air': { en: 'Both partners share Air energy. Daily interactions focus on communication, ideas, and mental stimulation. Keep conversations grounded.', fr: "Les deux partenaires partagent l'énergie de l'Air. Les interactions quotidiennes se concentrent sur la communication, les idées et la stimulation mentale. Gardez les conversations ancrées.", ar: 'كلا الشريكين يشتركان في طاقة الهواء. التفاعلات اليومية تركز على التواصل والأفكار والتحفيز الذهني. حافظ على المحادثات متجذرة.' },
  'water-water': { en: 'Both partners share Water energy. Emotional depth and intuition guide daily life. Create healthy boundaries to avoid emotional overwhelm.', fr: "Les deux partenaires partagent l'énergie de l'Eau. La profondeur émotionnelle et l'intuition guident la vie quotidienne. Créez des limites saines pour éviter la surcharge émotionnelle.", ar: 'كلا الشريكين يشتركان في طاقة الماء. العمق العاطفي والحدس يوجهان الحياة اليومية. أنشئ حدوداً صحية لتجنب الطغيان العاطفي.' },
  'earth-earth': { en: 'Both partners share Earth energy. Daily life is practical, stable, and grounded. Remember to embrace spontaneity and change.', fr: "Les deux partenaires partagent l'énergie de la Terre. La vie quotidienne est pratique, stable et ancrée. N'oubliez pas d'embrasser la spontanéité et le changement.", ar: 'كلا الشريكين يشتركان في طاقة الأرض. الحياة اليومية عملية ومستقرة ومتجذرة. تذكر احتضان العفوية والتغيير.' },
  'air-fire': { en: 'Fire and Air energies fuel each other. Daily interactions are stimulating, creative, and full of movement. Channel this energy constructively.', fr: "Les énergies du Feu et de l'Air s'alimentent mutuellement. Les interactions quotidiennes sont stimulantes, créatives et pleines de mouvement. Canalisez cette énergie de manière constructive.", ar: 'طاقات النار والهواء تغذي بعضها. التفاعلات اليومية محفزة وإبداعية ومليئة بالحركة. وجه هذه الطاقة بشكل بناء.' },
  'earth-water': { en: 'Earth and Water blend for growth and nurturing. Daily life balances practicality with emotional care. A naturally supportive combination.', fr: "La Terre et l'Eau se mélangent pour la croissance et le soin. La vie quotidienne équilibre praticité et attention émotionnelle. Une combinaison naturellement soutenante.", ar: 'الأرض والماء يمتزجان للنمو والرعاية. الحياة اليومية توازن بين العملية والرعاية العاطفية. مزيج داعم بشكل طبيعي.' },
  'fire-water': { en: 'Fire and Water create steam and tension. Daily interactions may alternate between passion and cooling. Requires patience and understanding.', fr: "Le Feu et l'Eau créent vapeur et tension. Les interactions quotidiennes peuvent alterner entre passion et refroidissement. Nécessite patience et compréhension.", ar: 'النار والماء يخلقان بخاراً وتوتراً. التفاعلات اليومية قد تتناوب بين الشغف والتبريد. تتطلب الصبر والفهم.' },
  'air-earth': { en: 'Air and Earth represent ideas meeting practicality. Daily life requires balancing vision with execution. Communication is key.', fr: "L'Air et la Terre représentent les idées rencontrant la praticité. La vie quotidienne nécessite d'équilibrer vision et exécution. La communication est essentielle.", ar: 'الهواء والأرض يمثلان الأفكار تلتقي بالواقعية. الحياة اليومية تتطلب موازنة الرؤية مع التنفيذ. التواصل هو المفتاح.' },
  'earth-fire': { en: 'Fire and Earth combine action with stability. Daily interactions balance passion with practicality. Respect each other\'s pace.', fr: "Le Feu et la Terre combinent action et stabilité. Les interactions quotidiennes équilibrent passion et praticité. Respectez le rythme de chacun.", ar: 'النار والأرض تجمع العمل مع الاستقرار. التفاعلات اليومية توازن الشغف مع الواقعية. احترم وتيرة كل منكما.' },
  'air-water': { en: 'Air and Water blend logic with emotion. Daily life requires honoring both intellect and feelings. Find balance between thinking and feeling.', fr: "L'Air et l'Eau mélangent logique et émotion. La vie quotidienne nécessite d'honorer à la fois l'intellect et les sentiments. Trouvez l'équilibre entre penser et ressentir.", ar: 'الهواء والماء يمزجان المنطق مع العاطفة. الحياة اليومية تتطلب تكريم العقل والمشاعر. اعثر على التوازن بين التفكير والشعور.' },
};

export function analyzeDailyInteraction(person1Arabic: string, person2Arabic: string): DailyInteractionResult {
  const dist1 = calculateLetterElementDistribution(person1Arabic);
  const dist2 = calculateLetterElementDistribution(person2Arabic);
  const dom1 = getDominantElement(dist1);
  const dom2 = getDominantElement(dist2);

  let interactionType: DailyInteractionResult['interactionType'];
  let interactionTypeArabic: string;
  let interactionTypeFrench: string;
  let score: number;
  let quality: DailyInteractionResult['quality'];
  let qualityArabic: string;
  let qualityFrench: string;

  if (dom1 === dom2) {
    interactionType = 'harmonious'; interactionTypeArabic = 'متناغم'; interactionTypeFrench = 'Harmonieux';
    score = 85; quality = 'excellent'; qualityArabic = 'ممتاز'; qualityFrench = 'Excellent';
  } else if (
    (dom1 === 'fire' && dom2 === 'air') || (dom1 === 'air' && dom2 === 'fire') ||
    (dom1 === 'earth' && dom2 === 'water') || (dom1 === 'water' && dom2 === 'earth')
  ) {
    interactionType = 'complementary'; interactionTypeArabic = 'تكميلي'; interactionTypeFrench = 'Complémentaire';
    score = 75; quality = 'good'; qualityArabic = 'جيد'; qualityFrench = 'Bon';
  } else if (
    (dom1 === 'fire' && dom2 === 'water') || (dom1 === 'water' && dom2 === 'fire') ||
    (dom1 === 'air' && dom2 === 'earth') || (dom1 === 'earth' && dom2 === 'air')
  ) {
    interactionType = 'challenging'; interactionTypeArabic = 'صعب'; interactionTypeFrench = 'Difficile';
    score = 50; quality = 'challenging'; qualityArabic = 'تحدي'; qualityFrench = 'Difficile';
  } else {
    interactionType = 'neutral'; interactionTypeArabic = 'محايد'; interactionTypeFrench = 'Neutre';
    score = 65; quality = 'moderate'; qualityArabic = 'متوسط'; qualityFrench = 'Modéré';
  }

  const pairKey = [dom1, dom2].sort().join('-');
  const desc = DAILY_PAIR_DESCRIPTIONS[pairKey] ?? {
    en: `${dom1} and ${dom2} interaction. This unique combination brings together different elemental energies in daily life.`,
    fr: `Interaction ${ELEMENT_NAMES[dom1].fr} et ${ELEMENT_NAMES[dom2].fr}. Cette combinaison unique rassemble différentes énergies élémentaires dans la vie quotidienne.`,
    ar: `تفاعل ${ELEMENT_NAMES[dom1].ar} و ${ELEMENT_NAMES[dom2].ar}. هذا المزيج الفريد يجمع طاقات عنصرية مختلفة في الحياة اليومية.`,
  };

  const colors: Record<string, string> = { excellent: 'green', good: 'blue', moderate: 'yellow', challenging: 'orange' };

  return {
    method: 'daily-interaction',
    person1Distribution: dist1,
    person2Distribution: dist2,
    person1Dominant: dom1,
    person2Dominant: dom2,
    person1DominantArabic: ELEMENT_NAMES[dom1].ar,
    person2DominantArabic: ELEMENT_NAMES[dom2].ar,
    person1DominantFrench: ELEMENT_NAMES[dom1].fr,
    person2DominantFrench: ELEMENT_NAMES[dom2].fr,
    interactionType,
    interactionTypeArabic,
    interactionTypeFrench,
    score,
    quality,
    qualityArabic,
    qualityFrench,
    description: desc.en,
    descriptionFrench: desc.fr,
    descriptionArabic: desc.ar,
    color: colors[quality],
  };
}

// ============================================================================
// Helper: element from a Kabir total (mod 4, 1-indexed)
// ============================================================================

export function getElementFromAbjadTotal(abjadTotal: number): Element {
  const hadathIndex = modIndex(abjadTotal, 4);
  const elementMap: Record<number, Element> = { 1: 'fire', 2: 'earth', 3: 'air', 4: 'water' };
  return elementMap[hadathIndex];
}

// ============================================================================
// Combined analysis
// ============================================================================

export interface RelationshipCompatibility {
  mode: 'relationship';
  person1: { name: string; arabicName: string; abjadTotal: number; element: Element };
  person2: { name: string; arabicName: string; abjadTotal: number; element: Element };
  methods: {
    spiritualDestiny: SpiritualDestinyResult;
    elementalTemperament: ElementalTemperamentResult;
    planetaryCosmic: PlanetaryCosmicResult;
    dailyInteraction: DailyInteractionResult;
  };
  overallScore: number;
  overallQuality: 'excellent' | 'very-good' | 'good' | 'moderate' | 'challenging';
  overallQualityArabic: string;
  overallQualityFrench: string;
  summary: string;
  summaryFrench: string;
  summaryArabic: string;
  recommendations: string[];
  recommendationsFrench: string[];
  recommendationsArabic: string[];
}

const OVERALL_SUMMARIES: Record<RelationshipCompatibility['overallQuality'], (n1: string, n2: string) => TriText> = {
  excellent: (n1, n2) => ({
    en: `${n1} and ${n2} share exceptional compatibility across spiritual, elemental, and cosmic dimensions. This pairing has strong potential for harmony and mutual growth.`,
    fr: `${n1} et ${n2} partagent une compatibilité exceptionnelle à travers les dimensions spirituelle, élémentaire et cosmique. Ce duo a un fort potentiel d'harmonie et de croissance mutuelle.`,
    ar: `${n1} و ${n2} يتشاركان توافقاً استثنائياً عبر الأبعاد الروحانية والعنصرية والكونية. هذا الثنائي لديه إمكانات قوية للانسجام والنمو المتبادل.`,
  }),
  'very-good': (n1, n2) => ({
    en: `${n1} and ${n2} demonstrate strong compatibility with excellent alignment in most areas. Minor differences can be easily harmonized.`,
    fr: `${n1} et ${n2} démontrent une forte compatibilité avec un excellent alignement dans la plupart des domaines. Les différences mineures peuvent être facilement harmonisées.`,
    ar: `${n1} و ${n2} يظهران توافقاً قوياً مع انسجام ممتاز في معظم المجالات. الاختلافات البسيطة يمكن تنسيقها بسهولة.`,
  }),
  good: (n1, n2) => ({
    en: `${n1} and ${n2} have good compatibility with balanced energies. With understanding and effort, this connection can flourish.`,
    fr: `${n1} et ${n2} ont une bonne compatibilité avec des énergies équilibrées. Avec compréhension et effort, cette connexion peut s'épanouir.`,
    ar: `${n1} و ${n2} لديهما توافق جيد مع طاقات متوازنة. مع الفهم والجهد، يمكن أن تزدهر هذه العلاقة.`,
  }),
  moderate: (n1, n2) => ({
    en: `${n1} and ${n2} show moderate compatibility with both strengths and challenges. Conscious communication is key to success.`,
    fr: `${n1} et ${n2} montrent une compatibilité modérée avec des forces et des défis. La communication consciente est la clé du succès.`,
    ar: `${n1} و ${n2} يظهران توافقاً متوسطاً مع نقاط قوة وتحديات. التواصل الواعي هو مفتاح النجاح.`,
  }),
  challenging: (n1, n2) => ({
    en: `${n1} and ${n2} face notable differences that require patience and mutual respect. Growth comes through embracing complementary perspectives.`,
    fr: `${n1} et ${n2} font face à des différences notables qui nécessitent patience et respect mutuel. La croissance vient en embrassant des perspectives complémentaires.`,
    ar: `${n1} و ${n2} يواجهان اختلافات ملحوظة تتطلب الصبر والاحترام المتبادل. النمو يأتي من خلال تبني وجهات نظر تكميلية.`,
  }),
};

const DOMINANT_PAIR_REFLECTIONS: Record<string, TriText> = {
  'fire-fire': { en: 'Your Fire–Fire combination creates intense passion and drive. Channel this energy into shared goals to avoid burnout.', fr: "Votre combinaison Feu–Feu crée une passion et un dynamisme intenses. Canalisez cette énergie vers des objectifs communs pour éviter l'épuisement.", ar: 'مزيج النار والنار يخلق شغفاً ودافعاً مكثفاً. وجها هذه الطاقة نحو أهداف مشتركة لتجنب الإرهاق.' },
  'air-fire': { en: 'Your Fire–Air mix ignites creativity and inspiration. Balance spontaneity with thoughtful planning.', fr: "Votre mélange Feu–Air enflamme la créativité et l'inspiration. Équilibrez spontanéité et planification réfléchie.", ar: 'مزيج النار والهواء يشعل الإبداع والإلهام. وازنا بين العفوية والتخطيط المدروس.' },
  'fire-water': { en: 'Your Fire–Water mix creates transformation through emotion and passion. Allow emotions to cool before major decisions.', fr: 'Votre mélange Feu–Eau crée une transformation par l\'émotion et la passion. Laissez les émotions se calmer avant les décisions importantes.', ar: 'مزيج النار والماء يخلق التحول من خلال العاطفة والشغف. اسمحا للعواطف أن تهدأ قبل القرارات الكبرى.' },
  'earth-fire': { en: 'Your Fire–Earth combination blends passion with practicality. Let vision meet execution for powerful results.', fr: "Votre combinaison Feu–Terre mêle passion et pragmatisme. Laissez la vision rencontrer l'exécution pour des résultats puissants.", ar: 'مزيج النار والأرض يمزج الشغف بالواقعية. دعوا الرؤية تلتقي بالتنفيذ لنتائج قوية.' },
  'air-air': { en: 'Your Air–Air pairing enhances intellectual synergy. Ground ideas in action to manifest your shared visions.', fr: 'Votre duo Air–Air renforce la synergie intellectuelle. Ancrez les idées dans l\'action pour manifester vos visions partagées.', ar: 'زوج الهواء والهواء يعزز التآزر الفكري. رسخا الأفكار في العمل لتجسيد رؤاكما المشتركة.' },
  'air-water': { en: 'Your Air–Water blend merges intellect with intuition. Trust both logic and feelings in decision-making.', fr: 'Votre mélange Air–Eau fusionne intellect et intuition. Faites confiance à la fois à la logique et aux sentiments dans les décisions.', ar: 'مزيج الهواء والماء يدمج العقل مع الحدس. ثقا في كل من المنطق والمشاعر في اتخاذ القرارات.' },
  'air-earth': { en: 'Your Air–Earth combination balances ideas with implementation. Communicate clearly while building tangible foundations.', fr: 'Votre combinaison Air–Terre équilibre les idées avec la mise en œuvre. Communiquez clairement tout en construisant des fondations tangibles.', ar: 'مزيج الهواء والأرض يوازن الأفكار مع التنفيذ. تواصلا بوضوح أثناء بناء أسس ملموسة.' },
  'water-water': { en: 'Your Water–Water connection deepens emotional bonds. Create boundaries to prevent emotional overwhelm.', fr: 'Votre connexion Eau–Eau approfondit les liens émotionnels. Créez des limites pour prévenir le débordement émotionnel.', ar: 'اتصال الماء والماء يعمق الروابط العاطفية. أنشئا حدوداً لمنع الطغيان العاطفي.' },
  'earth-water': { en: 'Your Water–Earth pairing nurtures growth and stability. Combine emotional depth with practical care.', fr: 'Votre duo Eau–Terre nourrit la croissance et la stabilité. Combinez profondeur émotionnelle et soin pratique.', ar: 'زوج الماء والأرض يرعى النمو والاستقرار. اجمعا بين العمق العاطفي والرعاية العملية.' },
  'earth-earth': { en: 'Your Earth–Earth foundation builds lasting security. Embrace flexibility to keep the relationship dynamic.', fr: 'Votre fondation Terre–Terre construit une sécurité durable. Embrassez la flexibilité pour garder la relation dynamique.', ar: 'أساس الأرض والأرض يبني أماناً دائماً. احتضنا المرونة للحفاظ على ديناميكية العلاقة.' },
};

export function analyzeRelationshipCompatibility(
  person1Name: string,
  person1Arabic: string,
  person1AbjadTotal: number,
  person1Element: Element,
  person2Name: string,
  person2Arabic: string,
  person2AbjadTotal: number,
  person2Element: Element
): RelationshipCompatibility {
  const spiritualDestiny = calculateSpiritualDestiny(person1AbjadTotal, person2AbjadTotal);
  const elementalTemperament = calculateElementalTemperament(person1AbjadTotal, person2AbjadTotal);
  const planetaryCosmic = calculatePlanetaryCosmic(person1AbjadTotal, person2AbjadTotal);
  const dailyInteraction = analyzeDailyInteraction(person1Arabic, person2Arabic);

  const overallScore = Math.round(
    elementalTemperament.score * 0.35 + planetaryCosmic.score * 0.35 + dailyInteraction.score * 0.3
  );

  let overallQuality: RelationshipCompatibility['overallQuality'];
  let overallQualityArabic: string;
  let overallQualityFrench: string;

  if (overallScore >= 85) {
    overallQuality = 'excellent'; overallQualityArabic = 'ممتاز'; overallQualityFrench = 'EXCELLENT';
  } else if (overallScore >= 75) {
    overallQuality = 'very-good'; overallQualityArabic = 'جيد جداً'; overallQualityFrench = 'TRÈS BON';
  } else if (overallScore >= 65) {
    overallQuality = 'good'; overallQualityArabic = 'جيد'; overallQualityFrench = 'BON';
  } else if (overallScore >= 50) {
    overallQuality = 'moderate'; overallQualityArabic = 'متوسط'; overallQualityFrench = 'MODÉRÉ';
  } else {
    overallQuality = 'challenging'; overallQualityArabic = 'تحدي'; overallQualityFrench = 'DIFFICILE';
  }

  const summary = OVERALL_SUMMARIES[overallQuality](person1Name, person2Name);

  const recommendations: string[] = [];
  const recommendationsFrench: string[] = [];
  const recommendationsArabic: string[] = [];

  const pairKey = [dailyInteraction.person1Dominant, dailyInteraction.person2Dominant].sort().join('-');
  const pairReflection = DOMINANT_PAIR_REFLECTIONS[pairKey];
  if (pairReflection) {
    recommendations.unshift(pairReflection.en);
    recommendationsFrench.unshift(pairReflection.fr);
    recommendationsArabic.unshift(pairReflection.ar);
  }

  if (spiritualDestiny.score >= 85) {
    recommendations.push('Your spiritual alignment is exceptional. Continue deepening your shared understanding through meditation or reflection together.');
    recommendationsFrench.push('Votre alignement spirituel est exceptionnel. Continuez à approfondir votre compréhension mutuelle par la méditation ou la réflexion ensemble.');
    recommendationsArabic.push('توافقكما الروحاني استثنائي. استمرا في تعميق فهمكما المشترك من خلال التأمل أو التفكير معاً.');
  } else if (spiritualDestiny.score < 60) {
    recommendations.push("Your spiritual paths may differ. Respect each other's journey and find common ground in shared values.");
    recommendationsFrench.push("Vos chemins spirituels peuvent différer. Respectez le parcours de chacun et trouvez un terrain d'entente dans les valeurs partagées.");
    recommendationsArabic.push('مساراتكما الروحانية قد تختلف. احترما رحلة كل منكما وابحثا عن أرضية مشتركة في القيم المشتركة.');
  }

  const elementNamesFr: Record<Element, string> = { fire: 'feu', air: 'air', water: 'eau', earth: 'terre' };
  if (elementalTemperament.sharedElement === 'fire' || elementalTemperament.sharedElement === 'air') {
    recommendations.push(`Your ${elementalTemperament.sharedElement} energy creates dynamic interaction. Channel this into creative projects or shared adventures.`);
    recommendationsFrench.push(`Votre énergie ${elementNamesFr[elementalTemperament.sharedElement]} crée une interaction dynamique. Canalisez cela vers des projets créatifs ou des aventures partagées.`);
    recommendationsArabic.push(`طاقة ${elementalTemperament.sharedElementArabic} تخلق تفاعلاً ديناميكياً. وجها هذا نحو مشاريع إبداعية أو مغامرات مشتركة.`);
  } else {
    recommendations.push(`Your ${elementalTemperament.sharedElement} connection provides stability. Build a strong foundation through consistent routines.`);
    recommendationsFrench.push(`Votre connexion ${elementNamesFr[elementalTemperament.sharedElement]} offre de la stabilité. Construisez une base solide grâce à des routines cohérentes.`);
    recommendationsArabic.push(`اتصال ${elementalTemperament.sharedElementArabic} يوفر الاستقرار. ابنيا أساساً قوياً من خلال روتين ثابت.`);
  }

  if (planetaryCosmic.relationship === 'friendly') {
    recommendations.push(`${planetaryCosmic.person1Planet.name} and ${planetaryCosmic.person2Planet.name} support each other naturally. Trust your intuitive connection.`);
    recommendationsFrench.push(`${planetaryCosmic.person1Planet.name} et ${planetaryCosmic.person2Planet.name} se soutiennent naturellement. Faites confiance à votre connexion intuitive.`);
    recommendationsArabic.push(`${planetaryCosmic.person1Planet.nameArabic} و ${planetaryCosmic.person2Planet.nameArabic} يدعمان بعضهما بشكل طبيعي. ثقا في اتصالكما الحدسي.`);
  } else if (planetaryCosmic.relationship === 'opposing') {
    recommendations.push(`${planetaryCosmic.person1Planet.name} and ${planetaryCosmic.person2Planet.name} create tension. Use this as an opportunity to learn from different perspectives.`);
    recommendationsFrench.push(`${planetaryCosmic.person1Planet.name} et ${planetaryCosmic.person2Planet.name} créent une tension. Utilisez cela comme une opportunité d'apprendre de perspectives différentes.`);
    recommendationsArabic.push(`${planetaryCosmic.person1Planet.nameArabic} و ${planetaryCosmic.person2Planet.nameArabic} يخلقان توتراً. استخدما هذا كفرصة للتعلم من وجهات نظر مختلفة.`);
  }

  if (dailyInteraction.interactionType === 'harmonious') {
    recommendations.push(`Your ${dailyInteraction.person1Dominant} energy harmonizes beautifully in daily life. Celebrate your natural understanding.`);
    recommendationsFrench.push(`Votre énergie ${dailyInteraction.person1DominantFrench} s'harmonise magnifiquement au quotidien. Célébrez votre compréhension naturelle.`);
    recommendationsArabic.push(`طاقة ${dailyInteraction.person1DominantArabic} تتناغم بشكل جميل في الحياة اليومية. احتفلا بفهمكما الطبيعي.`);
  } else if (dailyInteraction.interactionType === 'challenging') {
    recommendations.push(`${dailyInteraction.person1Dominant} and ${dailyInteraction.person2Dominant} energies require conscious balance in daily routines. Create space for both styles.`);
    recommendationsFrench.push(`Les énergies ${dailyInteraction.person1DominantFrench} et ${dailyInteraction.person2DominantFrench} nécessitent un équilibre conscient dans les routines quotidiennes. Créez de l'espace pour les deux styles.`);
    recommendationsArabic.push(`طاقات ${dailyInteraction.person1DominantArabic} و ${dailyInteraction.person2DominantArabic} تتطلب توازناً واعياً في الروتين اليومي. أنشئا مساحة لكلا الأسلوبين.`);
  }

  recommendations.push('Practice patience, kindness, and open communication to nurture your connection.');
  recommendationsFrench.push('Pratiquez la patience, la gentillesse et la communication ouverte pour nourrir votre connexion.');
  recommendationsArabic.push('مارسا الصبر واللطف والتواصل المفتوح لرعاية علاقتكما.');

  return {
    mode: 'relationship',
    person1: { name: person1Name, arabicName: person1Arabic, abjadTotal: person1AbjadTotal, element: person1Element },
    person2: { name: person2Name, arabicName: person2Arabic, abjadTotal: person2AbjadTotal, element: person2Element },
    methods: { spiritualDestiny, elementalTemperament, planetaryCosmic, dailyInteraction },
    overallScore,
    overallQuality,
    overallQualityArabic,
    overallQualityFrench,
    summary: summary.en,
    summaryFrench: summary.fr,
    summaryArabic: summary.ar,
    recommendations,
    recommendationsFrench,
    recommendationsArabic,
  };
}

/**
 * Convenience wrapper: takes both people's Arabic names, computes each
 * person's own Kabir total (mother's name is not used here, matching
 * asrar-mobile's person-to-person flow), and runs the full analysis.
 */
export function calculateNameCompatibility(
  person1Name: string,
  person1Arabic: string,
  person2Name: string,
  person2Arabic: string
): RelationshipCompatibility {
  const total1 = calculateHadadKabir(person1Arabic);
  const total2 = calculateHadadKabir(person2Arabic);
  return analyzeRelationshipCompatibility(
    person1Name,
    person1Arabic,
    total1,
    getElementFromAbjadTotal(total1),
    person2Name,
    person2Arabic,
    total2,
    getElementFromAbjadTotal(total2)
  );
}
