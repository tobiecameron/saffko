export default {
  name: "workItem",
  title: "Work Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this item on the homepage",
      initialValue: false,
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
        },
      ],
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Brief description for previews",
    },
    {
      name: "client",
      title: "Client",
      type: "string",
    },
    {
      name: "completedAt",
      title: "Completed At",
      type: "date",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          fields: [
            {
              type: "text",
              name: "alt",
              title: "Alternative text",
              description: "Important for SEO and accessibility.",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      client: "client",
    },
    prepare({ title, media, client }: any) {
      return {
        title,
        subtitle: client ? `Client: ${client}` : "",
        media,
      }
    },
  },
}
