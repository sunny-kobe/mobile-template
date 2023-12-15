import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['flex-center', 'flex items-center justify-center'],
    ['m-0-auto', 'mx-auto my-0'],
    ['absolute-center-x', 'absolute left-1/2 transform -translate-x-1/2'],
    ['absolute-center-y', 'absolute top-1/2 transform -translate-y-1/2'],
    ['center', 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'],
    ['small-center', 'left-1/2 top-3/7 transform -translate-x-1/2 -translate-y-1/2'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
