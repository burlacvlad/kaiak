"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Compass,
  LifeBuoy,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  Minus,
  Navigation,
  Package,
  Phone,
  Plus,
  Route,
  Sailboat,
  Send,
  ShieldCheck,
  Star,
  Tent,
  Waves,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navLinks = [
  { label: "Acasă", href: "#acasa" },
  { label: "Caiace", href: "#experiente" },
  { label: "Camping", href: "#camping" },
  { label: "Prețuri", href: "#preturi" },
  { label: "Trasee", href: "#trasee" },
  { label: "Despre noi", href: "#despre" },
  { label: "Contact", href: "#contact" },
];

const heroChecks = [
  "Echipament de calitate",
  "Prețuri corecte și transparente",
  "Rezervare rapidă și ușoară",
  "Punct de start: satul Pîrîta",
];

const benefits = [
  {
    title: "Kayak + Camping",
    text: "Apă și natură într-un singur loc",
    icon: Waves,
  },
  {
    title: "Echipament premium",
    text: "Caiace gonflabile, curate și verificate",
    icon: ShieldCheck,
  },
  {
    title: "Trasee variate",
    text: "Pentru toate nivelurile",
    icon: Route,
  },
  {
    title: "Suport local",
    text: "Asistență și recomandări",
    icon: LifeBuoy,
  },
];

const experiences = [
  {
    title: "Caiac Dublu Gonflabil",
    description: "Caiac gonflabil stabil, perfect pentru cupluri sau prieteni.",
    price: "de la 450 MDL / zi",
    image: "/images/kayak-double.jpg",
    alt: "Două persoane într-un caiac pe lac",
  },
  {
    title: "Cort 2 Persoane",
    description: "Cort ușor, rezistent, pentru 2 persoane.",
    price: "de la 250 MDL / zi",
    image: "/images/tent.jpg",
    alt: "Cort galben lângă apă",
  },
  {
    title: "Sac de dormit",
    description: "Confort termic pentru nopți liniștite.",
    price: "de la 100 MDL / zi",
    image: "/images/sleeping-bag.jpg",
    alt: "Sac de dormit pregătit pentru camping",
  },
];

const equipmentOptions = [
  { value: "kayak-dublu", label: "KAYAK dublu gonflabil" },
  { value: "cort", label: "Cort" },
  { value: "sac-de-dormit", label: "Sac de dormit" },
  { value: "pachet-recomandat", label: "Pachet Recomandat" },
];

const routeCards = [
  {
    title: "satul Pohrebia - satul Pîrîta",
    text: "Traseu spectaculos pentru o zi activă pe apă.",
    meta: "3-4 ore",
  },
  {
    title: "Tur relaxat pe mal",
    text: "Ideal pentru începători, familii și copii.",
    meta: "1-2 ore",
  },
  {
    title: "Apus pe Nistru",
    text: "Ieșire scurtă, perfectă pentru fotografii și liniște.",
    meta: "Seara",
  },
];

const pricing = [
  {
    title: "KAYAK dublu gonflabil",
    eyebrow: "Pe apă",
    icon: Sailboat,
    badge: "Cel mai cerut",
    price: "450 lei",
    period: "12 ore",
    description: "Caiac gonflabil stabil pentru două persoane, pregătit pentru Nistru.",
    cta: "Rezervă KAYAK",
    includes: [
      "Vestă inclusă",
      "Sacoșă impermeabilă inclusă",
      "Ridicare din satul Pîrîta",
    ],
  },
  {
    title: "Corturi",
    eyebrow: "Camping",
    icon: Tent,
    badge: "Disponibil zilnic",
    price: "250 lei",
    period: "cort dublu / 12 ore",
    description: "Echipament de camping curat și verificat pentru nopți lângă apă.",
    cta: "Rezervă cort",
    includes: [
      "Cort dublu - 250 lei / 12 ore",
      "Sac de dormit - 100 lei / 12 ore",
      "Reduceri pentru grupuri și copii",
    ],
  },
];

const galleryImages = [
  {
    src: "/images/kayak-double.jpg",
    alt: "Cuplu în caiac la apus",
    className: "md:col-span-2",
  },
  {
    src: "/images/tent.jpg",
    alt: "Cort amplasat pe malul apei",
    className: "",
  },
  {
    src: "/images/kayaks-two.jpg",
    alt: "Două caiace pe apă liniștită",
    className: "",
  },
  {
    src: "/images/canoe-group.jpg",
    alt: "Grup în canoe pe apă",
    className: "md:col-span-2",
  },
  {
    src: "/images/sunset-kayak.jpg",
    alt: "Caiac la apus pe apă",
    className: "",
  },
  {
    src: "/images/camping-section.jpg",
    alt: "Camping lângă apă",
    className: "",
  },
];

