<template>
  <nav class="titlebar">
    <div
      class="links"
      :class="{
        opened,
      }"
    >
      <RouterLink to="/" @click="opened = false">
        Accueil
      </RouterLink>
      <RouterLink to="/discography" @click="opened = false">
        Discographie
      </RouterLink>
      <RouterLink to="/concerts" @click="opened = false">
        Concerts
      </RouterLink>
      <VMenuDropdown @click="opened = false" />
      <RouterLink to="/contact" @click="opened = false">
        Contact
      </RouterLink>
    </div>

    <button
      @click="opened = !opened"
    >
      <iconify-icon
        icon="line-md:menu"
        title="Menu"
      />
    </button>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VMenuDropdown from './VMenuDropdown.vue';

const opened = ref(false);
</script>

<style lang="scss" scoped>
.titlebar {
  flex-grow: 0;
  position: sticky;
  top: 0rem;
  z-index: 100;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  backdrop-filter: blur(1rem);

  .links {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    z-index: 100;
    font-size: 1.2rem;

    :deep(a) {
      padding: 0.5rem;
      text-decoration: none;
    }
  }

  button {
    z-index: 10000;
    font-size: 2rem;
    border: none;
    background: transparent;
    color: var(--font-color);
    display: none;
    cursor: pointer;
  }
}

@media (max-width: 40rem) {
  .titlebar {
    padding-block-end: 0rem;

    // Needed for chromium browsers
    // https://stackoverflow.com/questions/60997948
    &:has(.links.opened) {
      backdrop-filter: none;
    }

    button {
      display: block;
    }

    .links {
      position: fixed;
      top: 0rem;
      left: 0rem;
      height: 100dvh;
      width: 100dvw;
      z-index: 1000;
      flex-direction: column;
      padding: 6rem 3rem;
      backdrop-filter: blur(1rem);
      transform: translateY(-1rem);
      opacity: 0;
      pointer-events: none;
      transition: 500ms ease-out;

      &.opened {
        opacity: 1;
        transform: translateY(0rem);
        pointer-events: all;
      }
    }
  }

  :global(html:has(nav .links.opened)) {
    overflow: hidden;
  }
}
</style>
