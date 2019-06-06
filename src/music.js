export const getSong = async (audioCtx, filepath) => await fetch(filepath)
    .then(val => val.arrayBuffer())
    .then(val => audioCtx.decodeAudioData(val));

export const playTrack = (audioCtx, audioBuffer) => {
    const trackSource = audioCtx.createBufferSource();
    trackSource.buffer = audioBuffer;
    trackSource.connect(audioCtx.destination);

    trackSource.start();

    return trackSource;
};

