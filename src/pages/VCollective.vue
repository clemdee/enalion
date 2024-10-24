<template>
  <section class="collective">
    <h2>
      Le collectif Enalion
    </h2>

    <article class="description">
      <p>
        Jeune collectif composé de 8 membres, Enalion a vu le jour en 2022 sous l'initiative d'un groupe d'amis voulant échanger leur passion commune pour la musique. Leur répertoire, mélant funk et jazz, en passant par la pop et le rock, a déjà reçu d'excellents retours de la part du public lors de leurs différents concerts.
      </p>

      <br />

      <p>
        Le groupe aspire aujourd'hui à franchir une nouvelle étape en composant leurs propres morceaux originaux, et prévoit la sortie de plusieurs de leur titres sous forme d'EPs et d'albums. Enalion partage également son ambiance conviviale sur
        <a
          href="https://instagram.com/enalion_music"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          ses réseaux
          <iconify-icon icon="mdi:external-link" />
        </a>,
        invitant les passionnés de musique à partager cette expérience avec eux.
      </p>

      <br />

      <p>
        <iconify-icon
          icon="line-md:map-marker-alt"
          title="Localisation"
        />
        Paris, Région Parisienne
      </p>
    </article>

    <article class="members-list">
      <VMember
        v-for="(member, index) in members"
        :key="member.name"
        :member="member"
        :style="{
          '--index': index,
        }"
      />
    </article>
  </section>
</template>

<script lang="ts" setup>
import { useHead } from '@unhead/vue';
import VMember from '~/components/VMember.vue';
import members from '~/data/members.json';

useHead({
  title: 'Membres - Enalion',
  meta: [
    {
      name: 'description',
      content: `Jeune collectif composé de 8 membres, Enalion a vu le jour en 2022 sous l'initiative d'un groupe d'amis voulant échanger leur passion commune pour la musique.`,
    },
    {
      name: 'og:title',
      content: 'Enalion - Membres',
    },
    {
      name: 'og:description',
      content: `Jeune collectif composé de 8 membres, Enalion a vu le jour en 2022 sous l'initiative d'un groupe d'amis voulant échanger leur passion commune pour la musique.`,
    },
  ],
});
</script>

<style lang="scss" scoped>
.collective {
  // Cannot use css variables inside media queries, so using scss
  $--breakpoint-low: 50rem;
  $--breakpoint-high: 75rem;

  h2 {
    font-size: 1.5rem;
    text-align: center;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    animation: fade-in ease 1s both;

    @media (max-width: $--breakpoint-low) {
      margin-bottom: 1.5rem;
    }
  }

  .description {
    max-width: $--breakpoint-high;
    text-align: justify;
    --animation-dy: -2rem;
    animation: slide-in ease-out 1.2s 0.5s both;

    iconify-icon {
      vertical-align: middle;
    }
  }

  .members-list {
    margin-top: 3rem;
    width: min(100%, $--breakpoint-low);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 5rem;

    @media (min-width: $--breakpoint-high) {
      width: min(100%, $--breakpoint-high);
    }

    .member {
      --delay: calc(pow(var(--index, 0), 0.8) * 400ms);
      --animation-dy: -4rem;
      animation: slide-in ease-out 1.2s both;
      animation-delay: calc(1.2s + var(--delay, 0s));

      @media (min-width: $--breakpoint-high) {
        &:nth-child(even) {
          flex-direction: row-reverse;
          text-align: right;
          text-align-last: end;
        }
      }
    }
  }
}
</style>
