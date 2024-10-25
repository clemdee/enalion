<template>
  <section class="reference">
    <h2>
      Références
    </h2>

    <article class="description">
      <p>
        Enalion est un collectif de musique composé de 8 amis, aimant partager leur passion pour la musique entre eux et avec leur public.

        <br />

        Nous nous produisons actuellement au minimum 3 fois par an, habituellement au sein d'évènements organisés par
        <a
          href="https://www.3quatre.fr/"
          target="_blank"
          rel="noopener noreferrer"
          title="3quatre"
        >
          3quatre
          <iconify-icon icon="mdi:external-link" />
        </a>,
        mais nous avons pour ambition d'augmenter ce rythme, ainsi que nos lieux de représentation.
      </p>

      <div class="presentation image-span">
        <div class="image-span-wrapper">
          <p>
            Nous proposons généralement des <strong>sets de 1h</strong>, même si nous sommes en mesure d'adapter la durée en fonction des besoins. Par exemple, nous avons déjà pu réaliser un double set pour une durée totale de 1h30.
          </p>

          <p>
            Fort de notre <strong>expérience sur scène</strong>, nous travaillons continuellement à renforcer notre jeu afin de toujours proposer une meilleure performance lors de nos concerts, ce qui a été confirmé à plusieurs reprises par des retours du public.
          </p>
        </div>

        <VImage
          :src="resolveUrl('enalion.jpg')"
        />
      </div>

      <p class="concerts-past">
        <RouterLink
          to="concerts"
          class="internal-link"
        >
          <iconify-icon
            class="arrow"
            icon="line-md:chevron-right"
          />

          <span>
            Découvrir nos concerts passés
          </span>

          <iconify-icon
            class="arrow"
            icon="line-md:chevron-left"
          />
        </RouterLink>
      </p>

      <div class="image-span">
        <div class="image-span-wrapper">
          <p>
            Nous avons aussi les connaissances et l'expertise pour organiser nos propres concerts, quand nous en avons l'occasion. Par exemple, nous avons organisé en juillet 2024 un concert privé sous invitation uniquement. Nous nous sommes tenu responsable de l'organisation de bout en bout, de la <strong>planification de l'événement</strong> à <strong>l'installation du matériel</strong>.
          </p>
          <p>
            Nous nous sommes assurés de la qualité du setup audio, avec enregistrement de la batterie en multi-piste, amplis de retour pour chaque instrument, et balance globale de la scène et des retours.
          </p>
        </div>
        <VImage
          :src="resolveUrl('organisation.jpg')"
        />
      </div>

      <p class="concerts-past">
        <RouterLink
          to="contact"
          class="internal-link"
        >
          <iconify-icon
            class="arrow"
            icon="line-md:chevron-right"
          />

          <span>
            Vous organisez un concert ? <em>Contactez nous</em> !
          </span>

          <iconify-icon
            class="arrow"
            icon="line-md:chevron-left"
          />
        </RouterLink>
      </p>
    </article>

    <h2>
      Setlist
    </h2>

    <article class="setlist">
      <p>
        Notre univers musical est assez riche, gravitant généralement autour de la <i>funk</i> et de la <i>pop</i>. Nous aimons aussi beaucoup explorer d'autres genres, comme le <i>jazz</i>, le <i>rock</i>, ou bien encore d'autres musiques provennant de la <i>pop culture</i>.
      </p>

      <p>
        Voici quelques exemples de ce que nous pouvons proposer en concert :
      </p>

      <p>
        Du coté de la funk, vous pourrez retrouver morceaux d'artistes récurrents nous inspirant, tels que Louis Cole ou Jamiroquai :
      </p>

      <p class="audios">
        <VAudio
          name="Thinking.mp3"
          title="Thinking - Louis Cole"
        />

        <VAudio
          name="Park Your Car.mp3"
          title="Park Your Car - Louis Cole"
        />

        <VAudio
          name="Love Foolosophy.mp3"
          title="Love Foolosophy - Jamiroquai"
        />

        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/h16QarzEf_Y"
          title="Canned Heat - Jamiroquai"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </p>

      <p>
        Du coté de la pop, nous proposons des morceaux que l'on affectionne particulièrement, incontournables ou bien pépites personnelles :
      </p>

      <p class="audios">
        <VAudio
          name="Don't you worry 'bout a thing.mp3"
          title="Don't you worry 'bout a thing - Tory Kelly"
        />

        <VAudio
          name="Ain't no mountain high enough.mp3"
          title="Ain't no mountain high enough - Marvin Gaye"
        />

        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/TlUzyCRHC9s?start=306"
          title="Dance The Night - Dua Lipa"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </p>

      <p>
        Les amateurs de rock ne seront pas en reste avec nos reprises de quelques classiques intemporels :
      </p>

      <p class="audios">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/AwizLeQIyl4"
          title="Next to You - The Police"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />

        <VAudio
          name="Everybody Wants to Rule the World.mp3"
          title="Everybody Wants to Rule the World - Tears for Fears"
        />
      </p>

      <p>
        Et pour finir, voici une dernière petite selection de reprises variées :
      </p>

      <p class="audios">
        <VAudio
          name="Can You Feel The Sunshine.mp3"
          title="Can You Feel The Sunshine - Sonic Racing OST"
        />

        <VAudio
          name="We Are.mp3"
          title="We Are - One Piece Opening"
        />

        <VAudio
          name="Zombie Pop.mp3"
          title="Zombie Pop - DPR IAN"
        />

        <VAudio
          name="Tudo o que voce podia ser.mp3"
          title="Tudo o que voce podia ser - Milton Nascimento"
        />

        <VAudio
          name="Palco.mp3"
          title="Palco - Gilberto Gil"
        />
      </p>
    </article>
  </section>