const reviews = [
  {
    quote:
      "Am luat un kayak dublu pentru jumătate de zi. Totul a fost pregătit la timp, curat și ușor de folosit.",
    author: "Andrei C.",
    location: "Chișinău",
    date: "acum 2 săptămâni",
    service: "KAYAK dublu gonflabil",
    initials: "AC",
  },
  {
    quote:
      "Am rezervat cort și saci de dormit pentru weekend. Echipamentul a fost curat, compact și exact cum ni s-a spus.",
    author: "Maria P.",
    location: "Durlești",
    date: "acum 3 săptămâni",
    service: "Cort + saci de dormit",
    initials: "MP",
  },
  {
    quote:
      "Comunicare rapidă și preț corect. Mi-a plăcut că se explică clar ce este inclus și de unde se ridică.",
    author: "Vlad S.",
    location: "Ialoveni",
    date: "acum o lună",
    service: "Arendă pe 6 ore",
    initials: "VS",
  },
  {
    quote:
      "Pentru prima experiență pe Nistru a fost foarte comod. Kayakul gonflabil este stabil și potrivit pentru începători.",
    author: "Irina R.",
    location: "Chișinău",
    date: "acum o lună",
    service: "KAYAK dublu gonflabil",
    initials: "IR",
  },
  {
    quote:
      "Am mers cu prietenii și am luat mai multe echipamente. Confirmarea a venit repede, fără complicații.",
    author: "Alexandru M.",
    location: "Bălți",
    date: "acum 2 luni",
    service: "Grup",
    initials: "AM",
  },
  {
    quote:
      "Foarte bun pentru o ieșire scurtă din oraș. Locația e accesibilă, iar echipamentul a fost verificat înainte.",
    author: "Diana L.",
    location: "Orhei",
    date: "acum 2 luni",
    service: "KAYAK + camping",
    initials: "DL",
  },
];

const faqs = [
  {
    question: "Trebuie să am experiență pentru a închiria?",
    answer:
      "Nu. Avem trasee potrivite pentru începători și îți explicăm regulile de bază înainte de plecare.",
  },
  {
    question: "Ce este inclus în prețul închirierii?",
    answer:
      "Pentru caiace gonflabile includem vestă, pagaie și sacoșă impermeabilă. Pentru camping primești echipamentul rezervat, curat și verificat.",
  },
  {
    question: "Pot anula o rezervare?",
    answer:
      "Da. Anunță-ne cât mai devreme. Dacă vremea nu permite ieșirea pe apă, mutăm rezervarea pentru altă zi disponibilă.",
  },
  {
    question: "De unde încep traseele?",
    answer:
      "Punctul de start este în satul Pîrîta, cu acces rapid la malul Nistrului și parcare în apropiere.",
  },
  {
    question: "Este sigur pentru copii?",
    answer:
      "Da, cu vestă de salvare și însoțiți de adulți. Recomandăm traseele scurte pentru familiile cu copii.",
  },
  {
    question: "Pot închiria pentru mai multe zile?",
    answer:
      "Da. Poți rezerva echipament pentru o zi, weekend sau mai multe zile, în funcție de disponibilitate.",
  },
];

const primaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0994a8] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#087d8f] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0994a8]";

const secondaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/55 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6fafb] text-[#13233f]">
      <Header />
      <Hero />
      <BenefitsStrip />
      <RoutesSection />
      <ExperiencesSection />
      <CampingSection />
      <PricingSection />
      <WhyChooseSection />
      <GallerySection />
      <ReviewsSection />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-200/75 bg-white/92 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#acasa"
          className="group flex items-center gap-3"
          aria-label="Kayak Nistru acasă"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0a3956] text-white shadow-sm">
            <Waves className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black uppercase text-[#0a3956]">
              KAYAK <span className="text-[#0994a8]">Nistru</span>
            </span>
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
              satul Pîrîta
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigare principală">
          {navLinks.map((link) => (
            <a
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-[#0a3956]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#rezervare" className={primaryButton}>
            Rezervă acum
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-[#0a3956] transition hover:bg-slate-100 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Navigare mobilă">
            {navLinks.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rezervare"
              onClick={() => setIsOpen(false)}
              className={`${primaryButton} mt-2 w-full`}
            >
              Rezervă acum
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="acasa"
      className="relative overflow-visible bg-[#0a3956] text-white"
    >
      <Image
        src="/images/hero-canoes.jpg"
        alt="Grup de oameni în canoe pe apă liniștită"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,38,0.88)_0%,rgba(5,24,38,0.62)_43%,rgba(5,24,38,0.2)_100%)]" />
      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.78fr] lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/12 px-3 py-2 text-sm font-semibold text-cyan-50 backdrop-blur">
            <MapPin className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
            Start local din satul Pîrîta
          </span>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.07] text-white sm:text-6xl lg:text-7xl">
            Descoperă
            <br />
            Nistrul din <br className="sm:hidden" />
            satul Pîrîta
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cyan-50 sm:text-xl">
            Închiriază caiace gonflabile, canoe, corturi și saci de dormit și
            trăiește aventura pe apă și la camping.
          </p>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {heroChecks.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white">
                <CheckCircle2 className="h-5 w-5 flex-none text-[#5ce0ed]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#rezervare" className={`${primaryButton} w-full sm:w-auto`}>
              Rezervă acum
              <Send className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-9 grid gap-3 text-sm font-semibold text-cyan-50 sm:flex sm:flex-wrap">
            <span className="inline-flex w-full items-center gap-2 rounded-lg bg-black/22 px-3 py-2 backdrop-blur sm:w-auto">
              <Clock3 className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
              Doar 30 min de la Chișinău
            </span>
            <span className="inline-flex w-full items-center gap-2 rounded-lg bg-black/22 px-3 py-2 backdrop-blur sm:w-auto">
              <Car className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
              Parcare gratuită
            </span>
          </div>
        </div>

        <HeroBookingForm />
      </div>
    </section>
  );
}

function HeroBookingForm() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [rentalDetails, setRentalDetails] = useState({
    date: "2026-07-12",
    startTime: "07:00",
    duration: "6-ore",
  });
  const [contactDetails, setContactDetails] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [selectedEquipment, setSelectedEquipment] = useState([
    "kayak-dublu",
  ]);
  const [equipmentQuantities, setEquipmentQuantities] = useState<
    Record<string, number>
  >({
    "kayak-dublu": 1,
  });

  function handleEquipmentChange(nextSelected: string[]) {
    setSelectedEquipment(nextSelected);
    setEquipmentQuantities((current) => {
      const next: Record<string, number> = {};

      nextSelected.forEach((value) => {
        next[value] = current[value] ?? 1;
      });

      return next;
    });
  }

  function handleQuantityChange(value: string, quantity: number) {
    setEquipmentQuantities((current) => ({
      ...current,
      [value]: Math.min(99, Math.max(1, quantity)),
    }));
  }

  function handleContinueToContact() {
    if (selectedEquipment.length === 0) {
      setMessageType("error");
      setMessage("Alege cel puțin un tip de echipament pentru arendă.");
      return;
    }

    setMessage("");
    setFormStep(2);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (selectedEquipment.length === 0) {
      setMessageType("error");
      setMessage("Alege cel puțin un tip de echipament pentru arendă.");
      setFormStep(1);
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const equipment = selectedEquipment.map((value) => {
      const option = equipmentOptions.find((item) => item.value === value);

      return {
        value,
        label: option?.label ?? value,
        quantity: equipmentQuantities[value] ?? 1,
      };
    });

    try {
      const response = await fetch("/api/rental-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rentalDate: rentalDetails.date,
          startTime: rentalDetails.startTime,
          duration: rentalDetails.duration,
          equipment,
          customerName: contactDetails.name,
          customerPhone: contactDetails.phone,
          customerEmail: contactDetails.email,
          customerNote: contactDetails.note,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.error ?? "Nu am putut salva cererea. Încearcă din nou."
        );
      }

      setMessageType("success");
      setMessage("Cererea a fost trimisă. Revenim rapid cu confirmarea arendei.");
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Nu am putut trimite cererea. Încearcă din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="rezervare"
      onSubmit={handleSubmit}
      className="relative z-40 mx-auto w-full max-w-md rounded-lg border border-white/70 bg-white/95 text-[#13233f] shadow-2xl shadow-slate-950/30 ring-1 ring-slate-900/5 backdrop-blur-xl lg:ml-auto"
    >
      <div className="rounded-t-lg bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.28),transparent_34%),linear-gradient(135deg,#087d8f,#0aa7b8)] p-4 text-white sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="inline-flex rounded-lg bg-white/16 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-cyan-50">
              Rezervare rapidă
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-white">
              Cerere de arendă
            </h2>
          </div>
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white text-[#0994a8] shadow-sm">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="rounded-b-lg bg-[#f7fafb] p-4 sm:p-5">
        <div className="hidden">
          <button
            type="button"
            onClick={() => setFormStep(1)}
            className={`rounded-lg px-3 py-2 text-sm font-black transition ${
              formStep === 1
                ? "bg-[#0994a8] text-white shadow-sm"
                : "text-slate-500 hover:bg-cyan-50 hover:text-[#087d8f]"
            }`}
          >
            1. Arendă
          </button>
          <button
            type="button"
            onClick={() => setFormStep(2)}
            className={`rounded-lg px-3 py-2 text-sm font-black transition ${
              formStep === 2
                ? "bg-[#0994a8] text-white shadow-sm"
                : "text-slate-500 hover:bg-cyan-50 hover:text-[#087d8f]"
            }`}
          >
            2. Contact
          </button>
        </div>

        {formStep === 1 ? (
          <div key="step-1" className="form-step-panel">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0994a8] text-sm font-black text-white">
                1
              </span>
              <p className="text-sm font-black text-[#0a3956]">Detaliile arendei</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Data" htmlFor="date">
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={rentalDetails.date}
                  onChange={(event) =>
                    setRentalDetails((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  className="form-field"
                />
              </Field>
              <Field label="Ora de start" htmlFor="start-time">
                <select
                  id="start-time"
                  name="startTime"
                  value={rentalDetails.startTime}
                  onChange={(event) =>
                    setRentalDetails((current) => ({
                      ...current,
                      startTime: event.target.value,
                    }))
                  }
                  className="form-field"
                >
                  <option value="07:00">07:00</option>
                  <option value="13:00">13:00</option>
                  <option value="18:00">18:00</option>
                </select>
              </Field>
              <Field label="Echipament" htmlFor="equipment-trigger" className="sm:col-span-2">
                <EquipmentMultiSelect
                  selected={selectedEquipment}
                  quantities={equipmentQuantities}
                  onChange={handleEquipmentChange}
                  onQuantityChange={handleQuantityChange}
                />
              </Field>
              <Field label="Durata arendei" htmlFor="duration" className="sm:col-span-2">
                <select
                  id="duration"
                  name="duration"
                  value={rentalDetails.duration}
                  onChange={(event) =>
                    setRentalDetails((current) => ({
                      ...current,
                      duration: event.target.value,
                    }))
                  }
                  className="form-field"
                >
                  <option value="6-ore">6 ore</option>
                  <option value="multi">Mai multe zile</option>
                </select>
              </Field>
            </div>
            <button
              type="button"
              onClick={handleContinueToContact}
              className={`${primaryButton} mt-5 w-full shadow-lg shadow-cyan-900/15`}
            >
              Continuă la pasul 2
            </button>
          </div>
        ) : (
          <div key="step-2" className="form-step-panel">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#0994a8] text-sm font-black text-white">
                2
              </span>
              <div>
                <p className="text-sm font-black text-[#0a3956]">Date de contact</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Câmpurile de mai jos sunt opționale.
                </p>
              </div>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label
                  htmlFor="customer-name"
                  className="text-xs font-black uppercase tracking-[0.12em] text-slate-500"
                >
                  Nume
                </label>
                <input
                  id="customer-name"
                  name="customerName"
                  type="text"
                  value={contactDetails.name}
                  onChange={(event) =>
                    setContactDetails((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Ex: Ion"
                  className="form-field compact-field"
                />
              </div>
              <div className="grid gap-1.5">
                <label
                  htmlFor="customer-phone"
                  className="text-xs font-black uppercase tracking-[0.12em] text-slate-500"
                >
                  Telefon
                </label>
                <input
                  id="customer-phone"
                  name="customerPhone"
                  type="tel"
                  value={contactDetails.phone}
                  onChange={(event) =>
                    setContactDetails((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="Ex: 078951423"
                  className="form-field compact-field"
                />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <label
                  htmlFor="customer-email"
                  className="text-xs font-black uppercase tracking-[0.12em] text-slate-500"
                >
                  Gmail
                </label>
                <input
                  id="customer-email"
                  name="customerEmail"
                  type="email"
                  value={contactDetails.email}
                  onChange={(event) =>
                    setContactDetails((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="exemplu@gmail.com"
                  className="form-field compact-field"
                />
              </div>
              <div className="grid gap-1.5 sm:col-span-2">
                <label
                  htmlFor="customer-note"
                  className="text-xs font-black uppercase tracking-[0.12em] text-slate-500"
                >
                  Note
                </label>
                <textarea
                  id="customer-note"
                  name="customerNote"
                  value={contactDetails.note}
                  onChange={(event) =>
                    setContactDetails((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  placeholder="Scrie aici orice detaliu important..."
                  className="form-field compact-field min-h-16 resize-none py-2.5"
                />
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
              <button
                type="button"
                onClick={() => setFormStep(1)}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#0994a8] bg-white px-4 py-3 text-sm font-black text-[#087d8f] transition hover:bg-cyan-50"
              >
                Înapoi
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${primaryButton} w-full shadow-lg shadow-cyan-900/15 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-65`}
              >
                {isSubmitting ? "Se trimite..." : "Trimite cererea"}
              </button>
            </div>
          </div>
        )}

        {message && (
          <p
            className={`mt-4 rounded-lg border px-3 py-3 text-sm font-semibold leading-6 ${
              messageType === "success"
                ? "border-cyan-100 bg-cyan-50 text-[#0a6573]"
                : "border-red-100 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

function EquipmentMultiSelect({
  selected,
  quantities,
  onChange,
  onQuantityChange,
}: {
  selected: string[];
  quantities: Record<string, number>;
  onChange: (value: string[]) => void;
  onQuantityChange: (value: string, quantity: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedItems = equipmentOptions.filter((option) =>
    selected.includes(option.value)
  );
  const filteredOptions = equipmentOptions.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase().trim())
  );

  function toggleOption(value: string) {
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    onChange(next);
  }

  return (
    <div className="relative">
      {selected.map((value) => (
        <input key={value} type="hidden" name="equipment" value={value} />
      ))}
      {selected.map((value) => (
        <input
          key={`${value}-quantity`}
          type="hidden"
          name={`equipmentQuantity[${value}]`}
          value={quantities[value] ?? 1}
          readOnly
        />
      ))}

      <button
        id="equipment-trigger"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="min-h-12 w-full rounded-lg border-[1.5px] border-[#b9cbd3] bg-white px-3 py-2 text-left shadow-sm shadow-slate-900/5 transition hover:border-[#8db7c2] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0994a8]/15"
        aria-expanded={isOpen}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 flex-1 flex-wrap gap-2">
            {selectedItems.length > 0 ? (
              selectedItems.map((item) => (
                <span
                  key={item.value}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-[#eaf8fa] px-2.5 py-1.5 text-xs font-black text-[#087d8f]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                  <span className="text-[#0a6573]">× {quantities[item.value] ?? 1}</span>
                </span>
              ))
            ) : (
              <span className="py-1.5 text-base font-bold text-slate-400">
                Alege unul sau mai multe
              </span>
            )}
          </span>
          <ChevronDown
            className={`h-5 w-5 flex-none text-slate-500 transition ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl shadow-slate-900/18">
          <div className="border-b border-slate-100 bg-[#f7fafb] p-3">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Caută echipament..."
              className="form-field min-h-10 text-sm"
            />
          </div>
          <div className="max-h-72 overflow-auto p-2">
            {filteredOptions.map((option) => {
              const checked = selected.includes(option.value);

              return (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-cyan-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(option.value)}
                    className="h-4 w-4 rounded border-slate-300 text-[#0994a8] accent-[#0994a8]"
                  />
                  <span className="flex-1 text-sm font-bold text-slate-700">
                    {option.label}
                  </span>
                  {checked && (
                    <CheckCircle2
                      className="h-4 w-4 flex-none text-[#0994a8]"
                      aria-hidden="true"
                    />
                  )}
                </label>
              );
            })}
            {filteredOptions.length === 0 && (
              <p className="px-3 py-4 text-sm font-semibold text-slate-500">
                Nu am găsit echipament cu acest nume.
              </p>
            )}
          </div>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="mt-2.5 grid gap-2 rounded-lg border border-slate-200 bg-[#f8fbfc] p-2.5">
          <p className="px-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            Cantitate
          </p>
          {selectedItems.map((item) => {
            const quantity = quantities[item.value] ?? 1;

            return (
              <div
                key={`${item.value}-quantity-control`}
                className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 shadow-sm shadow-slate-900/5"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-700">
                  {item.label}
                </span>
                <div className="flex flex-none items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(item.value, quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#087d8f] transition hover:border-[#0994a8] hover:bg-cyan-50"
                    aria-label={`Scade cantitatea pentru ${item.label}`}
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(event) =>
                      onQuantityChange(
                        item.value,
                        Number.parseInt(event.target.value, 10) || 1
                      )
                    }
                    className="h-8 w-12 rounded-lg border border-slate-200 bg-white text-center text-sm font-black text-[#13233f] outline-none transition focus:border-[#0994a8] focus:ring-4 focus:ring-[#0994a8]/15"
                    aria-label={`Cantitate pentru ${item.label}`}
                  />
                  <button
                    type="button"
                    onClick={() => onQuantityChange(item.value, quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#087d8f] transition hover:border-[#0994a8] hover:bg-cyan-50"
                    aria-label={`Mărește cantitatea pentru ${item.label}`}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group grid gap-1.5 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm shadow-slate-900/5 transition hover:border-[#9fc9d1] hover:shadow-md hover:shadow-slate-900/8 ${className}`}
    >
      <label
        htmlFor={htmlFor}
        className="text-xs font-black uppercase tracking-[0.12em] text-slate-500 transition group-focus-within:text-[#087d8f]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function BenefitsStrip() {
  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/8 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-center gap-4 rounded-lg px-4 py-4 transition hover:bg-cyan-50"
          >
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-cyan-50 text-[#0994a8]">
              <benefit.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-black text-[#0a3956]">{benefit.title}</h3>
              <p className="mt-1 text-sm font-medium text-slate-600">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RoutesSection() {
  return (
    <section id="trasee" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Trasee recomandate"
          title="Alege ritmul potrivit pentru aventura ta"
          text="Pornim din satul Pîrîta și îți recomandăm traseul în funcție de nivel, vreme și timpul disponibil."
        />
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {routeCards.map((route) => (
            <article
              key={route.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-50 text-[#0994a8]">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-lg bg-[#eef8f9] px-3 py-1.5 text-sm font-black text-[#087d8f]">
                  {route.meta}
                </span>
              </div>
              <h3 className="text-xl font-black text-[#0a3956]">{route.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{route.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencesSection() {
  return (
    <section id="experiente" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Închiriere echipament" title="Alege experiența ta" />
        <div className="mx-auto mt-9 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              className={index === experiences.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}
              {...experience}
            />
          ))}
        </div>
        <div className="mx-auto mt-5 max-w-5xl">
          <FeaturedExperience />
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  title,
  description,
  price,
  image,
  alt,
  className = "",
}: {
  title: string;
  description: string;
  price: string;
  image: string;
  alt: string;
  className?: string;
}) {
  return (
    <article className={`group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black text-[#0a3956]">{title}</h3>
        <p className="mt-2 min-h-12 leading-6 text-slate-600">{description}</p>
        <p className="mt-4 text-sm font-semibold text-slate-600">
          <span className="text-xl font-black text-[#13233f]">{price}</span>
        </p>
        <a href="#rezervare" className={`${primaryButton} mt-5 w-full`}>
          Detalii
        </a>
      </div>
    </article>
  );
}

function FeaturedExperience() {
  return (
    <article className="group overflow-hidden rounded-lg border border-cyan-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="grid h-full md:grid-cols-[0.9fr_1fr]">
        <div className="relative min-h-64 overflow-hidden bg-slate-100">
          <Image
            src="/images/camping-water-sunset.jpg"
            alt="Cort și echipament de camping lângă apă"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute right-4 top-4 rounded-lg bg-[#0994a8] px-3 py-2 text-sm font-black text-white shadow">
            Recomandat
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 lg:p-8">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
            Escapadă completă
          </p>
          <h3 className="text-2xl font-black text-[#0a3956]">
            Pachet Weekend - Kayak + Camping
          </h3>
          <p className="mt-3 leading-7 text-slate-600">
            Caiac gonflabil pentru 2 zile + cort + saci de dormit. Tot ce ai
            nevoie pentru o escapadă completă.
          </p>
          <p className="mt-5 text-2xl font-black text-[#13233f]">
            de la 1 200 MDL / 2 zile
          </p>
          <a href="#rezervare" className={`${primaryButton} mt-6 w-full sm:w-auto`}>
            Detalii
          </a>
        </div>
      </div>
    </article>
  );
}

function CampingSection() {
  const bullets = [
    "Corturi pentru 2-4 persoane",
    "Saci de dormit confortabili",
    "Ideal pentru weekend și aventuri scurte",
    "Potrivit pentru cupluri, prieteni și familii",
    "Locuri liniștite, natură și apusuri superbe",
  ];

  return (
    <section id="camping" className="overflow-hidden bg-[#edf7f8] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
            Camping pe Nistru
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-[#0a3956] sm:text-5xl">
            Camping pe malul Nistrului
          </h2>
          <ul className="mt-7 grid gap-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 font-semibold text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#0994a8]" aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <a href="#preturi" className={`${primaryButton} mt-8`}>
            Vezi echipamentul de camping
          </a>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-2xl shadow-slate-900/20">
          <Image
            src="/images/camping-section.jpg"
            alt="Camping cu cort lângă apă"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(237,247,248,0.14),rgba(5,24,38,0.05))]" />
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="preturi" className="bg-[#f2f8fa] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
              Tarife clare
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0a3956] sm:text-5xl">
              Prețuri închiriere
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Alege echipamentul, ora de start și durata arendei. Prețurile sunt
              simple, transparente și potrivite pentru o zi pe Nistru sau un
              weekend la camping.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Start", "07:00 / 13:00 / 18:00"],
              ["Locație", "satul Pîrîta"],
              ["Contact", "078951423"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-white bg-white/82 px-4 py-3 shadow-sm shadow-slate-900/5 ring-1 ring-slate-900/5 backdrop-blur"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </p>
                <p className="mt-1 text-sm font-black leading-5 text-[#0a3956]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pricing.map((price) => (
            <PriceCard key={price.title} {...price} />
          ))}
          <FeaturedPriceCard />
        </div>
        <InfoPriceCard />
      </div>
    </section>
  );
}

function PriceCard({
  title,
  eyebrow,
  icon: Icon,
  badge,
  price,
  period,
  description,
  cta,
  includes,
}: {
  title: string;
  eyebrow: string;
  icon: LucideIcon;
  badge: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  includes: string[];
}) {
  return (
    <article className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-lg border border-white bg-white p-5 shadow-xl shadow-slate-900/8 ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/12 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0994a8,#f2a51a)]" />
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-[#eaf8fa] text-[#0994a8] shadow-sm ring-1 ring-cyan-100">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="rounded-lg bg-[#fff5d9] px-3 py-1.5 text-xs font-black text-[#9a6600]">
          {badge}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0994a8]">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-black leading-tight text-[#0a3956]">
          {title}
        </h3>
        <p className="mt-3 min-h-14 text-sm font-semibold leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-6 rounded-lg bg-[#f7fbfc] p-4 ring-1 ring-slate-900/5">
        <p className="text-4xl font-black tracking-normal text-[#13233f]">
          {price}
        </p>
        <p className="mt-1 text-sm font-black text-slate-500">{period}</p>
      </div>

      <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#0994a8]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a href="#rezervare" className={`${primaryButton} mt-auto w-full`}>
        {cta}
      </a>
    </article>
  );
}

function FeaturedPriceCard() {
  return (
    <article className="relative flex min-h-[440px] flex-col overflow-hidden rounded-lg bg-[#0a3956] p-5 text-white shadow-2xl shadow-cyan-950/22 ring-1 ring-cyan-200/20 transition hover:-translate-y-1 hover:shadow-2xl sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(92,224,237,0.28),transparent_34%),linear-gradient(145deg,rgba(9,148,168,0.42),transparent_55%)]" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-white text-[#0994a8] shadow-sm">
          <Package className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="rounded-lg bg-[#f2a51a] px-3 py-1.5 text-xs font-black text-white shadow-sm">
          Recomandat
        </span>
      </div>

      <div className="relative mt-6">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-100">
          Kayak + Camping
        </p>
        <h3 className="mt-2 text-3xl font-black leading-tight text-white">
          Pachet Recomandat
        </h3>
        <p className="mt-3 min-h-14 text-sm font-semibold leading-6 text-cyan-50">
          Pentru cei care vor o escapadă completă: apă, camping și echipamentul
          esențial într-un singur pachet.
        </p>
      </div>

      <div className="relative mt-6 rounded-lg bg-white/12 p-4 ring-1 ring-white/16 backdrop-blur">
        <p className="text-4xl font-black tracking-normal text-white">
          1 200 lei
        </p>
        <p className="mt-1 text-sm font-black text-cyan-100">2 zile</p>
      </div>

      <ul className="relative mt-5 grid gap-3 text-sm font-semibold leading-6 text-cyan-50">
        {[
          "Caiac dublu gonflabil - 2 zile",
          "Cort 2 persoane - 2 nopți",
          "2 saci de dormit",
        ].map(
          (item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#5ce0ed]" aria-hidden="true" />
              <span>{item}</span>
            </li>
          )
        )}
      </ul>

      <a
        href="#rezervare"
        className="relative mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-[#087d8f] shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-md"
      >
        Rezervă pachetul
      </a>
    </article>
  );
}

function InfoPriceCard() {
  const info = [
    "Prețurile includ vestă, sacoșă impermeabilă",
    "Livrare la punctul de start",
    "Reduceri pentru grupuri și copii",
  ];

  return (
    <aside className="mt-5 grid gap-4 rounded-lg border border-white bg-white p-4 shadow-lg shadow-slate-900/6 ring-1 ring-slate-900/5 lg:grid-cols-[0.85fr_1.45fr_auto] lg:items-center lg:p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-cyan-50 text-[#0994a8]">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-black text-[#0a3956]">Informații utile</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Detalii rapide înainte de rezervare
          </p>
        </div>
      </div>

      <ul className="grid gap-3 sm:grid-cols-3">
        {info.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 rounded-lg bg-[#f7fbfc] px-3 py-3 text-sm font-bold leading-6 text-slate-700"
          >
            <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-[#0994a8]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a href="tel:078951423" className={`${primaryButton} w-full whitespace-nowrap lg:w-auto`}>
        Sună acum
      </a>
    </aside>
  );
}

function WhyChooseSection() {
  const reasons = [
    {
      title: "Local și de încredere",
      text: "Suntem din zonă și cunoaștem Nistrul.",
      icon: MapPinned,
    },
    {
      title: "Echipament de top",
      text: "Verificat înainte de fiecare utilizare.",
      icon: ShieldCheck,
    },
    {
      title: "Flexibilitate",
      text: "Închiriere pe oră, zi sau weekend.",
      icon: CalendarDays,
    },
    {
      title: "Suport dedicat",
      text: "Te ajutăm să alegi traseul și echipamentul potrivit.",
      icon: LifeBuoy,
    },
  ];

  return (
    <section id="despre" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <SectionTitle eyebrow="De ce noi" title="De ce să alegi Kayak Nistru?" />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <article key={reason.title} className="rounded-lg bg-[#f6fafb] p-5">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-[#0994a8]">
                <reason.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-black text-[#0a3956]">{reason.title}</h3>
              <p className="mt-2 leading-6 text-slate-600">{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Galerie" title="Momente de pe Nistru" />
        <div className="mt-9 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image) => (
            <div
              key={image.src}
              className={`group relative overflow-hidden rounded-lg bg-slate-100 shadow-sm ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const loopingReviews = [...reviews, ...reviews];

  return (
    <section className="overflow-hidden bg-[#f6fafb] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
              Recenzii
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#0a3956] sm:text-5xl">
              Ce spun clienții noștri
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Feedback scurt și clar de la oameni care au închiriat caiace
              gonflabile, corturi sau pachete pentru weekend.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 sm:min-w-64">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black leading-none text-[#0a3956]">
                5.0
              </span>
              <div className="pb-1">
                <div className="flex gap-1 text-[#f2a51a]" aria-label="5 din 5 stele">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-1 text-sm font-bold text-slate-500">
                  recenzii verificate
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-carousel relative mt-9">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f6fafb] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f6fafb] to-transparent" />
          <div className="reviews-carousel-track flex w-max gap-4">
            {loopingReviews.map((review, index) => (
              <ReviewCard
                key={`${review.author}-${index}`}
                review={review}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function ReviewCard({
  review,
}: {
  review: {
    quote: string;
    author: string;
    location: string;
    date: string;
    service: string;
    initials: string;
  };
}) {
  return (
    <article className="w-[320px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:w-[380px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#eaf8fa] text-sm font-black text-[#087d8f] ring-1 ring-cyan-100">
            {review.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate font-black text-[#0a3956]">{review.author}</p>
            <p className="mt-0.5 truncate text-sm font-semibold text-slate-500">
              {review.location} · {review.date}
            </p>
          </div>
        </div>
        <BadgeCheck className="h-5 w-5 flex-none text-[#0994a8]" aria-hidden="true" />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex gap-0.5 text-[#f2a51a]" aria-label="5 stele">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
          ))}
        </div>
        <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
          5.0
        </span>
      </div>

      <p className="mt-4 min-h-28 text-[15px] font-medium leading-7 text-slate-700">
        “{review.quote}”
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="min-w-0 truncate rounded-lg bg-[#f7fbfc] px-3 py-2 text-xs font-black text-[#0a6573]">
          {review.service}
        </span>
        <span className="flex-none text-xs font-bold text-slate-400">
          client
        </span>
      </div>
    </article>
  );
}

function LocationSection() {
  return (
    <section id="contact" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-slate-200 bg-[#f6fafb] shadow-sm lg:grid-cols-[0.72fr_1.28fr]">
        <div className="p-6 lg:p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
            Locație
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#0a3956]">
            Ne găsești în satul Pîrîta
          </h2>
          <ul className="mt-6 grid gap-3">
            {[
              "30 min de la Chișinău",
              "Parcare gratuită",
              "Acces facil la malul Nistrului",
              "Punct de start pentru trasee superbe",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-semibold text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 flex-none text-[#0994a8]" aria-hidden="true" />
                <span>{item}</span>
              </li>
          ))}
        </ul>
        <a
          href="tel:078951423"
          className="mt-5 flex items-center gap-3 rounded-lg border border-cyan-100 bg-white px-4 py-3 text-[#0a3956] shadow-sm transition hover:border-[#0994a8] hover:bg-cyan-50"
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-cyan-50 text-[#0994a8]">
            <Phone className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              Telefon
            </span>
            <span className="mt-0.5 block text-lg font-black">078951423</span>
          </span>
        </a>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=47.10392,29.11893"
              target="_blank"
              rel="noopener noreferrer"
              className={primaryButton}
            >
              Cum ajungi
            </a>
            <a
              href="tel:078951423"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#0994a8] bg-white px-5 py-3 text-sm font-black text-[#087d8f] transition hover:bg-cyan-50"
            >
              Contactează-ne
            </a>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden bg-[#dceee9]">
          <iframe
            title="Google Maps KAYAK Nistru în satul Pîrîta"
            src="https://www.google.com/maps?q=47.10392,29.11893&z=15&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent" />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=47.10392,29.11893"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/70 bg-white/95 px-4 py-3 text-sm font-black text-[#087d8f] shadow-xl shadow-slate-900/15 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-cyan-50"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            GPS locație
          </a>
          <div className="pointer-events-none absolute bottom-4 left-4 w-64 rounded-lg border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500 text-white">
                <MapPin className="h-6 w-6 fill-current" aria-hidden="true" />
              </span>
              <div>
                <p className="font-black text-[#0a3956]">KAYAK Nistru</p>
                <p className="text-sm font-semibold text-slate-600">satul Pîrîta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="FAQ" title="Întrebări frecvente" />
        <FAQAccordion />
      </div>
    </section>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="mt-9 grid items-start gap-4 lg:grid-cols-2">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.question} className="self-start rounded-lg border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-black text-[#0a3956]"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 flex-none transition ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <p className="border-t border-slate-100 px-5 pb-5 pt-4 leading-7 text-slate-600">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0a3956] px-4 py-16 text-white sm:px-6 lg:px-8">
      <Image
        src="/images/sunset-kayak.jpg"
        alt="Apus pe apă cu caiac"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,24,38,0.88),rgba(5,24,38,0.45))]" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Pregătit pentru o zi sau un weekend pe apă?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-cyan-50">
            Rezervă acum și bucură-te de libertate, natură și liniște.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#rezervare" className={primaryButton}>
            Rezervă acum
          </a>
          <a href="tel:078951423" className={secondaryButton}>
            Contactează-ne
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#072a43] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr_0.75fr]">
        <div>
          <a href="#acasa" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0994a8] text-white">
              <Waves className="h-6 w-6" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xl font-black uppercase">
                KAYAK <span className="text-[#5ce0ed]">Nistru</span>
              </span>
              <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-100">
                satul Pîrîta
              </span>
            </span>
          </a>
          <p className="mt-5 max-w-sm leading-7 text-cyan-50">
            Aventură pe Nistru, echipament premium, amintiri de neuitat.
          </p>
        </div>

        <FooterColumn
          title="Navigare"
          links={[
            { label: "Acasă", href: "#acasa" },
            { label: "Caiace", href: "#experiente" },
            { label: "Camping", href: "#camping" },
          ]}
        />
        <FooterColumn
          title="Informații"
          links={[
            { label: "Prețuri", href: "#preturi" },
            { label: "Trasee", href: "#trasee" },
            { label: "Despre noi", href: "#despre" },
            { label: "Contact", href: "#contact" },
          ]}
        />

        <div>
          <h3 className="font-black">Contact</h3>
          <ul className="mt-4 grid gap-3 text-sm text-cyan-50">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
              satul Pîrîta, Moldova
            </li>
            <li>
              <a href="tel:078951423" className="flex items-center gap-2 transition hover:text-[#5ce0ed]">
                <Phone className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
                078951423
              </a>
            </li>
            <li>
              <a href="mailto:contact@kayaknistru.md" className="flex items-center gap-2 transition hover:text-[#5ce0ed]">
                <Mail className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
                contact@kayaknistru.md
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-black">Program</h3>
          <ul className="mt-4 grid gap-3 text-sm text-cyan-50">
            <li className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
              Luni - Duminică
            </li>
            <li className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#5ce0ed]" aria-hidden="true" />
              07:00 - 20:00
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/12 pt-6 text-sm text-cyan-100 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Kayak Nistru. Toate drepturile rezervate.</p>
        <div className="flex flex-wrap gap-4">
          <a href="/termeni-si-conditii" className="transition hover:text-white">
            Termeni și condiții
          </a>
          <a href="/politica-de-confidentialitate" className="transition hover:text-white">
            Politica de confidențialitate
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-black">{title}</h3>
      <ul className="mt-4 grid gap-3 text-sm text-cyan-50">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <a href={link.href} className="transition hover:text-[#5ce0ed]">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0a3956] sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>}
    </div>
  );
}
