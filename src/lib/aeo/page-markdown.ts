import { FAQ_BILLING_COMPANY_ITEMS, FAQ_PAGE_ITEMS } from "@/lib/content/faq-page";
import { GLOSSARY_LEAD, GLOSSARY_TERMS } from "@/lib/content/glossary";
import { HERO, PATH_DETAILS, THESIS } from "@/lib/content/homepage";
import {
  HOW_IT_WORKS_HERO,
  HOW_IT_WORKS_HOW_TO_STEPS,
  SUBMISSION_REQUIREMENTS,
  SYDRA_ELEMENTS,
} from "@/lib/content/how-it-works-page";
import { IDR_FILING_DEADLINE_HERO, IDR_FILING_DEADLINE_WINDOWS } from "@/lib/content/idr-filing-deadline-page";
import {
  IDR_FOR_BILLING_HERO,
  IDR_FOR_BILLING_SECTIONS,
} from "@/lib/content/idr-for-billing-companies-page";
import {
  IDR_FOR_CONTINGENCY_HERO,
  IDR_FOR_CONTINGENCY_SECTIONS,
} from "@/lib/content/idr-for-contingency-firms-page";
import {
  IDR_RECOVERY_CALCULATOR_FAQS,
  IDR_RECOVERY_CALCULATOR_HERO,
  IDR_RECOVERY_CALCULATOR_SECTIONS,
} from "@/lib/content/idr-recovery-calculator-page";
import { IN_HOUSE_IDR_HERO, IN_HOUSE_IDR_SECTIONS } from "@/lib/content/in-house-idr-page";
import { getArticleBySlug } from "@/lib/content/resources/articles";
import { getUpdateBySlug } from "@/lib/content/resources/updates";
import { SECURITY_HERO } from "@/lib/content/security-page";
import { HOW_IT_WORKS_FAQ, PRICING_FAQ, SECURITY_FAQ } from "@/lib/content/service-faqs";
import {
  OPTIONS_COMPARISON_COLUMNS,
  OPTIONS_COMPARISON_ROWS,
  OPTIONS_COMPARED_SECTIONS,
  SYDRA_VS_ATTORNEY_FAQS,
  SYDRA_VS_ATTORNEY_HERO,
} from "@/lib/content/sydra-vs-attorney-page";
import { PRICING_QUALITATIVE_LINE, PRICING_SECTION_HEADLINE, TIERS } from "@/lib/content/tiers";
import { WHAT_IS_IDR_FAQS, WHAT_IS_IDR_HERO, WHAT_IS_IDR_SECTIONS } from "@/lib/content/what-is-idr-page";
import { getComparison } from "@/lib/idr/comparisons";
import { getGuide, GUIDES } from "@/lib/idr/guides";
import {
  h1Specialty,
  h1State,
  IDR_HUB_FAQS,
  specialtyHubFaqs,
  specialtyPainLabel,
  stateHubFaqsPain,
} from "@/lib/idr/pain-content";
import { getStatePathway } from "@/lib/idr/state-pathways";
import {
  getSpecialtyMeta,
  getStateName,
  stateCodeFromSlug,
} from "@/lib/idr/taxonomy";
import { HOMEPAGE_FAQ_SCHEMA } from "@/lib/seo/json-ld";
import { PAGE_METADATA } from "@/lib/seo/metadata";
import { hasMarkdownTwin } from "@/lib/aeo/markdown-paths";

type Faq = { q: string; a: string };
type Section = { title?: string; heading?: string; paragraphs: string[]; list?: string[] };

function desc(meta: { description?: string | null }): string {
  return typeof meta.description === "string" ? meta.description : "";
}

function mdDocument(title: string, summary: string, body: string): string {
  return `# ${title}\n\n> ${summary}\n\n${body.trim()}\n`;
}

function faqBlock(items: Faq[]): string {
  if (items.length === 0) return "";
  return [
    "## FAQ",
    ...items.flatMap((item) => [`### ${item.q}`, item.a]),
  ].join("\n\n");
}

