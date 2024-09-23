/// <reference types="vite/client" />

declare module '@tsparticles/vue3';
declare const tsParticles: any;

interface Concert {
  name: string
  date: string
  time?: string
  duration?: number
  flag?: string
  city?: string
  address?: string
  image?: string
  reservation?: string
  website?: string
}

interface Album {
  name: string
  date: string
  description: string
  ids: {
    spotify: string
    youtube: string
    soundcloud: string
  }
}

interface Member {
  image: string
  name: string
  role: string
  description: string
}

declare module '~/data/concerts.json' {
  const concerts: Concert[];
  export default concerts;
}

declare module '~/data/albums.json' {
  const albums: Album[];
  export default albums;
}

declare module '~/data/members.json' {
  const members: Member[];
  export default members;
}

declare module 'virtual:ls*' {
  const paths: string[];
  export default paths;
}
