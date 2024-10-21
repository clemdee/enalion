<!-- TODO:  eslint-plugin-vue bug, remove when fixed -->
<!-- eslint-disable vue/no-unused-refs -->
<template>
  <section class="contact">
    <article class="coordinates">
      <p class="description">
        Pour toute demande de renseignements, de collaborations, ou de propositions de concert, n'hésitez pas à nous contacter :
      </p>

      <div class="items">
        <div ref="email" class="item email">
          <a href="#">
            <iconify-icon
              icon="line-md:email"
            />
            <em class="text" />
          </a>
        </div>

        <div ref="phone" class="item phone">
          <a href="#">
            <iconify-icon
              icon="line-md:phone"
            />
            <em class="text" />
          </a>
        </div>

        <div class="item instagram">
          <a
            href="https://instagram.com/enalion_music"
            target="_blank"
            rel="noopener noreferrer"
          >
            <iconify-icon
              icon="line-md:instagram"
              title="Instagram"
            />
            <em class="text">enalion_music</em>
          </a>
        </div>
      </div>
    </article>

    <article class="location">
      <p>
        <iconify-icon
          icon="line-md:map-marker-alt"
          title="Localisation"
        />
        Paris, Région Parisienne, possibilité de déplacement
      </p>
    </article>

    <article class="github">
      <a
        href="https://github.com/clemdee/enalion"
        target="_blank"
        rel="noopener noreferrer"
      >
        Reporter un problème de site
        <iconify-icon
          icon="mdi:github"
          title="Localisation"
        />
      </a>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { useHead } from '@unhead/vue';
import { onMounted, useTemplateRef } from 'vue';

useHead({
  title: 'Contact - Enalion',
  meta: [
    {
      name: 'description',
      content: `Pour toute demande de renseignements, de collaborations, ou de propositions de concert, n'hésitez pas à nous contacter`,
    },
    {
      name: 'og:title',
      content: 'Enalion - Contact',
    },
    {
      name: 'og:description',
      content: `Pour toute demande de renseignements, de collaborations, ou de propositions de concert, n'hésitez pas à nous contacter`,
    },
  ],
});

const emailElement = useTemplateRef('email');
const phoneElement = useTemplateRef('phone');

onMounted(() => {
  if (!emailElement.value)
    return;
  if (!phoneElement.value) return;
  // Prevent email scraping
  const domain = 'gmail.com';
  const name = 'ENALIONCONTACT';
  const email = `${name.toLowerCase()}@${domain}`;
  emailElement.value.querySelector('.text')!.textContent = email;
  emailElement.value.querySelector('a')?.setAttribute('href', `mailto:${email}`);
  emailElement.value.querySelector('iconify-icon')?.setAttribute('title', email);
  // Prevent phone scraping
  const numbersPart1 = '07 83 4';
  const numbersPart2 = '2 18 80';
  const phone = `${numbersPart1.toLowerCase()}${numbersPart2}`;
  phoneElement.value.querySelector('.text')!.textContent = phone;
  phoneElement.value.querySelector('a')?.setAttribute('href', `tel:${phone}`);
  phoneElement.value.querySelector('iconify-icon')?.setAttribute('title', phone);
});
</script>

<style lang="scss" scoped>
.contact {
  text-align: center;

  .coordinates {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 3rem;

    max-width: 40rem;

    .description {
      --animation-dy: -2rem;
      animation: slide-in ease-out 1.2s both;
    }
  }

  .items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;

    .item {
      &.email { --delay: 0ms; }
      &.phone { --delay: 300ms; }
      &.instagram { --delay: 600ms; }

      a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        --animation-dx: -3rem;
        animation: slide-in ease-out 1s calc(1s + var(--delay, 0s)) both;

        iconify-icon {
          font-size: 2rem;
        }
      }
    }
  }

  .location {
    margin-top: 1rem;
    max-width: 40rem;
    animation: fade-in ease-out 1.2s 2.5s both;
  }

  .github {
    position: fixed;
    inset-block-end: 1rem;
    inset-inline-end: 1rem;
    font-size: 1rem;
    animation: fade-in ease-out 1.2s 0s both;

    @media (max-width: 40rem) {
      font-size: 0.8rem;
    }

    a {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1ch;
      font-style: italic;
    }
  }
}
</style>