function sectionBlock(section: Section): string {
  const heading = section.title ?? section.heading ?? "";
  const parts = [`## ${heading.replace(/\.$/, "")}`, ...section.paragraphs];
  if (section.list?.length) {
    parts.push(section.list.map((item) => `- ${item}`).join("\n"));
  }
  return parts.join("\n\n");
}

function homepageMarkdown(): string {
  const paths = PATH_DETAILS.map((d) => `## ${d.heading.replace(/\?$/, "")}\n\n${d.body}`).join(
    "\n\n",
  );
  return mdDocument(
    "Sydra",
    `${HERO.kicker}. ${HERO.h1} ${HERO.subhead}`,
    [
      `## ${THESIS.heading}`,
      THESIS.body,
      paths,
      faqBlock(HOMEPAGE_FAQ_SCHEMA),
    ].join("\n\n"),
  );
}

function whatIsIdrMarkdown(): string {
  return mdDocument(
    WHAT_IS_IDR_HERO.title,
    WHAT_IS_IDR_HERO.subtitle,
    [
      ...WHAT_IS_IDR_HERO.paragraphs,
      ...WHAT_IS_IDR_SECTIONS.map(sectionBlock),
      faqBlock(WHAT_IS_IDR_FAQS),
    ].join("\n\n"),
  );
}

function howItWorksMarkdown(): string {
  return mdDocument(
    HOW_IT_WORKS_HERO.title,
    HOW_IT_WORKS_HERO.subtitle,
    [
      ...HOW_IT_WORKS_HERO.paragraphs,
      sectionBlock(SUBMISSION_REQUIREMENTS),
      ...SYDRA_ELEMENTS.map(sectionBlock),
      "## Steps",
      HOW_IT_WORKS_HOW_TO_STEPS.map((step, i) => `${i + 1}. **${step.name}.** ${step.text}`).join(
        "\n",
      ),
      faqBlock(HOW_IT_WORKS_FAQ),
    ].join("\n\n"),
  );
}

function pricingMarkdown(): string {
  const tiers = TIERS.map(
    (tier) =>
      `## ${tier.name}\n\n${tier.tagline}\n\nBest for: ${tier.bestFor}\n\n${tier.inclusions.map((item) => `- ${item}`).join("\n")}`,
  ).join("\n\n");
  return mdDocument(
    "Sydra pricing",
    desc(PAGE_METADATA.pricing),
    [`## ${PRICING_SECTION_HEADLINE}`, PRICING_QUALITATIVE_LINE, tiers, faqBlock(PRICING_FAQ)].join(
      "\n\n",
    ),
  );
}

function faqMarkdown(): string {
  return mdDocument(
    "Sydra FAQ",
    desc(PAGE_METADATA.faq),
    [faqBlock(FAQ_PAGE_ITEMS), faqBlock(FAQ_BILLING_COMPANY_ITEMS)].join("\n\n"),
  );
}

function glossaryMarkdown(): string {
  const terms = GLOSSARY_TERMS.map(
    (term) => `## ${term.term}\n\n${term.definition}`,
  ).join("\n\n");
  return mdDocument("Federal IDR glossary", GLOSSARY_LEAD, terms);
}

function securityMarkdown(): string {
  return mdDocument(SECURITY_HERO.title, SECURITY_HERO.intro, faqBlock(SECURITY_FAQ));
}

function sydraVsMarkdown(): string {
  const table = [
    `| | ${OPTIONS_COMPARISON_COLUMNS.join(" | ")} |`,
    `| --- | ${OPTIONS_COMPARISON_COLUMNS.map(() => "---").join(" | ")} |`,
    ...OPTIONS_COMPARISON_ROWS.map(
      (row) => `| ${row.feature} | ${row.values.join(" | ")} |`,
    ),
  ].join("\n");
  return mdDocument(
    SYDRA_VS_ATTORNEY_HERO.title,
    SYDRA_VS_ATTORNEY_HERO.lead,
    [
      table,
      ...OPTIONS_COMPARED_SECTIONS.map((section) =>
        sectionBlock({ title: section.title, paragraphs: [...section.paragraphs] }),
      ),
      faqBlock([...SYDRA_VS_ATTORNEY_FAQS]),
    ].join("\n\n"),
  );
}

