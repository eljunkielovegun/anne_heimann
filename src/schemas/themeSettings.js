// /schemas/themeSettings.js

export const themeSettings = {
    name: 'themeSettings',
    title: 'Theme Settings',
    type: 'document',
    fields: [
      // 🎨 Color Fields
      {
        name: 'backgroundColor',
        title: 'Background Color',
        type: 'color',
        options: { disableAlpha: true },
        description: 'The background color for the site or sections.'
      },
      {
        name: 'textColor',
        title: 'Text Color',
        type: 'color',
        options: { disableAlpha: true },
        description: 'The main color used for body text across the site.'
      },
      {
        name: 'primaryColor',
        title: 'Primary Brand Color',
        type: 'color',
        options: { disableAlpha: true },
        description: 'Used for buttons, links, and other brand elements.'
      },
      {
        name: 'secondaryColor',
        title: 'Secondary Accent Color',
        type: 'color',
        options: { disableAlpha: true },
        description: 'An optional accent for hover states, highlights, or outlines.'
      },
      {
        name: 'surfaceColor',
        title: 'Surface Color',
        type: 'color',
        description: 'Used for cards, section backgrounds, or soft overlays.'
      },
  
      // 🔠 Font Pairing
      {
        name: 'fontPair',
        title: 'Font Pairing',
        type: 'string',
        description: 'Choose a professional font pairing for your site.',
        options: {
          list: [
            { title: 'Quicksand + Open Sans', value: 'quicksand_open-sans' },
            { title: 'Playfair Display + Lato', value: 'playfair-lato' },
            { title: 'Montserrat + Roboto', value: 'montserrat-roboto' },
            { title: 'Poppins + Source Sans Pro', value: 'poppins-source-sans' },
            { title: 'Raleway + Roboto', value: 'raleway-roboto' },
            { title: 'Merriweather + Lato', value: 'merriweather-lato' },
            { title: 'Libre Baskerville + Open Sans', value: 'libre-open-sans' },
            { title: 'DM Serif Display + Nunito Sans', value: 'dm-serif-nunito' },
            { title: 'Work Sans + Noto Sans', value: 'work-noto' },
            { title: 'Fira Sans + Georgia', value: 'fira-georgia' },
          ]
        }
      },
  
      // Optional: Font Weights
      {
        name: 'headingWeight',
        title: 'Heading Font Weight',
        type: 'string',
        description: 'Font weight for headings (e.g. 700 for bold)',
        initialValue: '700'
      },
      {
        name: 'bodyWeight',
        title: 'Body Font Weight',
        type: 'string',
        description: 'Font weight for body text (e.g. 400 for regular)',
        initialValue: '400'
      }
    ]
  };
  
  export default themeSettings;
  