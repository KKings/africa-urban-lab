import { ImageGrid } from "./types";

export const IMAGE_SIZES = {
  [ImageGrid["1/2"]]: '50%',
  [ImageGrid["1/3"]]: '33.3%',
  [ImageGrid["2/3"]]: '66.6%',
  [ImageGrid["2/5"]]: '40%',
  [ImageGrid["3/5"]]: '60%',
} as const;
