export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Page Title",
      type: "string",
      description: "Internal title for this page (not displayed on site)",
      initialValue: "Home Page",
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
          description: "Text to display below the logo",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          description: "Additional description text",
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
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "H2", value: "h2" },
                    { title: "H3", value: "h3" },
                    { title: "Quote", value: "blockquote" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Strong", value: "strong" },
                      { title: "Emphasis", value: "em" },
                    ],
                    annotations: [
                      {
                        title: "URL",
                        name: "link",
                        type: "object",
                        fields: [
                          {
                            title: "URL",
                            name: "href",
                            type: "url",
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: "backgroundColor",
              title: "Background Color",
              type: "string",
              options: {
                list: [
                  { title: "Transparent", value: "transparent" },
                  { title: "Black", value: "black" },
                  { title: "Dark Gray", value: "gray-900" },
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
                  { title: "Gray", value: "gray-400" },
                ],
              },
              initialValue: "white",
            },
          ],
          preview: {
            select: {
              title: "heading",
              content: "content",
            },
            prepare({ title, content }) {
              const block = (content || []).find((block: any) => block._type === "block")
              return {
                title: title || "Text Section",
                subtitle: block
                  ? block.children
                      ?.filter((child: any) => child._type === "span")
                      ?.map((span: any) => span.text)
                      ?.join("")
                      ?.substring(0, 100) + "..."
                  : "No content",
              }
            },
          },
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
                  title: "Alt Text",
                  type: "string",
                  description: "Important for SEO and accessibility",
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
              title: "Image Size",
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
          preview: {
            select: {
              media: "image",
              title: "caption",
            },
            prepare({ media, title }) {
              return {
                title: title || "Image Section",
                media,
              }
            },
          },
        },
        {
          type: "object",
          name: "ctaSection",
          title: "Call to Action",
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
              rows: 2,
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
          preview: {
            select: {
              title: "heading",
              description: "description",
            },
            prepare({ title, description }) {
              return {
                title: title || "Call to Action",
                subtitle: description,
              }
            },
          },
        },
      ],
    },
    {
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Title for search engines (leave empty to use site title)",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 2,
          description: "Description for search engines",
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      }
    },
  },
}
