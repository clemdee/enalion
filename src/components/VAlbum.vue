<template>
  <article class="album">
    <div class="timeline" />

    <div class="circle" />

    <hgroup class="title">
      <h2>
        {{ props.album.name }}
      </h2>

      <p>
        <iconify-icon
          icon="line-md:calendar"
          title="date"
        />
        {{ props.album.date }}
      </p>

      <div
        v-if="props.album.upcoming"
        class="upcoming"
      >
        à venir
      </div>
    </hgroup>

    <div class="content">
      <div class="description">
        <p>
          {{ props.album.description }}
        </p>
      </div>

      <div
        v-if="props.album.ids"
        class="embedded"
        :class="[props.display]"
      >
        <div
          v-if="props.display"
          class="loading"
        />
        <iframe
          v-if="props.display === 'spotify'"
          :src="`https://open.spotify.com/embed/album/${props.album.ids.spotify}?utm_source=generator&theme=0`"
          width="100%"
          height="352"
          frameBorder="0"
          allowfullscreen
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <iframe
          v-if="props.display === 'youtube'"
          width="100%"
          height="315"
          :src="`https://www.youtube-nocookie.com/embed/videoseries?list=${props.album.ids.youtube}`"
          title="YouTube video player"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />

        <iframe
          v-if="props.display === 'soundcloud'"
          width="100%"
          height="300"
          scrolling="no"
          frameborder="no"
          allow="autoplay"
          :src="`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${props.album.ids.soundcloud}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{
  album: Album
  display?: 'spotify' | 'youtube' | 'soundcloud'
}>();
</script>

<style lang="scss" scoped>
.album {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  --delay: calc(pow(var(--index, 0), 0.5) * 1.5s);
  --album-gap: 6rem;

  .timeline {
    grid-column: 1;
    grid-row: 1 / 3;
    width: 0.2rem;
    margin-inline: 4rem;
    background-color: #ccc;
    --animation-dy: 8rem;
    animation: slide-in ease-out 1.8s both;
    animation-delay: 0s;
  }

  .circle {
    grid-column: 2;
    grid-row: 1;
    position: relative;
    inset-block-start: 3rem;
    inset-inline-start: -4.7rem;
    aspect-ratio: 1;
    width: 1.2rem;
    border-radius: 100%;
    border: 0.2rem solid #ccc;
    background-color: var(--background-color);
    animation: slide-in ease-out 1s both;
    animation-delay: calc(0.3s + var(--delay, 0s));
  }

  .title {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.5rem;
    margin-block-start: 2rem;
    --animation-dx: 2rem;
    animation: slide-in ease-out 1s both;
    animation-delay: calc(0.6s + var(--delay, 0s));

    h2 {
      font-size: 1.5rem;
      text-align: center;
      text-decoration: underline;
      text-underline-offset: 0.2rem;
    }

    p {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1ch;
      font-style: italic;
    }

    .upcoming {
      background-color: #555;
      padding: 0.1rem 1rem;
      border-radius: 0.5rem;
      font-size: 1.2rem;
      font-style: italic;
    }
  }

  .content {
    grid-column: 2;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    margin-block-start: 1rem;
    padding-block: 1rem;
    --animation-dy: -2rem;
    animation: slide-in ease-out 1.2s both;
    animation-delay: calc(1.2s + var(--delay, 0s));

    .description {
      max-width: 60rem;
      text-align: justify;
    }

    .embedded {
      position: relative;
      width: min(100%, 40rem);
      border-radius: 1rem;
      overflow: hidden;

      .loading {
        position: absolute;
        width: 100%;
        // For some some reason it is slightly higher than iframe
        height: calc(100% - 0.5rem);
        z-index: -1;
        border-radius: 1rem;
        overflow: hidden;
        background: var(--loading-background);
        animation: loading ease 2s infinite both;
      }
    }
  }
}

.album:first-child .timeline {
  background: linear-gradient(
    to bottom,
    #dddb 0rem 0.5rem, transparent 0.5rem 1rem,
    #dddd 1rem 1.5rem, transparent 1.5rem 2rem,
    #ddd 2rem 2.5rem, transparent 2.5rem 3rem,
    #ddd 3rem
  );
}

.album:last-child .timeline {
  background: linear-gradient(
    to top,
    #ddd6 0rem 0.5rem, transparent 0.5rem 1rem,
    #ddda 1rem 1.5rem, transparent 1.5rem 2rem,
    #dddd 2rem 2.5rem, transparent 2.5rem 3rem,
    #ddd 3rem
  );
}

.album:only-child .timeline {
  background: linear-gradient(
    to bottom,
    #dddb 0rem 0.5rem, transparent 0.5rem 1rem,
    #dddd 1rem 1.5rem, transparent 1.5rem 2rem,
    #ddd 2rem 2.5rem, transparent 2.5rem 3rem,
    #ddd 3rem,
    #ddd calc(100% - 3rem),
    transparent calc(100% - 3rem) calc(100% - 2.5rem), #dddd calc(100% - 2.5rem) calc(100% - 2rem),
    transparent calc(100% - 2rem) calc(100% - 1.5rem), #ddda calc(100% - 1.5rem) calc(100% - 1rem),
    transparent calc(100% - 1rem) calc(100% - 0.5rem), #ddd6 calc(100% - 0.5rem) calc(100% - 0rem)
  );
}

.album:not(:last-child) .content {
  margin-block-end: var(--album-gap);
}

@media (min-width: 75rem) {
  .album {
    grid-template-columns: 15rem auto 1fr;
    grid-template-rows: auto;
    --album-gap: 10rem;

    .timeline {
      grid-column: 2;
      grid-row: 1 / 3;
    }

    .circle {
      inset-inline-start: 3.5rem;
    }

    .title {
      grid-column: 1;
      grid-row: 1;
      align-items: flex-end;
      text-align: end;
      --animation-dx: -2rem;

      p {
        flex-direction: row-reverse;
      }
    }

    .content {
      grid-column: 3;
      grid-row: 1;
      margin-block-start: 1rem;
    }
  }
}

@media (max-width: 40rem) {
  .album {
    --album-gap: 6rem;

    .timeline {
      // width: 0.2rem;
      margin-inline-start: -1rem;
      margin-inline-end: 2rem;
    }

    .circle {
      width: 1rem;
      inset-inline-start: -2.6rem;
    }

    .title {
      padding-inline: 1rem;
    }

    .content {
      margin-block-start: 2rem;
      padding-inline: 1rem;
      border-radius: 1rem;
      background-color: #000a;
    }
  }
}
</style>
