export const getSong = async (audioCtx, filepath) =>
  await fetch(filepath)
    .then(val => val.arrayBuffer())
    .then(val => audioCtx.decodeAudioData(val));

export const playTrack = (audioCtx, audioBuffer) => {
  const trackSource = audioCtx.createBufferSource();
  trackSource.buffer = audioBuffer;
  trackSource.connect(audioCtx.destination);
  trackSource.start();
  return trackSource;
};
export const backGroundAnimation = (ctx, backgroundImg, background, counter) =>
  setInterval(
    ((ctx, backgroundImg) => {
      background.image = backgroundImg[counter.n];
      counter.n = ++counter.n % Object.keys(backgroundImg).length;
    }).bind(null, ctx, backgroundImg, counter),
    100
  );

const loadImg = async src =>
  new Promise((res, rej) => {
    let img = new Image();
    let timer = setTimeout(() => rej(new Error("Timeout")), 10000);

    img.addEventListener("load", () => {
      clearTimeout(timer);
      res(img);
    });
    img.src = src;
  });

export const loadImages = async src => Promise.all(src.map(loadImg));

export const loadImgsAsKeyValue = async imagesSrc => {
  const imgs = await Promise.all(imagesSrc.map(loadImg));

  return imagesSrc.reduce((accum, key, index) => {
    accum[key] = imgs[index];
    return accum;
  }, {});
};

export const playerImagesSrc = [
  "img/player/0l.png",
  "img/player/atkL2.png",
  "img/player/atkR3.png",
  "img/player/l1.png",
  "img/player/l5.png",
  "img/player/r2.png",
  "img/player/r6.png",
  "img/player/0.png",
  "img/player/atkL3.png",
  "img/player/jl.png",
  "img/player/l2.png",
  "img/player/l6.png",
  "img/player/r3.png",
  "img/player/0r.png",
  "img/player/atkR1.png",
  "img/player/j.png",
  "img/player/l3.png",
  "img/player/Pistol.png",
  "img/player/r4.png",
  "img/player/atkL1.png",
  "img/player/atkR2.png",
  "img/player/jr.png",
  "img/player/l4.png",
  "img/player/r1.png",
  "img/player/r5.png"
];

export const blocksImagesSrc = [
  "img/blocks/platform.png",
  "img/blocks/lava.png",
  "img/blocks/water.png"
];

export const backgroundImagesSrc = Array(171)
  .fill(0)
  .map(
    (val, i) => "img/background/frame_" + i.toString().padStart(3, "0") + ".png"
  );
