import type { Ref } from 'vue';

export interface Player {
  set: (path: string, playing: Ref<boolean>) => void
  play: () => void
  pause: () => void
  toggle: () => void
};

let globalPlayer: Player;

const createPlayer = (): Player => {
  const audioElement = document.createElement('audio');
  let _playing: Ref<boolean>;
  let _path = '';

  const play = () => {
    audioElement.play();
    if (_playing) {
      _playing.value = true;
    }
  };

  const pause = () => {
    audioElement.pause();
    if (_playing) {
      _playing.value = false;
    }
  };

  const toggle = () => {
    if (!audioElement.paused) {
      pause();
    }
    else {
      play();
    }
  };

  const set = (path: string, playing: Ref<boolean>) => {
    if (_path === path) return;
    pause();
    _playing = playing;
    _path = path;
    audioElement.src = _path;
  };

  audioElement.addEventListener('ended', () => {
    pause();
  });

  return {
    set,
    play,
    pause,
    toggle,
  };
};

export const usePlayer = (): Player => {
  if (!globalPlayer) {
    globalPlayer = createPlayer();
  }
  return globalPlayer;
};
