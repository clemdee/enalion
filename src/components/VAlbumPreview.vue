<template>
  <button
    class="album-preview"
    :class="{
      playing,
    }"
    @click="preview"
  >
    <div class="icon-wrapper">
      <iconify-icon
        v-if="!playing"
        icon="mdi:headphones"
        class="icon"
      />

      <svg
        v-else
        class="equalizer"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="12" width="4" height="8" fill="currentColor" transform-origin="4 20" transform="scale(1 0)">
          <animateTransform attributeName="transform" type="scale" values="1 0;1 1;1 0" begin="0s" dur="1s" fill="freeze" repeatCount="indefinite" />
        </rect>
        <rect x="10" y="4" width="4" height="16" fill="currentColor" transform-origin="10 20" transform="scale(1 0)">
          <animateTransform attributeName="transform" type="scale" values="1 0;1 1;1 0" begin="0.2s" dur="1s" fill="freeze" repeatCount="indefinite" />
        </rect>
        <rect x="16" y="9" width="4" height="11" fill="currentColor" transform-origin="16 20" transform="scale(1 0)">
          <animateTransform attributeName="transform" type="scale" values="1 0;1 1;1 0" begin="0.5s" dur="1s" fill="freeze" repeatCount="indefinite" />
        </rect>
      </svg>
    </div>

    <div class="title">
      Écouter un extrait
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { type Player, usePlayer } from '~/composables/player';
import { randomInt } from '~/composables/utils';

const props = defineProps<{
  id: string
}>();

const allPaths = import.meta.glob('/src/data/audio/discography/**', {
  query: '?url',
  import: 'default',
});

const basePath = computed(() => `/src/data/audio/discography/${props.id}/`);

const paths = computed(() => Object.keys(allPaths)
  .filter(path => path.startsWith(basePath.value)),
);

const player = ref<Player>();
const playing = ref(false);

onMounted(() => {
  player.value = usePlayer();
});

// Prevent the same audios to be played again soon after it was played
const lastPlayedLength = Math.min(5, paths.value.length - 1);
const lastPlayed = ref<string[]>([]);
const possiblePaths = computed(() => {
  return paths.value.filter(path => !lastPlayed.value.includes(path));
});

const getRandomPath = () => {
  const path = possiblePaths.value[randomInt(0, possiblePaths.value.length)];
  lastPlayed.value.push(path);
  if (lastPlayed.value.length > lastPlayedLength) {
    lastPlayed.value.shift();
  }
  return path;
};

const preview = () => {
  const path = getRandomPath();
  player.value?.set(path, playing);
  player.value?.play();
};

// const resolveUrl = (id: string) => {
//   return new URL(`/src/data/audio/discography/${id}`, import.meta.url).href;
// };
</script>

<style lang="scss" scoped>
.album-preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  width: 100%;
  height: 18rem;
  border: 0.08rem solid currentColor;
  border-radius: 1rem;
  font-family: 'Neucha';
  font-size: 1.4rem;
  color: #ccc;
  background-color: #222;
  cursor: pointer;
  transition: 400ms ease;

  .icon-wrapper {
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    padding: 1.5rem;
    border: 0.1rem solid #ccc;
    border-radius: 100vh;
    background-color: #222;
    transition: 400ms ease;

    iconify-icon,
    .equalizer {
      font-size: 4.5rem;
      color: #ccc;
      transition: 400ms ease;
    }
  }

  .title {
    padding: 0.8rem 1.8rem;
    border: 0.08rem solid currentColor;
    border-radius: 100vh;
    font-size: 1.3rem;
    font-style: italic;
    background-color: #222;
    transition: 400ms ease;
  }

  &:hover,
  &.playing {
    background-color: #252525;
    color: var(--font-color);

    .icon-wrapper {
      border-color: var(--font-color);

      iconify-icon,
      .equalizer {
        color: var(--font-color);
      }
    }
  }
}
</style>
