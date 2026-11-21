import raw from "./articles.json"
import type { Language } from "./translations"

export interface ArticleBlock {
  type: "p" | "h2" | "list" | "quote"
  text?: string
  items?: string[]
}

export interface LocalizedText {
  ar: string
  en: string
}

export interface Article {
  slug: string
  date: string
  category: LocalizedText
  readMinutes: number
  keywords: LocalizedText
  title: LocalizedText
  excerpt: LocalizedText
  images: Array<{
    src: string
    alt: LocalizedText
    caption: LocalizedText
  }>
  body: { ar: ArticleBlock[]; en: ArticleBlock[] }
}

export const articles = raw as Article[]

export function articleUrl(slug: string, lang: Language = "ar"): string {
  return lang === "en" ? `/articles/en/${slug}/` : `/articles/${slug}/`
}

export function formatArticleDate(date: string, lang: Language): string {
  const [year, month, day] = date.split("-").map(Number)
  const monthsAr = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ]
  const monthsEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]
  return lang === "ar"
    ? `${day} ${monthsAr[month - 1]} ${year}`
    : `${monthsEn[month - 1]} ${day}, ${year}`
}
