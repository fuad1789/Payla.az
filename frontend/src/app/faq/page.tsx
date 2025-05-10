import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Metadata } from "next";

const ChevronIcon = (
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 8L10 12L14 8"
      stroke="#A1A1AA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const metadata: Metadata = {
  title: "Tez-tez verilən suallar | Paylaş",
  description:
    "Paylaş platforması haqqında ən çox verilən suallar və cavablar. Kirayə, elanlar, ödəniş və digər mövzularda tez-tez verilən suallar burada cavablandırılır.",
};

function FaqPage() {
  return (
    <main className="max-w-2xl mx-auto mt-14 mb-20 px-4 md:px-0">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-zinc-900 tracking-tight">
        Tez-tez verilən suallar
      </h1>
      <div className="flex flex-col gap-5">
        <Accordion>
          {faqList.map(({ question, answer }, idx) => (
            <AccordionItem key={idx} index={idx}>
              <AccordionTrigger icon={ChevronIcon}>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}

export { FaqPage as default };

// Statik FAQ kontenti
const faqList: FaqItem[] = [
  {
    question: "Paylaş nə üçündür?",
    answer:
      "Paylaş, evdə istifadə olunmayan, boş qalan geyimləri asanlıqla kirayə verib əlavə gəlir əldə etməyin ən rahat yoludur. Platformamız vasitəsilə geyimlərinizi yeni sahiblərlə paylaşa, həm də əşyalarınızdan maksimum istifadə edə bilərsiniz. Həm ətraf mühitə töhfə verirsiniz, həm də qazanc əldə edirsiniz.",
  },
  {
    question: "Mən özüm geyim yerləşdirə bilərəm?",
    answer:
      "Hazırda elanları yalnız Paylaş komandası yerləşdirir. Sənin etməli olduğun tək şey geyimini bizə təhvil verməkdir – qalan bütün foto, elan, təmizlik və idarəetmə işlərini biz həll edirik. Beləliklə, heç bir əlavə əziyyət çəkmədən geyimlərin kirayəyə verilir və sən rahatlıqla qazanc əldə edirsən.",
  },
  {
    question: "Saytda necə baxım edim?",
    answer:
      "payla.az saytına daxil ol, müxtəlif kateqoriyalarda olan geyimlərə bax, istədiyini seç və sadəcə bizimlə əlaqə saxla. Seçdiyin geyim haqqında ətraflı məlumat və real şəkillər təqdim olunur. Sualın olsa, komandamız hər zaman kömək etməyə hazırdır.",
  },
  {
    question: "Pul necə ödənilir?",
    answer:
      "Hazırda bütün ödənişlər geyimi təhvil alanda, yəni əlbəəl və ya kartla ofisimizdə və ya çatdırılma zamanı edilir. Heç bir öncədən ödəniş və ya depozit tələb olunmur. Bu, həm sənin, həm də bizim üçün prosesi daha rahat və şəffaf edir.",
  },
  {
    question: "Geyimi necə alım?",
    answer:
      "Geyimlər əsasən Bakı şəhərində yerləşir. İstəsən, ofisimizə yaxınlaşıb geyimi götürə bilərsən, ya da çatdırılma xidməti ilə geyim birbaşa ünvanına göndərilir. Çatdırılma sürətli və təhlükəsiz şəkildə həyata keçirilir. Əlavə sualın olsa, bizə yazmaqdan çəkinmə!",
  },
  {
    question: "Təmizlik necə olur?",
    answer:
      "Hər geyim istifadə olunduqdan sonra peşəkar təmizləmədən keçir və tam gigiyenik şəkildə növbəti istifadəçiyə təqdim olunur. Sənin heç bir əlavə təmizlik və ya qayğı ilə məşğul olmağına ehtiyac yoxdur – hər şey bizim nəzarətimizdədir.",
  },
  {
    question: "Geyim zədələnsə, necə olacaq?",
    answer:
      "Əgər geyim istifadə zamanı zədələnərsə, məsuliyyət istifadəçiyə aiddir. Amma narahat olma – hər bir vəziyyət fərdi şəkildə, qarşılıqlı anlaşma ilə həll olunur. Əvvəlcədən bütün şərtlər barədə məlumat verilir və heç bir gözlənilməz problem yaşanmır.",
  },
  {
    question: "Kimlər istifadə edə bilər?",
    answer:
      "Paylaş platformasından istənilən şəxs istifadə edə bilər. Sadəcə geyimləri kirayə götürmək istəyənlər üçün heç bir məhdudiyyət yoxdur. Elan yerləşdirmə isə hazırda yalnız Paylaş komandası tərəfindən aparılır. Sən də öz geyimini bizə təhvil verərək bu prosesə qoşula bilərsən!",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}
