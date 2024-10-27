<template>
  <section class="home">
    <h1 id="enalion">
      <img
        :src="Logo"
        alt="Enalion"
      />
    </h1>

    <article class="description">
      <p>
        <em>Enalion</em> est un collectif de musiciens enjoués, explorant principalement des styles musicaux tels que le rock, le funk, et le jazz.
      </p>
    </article>

    <article class="socials">
      <div class="links">
        <a
          href="https://instagram.com/enalion_music"
          target="_blank"
          rel="noopener noreferrer"
        >
          <iconify-icon
            icon="line-md:instagram"
            title="Instagram"
          />
        </a>
        <!--
        <a href="#">
          <iconify-icon
            icon="line-md:twitter-x"
            title="X / Twitter"
          />
        </a>
        -->
        <!--
        <a href="#">
          <iconify-icon
            icon="line-md:facebook"
            title="Facebook"
          />
        </a>
        -->
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <iconify-icon
            icon="line-md:spotify"
            title="Spotify"
          />
        </a>
        <a
          href="https://youtube.com/@EnalionMusic"
          target="_blank"
          rel="noopener noreferrer"
        >
          <iconify-icon
            icon="line-md:youtube"
            title="Youtube"
          />
        </a>
        <a
          href="https://soundcloud.com/Enalion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <iconify-icon
            icon="line-md:soundcloud"
            title="Soundcloud"
          />
        </a>
      </div>
    </article>
  </section>
</template>

<script lang="ts" setup>
import type { IconifyIconHTMLElement } from 'iconify-icon';
import { onMounted } from 'vue';
import Logo from '~/assets/images/logo.png?inline';
import { useHead } from '~/composables/head';
import { wait } from '~/composables/utils';

useHead({
  title: 'Enalion - Collectif musical',
  description: `Enalion est un collectif de musiciens enjoués, explorant principalement des styles musicaux tels que le rock, le funk, et le jazz.`,
});

onMounted(() => {
  // All social icons on page
  const icons = [...document.querySelectorAll<IconifyIconHTMLElement>('.socials a iconify-icon')];

  // Wait before showing icons
  const iconAnimationBaseDelay = 2300;
  icons.forEach(async (icon, index) => {
    icon.style.setProperty('opacity', '0');
    await wait(iconAnimationBaseDelay + (index * 300));
    icon.restartAnimation();
    icon.style.removeProperty('opacity');
  });

  // Replay icons animation on hover
  icons.forEach((icon) => {
    icon.addEventListener('mouseenter', () => {
      icon.restartAnimation();
    });
  });
});
</script>

<style lang="scss" scoped>
.home {
  h1 {
    width: min(30rem, 100%);
    --animation-dy: -4rem;
    animation: slide-in ease-out 1.5s both;

    img {
      width: 100%;
    }
  }

  .description {
    max-width: 40rem;
    text-align: center;
    --animation-dy: -2rem;
    animation: slide-in ease-out 1.2s 1.2s both;
  }

  .socials {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .links {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      gap: 2rem;

      a iconify-icon {
        font-size: 3rem;
      }

      a:hover iconify-icon {
        color: var(--accent-color);
      }
    }
  }
}
</style>
