<template>
  <section class="gallery">
    <h2 id="gallery">
      Gallerie photo
    </h2>

    <article class="grid">
      <ClientOnly>
        <VImage
          v-for="id in images"
          :key="id"
          class="image"
          :src="resolveUrl(id)"
          :alt="id"
          :lazy="true"
          @load="imageLoadedHandler"
        />
      </ClientOnly>
    </article>
  </section>
</template>

<script lang="ts" setup>
import images from 'virtual:ls?path=/src/data/images/gallery';
import VImage from '~/components/VImage.vue';
import { useHead } from '~/composables/head';

useHead({
  page: 'Gallerie',
  description: `Gallerie photo d'Enalion`,
});

const resolveUrl = (id: string) => {
  return new URL(`/src/data/images/gallery/${id}?format=webp&effort=max`, import.meta.url).href;
};

const imageLoadedHandler = (event: Event) => {
  const image = event.currentTarget as HTMLImageElement;
  if (!image)
    return;
  if (image.naturalWidth > image.naturalHeight) {
    image.classList.add('wide');
  }
  else {
    image.classList.add('tall');
    if (Math.random() < 0.2) {
      image.classList.add('huge');
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery {
  h2 {
    font-size: 1.5rem;
    text-align: center;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    animation: fade-in ease 1s both;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 15rem);
    grid-auto-rows: minmax(20rem, auto);
    grid-auto-flow: row dense;
    justify-content: center;
    place-items: center;
    gap: 3rem;
    width: min(100%, 75rem);

    @media (max-width: 40rem) {
      grid-template-columns: 1fr;
      width: min(100%, 20rem);
    }

    @media (min-width: 40rem) {
      :deep(.image:has(img.wide)) {
        grid-column: span 2;
      }
    }

    @media (min-width: 75rem) {
      :deep(.image:has(img.huge)) {
        grid-column: span 2;
        grid-row: span 2;
      }
    }
  }
}
</style>
