import type { Language, TranslationData } from "@/data/translations"
import { articles, articleUrl, formatArticleDate } from "@/data/articles"
import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"
import { ArrowLeft, ArrowRight, BookOpen, Clock3, Sparkles } from "lucide-react"

interface ArticlesProps {
  lang: Language
  t: TranslationData
}

export function Articles({ lang, t }: ArticlesProps) {
  return (
    <section id="articles" className="relative py-24 scroll-mt-20">
      <div className="pointer-events-none absolute start-1/4 top-1/3 h-96 w-96 rounded-full bg-foreground/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <BlurFade delay={0.05} yOffset={8}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.06] px-3.5 py-1 text-xs font-semibold text-foreground/80">
              <BookOpen className="h-3.5 w-3.5 text-foreground/80" />
              <span>{t.articles.badge}</span>
            </div>
          </BlurFade>

          <BlurFade delay={0.1} yOffset={10}>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t.articles.title}
            </h2>
          </BlurFade>

          <BlurFade delay={0.15} yOffset={10}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.articles.subtitle}
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => (
            <BlurFade
              key={article.slug}
              delay={0.08 + index * 0.06}
              yOffset={16}
              className="h-full"
            >
              <a
                href={articleUrl(article.slug, lang)}
                className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                <MagicCard className="h-full rounded-3xl p-6 sm:p-7">
                  <div className="mb-5 flex flex-wrap items-center gap-2.5">
                    <span className="rounded-full border border-foreground/15 bg-foreground/[0.06] px-3 py-1 text-[11px] font-bold text-foreground/80">
                      {lang === "ar" ? article.category.ar : article.category.en}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock3 className="h-3 w-3" />
                      {article.readMinutes} {t.articles.minutesRead}
                    </span>
                  </div>

                  <h3 className="mb-2 text-lg font-bold leading-snug text-foreground group-hover:underline decoration-foreground/30 underline-offset-4">
                    {lang === "ar" ? article.title.ar : article.title.en}
                  </h3>

                  <p className="mb-6 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {lang === "ar" ? article.excerpt.ar : article.excerpt.en}
                  </p>

                  <div className="flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-[11px] text-muted-foreground">
                      {formatArticleDate(article.date, lang)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground">
                      {t.articles.readArticle}
                      {lang === "ar" ? (
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                  </div>
                </MagicCard>
              </a>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.4} yOffset={10} className="mt-10 text-center">
          <a
            href={lang === "en" ? "/articles/en/" : "/articles/"}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.05] px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-foreground/[0.1]"
          >
            <Sparkles className="h-3.5 w-3.5 text-foreground/70" />
            {t.articles.viewAll}
          </a>
        </BlurFade>
      </div>
    </section>
  )
}
