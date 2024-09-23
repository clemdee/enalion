<template>
  <div
    ref="image"
    class="image"
    :class="{ loading }"
  >
    <img
      :src="src"
      :alt="props.alt ?? ''"
      @load="event => emits('load', event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue';

const props = defineProps<{
  src: string
  alt?: string
  lazy?: boolean
}>();

const emits = defineEmits<{
  load: [event: Event]
}>();

const image = useTemplateRef('image');

const src = ref(props.lazy ? '' : props.src);

const loading = computed(() => src.value === '');

onMounted(() => {
  if (!image.value)
    return;
  if (props.lazy) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          src.value = props.src;
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '500px',
      threshold: 0,
    });
    observer.observe(image.value);
  }
});
</script>

<style lang="scss" scoped>
.image {
  display: grid;
  place-items: center;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;

  background: var(--loading-background);
  animation: loading ease 2s infinite both;

  img {
    aspect-ratio: inherit;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 1s ease-in-out;

    &:hover {
      object-fit: cover;
      transform: scale(1.1);
    }
  }
}
</style>
