export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "object",
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
      description: "Text to display below the logo",
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "object",
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
