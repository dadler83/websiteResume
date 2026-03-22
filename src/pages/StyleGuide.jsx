import './StyleGuide.css'

export default function StyleGuide() {
    return (
        <div className="style-guide-container">
            <h1>Style Guide</h1>
            <p className="style-guide-intro">
                This page displays default typography and text element styles used across the site.
            </p>

            <section className="style-guide-section">
                <h2>Headings</h2>

                <div className="style-guide-item">
                    <span className="style-guide-label">h1</span>
                    <h1>The quick brown fox jumps over the lazy dog</h1>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">h2</span>
                    <h2>The quick brown fox jumps over the lazy dog</h2>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">h3</span>
                    <h3>The quick brown fox jumps over the lazy dog</h3>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">h4</span>
                    <h4>The quick brown fox jumps over the lazy dog</h4>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">h5</span>
                    <h5>The quick brown fox jumps over the lazy dog</h5>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">h6</span>
                    <h6>The quick brown fox jumps over the lazy dog</h6>
                </div>
            </section>

            <section className="style-guide-section">
                <h2>Paragraph Text</h2>

                <div className="style-guide-item">
                    <span className="style-guide-label">p</span>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus arcu leo,
                        id pellentesque dui eleifend ut. Sed at elit quis elit finibus vulputate in tempus
                        sapien. Cras rhoncus dolor ex, a hendrerit tortor volutpat id. Integer nec tristique
                        dui. Sed convallis semper nunc vitae finibus. Phasellus eu ligula tellus.
                    </p>
                    <p>
                        Sed eu vulputate risus, in auctor magna. In quis dui vel massa rutrum consectetur
                        sit amet id nulla. Proin in nibh ut leo tincidunt sollicitudin non in nisl. In
                        posuere, est ultrices condimentum commodo, ex turpis fringilla tortor, eget tempor
                        velit mauris sed ante. Sed et nisl vitae velit ultricies faucibus sit amet at magna.
                    </p>
                </div>
            </section>

            <section className="style-guide-section">
                <h2>Links</h2>

                <div className="style-guide-item">
                    <span className="style-guide-label">a</span>
                    <p>
                        This is an inline{' '}
                        <a href="#">example link</a>
                        {' '}within a paragraph of text. Here is another{' '}
                        <a href="#">standalone link</a>.
                    </p>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">a (block)</span>
                    <div>
                        <a href="#" className="style-guide-block-link">A standalone block-level link</a>
                    </div>
                </div>
            </section>

            <section className="style-guide-section">
                <h2>Inline Text Styles</h2>

                <div className="style-guide-item">
                    <span className="style-guide-label">strong</span>
                    <p><strong>Bold / strong text — Lorem ipsum dolor sit amet.</strong></p>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">em</span>
                    <p><em>Italic / emphasized text — Lorem ipsum dolor sit amet.</em></p>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">small</span>
                    <p><small>Small text — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">mark</span>
                    <p><mark>Highlighted text — Lorem ipsum dolor sit amet.</mark></p>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">del / ins</span>
                    <p>
                        <del>Deleted text</del> and <ins>inserted text</ins> side by side.
                    </p>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">code</span>
                    <p>Inline <code>code snippet</code> within a sentence.</p>
                </div>

                <div className="style-guide-item">
                    <span className="style-guide-label">blockquote</span>
                    <blockquote>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu ligula
                        tellus. Morbi ultrices pretium mi quis aliquet."
                    </blockquote>
                </div>
            </section>
        </div>
    )
}