</template>

<script lang="ts" setup>
import VAudio from '~/components/VAudio.vue';
import VImage from '~/components/VImage.vue';
import { useHead } from '~/composables/head';

useHead({
  page: 'References',
  description: `Enalion est un collectif de musique composé de 8 amis, aimant partager leur passion pour la musique entre eux et avec leur public. Notre univers musical est assez riche, gravitant généralement autour de la funk et de la pop.`,
});

const resolveUrl = (id: string) => {
  return new URL(`/src/data/images/reference/${id}?format=webp&effort=max`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.reference {
  // Cannot use css variables inside media queries, so using scss
  $--breakpoint-low: 50rem;
  $--breakpoint-high: 75rem;

  h2 {
    font-size: 1.5rem;
    text-align: center;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    animation: fade-in ease 1s both;
  }

  article {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1.5rem;

    max-width: $--breakpoint-high;
    text-align: justify;
    --animation-dy: -2rem;
    animation: slide-in ease-out 1.2s 0.5s both;

    &.description {
      gap: 4rem;
    }

    iconify-icon {
      vertical-align: middle;
    }

    strong {
      color: var(--accent-color);
      font-weight: normal;
    }

    i {
      color: var(--accent-color);
    }

    .image-span {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 2rem;

      @media (min-width: 60rem) {
        flex-direction: row;

        .image {
          max-width: 30rem;
          flex-shrink: 0;
        }
      }

      .image-span-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        gap: 1.5rem;
      }

      .image {
        max-width: 30rem;
      }
    }

    .presentation {
      @media (min-width: 60rem) {
        flex-direction: row-reverse;
      }
    }

    iframe {
      max-width: 100%;
      border-radius: 1rem;
      overflow: hidden;
    }

    .internal-link {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      width: fit-content;
      margin: auto;
      text-align: center;
      text-decoration: none;
      text-wrap: balance;

      .arrow {
        transition: translate ease 800ms;
      }

      &:hover {
        .arrow:first-child {
          translate: 0.2rem 0rem;
        }
        .arrow:last-child {
          translate: -0.2rem 0rem;
        }
      }
    }

    .audios {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1rem;
    }
  }
}
</style>
