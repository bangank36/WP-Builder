const schema = {
    type: "object",
    properties: {
      textControl: {
        type: "string",
        label: "Text Control Label",
        description: "Text Control displays a 'string' Control"
      },
      multilineTextControl: {
        type: "string",
        label: "Muliline Text Control Label",
        description: "Multiline Text Control displays a 'string' Control supports multiline"
      },
      colorPaletteControl: {
        type: "string",
        label: "Color Palette Control Label",
        description: "Color Picker with predefine palette"
      },
      booleanToggleControl: {
        type: "boolean",
        label: "Boolean Toggle Control Label",
        description: "Boolean Control with Toggle Renderer"
      },
      booleanCheckboxControl: {
        type: "boolean",
        label: "Boolean Checkbox Control Label",
        description: "Boolean Control with Checkbox Renderer"
      },
      _address: {
        type: 'object',
        properties: {
          _street_address: { type: 'string' },
        },
      },
    }
}

const uiSchema = {
    type: "VerticalLayout",
    elements: [
      {
        type: "Control",
        scope: "#/properties/textControl",
      },
      {
        type: "Control",
        scope: "#/properties/multilineTextControl",
        options: {
          multi: true,
        },
      },
      {
        type: "Control",
        scope: "#/properties/colorPaletteControl",
        options: {
          format: 'color',
          colors:[
            {
              color: '#f00',
              name: 'Red'
            },
            {
              color: '#fff',
              name: 'White'
            },
            {
              color: '#00f',
              name: 'Blue'
            }
          ]
        },
      },
      {
        type: "Control",
        scope: "#/properties/booleanToggleControl",
        options: {
          toggle: true
        }
      },
      {
        type: "Control",
        scope: "#/properties/booleanCheckboxControl",
      },
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/_address',
          },
        ]
      },
      {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/address',
          },
          {
            type: 'Control',
            scope: '#/properties/address/properties/user',
            options: {
              detail: {
                type: 'Group',
                label: 'User Data',
                elements: [
                  { type: 'Control', scope: '#/properties/address/properties/user/properties/name' },
                  {
                    type: 'Control',
                    scope: '#/properties/address/properties/user/properties/mail',
                  },
                ],
              },
            },
          },
        ],
      },
      {
        "type": "ListWithDetail",
        "scope": "#/properties/users",
        "options": {
          "detail": {
            "type": "VerticalLayout",
            "elements": [
              {
                "type": "HorizontalLayout",
                "elements": [
                  {
                    "type": "Control",
                    "scope": "#/properties/firstname",
                    "label": "First Name"
                  },
                  {
                    "type": "Control",
                    "scope": "#/properties/lastname",
                    "label": "Last Name"
                  }
                ]
              },
              {
                "type": "Control",
                "scope": "#/properties/age",
                "label": "Age"
              },
              {
                "type": "Control",
                "scope": "#/properties/email",
                "label": "Email"
              }
            ]
          }
        }
      }
    ],
  }