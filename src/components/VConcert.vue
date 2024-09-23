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

const useDateTimeData = ({ date, time }: { date: string, time?: string }) => {
  interface ParsedDate {
    year: string
    month?: string
    day?: string
  }

  interface ParsedTime {
    hours?: string
    minutes?: string
    pastMidnight?: boolean
  }

  const dateRegex = /(?<year>\d{4})(?:-(?<month>\d{2})(?:-(?<day>\d{2}))?)?/;
  const timeRegex = /(?<pastMidnight>!)?(?<hours>\d{2}):(?<minutes>\d{2})/;

  const parsedDate = date.match(dateRegex)?.groups ?? {} as ParsedDate;
  const parsedTime = time?.match(timeRegex)?.groups ?? {} as ParsedTime;
  if (parsedTime.pastMidnight) {
    parsedTime.pastMidnight = true;
  }

  const dateWithDefaults = new Date(
    +parsedDate.year,
    +(parsedDate.month ?? 1) - 1,
    +(parsedDate.day ?? 1),
    +(parsedTime.hours ?? 0),
    +(parsedTime.minutes ?? 0),
  );

  const lang = 'fr';

  return computed(() => ({
    date: dateWithDefaults,
    year: parsedDate.year,
    month: parsedDate.month,
    monthLong: dateWithDefaults.toLocaleDateString(lang, { month: 'long' }),
    monthShort: dateWithDefaults.toLocaleDateString(lang, { month: 'short' }),
    day: parsedDate.day,
    weekdayLong: dateWithDefaults.toLocaleDateString(lang, { weekday: 'long' }),
    weekdayShort: dateWithDefaults.toLocaleDateString(lang, { weekday: 'short' }),
    hours: parsedTime.hours,
    minutes: parsedTime.minutes,
    pastMidnight: parsedTime.pastMidnight,
  }));
};

const d = useDateTimeData({
  date: props.concert.date,
  time: props.concert.time,
});

const summaryDate = computed(() => {
  if (!d.value.month) {
    return `${d.value.year}`;
  }
  if (!d.value.day) {
    return `${d.value.monthShort} ${d.value.year}`;
  }
  return `${d.value.day} ${d.value.monthShort} ${d.value.year}`;
});

const descriptionDateTime = computed(() => {
  if (!d.value.month) {
    return `${d.value.year} (date à préciser)`;
  }
  if (!d.value.day) {
    return `${d.value.monthLong} ${d.value.year} (date à préciser)`;
  }
  if (!d.value.hours) {
    return `${d.value.weekdayShort} ${d.value.day} ${d.value.monthLong} ${d.value.year} - (horaire à préciser)`;
  }
  if (d.value.pastMidnight) {
    return `dans la nuit du ${d.value.weekdayShort} ${d.value.day} ${d.value.monthLong} ${d.value.year} - ${d.value.hours}h${d.value.minutes}`;
  }
  return `${d.value.weekdayShort} ${d.value.day} ${d.value.monthLong} ${d.value.year} - ${d.value.hours}h${d.value.minutes}`;
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
