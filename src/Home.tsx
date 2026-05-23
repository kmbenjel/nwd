import { useEffect, useState } from 'react';
import { Facebook } from 'lucide-react';

const verses = [
  { first: "الْحَمْدُ لِلَّهِ عَلَى مَا أَنْعَمَا", second: "بِهِ مِنْ آيٍ كَشَفَتْ عَنَّا الْعَمَى" },
  { first: "وَقَيَّضَ اللَّهُ لِلِاعْتِنَا بِهَا", second: "مَنْ عُدَّ حَافِظًا إِمَامًا نَابِهًا" },
  { first: "كَالسَّبْعَةِ الْقُرَّاءِ مَنْ تَجَرَّدُوا", second: "لِحِفْظِهَا وَفِي الْأَدَا تَفَرَّدُوا" },
  { first: "وَسَلَّمُوا رَايَتَهَا لِلشَّاطِبِي", second: "وَقَبْلَهُ كَمْ قَدَعَتْ مِنْ خَاطِبِ" },
  { first: "وَهُوَ الَّذِي أَدْخَلَهَا فِي حِرْزِهِ", second: "فَلَزِمَ الْقُرَّا لُزُومَ غَرْزِهِ" },
  { first: "وَذَاكَ لِلْقَاضِي الرِّضَى الْمُعَاصِرِ", second: "كُشَاجِمِ الْعَصْرِ الْإِمَامِ النَّاصِرِي" },
  { first: "سَلَّمَهَا فَاظْفَرْ بِمَا أَبْدَاهُ", second: "سَطَّرَهُ فَحَقَّهُ أَدَّاهُ" },
  { first: "وَعَنْ طَوِيلِ الشَّاطِبِيِّ عَدَلَا", second: "لِرَجَزٍ يَكُونُ عَنْهُ بَدَلَا" },
  { first: "وَهُوَ لِغُصْنِ حِرْزِهِ قَدِ اهْتَصَرَ", second: "لَكِنَّهُ أَوْجَزَ فِيهِ وَاخْتَصَرَ" },
  { first: "مُقَرِّبًا لَهُ بِحِلْيَةِ النَّوَا", second: "دِي آخِذًا جَنَاهُ مِنْ دُونِ النَّوَى" },
  { first: "فَلَيْسَ فِيهَا بِالْحُرُوفِ رَمْزٌ", second: "وَالرَّمْزُ عِنْدِي لَيْسَ فِيهِ لَمْزٌ" },
  { first: "إِذْ نَفْعُهُ مَضَتْ بِهِ قُرُونٌ", second: "لَكِنَّمَا الْمَنْهَجُ مَنْجَنُونٌ" },
  { first: "وَرُبَّمَا اقْتَضَى زَمَانُ السُّرْعَةِ", second: "مِنْ طَالِبِ الْعُلُومِ نَقْصَ جُرْعَةِ" },
  { first: "وَلِلْوَزِيرِ سُلْطَةُ التَّقْدِيرِ", second: "وَذَاكَ يُوكَلُ إِلَى الْوَزِيرِ" },
  { first: "لِذَاكَ فِي مَنْظُومِهِ أَبَى أَبَا", second: "جَادَ عَلَى الْقُرَّاءِ رَمْزًا يُجْتَبَى" },
  { first: "فَاظْفَرْ بِهِ يَا طَالِبَ الْعُلُومِ", second: "وَلَسْتَ إِنْ ظَفِرْتَ بِالْمَلُومِ" },
  { first: "وَاعْمِدْ إِلَى الْقَاضِي فَقَوْلُ الْقَاضِي", second: "فِي نَظْمِ حِلْيَةِ النَّوَادِي مَاضِي" },
  { first: "فَطَالِبُ الْعِلْمِ يَطِيبُ عَيْشُهُ", second: "لَدَيْهِ إِذْ بِهِ زَهَتْ تَنْوِيشُهُ" },
  { first: "وَهُوَ عَلَى طَرِيقِهَا عَلَّامَةٌ", second: "وَاللَّامُ إِنْ تُشَدَّدْ فَلَا مَلَامَةَ" },
  { first: "فَهُوَ ابْنُ إِسْحَاقَ بِهَا وَالْبَاجِي", second: "وَابْنُ دَقِيقِ الْعِيدِ وَابْنُ الْحَاجِ" },
  { first: "وَهُوَ جَلَالُ الدِّينِ فِي الْمَعَانِي", second: "عِلْمًا وَفِي الْبَدِيعِ وَالْبَيَانِ" },
  { first: "وَهُوَ الْكِسَائِيُّ وَعَمْرٌو وَالْفَرَّا", second: "هِيدِي وَكُلُّ الصَّيْدِ فِي جَوْفِ الْفَرَا" },
  { first: "فَبَارَكَ اللَّهُ لَهُ فِي الْعُمْرِ", second: "يَرِيشُ فِينَا سَالِمًا وَيَبْرِي" },
  { first: "فَإِنَّهُ بِالْوُدِّ مِنَّا قَدْ دَنَا", second: "وَرَجُلٌ مِنَ الْكِرَامِ عِنْدَنَا" },
  { first: "ثُمَّ عَلَى طَهَ صَلَاةٌ ضَاءَ", second: "بِهَا الْفَضَا لَا تَعْرِفُ انْقِضَاءَ" },
];

