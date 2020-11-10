import { select } from 'd3';
export const svgSize = {
  w: 900,
  h: 500,
  m: { t: 50, b: 50, l: 50, r: 50 },
};

export const view = {
  width: 960,
  height: 540,
  margin: {
    t: 48,
    b: 120,
    l: 272,
    r: 72,
  },
};

export const inner = {
  w: view.width - view.margin.l - view.margin.r,
  h: view.height - view.margin.t - view.margin.b,
};
