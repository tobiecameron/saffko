export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Title that appears in search engines and browser tabs",
          validation: (Rule) => Rule.max(60).warning("Keep it under 60 characters for better SEO"),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "Description that appears in search engine results",
          validation: (Rule) => Rule.max(160).warning("Keep it under 160 characters for better SEO"),
        },
        {
          name: "openGraphImage",
          title: "Open Graph Image",
          type: "image",
          description: "Image that appears when sharing on social media",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
          ],
        },
      ],
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Full-width background image for the home page",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
        },
      ],
    },
    {
      name: "backgroundOverlay",
      title: "Background Overlay Settings",
      type: "object",
      fields: [
        {
          name: "overlayType",
          title: "Overlay Type",
          type: "string",
          options: {
            list: [
              { title: "None", value: "none" },
              { title: "Solid Color", value: "solid" },
              { title: "Gradient", value: "gradient" },
            ],
          },
          initialValue: "solid",
        },
        {
          name: "overlayColor",
          title: "Overlay Color",
          type: "string",
          options: {
            list: [
              { title: "Black", value: "black" },
              { title: "White", value: "white" },
              { title: "Blue", value: "blue-900" },
              { title: "Gray", value: "gray-900" },
              { title: "Amber", value: "amber-900" },
            ],
          },
          initialValue: "black",
          hidden: ({ parent }) => parent?.overlayType === "none",
        },
        {
          name: "overlayOpacity",
          title: "Overlay Opacity",
          type: "number",
          description: "Overlay opacity from 0 (transparent) to 100 (opaque)",
          validation: (Rule) => Rule.min(0).max(100),
          initialValue: 20,
          hidden: ({ parent }) => parent?.overlayType === "none",
        },
        {
          name: "gradientDirection",
          title: "Gradient Direction",
          type: "string",
          options: {
            list: [
              { title: "Top to Bottom", value: "to-b" },
              { title: "Bottom to Top", value: "to-t" },
              { title: "Left to Right", value: "to-r" },
              { title: "Right to Left", value: "to-l" },
              { title: "Top-Left to Bottom-Right", value: "to-br" },
              { title: "Top-Right to Bottom-Left", value: "to-bl" },
            ],
          },
          initialValue: "to-b",
          hidden: ({ parent }) => parent?.overlayType !== "gradient",
        },
        {
          name: "gradientStartOpacity",
          title: "Gradient Start Opacity",
          type: "number",
          description: "Starting opacity for gradient (0-100)",
          validation: (Rule) => Rule.min(0).max(100),
          initialValue: 30,
          hidden: ({ parent }) => parent?.overlayType !== "gradient",
        },
        {
          name: "gradientEndOpacity",
          title: "Gradient End Opacity",
          type: "number",
          description: "Ending opacity for gradient (0-100)",
          validation: (Rule) => Rule.min(0).max(100),
          initialValue: 60,
          hidden: ({ parent }) => parent?.overlayType !== "gradient",
        },
        {
          name: "imageOpacity",
          title: "Background Image Opacity",
          type: "number",
          description: "Background image opacity from 0 (invisible) to 100 (fully visible)",
          validation: (Rule) => Rule.min(0).max(100),
          initialValue: 95,
        },
      ],
    },
    {
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "subtitle",
          title: "Subtitle",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
      ],
    },
    {
      name: "contentSections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "textSection",
          title: "Text Section",
          fields: [
            {
              name: "heading",
              title: "Heading",
              type: "string",
            },
            {
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "backgroundColor",
              title: "Background Color",
              type: "string",
              options: {
                list: [
                  { title: "Transparent", value: "transparent" },
                  { title: "Black", value: "black" },
                  { title: "Gray 900", value: "gray-900" },
                  { title: "White", value: "white" },
                ],
              },
              initialValue: "transparent",
            },
            {
              name: "textColor",
              title: "Text Color",
              type: "string",
              options: {
                list: [
                  { title: "White", value: "white" },
                  { title: "Black", value: "black" },
                  { title: "Gray 400", value: "gray-400" },
                ],
              },
              initialValue: "white",
            },
          ],
        },
        {
          type: "object",
          name: "imageSection",
          title: "Image Section",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                },
              ],
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
            {
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "Small", value: "small" },
                  { title: "Medium", value: "medium" },
                  { title: "Large", value: "large" },
                  { title: "Full Width", value: "full" },
                ],
              },
              initialValue: "medium",
            },
          ],
        },
        {
          type: "object",
          name: "ctaSection",
          title: "Call to Action Section",
          fields: [
            {
              name: "heading",
              title: "Heading",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "buttons",
              title: "Buttons",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Button Text",
                      type: "string",
                    },
                    {
                      name: "url",
                      title: "URL",
                      type: "url",
                    },
                    {
                      name: "style",
                      title: "Button Style",
                      type: "string",
                      options: {
                        list: [
                          { title: "Primary", value: "primary" },
                          { title: "Secondary", value: "secondary" },
                          { title: "Outline", value: "outline" },
                        ],
                      },
                      initialValue: "primary",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "seo.metaTitle",
      media: "backgroundImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle ? `SEO: ${subtitle}` : "No SEO title set",
        media: media,
      }
    },
  },
}
