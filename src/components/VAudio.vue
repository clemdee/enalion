<template>
  <ClientOnly>
    <button
      class="audio"
      :name="playing ? 'pause' : 'play'"
      @click="toggle"
    >
      <div class="audio-icon">
        <iconify-icon
          v-if="!playing"
          icon="line-md:play"
        />

        <iconify-icon
          v-else
          icon="line-md:pause"
        />
      </div>

      <div class="title">
        <span>
          {{ title }}
        </span>
      </div>
    </button>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { usePlayer } from '~/composables/player';

const props = defineProps<{
  name: string
  title?: string
}>();

const resolveUrl = (path: string) => {
  return new URL(`/src/data/audio/reference/${path}`, import.meta.url).href;
};

const path = computed(() => resolveUrl(props.name));
const title = computed(() => props.title ?? props.name);

const { player, playing } = usePlayer(path.value);

const toggle = () => {
  player.value?.toggle();
};
</script>

<style lang="scss" scoped>
.audio {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;

  width: fit-content;
  max-width: 100%;
  border: 0.1rem solid currentColor;
  padding: 0.8rem 1.5rem;
  border-radius: 100vh;
  backdrop-filter: blur(1rem);

  color: #aaa;
  font-size: 1.2rem;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #ffffff1f;
  }

  .audio-icon {
    aspect-ratio: 1;
    padding: 0.3rem;
    margin: -0.5rem;
    margin-inline-start: -1rem;
    border: 0.1rem solid currentColor;
    border-radius: 100vh;
    color: currentColor;
    font-size: 1.3rem;
    line-height: 0rem;
  }

  .title {
    font-style: italic;
    text-align: start;
  }
}
</style>
