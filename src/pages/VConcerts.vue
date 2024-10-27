<template>
  <section class="concerts">
    <article class="concerts-type concerts-upcoming">
      <h2 id="concerts-upcoming">
        Prochains concerts
      </h2>

      <p class="description">
        Venir écouter Enalion en concert
        <VExpandAll v-model="upcomingOpened" />
      </p>

      <div class="concerts-list">
        <div
          v-if="concerts.length === 0"
          class="no-concerts"
        >
          <iconify-icon
            icon="mdi:smiley-cry-outline"
            title="Instagram"
          />
          <p>
            Pas de concert pour le moment
          </p>
        </div>

        <VConcert
          v-for="(concert, index) in upcoming"
          :key="`${concert.date} ${concert.time}`"
          v-model="upcomingOpened[index]"
          :concert="concert"
          :style="{
            '--index': index,
          }"
        />
      </div>
    </article>

    <article class="concerts-type concerts-past">
      <h2 id="concerts-past">
        Concerts passés
      </h2>

      <p class="description">
        Revisiter les précédents concerts de Enalion
        <VExpandAll v-model="pastOpened" />
      </p>

      <div class="concerts-list">
        <VConcert
          v-for="(concert, index) in past"
          :key="`${concert.date} ${concert.time}`"
          v-model="pastOpened[index]"
          :concert="concert"
          :style="{
            '--index': index,
          }"
        />
      </div>
    </article>

    <article class="contact">
      <p>
        Vous organisez un concert ?
        <RouterLink to="contact">
          Contactez nous !
        </RouterLink>
      </p>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VConcert from '~/components/VConcert.vue';
import VExpandAll from '~/components/VExpandAll.vue';
import { useHead } from '~/composables/head';
import { groupBy } from '~/composables/utils';
import concerts from '~/data/concerts.json';

useHead({
  page: 'Concerts',
  description: `Venir écouter Enalion en concert`,
});

const today = (new Date()).valueOf();
const { upcoming, past } = groupBy(concerts, (concert) => {
  if (!concert.date)
    return 'upcoming';
  return (new Date(concert.date)).valueOf() < today
    ? 'past'
    : 'upcoming';
});

const pastOpened = ref(Array.from({ length: past?.length ?? 0 }).map(() => false));
const upcomingOpened = ref(Array.from({ length: upcoming?.length ?? 0 }).map(() => false));
</script>

<style lang="scss" scoped>
.concerts {
  .concerts-type {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    width: min(100%, 60rem);

    h2 {
      text-align: center;
      font-size: 1.5rem;
      text-decoration: underline;
      animation: fade-in ease 1s both;
    }

    .description {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      text-align: justify;
      text-align-last: center;
      gap: 0.5rem;

      --animation-dy: -1rem;
      animation: slide-in ease 1.5s 0.5s both;
    }

    .concerts-list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      gap: 1rem;
      width: 100%;
      margin-block-start: 1rem;

      .no-concerts {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1ch;
        margin-block: 3rem;
        --animation-dy: -2rem;
        animation: slide-in ease 1s 1s both;

        iconify-icon {
          font-size: 2rem;
        }
      }

      .concert {
        --delay: calc(pow(var(--index, 0), 0.6) * 250ms);
        --animation-dx: -5rem;
        animation: slide-in ease-out 1s backwards;
        animation-delay: calc(0.6s + var(--delay, 0s));
      }
    }

    &.concerts-past {
      --base-delay: 1.5s;
      margin-block-start: 4rem;

      h2 {
        animation-delay: var(--base-delay);
      }

      .description {
        text-align: justify;
        text-align-last: center;
        animation-delay: var(--base-delay);
      }

      .concert {
        --delay: calc(var(--base-delay) + pow(var(--index, 0), 0.6) * 250ms);
        transition: opacity ease 400ms;

        &:not(:hover, [open]) {
          opacity: 0.6;
        }
      }
    }
  }

  .contact {
    margin-top: 4rem;
    text-align: center;
    animation: fade-in ease-out 1.2s both;
    animation-delay: 4.5s;

    a {
      font-style: italic;
    }
  }
}
</style>