function metaOnly(title: string, summary: string, extra = ""): string {
  return mdDocument(title, summary, extra);
}

function specialtyMarkdown(slug: string): string | null {
  const meta = getSpecialtyMeta(slug);
  if (!meta) return null;
  const painLabel = specialtyPainLabel(meta.slug);
  return mdDocument(
    h1Specialty(painLabel),
    meta.blurb,
    faqBlock(specialtyHubFaqs(meta.name, painLabel)),
  );
}

function stateMarkdown(stateParam: string): string | null {
  const code = stateCodeFromSlug(stateParam);
  const name = code ? getStateName(code) : null;
  if (!code || !name) return null;
  const pathway = getStatePathway(code);
  const lead = pathway
    ? `In ${pathway.name}, the pathway for out of network surgical disputes is documented on this page.`
    : `Federal IDR for out of network surgical claims in ${name}.`;
  return mdDocument(h1State(name), lead, faqBlock(stateHubFaqsPain(code, name)));
}

export function markdownForHtmlPath(htmlPath: string): string | null {
  const path = htmlPath === "" ? "/" : htmlPath.replace(/\/$/, "") || "/";
  if (!hasMarkdownTwin(path)) return null;

  switch (path) {
    case "/":
      return homepageMarkdown();
    case "/what-is-idr":
      return whatIsIdrMarkdown();
    case "/how-it-works":
      return howItWorksMarkdown();
    case "/pricing":
      return pricingMarkdown();
    case "/faq":
      return faqMarkdown();
    case "/glossary":
      return glossaryMarkdown();
    case "/security":
      return securityMarkdown();
    case "/about":
      return metaOnly("About Sydra", desc(PAGE_METADATA.about));
    case "/contact":
      return metaOnly("Contact Sydra", desc(PAGE_METADATA.contact));
    case "/case-review":
      return metaOnly("Free NSA IDR claim review", desc(PAGE_METADATA.caseReview));
    case "/demo":
      return metaOnly("Set up a 15-minute federal IDR call", desc(PAGE_METADATA.demo));
    case "/schedule":
      return metaOnly("Book a Sydra demo", desc(PAGE_METADATA.schedule));
    case "/roadmap":
      return metaOnly("Sydra product roadmap", desc(PAGE_METADATA.roadmap));
    case "/privacy":
      return metaOnly("Sydra privacy policy", desc(PAGE_METADATA.privacy));
    case "/terms":
      return metaOnly("Sydra terms of use", desc(PAGE_METADATA.terms));
    case "/do-not-sell":
      return metaOnly("Do not sell or share my personal information", desc(PAGE_METADATA.doNotSell));
    case "/sydra-vs-idr-attorney":
      return sydraVsMarkdown();
    case "/in-house-idr":
      return mdDocument(
        IN_HOUSE_IDR_HERO.title,
        IN_HOUSE_IDR_HERO.lead,
        IN_HOUSE_IDR_SECTIONS.map(sectionBlock).join("\n\n"),
      );
    case "/idr-for-billing-companies":
      return mdDocument(
        IDR_FOR_BILLING_HERO.title,
        IDR_FOR_BILLING_HERO.lead,
        IDR_FOR_BILLING_SECTIONS.map(sectionBlock).join("\n\n"),
      );
    case "/idr-for-contingency-firms":
      return mdDocument(
        IDR_FOR_CONTINGENCY_HERO.title,
        IDR_FOR_CONTINGENCY_HERO.lead,
        IDR_FOR_CONTINGENCY_SECTIONS.map(sectionBlock).join("\n\n"),
      );
    case "/idr-filing-deadline":
      return mdDocument(
        IDR_FILING_DEADLINE_HERO.title,
        IDR_FILING_DEADLINE_HERO.paragraphs[0] ?? "",
        [
          ...IDR_FILING_DEADLINE_HERO.paragraphs.slice(1),
          ...IDR_FILING_DEADLINE_WINDOWS.map(
            (w) => `## ${w.title}\n\n${w.duration}. ${w.detail}`,
          ),
        ].join("\n\n"),
      );
    case "/idr-recovery-calculator":
      return mdDocument(
        IDR_RECOVERY_CALCULATOR_HERO.title,
        IDR_RECOVERY_CALCULATOR_HERO.lead,
        [
          ...IDR_RECOVERY_CALCULATOR_SECTIONS.map(sectionBlock),
          faqBlock(IDR_RECOVERY_CALCULATOR_FAQS),
        ].join("\n\n"),
      );
    case "/idr":
      return mdDocument(
        "Federal IDR for out of network surgical claims",
        "Payment benchmarks, eligibility, and dispute outcomes for surgical out of network claims under the No Surprises Act.",
        faqBlock(IDR_HUB_FAQS),
      );
    case "/idr/guide":
      return mdDocument(
        "Federal IDR guides",
        "How the federal IDR process works for out of network surgical claims.",
        GUIDES.map((g) => `- [${g.title}](/idr/guide/${g.slug}.md): ${g.metaDescription}`).join(
          "\n",
        ),
      );
    case "/resources":
      return metaOnly("Resources", desc(PAGE_METADATA.resources));
    case "/resources/updates":
      return metaOnly("Federal IDR and NSA updates", desc(PAGE_METADATA.resourcesUpdates));
    default:
      break;
  }

  const guideMatch = path.match(/^\/idr\/guide\/([^/]+)$/);
  if (guideMatch?.[1]) {
    const guide = getGuide(guideMatch[1]);
    if (!guide) return null;
    return mdDocument(
      guide.title,
      guide.lead,
      [...guide.sections.map(sectionBlock), faqBlock(guide.faqs)].join("\n\n"),
    );
  }

  const compareMatch = path.match(/^\/compare\/([^/]+)$/);
  if (compareMatch?.[1]) {
    const comparison = getComparison(compareMatch[1]);
    if (!comparison) return null;
    const rows = comparison.rows
      .map((row) => `| ${row.label} | ${row.sydra} | ${row.other} |`)
      .join("\n");
    return mdDocument(
      comparison.title,
      comparison.lead,
      [
        `| | Sydra | ${comparison.alternative} |`,
        `| --- | --- | --- |`,
        rows,
        faqBlock(comparison.faqs),
      ].join("\n\n"),
    );
  }

  const articleMatch = path.match(/^\/resources\/(?!updates(?:\/|$))([^/]+)$/);
  if (articleMatch?.[1]) {
    const article = getArticleBySlug(articleMatch[1]);
    if (!article) return null;
    return mdDocument(
      article.title,
      article.lead,
      [...article.sections.map(sectionBlock), faqBlock(article.faqs)].join("\n\n"),
    );
  }

  const updateMatch = path.match(/^\/resources\/updates\/([^/]+)$/);
  if (updateMatch?.[1]) {
    const update = getUpdateBySlug(updateMatch[1]);
    if (!update) return null;
    return mdDocument(
      update.title,
      update.lead,
      update.sections.map(sectionBlock).join("\n\n"),
    );
  }

  const specialtyMatch = path.match(/^\/idr\/specialty\/([^/]+)$/);
  if (specialtyMatch?.[1]) return specialtyMarkdown(specialtyMatch[1]);

  const stateMatch = path.match(/^\/idr\/state\/([^/]+)$/);
  if (stateMatch?.[1]) return stateMarkdown(stateMatch[1]);

  return null;
}
