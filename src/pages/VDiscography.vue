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
import VAlbum from '~/components/VAlbum.vue';
import { useHead } from '~/composables/head';
import albums from '~/data/albums.json';

useHead({
  page: 'Discographie',
  description: `Écouter les derniers EPs et albums de Enalion`,
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
