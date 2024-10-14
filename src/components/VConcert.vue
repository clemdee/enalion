<template>
  <VDetails
    v-model="opened"
    class="concert"
  >
    <template #summary>
      <div class="concert-summary">
        <span
          v-if="props.concert.city"
          class="flag"
        >
          {{ props.concert.flag ?? '' }}
        </span>

        <span class="name">{{ props.concert.name }}</span>

        <span class="location">
          <span
            v-if="props.concert.city"
            class="flag"
          >
            {{ props.concert.flag ?? '' }}
          </span>

          <span v-if="props.concert.city">{{ props.concert.city }}</span>
        </span>

        <span class="separator" />

        <span class="date">{{ summaryDate }}</span>
      </div>
    </template>

    <template #content>
      <div class="concert-content">
        <VImage
          v-if="image"
          class="concert-image"
          :src="image"
          :alt="props.concert.name"
          :lazy="true"
        />
        <div class="concert-info">
          <p>
            <iconify-icon
              icon="mdi:calendar-outline"
              title="date"
            />
            <span class="separator" />
            <span>{{ descriptionDateTime }}</span>
          </p>

          <p v-if="props.concert.duration">
            <iconify-icon
              icon="mingcute:time-duration-line"
              title="durée"
            />
            <span class="separator" />
            <span>{{ props.concert.duration }} min</span>
          </p>

          <p v-if="props.concert.address">
            <iconify-icon
              icon="mdi:map-marker-outline"
              title="Localisation"
            />
            <span class="separator" />
            <span>{{ props.concert.address }}</span>
          </p>

          <p v-if="props.concert.reservation">
            <iconify-icon
              icon="ph:ticket"
              title="Réservation"
            />
            <span class="separator" />
            <span>{{ props.concert.reservation }}</span>
          </p>

          <p v-if="props.concert.website">
            <iconify-icon
              icon="line-md:external-link"
              title="Infos"
            />
            <span class="separator" />
            <span>
              <a :href="props.concert.website">Plus d'information</a>
            </span>
          </p>
        </div>
      </div>
    </template>
  </VDetails>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VDetails from '~/components/VDetails.vue';
import { useDateTimeData } from '~/composables/date';
import { concatString } from '~/composables/utils';
import VImage from './VImage.vue';

const props = defineProps<{
  concert: Concert
}>();

const opened = defineModel<boolean>({
  default: false,
});

const resolveUrl = (path: string) => {
  return new URL(`/src/data/images/concerts/${path}?format=webp&effort=max`, import.meta.url).href;
};

const image = computed(() => props.concert.image
  ? resolveUrl(props.concert.image)
  : undefined,
);

const dateData = useDateTimeData({
  date: props.concert.date,
  time: props.concert.time,
});

const yesterdayData = computed(() => {
  const yesterday = new Date(dateData.value.date);
  yesterday.setDate(yesterday.getDate() - 1);
  return useDateTimeData({
    date: yesterday,
  }).value;
});

const summaryDate = computed(() => {
  const data = dateData.value.pastMidnight
    ? yesterdayData
    : dateData;
  return concatString([
    data.value.day,
    data.value.monthShort,
    data.value.year,
  ]);
});

const getPastMidnightDateDescription = () => {
  if (yesterdayData.value.date.getFullYear() !== dateData.value.date.getFullYear()) {
    return [
      yesterdayData.value.weekdayShort,
      yesterdayData.value.day,
      yesterdayData.value.monthLong,
      yesterdayData.value.year,
      'au',
      dateData.value.day,
      dateData.value.monthLong,
      dateData.value.year,
    ];
  }
  else if (yesterdayData.value.date.getMonth() !== dateData.value.date.getMonth()) {
    return [
      yesterdayData.value.weekdayShort,
      yesterdayData.value.day,
      yesterdayData.value.monthLong,
      'au',
      dateData.value.day,
      dateData.value.monthLong,
      dateData.value.year,
    ];
  }
  else {
    return [
      yesterdayData.value.weekdayShort,
      yesterdayData.value.day,
      'au',
      dateData.value.weekdayShort,
      dateData.value.day,
      dateData.value.monthLong,
      dateData.value.year,
    ];
  }
};

const descriptionDateTime = computed(() => {
  if (!dateData.value.month || !dateData.value.day) {
    return concatString([
      dateData.value.monthLong,
      dateData.value.year,
      '(date à préciser)',
    ]);
  }
  if (!dateData.value.hours) {
    return concatString([
      dateData.value.weekdayShort,
      dateData.value.day,
      dateData.value.monthLong,
      dateData.value.year,
      '- (horaire à préciser)',
    ]);
  }
  if (dateData.value.pastMidnight) {
    return concatString([
      'dans la nuit du',
      getPastMidnightDateDescription(),
      `- ${dateData.value.hours}h${dateData.value.minutes}`,
    ]);
  }
  return concatString([
    dateData.value.weekdayShort,
    dateData.value.day,
    dateData.value.monthLong,
    dateData.value.year,
    `- ${dateData.value.hours}h${dateData.value.minutes}`,
  ]);
});
</script>

<style lang="scss" scoped>
.concert {
  // Cannot use css variables inside media queries, so using scss
  $--breakpoint: 50rem;

  .concert-summary {
    flex-grow: 1;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1ch;

    @media (max-width: $--breakpoint) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 1ch;
    }

    & > .flag {
      @media (max-width: $--breakpoint) {
          display: none;
      }
    }

    .location {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 1ch;

      & > .flag {
        @media (min-width: $--breakpoint) {
          display: none;
        }
      }
    }

    .name {
      font-style: italic;

      @media (min-width: $--breakpoint) {
        &::after {
          content: " -";
        }
      }
    }

    .separator {
      flex-grow: 1;
      border-bottom: 2px dotted currentColor;

      @media (max-width: $--breakpoint) {
        display: none;
      }
    }
  }

  .concert-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    margin-top: 0.5rem;

    @media (max-width: $--breakpoint) {
      flex-direction: column-reverse;
    }

    .concert-image {
      width: min(15rem, 50%);
      aspect-ratio: 3 / 4;

      @media (max-width: $--breakpoint) {
        align-self: center;
        width: min(15rem, 100%);
      }
    }

    .concert-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.5rem;

      p {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        .separator {
          margin-inline: 1rem;

          &::before {
            content: '-';
          }
        }

        a {
          font-style: italic;
        }
      }
    }
  }

  .concert-image + .concert-info {
    margin-top: 1rem;
  }
}
</style>
