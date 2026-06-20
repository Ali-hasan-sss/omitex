const PDF = "/images/pdf";
const IMG = "/images";

export const siteImages = {
  logo: `${PDF}/img-p30-043-1600x379.png`,

  /** ميناء الدقم — أقرب نسبة 2:1 لبانوراما 360° (3655×1536) */
  hero360: `${PDF}/img-p02-002-3655x1536.png`,

  ports: {
    duqm: `${PDF}/img-p02-002-3655x1536.png`,
    sohar: `${IMG}/ports/sohar.jpg`,
    muttrah: `${PDF}/img-p28-041-1760x1247.png`,
    salalah: `${IMG}/ports/salalah.jpeg`,
    logistics: `${PDF}/img-p28-041-1760x1247.png`,
  },

  whyOman: {
    sohar: `${IMG}/ports/sohar.jpg`,
    salalah: `${IMG}/ports/salalah.jpeg`,
    duqm: `${PDF}/img-p02-002-3655x1536.png`,
    logistics: `${PDF}/img-p28-041-1760x1247.png`,
    stability: `${PDF}/img-p15-025-684x596.png`,
    zones: `${PDF}/img-p06-016-2663x1284.png`,
    trade: `${PDF}/img-p22-034-2400x1422.png`,
    featured: {
      duqm: `${PDF}/img-p14-024-1024x952.png`,
      sohar: `${PDF}/img-p22-034-2400x1422.png`,
      salalah: `${PDF}/img-p15-025-684x596.png`,
    },
  },

  sectors: {
    industry40: `${IMG}/sectors/industry-automation.png`,
    machinery: `${IMG}/sectors/heavy-machinery.png`,
    digital: `${IMG}/sectors/digital.png`,
    logistics: `${IMG}/sectors/logistics.png`,
    investment: `${IMG}/sectors/oman-export.png`,
    green: `${IMG}/sectors/green-energy.png`,
  },

  about: `${PDF}/img-p02-002-3655x1536.png`,

  gateway: {
    locationPin: `${PDF}/img-p03-003-598x598.png`,
    entrepreneurs: `${PDF}/img-p03-004-525x525.png`,
    decisionMakers: `${PDF}/img-p03-005-525x525.png`,
    technology: `${PDF}/img-p03-006-525x525.png`,
    capital: `${PDF}/img-p03-007-525x525.png`,
    zones: `${PDF}/img-p03-008-525x525.png`,
  },

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
