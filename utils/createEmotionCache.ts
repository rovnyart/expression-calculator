/* Boilerplate code from https://github.com/mui/material-ui/tree/master/examples/nextjs-with-typescript-v4-migration */
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
