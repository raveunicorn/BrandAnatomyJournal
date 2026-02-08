import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
    branch,

    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,

    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "src/assets",
            publicFolder: "",
        },
    },
    schema: {
        collections: [
            {
                name: "brand",
                label: "Seasons",
                path: "src/content/brands",
                format: "mdoc",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "image",
                        name: "cover",
                        label: "Cover Image",
                    },
                    {
                        type: "rich-text",
                        name: "description",
                        label: "Description",
                        isBody: true,
                    },
                ],
            },
            {
                name: "article",
                label: "Articles",
                path: "src/content/articles",
                format: "mdoc",
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: "reference",
                        name: "brand",
                        label: "Season",
                        collections: ["brand"],
                    },
                    {
                        type: "image",
                        name: "cover",
                        label: "Cover Image",
                    },
                    {
                        type: "string",
                        name: "excerpt",
                        label: "Excerpt",
                        ui: {
                            component: "textarea",
                        },
                    },
                    {
                        type: "datetime",
                        name: "date",
                        label: "Publish Date",
                    },
                    {
                        type: "rich-text",
                        name: "content",
                        label: "Content",
                        isBody: true,
                        templates: [
                            {
                                name: "HandCircle",
                                label: "Hand Circle",
                                inline: true,
                                fields: [
                                    {
                                        name: "content",
                                        label: "Text",
                                        type: "string",
                                        required: true,
                                    },
                                ],
                            },
                            {
                                name: "HandUnderline",
                                label: "Hand Underline",
                                inline: true,
                                fields: [
                                    {
                                        name: "content",
                                        label: "Text",
                                        type: "string",
                                        required: true,
                                    },
                                ],
                            },
                            {
                                name: "MarginNote",
                                label: "Margin Note",
                                inline: true,
                                fields: [
                                    {
                                        name: "note",
                                        label: "Note Text",
                                        type: "string",
                                        required: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
});
