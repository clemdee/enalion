<template>
  <div class="member">
    <VImage
      class="image"
      :src="image"
      :alt="props.member.name"
    />

    <div class="content">
      <span class="name">{{ props.member.name }}</span>
      <span class="role">{{ props.member.role }}</span>
      <div class="description">
        {{ props.member.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VImage from '~/components/VImage.vue';

const props = defineProps<{
  member: Member
}>();

const resolveUrl = (path: string) => {
  return new URL(`/src/data/images/members/${path}`, import.meta.url).href;
};

const image = computed(() => resolveUrl(props.member.image));
</script>

<style lang="scss" scoped>
.member {
  // Cannot use css variables inside media queries, so using scss
  $--breakpoint-low: 50rem;
  $--breakpoint-high: 75rem;

  --delay: 500ms;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3rem;

  @media (max-width: $--breakpoint-low) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0rem;
    text-align: center;
  }

  .image {
    flex-shrink: 0;
    aspect-ratio: 3 / 4;
    width: min(18.75rem, 100%);
  }

  .content {
    margin: 2rem 0rem;

    .name {
      display: block;
      font-size: 1.5rem;
    }

    .role {
      display: block;
      color: #ddd;
      font-style: italic;
    }

    .description {
      margin-block-start: 2rem;
      text-align: justify;
    }
  }
}
</style>
