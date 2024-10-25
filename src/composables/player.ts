import { onMounted, onUnmounted, ref, type Ref } from 'vue';

export interface Player {
  play: () => void
  pause: () => void
  toggle: () => void
};

let _audioElement: HTMLAudioElement;
let _playing: Ref<boolean>;
let _path = '';

// Cannot use document.createElement directly because of SSG
// It has to be used after onMounted
const resolveAudioElement = () => {
  if (!_audioElement) {
    _audioElement = document.createElement('audio');

    _audioElement.addEventListener('ended', () => {
      // eslint-disable-next-line ts/no-use-before-define
      _pause();
    });
  }
};

const _play = () => {
  _audioElement?.play();
  if (_playing) {
    _playing.value = true;
  }
};

const _pause = () => {
  _audioElement?.pause();
  if (_playing) {
    _playing.value = false;
  }
};

const _toggle = () => {
  if (!_audioElement?.paused) {
    _pause();
  }
  else {
    _play();
  }
};

const createPlayer = (
  path: string | (() => string),
  playing: Ref<boolean>,
): Player => {
  // Resolve audio element if it has not been created yet
  resolveAudioElement();

  const resolvePath = () => {
    if (typeof path === 'function') {
      return path();
    }
    return path;
  };

  const update = () => {
    const resolvedPath = resolvePath();
    if (_path === resolvedPath) return;
    _pause();
    if (!resolvedPath) return;
    _playing = playing;
    _path = resolvedPath;
    _audioElement.src = _path;
  };

  return {
    play: () => {
      update();
      _play();
    },

    pause: () => {
      _pause();
    },

    toggle: () => {
      update();
      _toggle();
    },
  };
};

export const usePlayer = (path: string | (() => string)) => {
  const player = ref<Player>();
  const playing = ref(false);

  onMounted(() => {
    player.value = createPlayer(path, playing);
  });

  onUnmounted(() => {
    player.value?.pause();
  });

  return {
    player,
    playing,
  };
};
