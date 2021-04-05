// create the image with a src of the base64 string
/**
 *
 * @param url
 * @returns {Promise<HTMLImageElement>}
 */
const createImage = (url) => new Promise((resolve, reject) => {
  const image = new Image()
  image.addEventListener('load', () => resolve(image))
  image.addEventListener('error', error => reject(error))
  image.setAttribute('crossOrigin', 'anonymous')
  image.src = url
})

export const getCroppedImg = async (originalResolution, imageSrc, crop) => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  /* setting canvas width & height allows us to
  resize from the original image resolution */
  canvas.width = originalResolution.width
  canvas.height = originalResolution.height

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height
  )
  return canvas.toDataURL('image/jpeg');
}

export const gcd = (a, b) => (b === 0) ? a : gcd(b, a % b);
