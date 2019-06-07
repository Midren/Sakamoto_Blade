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

const loadImg = async src =>
  new Promise((res, rej) => {
    let img = new Image();
    img.addEventListener("load", () => {
      //TODO: handle errors
      res(img);
    });
    img.src = src;
  });

export const loadImages = async src => Promise.all(src.map(loadImg));

export const loadImgsAsKeyValue = async (path, imagesSrc) => {
  const imgs = await Promise.all(imagesSrc.map(src => path + src).map(loadImg));

  return imagesSrc.reduce((accum, key, index) => {
    accum[key] = imgs[index];
    return accum;
  }, {});
};

export const playerImagesSrc = [
  "0l.png",
  "atkL2.png",
  "atkR3.png",
  "l1.png",
  "l5.png",
  "r2.png",
  "r6.png",
  "0.png",
  "atkL3.png",
  "jl.png",
  "l2.png",
  "l6.png",
  "r3.png",
  "0r.png",
  "atkR1.png",
  "j.png",
  "l3.png",
  "Pistol.png",
  "r4.png",
  "atkL1.png",
  "atkR2.png",
  "jr.png",
  "l4.png",
  "r1.png",
  "r5.png"
];

export const blocksImagesSrc = [
  "img/blocks/platform.png",
  "img/blocks/lava.png",
  "img/blocks/water.png"
];

export const backgroundImagesSrc = Array(171)
  .fill(0)
  .map((val, i) => "frame_" + i.toString().padStart(3, "0") + ".png");
