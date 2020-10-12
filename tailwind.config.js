module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    fontFamily: {
      graphik: ['Graphik', 'sans-serif'],
      proxima: ['Proxima Nova', 'sans-serif']
    },
    extend: {
      container: {
        center: true
      },
      colors: {
        bluegray: {
          '100': '#F0F4F8',
          '200': '#D9E2EC',
          '300': '#BCCCDC',
          '400': '#9FB3C8',
          '500': '#829AB1',
          '600': '#627D98',
          '700': '#486581',
          '800': '#334E68',
          '900': '#243B53',
          '1000': '#102A43',
        }
      }
    },
  },
  variants: {},
  plugins: [],
}
