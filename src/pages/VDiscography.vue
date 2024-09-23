<template>
  <section class="discography">
    <div class="albums">
      <VAlbum
        v-for="(album, index) in albums"
        :key="album.name"
        :album="album"
        display="spotify"
        :style="{
          '--index': index,
        }"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useHead } from '@unhead/vue';
import VAlbum from '~/components/VAlbum.vue';
import albums from '~/data/albums.json';

useHead({
  title: 'Discographie - Enalion',
  meta: [
    {
      name: 'description',
      content: `Écouter les derniers EPs et albums de Enalion`,
    },
    {
      name: 'og:title',
      content: 'Enalion - Discographie',
    },
    {
      name: 'og:description',
      content: `Écouter les derniers EPs et albums de Enalion`,
    },
  ],
});
</script>

<style lang="scss" scoped>
.discography {
  .albums {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
