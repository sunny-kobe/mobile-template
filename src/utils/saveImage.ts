// import html2canvas from 'html2canvas'
// 自行选择是否使用
/**
 * 长按保存图片
 * @param element 选择器
 */
// export function saveImage(element: string): void {
//   const dialog: HTMLElement | null = document.querySelector(element)
//   if (dialog !== null) {
//     html2canvas(dialog, {
//       useCORS: true,
//       // logging: true,
//       allowTaint: true,
//     }).then((canvas: any) => {
//       const image = canvas.toDataURL('image/png')
//       downloadImage(image)
//     })
//   }
// }

// function downloadImage(dataUrl: string): void {
//   const a = document.createElement('a')
//   a.href = dataUrl
//   a.download = 'screenshot.png'
//   a.style.display = 'none'
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
// }