export default function Home() {
  const [visibleVerses, setVisibleVerses] = useState<number[]>([]);

  useEffect(() => {
    verses.forEach((_, index) => {
      setTimeout(() => {
        setVisibleVerses(prev => [...prev, index]);
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Hero Section */}
      <section 
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663121773177/A9y6sZJVFe5b7CHDKSDCxM/hero-background-W9EBXxp5h8FshVSV2APYGN.webp)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Amiri, serif' }}>
            تقريظ حلية النوادي
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            للقاضي الوزير الداه ولد أعمر طالب
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-white/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 md:p-10 transition-colors duration-300 space-y-10">
            {verses.map((verse, index) => (
              <div
                key={index}
                className={`transition-all duration-500 transform ${visibleVerses.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                {/* Verse Container */}
                <div className="space-y-3 text-center">
                  <p 
                    className="text-xl leading-relaxed text-foreground"
                    style={{ fontFamily: 'Amiri Quran, serif', fontSize: '1.3rem' }}
                  >
                    {verse.first}
                  </p>
                  <p 
                    className="text-xl leading-relaxed text-foreground"
                    style={{ fontFamily: 'Amiri Quran, serif', fontSize: '1.3rem' }}
                  >
                    {verse.second}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-8 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Amiri, serif', color: '#6B4423' }}>
            عن المنظومة
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B4423' }}>
                حلية النوادي
              </h3>
              <p className="text-foreground leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                منظومة قيمة في علم القراءات القرآنية، تجمع بين الأصالة العلمية والجودة الأدبية، وتعتبر مرجعاً مهماً لطلاب العلم.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B4423' }}>
                القاضي الوزير
              </h3>
              <p className="text-foreground leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                القاضي الوزير الداه ولد أعمر طالب، عالم موريتاني فاضل، له إسهامات مهمة في الدراسات الإسلامية والقرآنية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ fontFamily: 'Tajawal, sans-serif' }} className="mb-2">
            تقريظ منظومة حلية النوادي
          </p>
          <p style={{ fontFamily: 'Tajawal, sans-serif' }} className="text-sm opacity-90">
            للقاضي الوزير الداه ولد أعمر طالب
          </p>
          <div className="flex items-center justify-center mt-4 opacity-90">
            <a href="https://facebook.com/kmbenjel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-200 transition-colors group">
              <p style={{ fontFamily: 'Tajawal, sans-serif' }} className="text-sm">
                اعتنى به: <span className="group-hover:underline decoration-dotted underline-offset-4">خالد بنجلون</span>
              </p>
              <Facebook size={18} />
            </a>
          </div>
          <p style={{ fontFamily: 'Tajawal, sans-serif' }} className="text-xs opacity-75 mt-4">
            جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
}
