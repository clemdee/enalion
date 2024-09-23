<template>
  <details
    ref="details"
    class="details"
    :open="openedInner"
  >
    <summary
      :title="props.title ?? 'Voir les détails'"
      @click="clickHandler"
    >
      <iconify-icon
        class="marker"
        icon="line-md:chevron-small-right"
      />

      <slot name="summary" />
    </summary>

    <div
      ref="content"
      class="content"
    >
      <slot name="content" />
    </div>
  </details>
</template>

<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue';

const props = defineProps<{
  title?: string
}>();

const opened = defineModel<boolean>({
  default: false,
});

const openedInner = ref(false);

const details = useTemplateRef('details');
const content = useTemplateRef('content');

const height = ref(0);

const updateHeight = () => {
  if (!content.value)
    return;
  height.value = content.value.offsetHeight;
};

const clickHandler = async (event: MouseEvent) => {
  if (!details.value)
    return;
  event.preventDefault();
  updateHeight();
  opened.value = !opened.value;
};

let timeoutId: ReturnType<typeof setTimeout>;

watch(opened, async (value) => {
  clearTimeout(timeoutId);
  details.value?.classList.remove('closing');
  if (value) {
    openedInner.value = true;
  }
  else {
    details.value?.classList.add('closing');
    timeoutId = setTimeout(() => {
      details.value?.classList.remove('closing');
      openedInner.value = false;
    }, 400);
  }
});

onMounted(() => {
  updateHeight();
});
</script>

<style lang="scss" scoped>
@keyframes details-open {
  from {
    max-height: 0rem;
    padding-block: 0rem;
  }
  to {
    max-height: var(--max-height);
    padding-block: 1rem;
  }
}

@keyframes details-close {
  from {
    max-height: var(--max-height);
    padding-block: 1rem;
  }
  to {
    max-height: 0rem;
    padding-block: 0rem;
  }
}

.details {
  border: 1px solid currentColor;
  border-radius: 0.5rem;
  backdrop-filter: blur(1rem);
  // Cannot use css variables inside media queries, so using scss
  $--breakpoint: 50rem;

  summary {
    padding: 0.75rem 1rem;
    padding-block-start: 0.85rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    &:hover {
      // color: var(--accent-color);
      background-color: #ffffff1f;
    }

    .marker {
      transition: rotate 400ms ease;

      @media (min-width: $--breakpoint) {
        margin-right: 0.5rem;
      }
    }
  }

  .content {
    --max-height: calc(2rem + v-bind('height') * 1px);
    overflow: hidden;
    padding-inline: 1rem;
  }

  &[open] {
    summary .marker {
      rotate: 90deg;
    }

    .content {
      animation: details-open 400ms ease-out both;
    }
  }

  &.closing {
    summary .marker {
      rotate: 0deg;
    }

    .content {
      animation: details-close 400ms ease-out both;
    }
  }
}
</style>
