export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    {
      name: "general",
      title: "General Settings",
    },
    {
      name: "seo",
      title: "SEO & Metadata",
    },
    {
      name: "branding",
      title: "Branding",
    },
  ],
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
      group: "general",
      description: "The main title of your site (appears in browser tabs)",
    },
    {
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 2,
      group: "seo",
      description: "General description of your site (used for SEO and social sharing)",
      validation: (Rule) =>
        Rule.max(160).warning("Descriptions longer than 160 characters may be truncated by search engines"),
    },
    {
      name: "metadata",
      title: "Metadata Settings",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title Override",
          type: "string",
          description: "Optional: Override the default title for SEO (if different from site title)",
        },
        {
          name: "ogTitle",
          title: "Open Graph Title",
          type: "string",
          description: "Title used when sharing on social media (defaults to site title if empty)",
        },
        {
          name: "ogDescription",
          title: "Open Graph Description",
          type: "text",
          rows: 2,
          description: "Description used when sharing on social media (defaults to site description if empty)",
        },
        {
          name: "ogType",
          title: "Open Graph Type",
          type: "string",
          options: {
            list: [
              { title: "Website", value: "website" },
              { title: "Article", value: "article" },
              { title: "Profile", value: "profile" },
            ],
          },
          initialValue: "website",
          description: "The type of content you're sharing",
        },
        {
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Image displayed when sharing on social media (recommended size: 1200x630)",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
        {
          name: "twitterCard",
          title: "Twitter Card Type",
          type: "string",
          options: {
            list: [
              { title: "Summary", value: "summary" },
              { title: "Summary with Large Image", value: "summary_large_image" },
            ],
          },
          initialValue: "summary_large_image",
          description: "How your content appears when shared on Twitter",
        },
        {
          name: "twitterTitle",
          title: "Twitter Title",
          type: "string",
          description: "Optional: Specific title for Twitter (defaults to Open Graph title if empty)",
        },
        {
          name: "twitterDescription",
          title: "Twitter Description",
          type: "text",
          rows: 2,
          description: "Optional: Specific description for Twitter (defaults to Open Graph description if empty)",
        },
        {
          name: "twitterImage",
          title: "Twitter Image",
          type: "image",
          description: "Optional: Specific image for Twitter (defaults to Open Graph image if empty)",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
          ],
        },
        {
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
          description: "Optional: Specify the canonical URL if this content exists in multiple locations",
        },
      ],
    },
    {
      name: "logo",
      title: "Logo",
      type: "object",
      group: "branding",
      fields: [
        {
          name: "logoType",
          title: "Logo Type",
          type: "string",
          options: {
            list: [
              { title: "SVG File", value: "svg" },
              { title: "Image", value: "image" },
            ],
          },
          initialValue: "image",
          description: "Choose whether to use an SVG file or an image for your logo",
        },
        {
          name: "svgFile",
          title: "SVG Logo",
          type: "file",
          description: "Upload your SVG logo file",
          options: {
            accept: "image/svg+xml",
          },
          hidden: ({ parent }) => parent?.logoType !== "svg",
        },
        {
          name: "imageFile",
          title: "Logo Image",
          type: "image",
          description: "Upload your logo image (PNG, JPG, etc.)",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Alternative text for the logo",
            },
          ],
          hidden: ({ parent }) => parent?.logoType !== "image",
        },
        {
          name: "width",
          title: "Width (px)",
          type: "number",
          validation: (Rule) => Rule.positive(),
          initialValue: 200,
          description: "Display width of the logo",
        },
        {
          name: "height",
          title: "Height (px)",
          type: "number",
          validation: (Rule) => Rule.positive(),
          initialValue: 200,
          description: "Display height of the logo",
        },
      ],
    },
    {
      name: "logoText",
      title: "Logo Text",
      type: "string",
      group: "branding",
      description: "Text to display below the logo",
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "object",
      group: "branding",
      description: "Upload favicon files for the site",
      fields: [
        {
          name: "mainIcon",
          title: "Main Favicon",
          type: "image",
          description: "Upload a square image (at least 32x32px, preferably 512x512px)",
          options: {
            accept: "image/png,image/jpeg,image/svg+xml",
          },
        },
        {
          name: "appleTouchIcon",
          title: "Apple Touch Icon",
          type: "image",
          description: "Optional: Upload a square image for Apple devices (180x180px)",
          options: {
            accept: "image/png",
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
      }
    },
  },
}
