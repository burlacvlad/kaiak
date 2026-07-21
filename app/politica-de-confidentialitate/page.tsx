import { LegalPage } from "../legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Politica de confidențialitate",
  description:
    "Politica de confidențialitate pentru website-ul KAYAK Nistru și formularul de cereri de arendă.",
  path: "/politica-de-confidentialitate",
});

const sections = [
  {
    title: "Cine prelucrează datele",
    body: [
      "Operatorul datelor este KAYAK Nistru, activitate de arendă echipament în satul Pîrîta, Republica Moldova.",
      "Pentru întrebări despre datele personale, ne puteți contacta la telefon 078951423 sau prin email la contact@kayaknistru.md.",
    ],
  },
  {
    title: "Ce date colectăm",
    body: [
      "Prin formularul de cerere putem colecta: data arendei, ora de start, durata arendei, echipamentul ales, cantitățile, numele, telefonul, emailul și notele transmise de client.",
      "Datele de contact din formular sunt marcate ca opționale, dar lipsa lor poate face imposibilă confirmarea cererii.",
      "Pentru statistici simple colectăm pagina accesată, data și ora, domeniul de referință, campania UTM, țara și orașul aproximativ, limba, fusul orar, tipul dispozitivului, sistemul de operare, browserul și dimensiunea ecranului.",
      "Adresa IP completă nu este salvată în tabelul de analytics. Ea este transformată pe server într-un hash anonim care se schimbă zilnic și este folosit numai pentru estimarea vizitatorilor unici din acea zi.",
    ],
  },
  {
    title: "De ce folosim datele",
    body: [
      "Folosim datele pentru a primi și salva cereri de arendă, a verifica disponibilitatea echipamentului, a confirma rezervarea, a răspunde la întrebări și a organiza predarea sau livrarea echipamentului.",
      "Datele statistice ne ajută să vedem câte persoane folosesc website-ul, ce pagini sunt consultate și de pe ce tipuri de dispozitive este accesat, pentru a îmbunătăți conținutul și funcționarea acestuia.",
      "Putem folosi datele și pentru evidență internă, prevenirea abuzurilor, securitatea website-ului, soluționarea disputelor și respectarea obligațiilor legale aplicabile.",
    ],
  },
  {
    title: "Temeiul prelucrării",
    body: [
      "Prelucrarea datelor este necesară pentru a răspunde cererii transmise de client înainte de confirmarea arendei și pentru executarea înțelegerii dintre client și KAYAK Nistru.",
      "Pentru anumite prelucrări ne bazăm pe interesul legitim de a administra activitatea, a proteja website-ul și a păstra evidențe rezonabile.",
      "Atunci când legea o cere, putem prelucra date pentru îndeplinirea obligațiilor legale. Dacă se va folosi consimțământul pentru funcții suplimentare, acesta va putea fi retras.",
    ],
  },
  {
    title: "Cui transmitem datele",
    body: [
      "Datele din formular și statisticile de accesare pot fi stocate în Supabase. Datele cererilor pot fi transmise prin Mailgun pentru notificarea managerului prin email.",
      "Website-ul poate fi găzduit sau livrat prin furnizori tehnici precum platforme de hosting, servicii de email, servicii de securitate și infrastructură cloud.",
      "Pagina de locație include hartă Google Maps. Când interacționați cu harta, Google poate prelucra date conform propriilor politici.",
      "Nu vindem datele personale și nu le transmitem către terți pentru marketing independent.",
    ],
  },
  {
    title: "Transferuri în afara Republicii Moldova",
    body: [
      "Unii furnizori tehnici, precum servicii cloud, email sau hărți, pot prelucra date pe servere aflate în alte țări.",
      "Folosim acești furnizori pentru funcționarea website-ului și a formularului. În măsura aplicabilă, transferurile se fac cu măsuri rezonabile de protecție și conform condițiilor furnizorilor respectivi.",
    ],
  },
  {
    title: "Cât timp păstrăm datele",
    body: [
      "Cereri de arendă: de regulă până la 24 de luni, pentru evidență, comunicări ulterioare și soluționarea eventualelor neclarități.",
      "Emailuri de notificare și corespondență: de regulă până la 12 luni, dacă nu este necesară o perioadă mai lungă pentru apărarea drepturilor sau obligații legale.",
      "Datele statistice anonimizate și datele tehnice de server sunt păstrate, de regulă, până la 12 luni, apoi pot fi șterse sau păstrate numai sub formă agregată.",
    ],
  },
  {
    title: "Drepturile persoanelor vizate",
    body: [
      "În condițiile legii, puteți solicita acces la datele personale, rectificarea datelor incorecte, ștergerea datelor, restricționarea prelucrării, opoziția față de anumite prelucrări și informații despre modul în care datele sunt folosite.",
      "Pentru exercitarea drepturilor, ne puteți contacta la 078951423 sau contact@kayaknistru.md. Putem cere informații suplimentare pentru a confirma identitatea solicitantului.",
      "Dacă considerați că datele sunt prelucrate incorect, vă puteți adresa autorității competente pentru protecția datelor din Republica Moldova.",
    ],
  },
  {
    title: "Cookie-uri și tehnologii similare",
    body: [
      "Website-ul este construit pentru prezentarea serviciilor și trimiterea cererilor de arendă. În prezent nu folosim plată online în browser.",
      "Sistemul nostru de statistici nu setează cookie-uri și nu salvează un identificator persistent în browser. Respectăm semnalele Do Not Track și Global Privacy Control atunci când acestea sunt activate.",
      "Serviciile integrate, cum ar fi harta Google, pot folosi cookie-uri sau tehnologii similare atunci când sunt încărcate sau accesate. Browserul permite blocarea sau ștergerea cookie-urilor, dar unele funcții pot fi afectate.",
    ],
  },
  {
    title: "Securitatea datelor",
    body: [
      "Luăm măsuri rezonabile pentru protejarea datelor, inclusiv folosirea variabilelor de mediu pentru chei API, trimiterea formularului prin endpoint server-side și limitarea expunerii cheilor secrete în browser.",
      "Nicio metodă de transmitere sau stocare online nu este complet lipsită de risc. Dacă observăm un incident relevant, vom lua măsuri pentru limitarea efectelor și informarea persoanelor afectate atunci când este necesar.",
    ],
  },
  {
    title: "Modificări ale politicii",
    body: [
      "Putem actualiza această politică atunci când schimbăm website-ul, furnizorii tehnici, formularul sau modul de prelucrare a datelor.",
      "Versiunea aplicabilă este cea publicată pe această pagină, indicată prin data ultimei actualizări.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Protecția datelor"
      title="Politica de confidențialitate"
      updatedAt="21 iulie 2026"
      intro="Această politică explică ce date personale colectăm prin website-ul KAYAK Nistru, de ce le folosim, unde sunt transmise și ce drepturi aveți în legătură cu ele."
      sections={sections}
    />
  );
}
