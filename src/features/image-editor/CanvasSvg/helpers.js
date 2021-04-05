/**
 *
 * @param {SVGElement} svg
 * @return {Promise<string>}
 */
function svg2B64(svg) {
  return new Promise((resolve) => {
    const xml = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([xml], {type: "image/svg+xml;charset=utf-8"});
    const reader = new FileReader();
    reader.readAsDataURL(svgBlob);
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

/**
 *
 * @param {string} base64
 * @return {Promise<CanvasImageSource>}
 */
function b64ToImage(base64) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img), false);
    img.src = base64;
  })
}

/**
 *
 * @param {SVGElement} svg
 * @return {Promise<string>}
 */
export async function svg2Jpeg(svg) {
  const base64 = await svg2B64(svg);
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 250;
  const ctx = canvas.getContext('2d');
  const img = await b64ToImage(base64);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg');
}