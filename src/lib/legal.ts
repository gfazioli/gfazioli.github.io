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

export type LegalDoc = "legal" | "privacy" | "goodies";

/** Each document's path below the language prefix. */
const DOC_PATH: Record<LegalDoc, string> = {
  legal: "legal",
  privacy: "privacy",
  goodies: "goodies/terms",
};

export function legalPath(doc: LegalDoc, lang: Lang): string {
  return lang === "it" ? `/it/${DOC_PATH[doc]}/` : `/${DOC_PATH[doc]}/`;
}

/**
 * The paid Goodies packs. Only `live` packs appear on /goodies/terms/: flip a
 * pack's flag when its shop opens. `licence` is the address of its licence
 * page, with the scheme.
 */
export interface GoodiesPack {
  name: string;
  licence: string;
  live: boolean;
}

export const GOODIES_PACKS: GoodiesPack[] = [
  { name: "Netfox Goodies", licence: "https://netfox.app/goodies/licence", live: true },
  { name: "FinderGit Goodies", licence: "https://findergit.app/goodies/licence", live: false },
];

function liveLicenceItems(note?: string): LegalLink[] {
  return GOODIES_PACKS.filter((pack) => pack.live).map((pack) => ({
    text: `${pack.name}: ${pack.licence.replace(/^https?:\/\//, "")}`,
    href: pack.licence,
    note,
  }));
}

/** A list item that is a link; `note` follows the link, outside it. */
export interface LegalLink {
  text: string;
  href: string;
  note?: string;
}

/** One block of a legal page: a heading, then paragraphs or a list. */
export interface LegalSection {
  heading?: string;
  paragraphs?: string[];
  items?: (string | LegalLink)[];
  /** Set the items as they are, without bolding a lead up to the first ':' or '.'. */
  plainItems?: boolean;
}

export interface LegalContent {
  title: string;
  description: string;
  updated?: string;
  sections: LegalSection[];
}

const vat = `IT${LEGAL.vatNumber}`;

export const LEGAL_CONTENT: Record<LegalDoc, Record<Lang, LegalContent>> = {
  goodies: {
    en: {
      title: "Goodies terms",
      description:
        "The terms of sale for Undolog's paid Goodies packs: each pack comes with its own licence, linked here.",
      updated: "Last updated: 11 November 2026",
      sections: [
        {
          paragraphs: [
            "The Goodies are small paid packs of extras for the Mac apps made by Giovambattista Fazioli (Undolog): screen savers, wallpapers, video-call backgrounds and emoji. Every purchase helps keep the apps free. This page is the terms link shown at checkout: by buying a pack you accept the licence of that pack.",
          ],
        },
        {
          heading: "The licence of each pack",
          items: liveLicenceItems(),
        },
        {
          paragraphs: [
            "The same licence is in the pack you download, as License.txt. If this page and a pack's licence ever differ, the licence wins.",
          ],
        },
        {
          heading: "What every licence says, in short",
          plainItems: true,
          items: [
            "You may use everything in the pack on the computers and devices you own or control, for your personal use or your own work, and keep backup copies.",
            "You may not sell, share or redistribute the files, include them in a product or service, use them as a logo or brand, or use them to train an artificial-intelligence model.",
            "The pack is licensed, not sold, and the licence is personal: it cannot be transferred.",
            "The pack is provided as is. Nothing limits the rights you have as a consumer in the country where you live.",
          ],
        },
        {
          heading: "Payment, receipt and refunds",
          paragraphs: [
            "The packs are sold through Link, Stripe's merchant of record, which handles the payment, the tax, your receipt and any refund on our behalf. After paying you land on your download page: keep its link, it always serves the latest version of the pack.",
          ],
        },
        {
          heading: "Law and contact",
          paragraphs: [
            "The licences are governed by Italian law. If you are a consumer, you keep the protection of the mandatory rules of the country where you live.",
            `Who sells the packs is in the legal notice. Questions: ${LEGAL.email}.`,
          ],
          items: [{ text: "Legal notice", href: legalPath("legal", "en") }],
        },
      ],
    },
    it: {
      title: "Termini dei Goodies",
      description:
        "I termini di vendita dei pacchetti Goodies a pagamento di Undolog: ogni pacchetto ha la sua licenza, collegata qui.",
      updated: "Ultimo aggiornamento: 11 novembre 2026",
      sections: [
        {
          paragraphs: [
            "I Goodies sono piccoli pacchetti a pagamento di extra per le app Mac di Giovambattista Fazioli (Undolog): salvaschermo, sfondi, sfondi per videochiamate ed emoji. Ogni acquisto aiuta a mantenere gratuite le app. Questa pagina è il link ai termini mostrato al checkout: acquistando un pacchetto accetti la licenza di quel pacchetto.",
          ],
        },
        {
          heading: "La licenza di ogni pacchetto",
          items: liveLicenceItems("(in inglese)"),
        },
        {
          paragraphs: [
            "La stessa licenza è nel pacchetto che scarichi, come License.txt. Se questa pagina e la licenza di un pacchetto dovessero differire, vale la licenza.",
          ],
        },
        {
          heading: "Cosa dice ogni licenza, in breve",
          plainItems: true,
          items: [
            "Puoi usare tutto il contenuto del pacchetto sui computer e i dispositivi che possiedi o controlli, per uso personale o per il tuo lavoro, e tenerne copie di backup.",
            "Non puoi vendere, condividere o ridistribuire i file, includerli in un prodotto o servizio, usarli come logo o marchio, né usarli per addestrare un modello di intelligenza artificiale.",
            "Il pacchetto è concesso in licenza, non venduto, e la licenza è personale: non può essere trasferita.",
            "Il pacchetto è fornito così com'è. Nulla limita i diritti che hai come consumatore nel paese in cui vivi.",
          ],
        },
        {
          heading: "Pagamento, ricevuta e rimborsi",
          paragraphs: [
            "I pacchetti sono venduti tramite Link, il merchant of record di Stripe, che gestisce per nostro conto il pagamento, le imposte, la ricevuta e gli eventuali rimborsi. Dopo il pagamento arrivi alla tua pagina di download: conservane il link, serve sempre l'ultima versione del pacchetto.",
          ],
        },
        {
          heading: "Legge applicabile e contatti",
          paragraphs: [
            "Le licenze sono regolate dalla legge italiana. Se sei un consumatore, conservi la tutela delle norme inderogabili del paese in cui vivi.",
            `Chi vende i pacchetti è indicato nelle note legali. Domande: ${LEGAL.email}.`,
          ],
          items: [{ text: "Note legali", href: legalPath("legal", "it") }],
        },
      ],
    },
  },
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
      updated: "Last updated: 8 October 2026",
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
            `Email. If you write to ${LEGAL.email}, we use your address and message only to answer you, and keep them no longer than the conversation needs.`,
          ],
        },
        {
          heading: "Links to other services",
          paragraphs: [
            "The projects' own sites, GitHub, npm, LinkedIn, X, Discord, GitHub Sponsors and Stripe are separate services. If you use them, their own privacy policies apply.",
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
      updated: "Ultimo aggiornamento: 8 ottobre 2026",
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
            `Email. Se scrivi a ${LEGAL.email}, usiamo il tuo indirizzo e il messaggio solo per risponderti, e li conserviamo solo per il tempo che serve alla conversazione.`,
          ],
        },
        {
          heading: "Link ad altri servizi",
          paragraphs: [
            "I siti dei singoli progetti, GitHub, npm, LinkedIn, X, Discord, GitHub Sponsors e Stripe sono servizi separati. Se li usi, valgono le loro privacy policy.",
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
