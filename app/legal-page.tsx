import Link from "next/link";
import { Waves } from "lucide-react";

type LegalSection = {
  title: string;
  body: string[];
};

export function LegalPage({
  eyebrow,
  title,
  updatedAt,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-[#f6fafb] text-[#13233f]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="KAYAK Nistru acasă">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a3956] text-white">
              <Waves className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-black uppercase text-[#0a3956]">
                KAYAK <span className="text-[#0994a8]">Nistru</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                satul Pîrîta
              </span>
            </span>
          </Link>
          <Link
            href="/#rezervare"
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#0994a8] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#087d8f]"
          >
            Rezervă
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0994a8]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#0a3956] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm font-bold text-slate-500">
            Ultima actualizare: {updatedAt}
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            {intro}
          </p>

          <div className="mt-8 grid gap-5">
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="rounded-lg border border-slate-200 bg-[#f8fcfd] p-5"
              >
                <h2 className="text-xl font-black text-[#0a3956]">
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-4 grid gap-3 text-base leading-7 text-slate-700">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-cyan-50 p-5 text-sm font-semibold leading-6 text-[#0a6573]">
            Aceste pagini sunt texte generale pregătite pentru website-ul KAYAK
            Nistru. Pentru situații juridice speciale, contracte cu companii sau
            modificări ale modelului de business, textul trebuie verificat de un
            jurist.
          </div>
        </div>
      </article>
    </main>
  );
}
