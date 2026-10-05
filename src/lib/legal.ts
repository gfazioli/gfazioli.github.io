import type { Lang } from "@/lib/i18n/dictionaries";

/**
 * Who publishes the site, as Italian law asks every VAT-registered owner to
 * say: the VAT number on the home page (art. 35 DPR 633/72), and name, contact
 * and VAT number reachable from every page (art. 7 D.Lgs. 70/2003). The
 * footer's last line reads these, and so do /legal/ and /privacy/. The same
 * values as the app sites' `config.legal` (findergit.app, netfox.app, …).
 */
export const LEGAL = {
  brand: "Undolog",
  owner: "Giovambattista Fazioli",
  vatNumber: "12343751009",
  email: "hello@undolog.com",
} as const;

export type LegalDoc = "legal" | "privacy";

export function legalPath(doc: LegalDoc, lang: Lang): string {
  return lang === "it" ? `/it/${doc}/` : `/${doc}/`;
}

/** One block of a legal page: a heading, then paragraphs or a list. */
export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalContent {
  title: string;
  description: string;
  updated?: string;
  sections: LegalSection[];
}

const vat = `IT${LEGAL.vatNumber}`;

export const LEGAL_CONTENT: Record<LegalDoc, Record<Lang, LegalContent>> = {
  legal: {
    en: {
      title: "Legal notice",
      description:
        "Who publishes this site: Giovambattista Fazioli (Undolog), an independent software developer in Italy, with VAT number and contact.",
      sections: [
        {
          paragraphs: [
            `This site is made and published by ${LEGAL.owner}, an independent software developer based in Italy, under the name ${LEGAL.brand}.`,
          ],
        },
        {
          items: [
            `Publisher: ${LEGAL.owner} (${LEGAL.brand})`,
            "Country: Italy",
            `VAT number (Partita IVA): ${vat}`,
            `Email: ${LEGAL.email}`,
          ],
        },
        {
          paragraphs: [
            "How this site handles personal data is described in the privacy policy.",
          ],
        },
      ],
    },
    it: {
      title: "Note legali",
      description:
        "Chi pubblica questo sito: Giovambattista Fazioli (Undolog), sviluppatore software indipendente in Italia, con partita IVA e contatto.",
      sections: [
        {
          paragraphs: [
            `Questo sito è realizzato e pubblicato da ${LEGAL.owner}, sviluppatore software indipendente in Italia, con il nome ${LEGAL.brand}.`,
          ],
        },
        {
          items: [
            `Titolare: ${LEGAL.owner} (${LEGAL.brand})`,
            "Paese: Italia",
            `Partita IVA: ${vat}`,
            `Email: ${LEGAL.email}`,
          ],
        },
        {
          paragraphs: ["Come questo sito tratta i dati personali è descritto nella privacy policy."],
        },
      ],
    },
  },
  privacy: {
    en: {
      title: "Privacy policy",
      description:
        "How gfazioli.github.io handles personal data: no cookies, no accounts, cookie-free visit statistics, and what the services behind it see.",
      updated: "Last updated: 5 October 2026",
      sections: [
        {
          paragraphs: [
            "The short version: this site sets no cookies, has no accounts and no forms, and does not follow you across other sites.",
          ],
        },
        {
          heading: "Who is responsible",
          paragraphs: [
            `The data controller is ${LEGAL.owner} (${LEGAL.brand}), an independent software developer in Italy, VAT number ${vat}. Write to ${LEGAL.email} about anything on this page.`,
          ],
        },
        {
          heading: "What the site processes",
          items: [
            "Visit statistics. Visits are counted with Cloudflare Web Analytics, which uses no cookies and builds no profile of you: pages viewed, the referring site, country, and browser or device type, in aggregate. Its script is loaded from Cloudflare, which therefore sees your IP address.",
            "Hosting. The site is served by GitHub Pages. Like any host, GitHub processes your IP address and the details of each request to deliver the pages and keep them secure. We have no access to those logs; GitHub keeps them under its own privacy statement.",
            "Sponsor pictures. The sponsors' pictures are loaded from GitHub, which therefore sees your IP address.",
            "Your browser's storage. The site remembers your language choice in your browser's local storage, and, for a moment while you switch language, where you were on the page. None of it is sent to us.",
            `Email. If you write to ${LEGAL.email}, we use your address and message only to answer you.`,
          ],
        },
        {
          heading: "Links to other services",
          paragraphs: [
            "The projects' own sites, GitHub, npm, LinkedIn, X, GitHub Sponsors and Stripe are separate services. If you use them, their own privacy policies apply.",
          ],
        },
        {
          heading: "Why, and your rights",
          paragraphs: [
            "We process the little personal data described here to run and protect the site and to understand which pages help: our legitimate interest, met without cookies or profiles. The hosting and analytics providers may process it outside the European Union, including in the United States: the providers rely on the EU–US Data Privacy Framework or on the European Commission's standard contractual clauses, and we will tell you which on request.",
            `Under the GDPR you can ask to access, correct or delete your personal data, to restrict or object to its processing, and to receive it in a portable format: write to ${LEGAL.email}. You can also lodge a complaint with the Italian data protection authority, the Garante per la protezione dei dati personali (garanteprivacy.it).`,
          ],
        },
      ],
    },
    it: {
      title: "Privacy policy",
      description:
        "Come gfazioli.github.io tratta i dati personali: nessun cookie, nessun account, statistiche senza cookie, e cosa vedono i servizi che lo ospitano.",
      updated: "Ultimo aggiornamento: 5 ottobre 2026",
      sections: [
        {
          paragraphs: [
            "In breve: questo sito non usa cookie, non ha account né moduli, e non ti segue su altri siti.",
          ],
        },
        {
          heading: "Chi è il titolare",
          paragraphs: [
            `Il titolare del trattamento è ${LEGAL.owner} (${LEGAL.brand}), sviluppatore software indipendente in Italia, partita IVA ${vat}. Per qualsiasi domanda su questa pagina scrivi a ${LEGAL.email}.`,
          ],
        },
        {
          heading: "Cosa tratta il sito",
          items: [
            "Statistiche di visita. Le visite sono contate con Cloudflare Web Analytics, che non usa cookie e non costruisce profili: pagine viste, sito di provenienza, paese e tipo di browser o dispositivo, in forma aggregata. Il suo script è caricato da Cloudflare, che quindi vede il tuo indirizzo IP.",
            "Hosting. Il sito è servito da GitHub Pages. Come qualunque hosting, GitHub tratta il tuo indirizzo IP e i dettagli di ogni richiesta per consegnare le pagine e mantenerle sicure. Noi non abbiamo accesso a questi log; GitHub li conserva secondo la propria informativa privacy.",
            "Immagini degli sponsor. Le immagini degli sponsor sono caricate da GitHub, che quindi vede il tuo indirizzo IP.",
            "Memoria del browser. Il sito ricorda la lingua scelta nella memoria locale del tuo browser e, per un attimo mentre cambi lingua, il punto della pagina in cui eri. Niente di tutto questo ci viene inviato.",
            `Email. Se scrivi a ${LEGAL.email}, usiamo il tuo indirizzo e il messaggio solo per risponderti.`,
          ],
        },
        {
          heading: "Link ad altri servizi",
          paragraphs: [
            "I siti dei singoli progetti, GitHub, npm, LinkedIn, X, GitHub Sponsors e Stripe sono servizi separati. Se li usi, valgono le loro privacy policy.",
          ],
        },
        {
          heading: "Perché, e i tuoi diritti",
          paragraphs: [
            "Trattiamo i pochi dati personali descritti qui per far funzionare e proteggere il sito e per capire quali pagine sono utili: un nostro legittimo interesse, perseguito senza cookie né profili. I fornitori di hosting e di statistiche possono trattarli fuori dall'Unione europea, anche negli Stati Uniti: i fornitori si basano sull'EU–US Data Privacy Framework o sulle clausole contrattuali standard della Commissione europea, e su richiesta ti diciamo quale.",
            `In base al GDPR puoi chiedere di accedere ai tuoi dati personali, rettificarli o cancellarli, limitarne il trattamento od opporti, e riceverli in un formato portabile: scrivi a ${LEGAL.email}. Puoi anche proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).`,
          ],
        },
      ],
    },
  },
};
