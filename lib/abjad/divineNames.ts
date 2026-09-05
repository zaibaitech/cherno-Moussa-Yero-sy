/**
 * The 99 Divine Names (Asma' al-Husna) — Arabic script, transliteration, and
 * abjad value, ported from asrar-mobile's data/divine-names.ts (99 entries,
 * verified via Al Aladhan API per that source's own header comment).
 *
 * The source also carries English-only "meaning"/"spiritualInfluence"/
 * "reflection" prose per name (fr fields present but empty in every one of
 * the 297 checked; no ar field at all) — deliberately not ported here rather
 * than showing incomplete or missing text in fr/ar. What is ported (arabic,
 * transliteration, abjadValue) is locale-independent and complete.
 */

export interface DivineName {
  number: number;
  arabic: string;
  transliteration: string;
  abjadValue: number;
}

export const DIVINE_NAMES: DivineName[] = [
  { number: 1, arabic: "الرَّحْمَنُ", transliteration: "Ar Rahmaan", abjadValue: 329 },
  { number: 2, arabic: "الرَّحِيمُ", transliteration: "Ar Raheem", abjadValue: 289 },
  { number: 3, arabic: "الْمَلِكُ", transliteration: "Al Malik", abjadValue: 121 },
  { number: 4, arabic: "الْقُدُّوسُ", transliteration: "Al Quddus", abjadValue: 201 },
  { number: 5, arabic: "السَّلاَمُ", transliteration: "As Salaam", abjadValue: 162 },
  { number: 6, arabic: "الْمُؤْمِنُ", transliteration: "Al Mu'min", abjadValue: 161 },
  { number: 7, arabic: "الْمُهَيْمِنُ", transliteration: "Al Muhaymin", abjadValue: 176 },
  { number: 8, arabic: "الْعَزِيزُ", transliteration: "Al Azeez", abjadValue: 125 },
  { number: 9, arabic: "الْجَبَّارُ", transliteration: "Al Jabbaar", abjadValue: 237 },
  { number: 10, arabic: "الْمُتَكَبِّرُ", transliteration: "Al Mutakabbir", abjadValue: 693 },
  { number: 11, arabic: "الْخَالِقُ", transliteration: "Al Khaaliq", abjadValue: 762 },
  { number: 12, arabic: "الْبَارِئُ", transliteration: "Al Baari", abjadValue: 234 },
  { number: 13, arabic: "الْمُصَوِّرُ", transliteration: "Al Musawwir", abjadValue: 367 },
  { number: 14, arabic: "الْغَفَّارُ", transliteration: "Al Ghaffaar", abjadValue: 1312 },
  { number: 15, arabic: "الْقَهَّارُ", transliteration: "Al Qahhaar", abjadValue: 337 },
  { number: 16, arabic: "الْوَهَّابُ", transliteration: "Al Wahhaab", abjadValue: 45 },
  { number: 17, arabic: "الرَّزَّاقُ", transliteration: "Ar Razzaaq", abjadValue: 339 },
  { number: 18, arabic: "الْفَتَّاحُ", transliteration: "Al Fattaah", abjadValue: 520 },
  { number: 19, arabic: "اَلْعَلِيْمُ", transliteration: "Al 'Aleem", abjadValue: 181 },
  { number: 20, arabic: "الْقَابِضُ", transliteration: "Al Qaabid", abjadValue: 934 },
  { number: 21, arabic: "الْبَاسِطُ", transliteration: "Al Baasit", abjadValue: 103 },
  { number: 22, arabic: "الْخَافِضُ", transliteration: "Al Khaafid", abjadValue: 1512 },
  { number: 23, arabic: "الرَّافِعُ", transliteration: "Ar Raafi'", abjadValue: 382 },
  { number: 24, arabic: "الْمُعِزُّ", transliteration: "Al Mu'iz", abjadValue: 148 },
  { number: 25, arabic: "المُذِلُّ", transliteration: "Al Mudhil", abjadValue: 801 },
  { number: 26, arabic: "السَّمِيعُ", transliteration: "As Samee'", abjadValue: 211 },
  { number: 27, arabic: "الْبَصِيرُ", transliteration: "Al Baseer", abjadValue: 333 },
  { number: 28, arabic: "الْحَكَمُ", transliteration: "Al Hakam", abjadValue: 99 },
  { number: 29, arabic: "الْعَدْلُ", transliteration: "Al 'Adl", abjadValue: 135 },
  { number: 30, arabic: "اللَّطِيفُ", transliteration: "Al Lateef", abjadValue: 160 },
  { number: 31, arabic: "الْخَبِيرُ", transliteration: "Al Khabeer", abjadValue: 843 },
  { number: 32, arabic: "الْحَلِيمُ", transliteration: "Al Haleem", abjadValue: 119 },
  { number: 33, arabic: "الْعَظِيمُ", transliteration: "Al 'Azeem", abjadValue: 1051 },
  { number: 34, arabic: "الْغَفُورُ", transliteration: "Al Ghafoor", abjadValue: 1317 },
  { number: 35, arabic: "الشَّكُورُ", transliteration: "Ash Shakoor", abjadValue: 557 },
  { number: 36, arabic: "الْعَلِيُّ", transliteration: "Al 'Aliyy", abjadValue: 141 },
  { number: 37, arabic: "الْكَبِيرُ", transliteration: "Al Kabeer", abjadValue: 263 },
  { number: 38, arabic: "الْحَفِيظُ", transliteration: "Al Hafeez", abjadValue: 1029 },
  { number: 39, arabic: "المُقيِت", transliteration: "Al Muqeet", abjadValue: 581 },
  { number: 40, arabic: "الْحسِيبُ", transliteration: "Al Haseeb", abjadValue: 111 },
  { number: 41, arabic: "الْجَلِيلُ", transliteration: "Al Jaleel", abjadValue: 104 },
  { number: 42, arabic: "الْكَرِيمُ", transliteration: "Al Kareem", abjadValue: 301 },
  { number: 43, arabic: "الرَّقِيبُ", transliteration: "Ar Raqeeb", abjadValue: 343 },
  { number: 44, arabic: "الْمُجِيبُ", transliteration: "Al Mujeeb ", abjadValue: 86 },
  { number: 45, arabic: "الْوَاسِعُ", transliteration: "Al Waasi'", abjadValue: 168 },
  { number: 46, arabic: "الْحَكِيمُ", transliteration: "Al Hakeem", abjadValue: 109 },
  { number: 47, arabic: "الْوَدُودُ", transliteration: "Al Wudood", abjadValue: 51 },
  { number: 48, arabic: "الْمَجِيدُ", transliteration: "Al Majeed", abjadValue: 88 },
  { number: 49, arabic: "الْبَاعِثُ", transliteration: "Al Baa'ith", abjadValue: 604 },
  { number: 50, arabic: "الشَّهِيدُ", transliteration: "Ash Shaheed", abjadValue: 350 },
  { number: 51, arabic: "الْحَقُّ", transliteration: "Al Haqq", abjadValue: 139 },
  { number: 52, arabic: "الْوَكِيلُ", transliteration: "Al Wakeel", abjadValue: 97 },
  { number: 53, arabic: "الْقَوِيُّ", transliteration: "Al Qawiyy", abjadValue: 147 },
  { number: 54, arabic: "الْمَتِينُ", transliteration: "Al Mateen", abjadValue: 531 },
  { number: 55, arabic: "الْوَلِيُّ", transliteration: "Al Waliyy", abjadValue: 77 },
  { number: 56, arabic: "الْحَمِيدُ", transliteration: "Al Hameed", abjadValue: 93 },
  { number: 57, arabic: "الْمُحْصِي", transliteration: "Al Muhsi", abjadValue: 179 },
  { number: 58, arabic: "الْمُبْدِئُ", transliteration: "Al Mubdi", abjadValue: 77 },
  { number: 59, arabic: "الْمُعِيدُ", transliteration: "Al Mu'eed", abjadValue: 155 },
  { number: 60, arabic: "الْمُحْيِي", transliteration: "Al Muhiy", abjadValue: 99 },
  { number: 61, arabic: "اَلْمُمِيتُ", transliteration: "Al Mumeet", abjadValue: 521 },
  { number: 62, arabic: "الْحَيُّ", transliteration: "Al Haiyy", abjadValue: 49 },
  { number: 63, arabic: "الْقَيُّومُ", transliteration: "Al Qayyoom", abjadValue: 187 },
  { number: 64, arabic: "الْوَاجِدُ", transliteration: "Al Waajid", abjadValue: 45 },
  { number: 65, arabic: "الْمَاجِدُ", transliteration: "Al Maajid", abjadValue: 79 },
  { number: 66, arabic: "الْواحِدُ", transliteration: "Al Waahid", abjadValue: 50 },
  { number: 67, arabic: "اَلاَحَدُ", transliteration: "Al Ahad", abjadValue: 44 },
  { number: 68, arabic: "الصَّمَدُ", transliteration: "As Samad", abjadValue: 165 },
  { number: 69, arabic: "الْقَادِرُ", transliteration: "Al Qaadir", abjadValue: 336 },
  { number: 70, arabic: "الْمُقْتَدِرُ", transliteration: "Al Muqtadir", abjadValue: 775 },
  { number: 71, arabic: "الْمُقَدِّمُ", transliteration: "Al Muqaddim", abjadValue: 215 },
  { number: 72, arabic: "الْمُؤَخِّرُ", transliteration: "Al Mu’akhir", abjadValue: 871 },
  { number: 73, arabic: "الأوَّلُ", transliteration: "Al Awwal", abjadValue: 68 },
  { number: 74, arabic: "الآخِرُ", transliteration: "Al Aakhir", abjadValue: 832 },
  { number: 75, arabic: "الظَّاهِرُ", transliteration: "Az Zaahir", abjadValue: 1137 },
  { number: 76, arabic: "الْبَاطِنُ", transliteration: "Al Baatin", abjadValue: 93 },
  { number: 77, arabic: "الْوَالِي", transliteration: "Al Waali", abjadValue: 78 },
  { number: 78, arabic: "الْمُتَعَالِي", transliteration: "Al Muta’ali", abjadValue: 582 },
  { number: 79, arabic: "الْبَرُّ", transliteration: "Al Barr", abjadValue: 233 },
  { number: 80, arabic: "التَّوَابُ", transliteration: "At Tawwaab", abjadValue: 440 },
  { number: 81, arabic: "الْمُنْتَقِمُ", transliteration: "Al Muntaqim", abjadValue: 661 },
  { number: 82, arabic: "العَفُوُّ", transliteration: "Al Afuww", abjadValue: 187 },
  { number: 83, arabic: "الرَّؤُوفُ", transliteration: "Ar Ra’oof", abjadValue: 317 },
  { number: 84, arabic: "مَالِكُ الْمُلْكِ", transliteration: "Maalik Ul Mulk", abjadValue: 212 },
  { number: 85, arabic: "ذُوالْجَلاَلِ وَالإكْرَامِ", transliteration: "Dhu Al Jalaali Wa Al Ikraam", abjadValue: 1100 },
  { number: 86, arabic: "الْمُقْسِطُ", transliteration: "Al Muqsit", abjadValue: 240 },
  { number: 87, arabic: "الْجَامِعُ", transliteration: "Al Jaami'", abjadValue: 145 },
  { number: 88, arabic: "الْغَنِيُّ", transliteration: "Al Ghaniyy", abjadValue: 1091 },
  { number: 89, arabic: "الْمُغْنِي", transliteration: "Al Mughi", abjadValue: 1131 },
  { number: 90, arabic: "اَلْمَانِعُ", transliteration: "Al Maani'", abjadValue: 192 },
  { number: 91, arabic: "الضَّارَّ", transliteration: "Ad Daaarr", abjadValue: 1032 },
  { number: 92, arabic: "النَّافِعُ", transliteration: "An Naafi’", abjadValue: 232 },
  { number: 93, arabic: "النُّورُ", transliteration: "An Noor", abjadValue: 287 },
  { number: 94, arabic: "الْهَادِي", transliteration: "Al Haadi", abjadValue: 51 },
  { number: 95, arabic: "الْبَدِيعُ", transliteration: "Al Badi'", abjadValue: 117 },
  { number: 96, arabic: "اَلْبَاقِي", transliteration: "Al Baaqi", abjadValue: 144 },
  { number: 97, arabic: "الْوَارِثُ", transliteration: "Al Waarith", abjadValue: 738 },
  { number: 98, arabic: "الرَّشِيدُ", transliteration: "Ar Rasheed", abjadValue: 545 },
  { number: 99, arabic: "الصَّبُورُ", transliteration: "As Saboor", abjadValue: 329 },
];

export function findDivineNamesByValue(abjadValue: number, tolerance = 0): DivineName[] {
  return DIVINE_NAMES.filter((n) => Math.abs(n.abjadValue - abjadValue) <= tolerance);
}

/** Nearest divine names to a value, sorted by distance, closest first. */
export function nearestDivineNames(abjadValue: number, count = 3): (DivineName & { distance: number })[] {
  return DIVINE_NAMES.map((n) => ({ ...n, distance: Math.abs(n.abjadValue - abjadValue) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}
