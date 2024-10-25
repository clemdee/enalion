import { useHead as unHeadUseHead } from '@unhead/vue';

export interface UseHeadParameters {
  title?: string
  page?: string
  description?: string
}

export const useHead = (parameters: UseHeadParameters) => {
  const config: Parameters<typeof unHeadUseHead>[0] = {};
  const meta: (typeof config)['meta'] = [];
  config.meta = meta;

  if (parameters.title) {
    config.title = parameters.title;
    meta.push({
      name: 'og:title',
      content: parameters.title,
    });
  }
  else if (parameters.page) {
    config.title = `${parameters.page} - Enalion`;
    meta.push({
      name: 'og:title',
      content: `Enalion - ${parameters.page}`,
    });
  }

  if (parameters.description) {
    meta.push({
      name: 'description',
      content: parameters.description,
    });
    meta.push({
      name: 'og:description',
      content: parameters.description,
    });
  }

  unHeadUseHead(config);
};
