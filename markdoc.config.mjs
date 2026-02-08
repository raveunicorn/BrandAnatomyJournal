import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
    tags: {
        // Inline components with children
        HandCircle: {
            render: component('./src/components/markdoc/HandCircleMarkdoc.astro'),
            attributes: {
                content: { type: String },
            },
        },
        HandUnderline: {
            render: component('./src/components/markdoc/HandUnderlineMarkdoc.astro'),
            attributes: {
                content: { type: String },
            },
        },
        // Block component (no children)
        MarginNote: {
            render: component('./src/components/markdoc/MarginNoteMarkdoc.astro'),
            attributes: {
                note: { type: String, required: true },
            },
        },
    },
});
