const PDF = "/images/pdf";
const IMG = "/images";

export const siteImages = {
  logo: `${PDF}/img-p30-043-1600x379.png`,

  /** ميناء الدقم — أقرب نسبة 2:1 لبانوراما 360° (3655×1536) */
  hero360: `${PDF}/img-p02-002-3655x1536.png`,

  ports: {
    duqm: `${PDF}/img-p02-002-3655x1536.png`,
    sohar: `${IMG}/ports/sohar.jpg`,
    muttrah: `${PDF}/img-p23-035-2168x1531.png`,
    salalah: `${IMG}/ports/salalah.jpeg`,
    logistics: `${PDF}/img-p17-027-2528x1468.png`,
  },

  sectors: {
    industry40: `${IMG}/sectors/industry-automation.png`,
    machinery: `${IMG}/sectors/heavy-machinery.png`,
    digital: `${IMG}/sectors/digital.png`,
    logistics: `${IMG}/sectors/logistics.png`,
    investment: `${IMG}/sectors/oman-export.png`,
    green: `${IMG}/sectors/green-energy.png`,
  },

  about: `${PDF}/img-p04-009-5194x3670.png`,
  summit: `${PDF}/img-p12-022-3500x2484.png`,
  vision: `${PDF}/img-p16-026-2048x1697.png`,
  stats: `${PDF}/img-p18-028-2276x1792.png`,
  event: `${PDF}/img-p28-041-1760x1247.png`,

  blog: [
    `${PDF}/img-p16-026-2048x1697.png`,
    `${PDF}/img-p06-016-2663x1284.png`,
    `${PDF}/img-p02-002-3655x1536.png`,
    `${PDF}/img-p11-021-2663x1432.png`,
  ],
} as const;
