import GiscusWidget from '@giscus/react'

export default function Giscus({ term }) {
    return (
        <section className="giscus-wrapper">
            <GiscusWidget
                repo="dadler83/websiteResume"
                repoId="R_kgDOQ-A-uA"
                category="Announcements"
                categoryId="DIC_kwDOQ-A-uM4C6tDq"
                mapping="specific"
                strict="0"
                term={term}
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme="preferred_color_scheme"
                lang="en"
                loading="lazy"
            />
        </section>
    )
}
