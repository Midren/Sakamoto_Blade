export const clear = ctx =>
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

export const drawImage = (ctx, image, options = {}) => {
  const imgBbox = image;

  let {
    x = 0,
    y = 0,
    height = imgBbox.height,
    width = imgBbox.width
  } = options;

  ctx.drawImage(image, x, y, width, height);
};
