import { LegalPage } from "../legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Termeni și condiții",
  description:
    "Termeni și condiții pentru arenda de caiace gonflabile și echipament de camping KAYAK Nistru.",
  path: "/termeni-si-conditii",
});

const sections = [
  {
    title: "Date despre serviciu",
    body: [
      "KAYAK Nistru oferă arendă de echipament pentru activități recreative: kayak dublu gonflabil, corturi, saci de dormit și pachete recomandate. Serviciul este de arendă echipament, nu pachet turistic complet și nu include ghidaj obligatoriu, transport turistic sau servicii hoteliere.",
      "Punctul de ridicare și/sau start este în satul Pîrîta, Republica Moldova, cu posibilitatea de livrare la punctul de start atunci când acest lucru este confirmat în prealabil.",
    ],
  },
  {
    title: "Rezervări și confirmare",
    body: [
      "Formularul de pe website transmite o cerere de disponibilitate. Rezervarea devine valabilă doar după confirmarea manuală din partea KAYAK Nistru, prin telefon, email sau alt canal de comunicare agreat.",
      "Utilizatorul trebuie să indice data, ora de start, durata arendei și echipamentul dorit. Datele de contact sunt folosite pentru confirmare, clarificări și organizarea predării echipamentului.",
      "KAYAK Nistru poate refuza sau reprograma o cerere dacă echipamentul nu este disponibil, condițiile meteo nu permit folosirea în siguranță sau datele transmise sunt incomplete ori incorecte.",
    ],
  },
  {
    title: "Prețuri și plată",
    body: [
      "Prețurile afișate pe website sunt informative și pot fi actualizate. Prețul final se confirmă înainte de predarea echipamentului.",
      "Tarife curente: KAYAK dublu gonflabil - 450 lei / 12 ore, cort dublu - 250 lei / 12 ore, sac de dormit - 100 lei / 12 ore, pachet recomandat - 1 200 lei / 2 zile.",
      "Website-ul nu procesează plăți online. Plata, avansul sau garanția, dacă sunt necesare, se stabilesc la confirmarea rezervării.",
    ],
  },
  {
    title: "Utilizarea echipamentului",
    body: [
      "Clientul trebuie să folosească echipamentul cu grijă, conform destinației sale normale și instrucțiunilor primite la predare.",
      "Pentru folosirea kayakului, clientul trebuie să poarte vesta de salvare, să evite zonele periculoase, curenții puternici, furtunile, consumul de alcool înainte sau în timpul activității pe apă și orice comportament care poate pune în pericol persoane sau bunuri.",
      "Minorii pot folosi echipamentul doar sub supravegherea unui adult responsabil. Adultul care preia echipamentul răspunde pentru respectarea regulilor de siguranță de către minori.",
    ],
  },
  {
    title: "Predare, returnare și stare echipament",
    body: [
      "Echipamentul se predă curat, verificat și funcțional. Clientul trebuie să verifice echipamentul la preluare și să anunțe imediat orice problemă observată.",
      "Echipamentul trebuie returnat la ora și locul stabilite, în aceeași stare rezonabilă în care a fost primit, ținând cont de uzura normală.",
      "În caz de pierdere, deteriorare, întârziere mare la returnare sau folosire necorespunzătoare, clientul poate fi responsabil pentru costurile de reparație, curățare, înlocuire sau pentru perioada suplimentară de arendă.",
    ],
  },
  {
    title: "Anulare și vreme nefavorabilă",
    body: [
      "Clientul poate solicita anularea sau reprogramarea rezervării contactând KAYAK Nistru cât mai devreme posibil.",
      "Dacă vremea, nivelul apei sau alte condiții fac activitatea nesigură, KAYAK Nistru poate propune reprogramarea, schimbarea intervalului orar sau anularea rezervării.",
      "Regulile exacte pentru avansuri, garanții sau rambursări se comunică înainte de confirmarea finală a rezervării, dacă acestea se aplică.",
    ],
  },
  {
    title: "Răspundere și siguranță",
    body: [
      "Activitățile pe apă și campingul implică riscuri naturale. Clientul este responsabil să evalueze propria stare fizică, experiența, condițiile meteo și să respecte indicațiile de siguranță.",
      "KAYAK Nistru nu răspunde pentru accidente, pierderi sau daune cauzate de nerespectarea instrucțiunilor, utilizare imprudentă, consum de alcool, folosirea echipamentului în zone nepermise sau decizii luate independent de client.",
      "În caz de urgență, clientul trebuie să contacteze imediat serviciile de urgență competente și să anunțe KAYAK Nistru cât mai curând posibil.",
    ],
  },
  {
    title: "Date personale",
    body: [
      "Datele transmise prin formular sunt prelucrate pentru gestionarea cererilor de arendă, confirmări și comunicare cu clientul.",
      "Detaliile despre prelucrarea datelor sunt disponibile în pagina Politica de confidențialitate.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Pentru întrebări despre rezervări, termeni sau echipament, ne puteți contacta la telefon 078951423 sau prin email la contact@kayaknistru.md.",
      "KAYAK Nistru își rezervă dreptul să actualizeze acești termeni. Versiunea aplicabilă este cea publicată pe website la data folosirii serviciului.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Document legal"
      title="Termeni și condiții"
      updatedAt="5 iulie 2026"
      intro="Acești termeni descriu regulile de utilizare a website-ului și condițiile generale pentru arenda de caiace gonflabile, corturi și saci de dormit oferite de KAYAK Nistru în satul Pîrîta."
      sections={sections}
    />
  );
}
