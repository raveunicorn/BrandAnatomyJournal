import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const brands = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/brands' }),
    schema: z.object({
        title: z.string(),
        cover: z.string().optional(),
        description: z.string().optional(),
    }),
});

const articles = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/articles' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        brand: z.string().optional(),
        cover: image().optional(),
        excerpt: z.string().optional(),
        date: z.coerce.date().optional(),
    }),
});

export const collections = { brands, articles };
