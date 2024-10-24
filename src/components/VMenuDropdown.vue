<!-- TODO:  eslint-plugin-vue bug, remove when fixed -->
<!-- eslint-disable vue/no-unused-refs -->
<template>
  <div
    ref="dropdown"
    class="dropdown"
    :class="{
      opened,
    }"
    @mouseenter="opened = true"
    @mouseleave="opened = false"
  >
    <div class="head">
      <RouterLink to="/collective" @click="clickHandler">
        Le Collectif
      </RouterLink>
      <button
        class="chevron"
        :disabled="opened"
        @click="openDropdown"
      >
        <iconify-icon
          class="head-arrow"
          icon="line-md:chevron-small-down"
        />
      </button>
    </div>
    <div class="body">
      <iconify-icon
        class="body-arrow"
        icon="line-md:chevron-small-down"
      />
      <div class="sub-links">
        <RouterLink to="/collective" @click="clickHandler">
          Membres
        </RouterLink>
        <RouterLink to="/reference" @click="clickHandler">
          Références
        </RouterLink>
        <RouterLink to="/gallery" @click="clickHandler">
          Gallerie
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';

const emit = defineEmits<{
  click: [event: MouseEvent]
}>();

const dropdownElement = useTemplateRef('dropdown');

const opened = ref(false);

onMounted(() => {
  document.body.addEventListener('click', (event) => {
    const element = event.target as HTMLElement;
    if (!element)
      return;
    if (!element.closest('.titlebar .dropdown')) {
      opened.value = false;
    }
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape')
      return;
    opened.value = false;
  });
});

const openDropdown = async () => {
  if (!dropdownElement.value)
    return;
  opened.value = true;
  await nextTick();
  dropdownElement.value.querySelector<HTMLLinkElement>('.sub-links a')?.focus();
};

const clickHandler = (event: MouseEvent) => {
  opened.value = false;
  emit('click', event);
};
</script>

<style lang="scss" scoped>
@keyframes dropdown-open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dropdown {
  position: relative;

  .chevron {
    border: none;
    background: none;
    color: currentColor;
    cursor: pointer;

    iconify-icon {
      transition: opacity 0.4s ease;
    }
  }

  .head {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .body {
    position: absolute;
    inset-block-start: calc(100% - 0.3rem);
    display: flex;
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    opacity: 0;

    .sub-links {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.5rem;
      border-radius: 1rem;
      backdrop-filter: blur(1rem);
    }
  }
}

@media (min-width: 40rem) {
  .dropdown.opened {
    .head {
      iconify-icon {
        opacity: 0;
      }
    }

    .body {
      display: flex;
      animation: dropdown-open 0.5s ease both;

      .sub-links {
        width: max(100%, 9rem);
        background-color: #8882;
        box-shadow: inset -0.1rem -0.1rem 0.05rem #8882;
      }
    }
  }
}

@media (max-width: 40rem) {
  .dropdown {
    .head {
      display: none;
    }
    .body {
      position: static;
      display: flex;
      opacity: 1;

      .body-arrow {
        display: none;
      }

      .sub-links {
        gap: 2rem;
        padding: none;
        backdrop-filter: none;
      }
    }
  }
}
</style>
