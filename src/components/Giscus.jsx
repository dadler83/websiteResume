import GiscusWidget from '@giscus/react'

export default function Giscus({ term }) {
    return (
        <section className="giscus-wrapper">
            <GiscusWidget
                repo="dadler83/websiteResume"
                repoId="R_kgDOOiVddw"
                category="Blog Comments"
                categoryId="DIC_kwDOOiVdd84Cla0e"
                mapping="specific"
                term={term}
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="light"
                lang="en"
                loading="lazy"
            />
        </section>
    )
}
