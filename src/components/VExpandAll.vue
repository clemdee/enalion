<template>
  <button
    class="expand-all"
    :class="[mode]"
    @click="handleClick"
  >
    <iconify-icon
      class="arrow"
      icon="line-md:chevron-small-down"
    />
    <span v-if="mode === 'expand'">Tout déplier</span>
    <span v-else>Tout replier</span>
    <iconify-icon
      class="arrow"
      icon="line-md:chevron-small-down"
    />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const opened = defineModel<boolean[]>({
  default: [],
});

const mode = computed(() => {
  return opened.value.includes(true)
    ? 'collapse'
    : 'expand';
});

const handleClick = () => {
  const newOpened = (mode.value === 'expand');
  opened.value.forEach((_, index) => opened.value[index] = newOpened);
};
</script>

<style lang="scss" scoped>
.expand-all {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.2rem;

  padding: 0.5rem;
  border: none;
  color: currentColor;
  font-size: 1rem;
  background: transparent;
  opacity: 0.7;
  transition: opacity ease 800ms;
  cursor: pointer;

  .arrow {
    transition: translate ease 800ms;
  }

  &:hover {
    opacity: 1;

    .arrow {
      translate: 0rem -0.1rem;
    }
  }
}
</style>
