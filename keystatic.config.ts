import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'github',
        repo: 'raveunicorn/BrandAnatomyJournal',
    },

    ui: {
        brand: {
            name: 'BrandAnatomy Journal',
        },
    },

    collections: {
        brands: collection({
            label: 'Seasons',
            slugField: 'title',
            path: 'src/content/brands/*',
            format: { contentField: 'description' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                cover: fields.image({
                    label: 'Cover Image',
                    directory: 'src/assets/brands',
                    publicPath: '/src/assets/brands/',
                }),
                description: fields.markdoc({ label: 'Description' }),
            },
        }),

        articles: collection({
            label: 'Articles',
            slugField: 'title',
            path: 'src/content/articles/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                brand: fields.relationship({
                    label: 'Season',
                    collection: 'brands',
                }),
                cover: fields.image({
                    label: 'Cover Image',
                    directory: 'src/assets/articles',
                    publicPath: '/src/assets/articles/',
                }),
                excerpt: fields.text({
                    label: 'Excerpt',
                    multiline: true,
                }),
                date: fields.date({ label: 'Publish Date' }),
                content: fields.markdoc({
                    label: 'Content',
                    options: {
                        image: {
                            directory: 'src/assets/articles',
                            publicPath: '/src/assets/articles/',
                        },
                    },
                }),
            },
        }),
    },
});
