import getFlagFilterGroupValues from 'app/utils/getFlagFilterGroupValues'

export const USER_TOKEN_STORAGE_KEY = 'CARRIER_PORTAL_USER_TOKEN'
export const USER_REFRESH_TOKEN_STORAGE_KEY = 'CARRIER_PORTAL_USER_REFRESH_TOKEN'

export const USER_PERMISSIONS = {
  seeMap: 'map.load',
  search: 'map.search',
  pinVessel: 'map.vessel-pin',
  reporting: 'map.reports',
  customLayer: 'map.layers-custom',
  shareWorkspace: 'map.workspace-share',
  selectVessel: 'map.vessel-select',
  seeVesselInfo: 'map.vessel-info',
  seeVesselBasicInfo: 'map.vessel-basic-info',
  seeVesselsLayers: 'map.layer-vessel',
}

export const CONTROL_PANEL_MENUS = {
  FILTERS: 'FILTERS',
  LAYERS: 'LAYERS',
  VESSELS: 'VESSELS',
  REPORTS: 'REPORTS',
}

export const LAYER_TYPES = {
  Static: 'CartoDBAnimation',
  // FIXME deprecate this in workspace layers ?
  CartoDBBasemap: 'CartoDBBasemap',
  Heatmap: 'ClusterAnimation',
  HeatmapTracksOnly: 'HeatmapTracksOnly',
  Custom: 'Custom',
  VesselTrackAnimation: 'VesselTrackAnimation',
  Encounters: 'Encounters',
}

export const LAYER_TYPES_WITH_HEADER = [LAYER_TYPES.Heatmap, LAYER_TYPES.HeatmapTracksOnly]

export const LAYER_TYPES_DISPLAYED_IN_PANELS = [
  LAYER_TYPES.Static,
  // FIXME deprecate this in workspace layers ?
  LAYER_TYPES.CartoDBBasemap,
  LAYER_TYPES.Heatmap,
  LAYER_TYPES.Custom,
  LAYER_TYPES.Encounters,
]

export const ENCOUNTERS_AIS = 'encounters_ais'

export const LAYER_TYPES_MAPBOX_GL = [LAYER_TYPES.Custom, LAYER_TYPES.Static]

export const HEADERLESS_LAYERS = ['shark-points', 'shark-tracks']

export const CUSTOM_LAYERS_SUBTYPES = {
  geojson: 'geojson',
  raster: 'raster',
  wms: 'wms',
}

export const LAYER_HAS_DISPLAY_SETTINGS = [
  LAYER_TYPES.Heatmap,
  LAYER_TYPES.Static,
  LAYER_TYPES.Custom,
]

export const LAYER_HAS_LABELS = [LAYER_TYPES.Static]

export const LAYER_HAS_COLOR_INPUTS = (type, subtype) =>
  [LAYER_TYPES.Heatmap, LAYER_TYPES.Static].indexOf(type) > -1 ||
  (type === LAYER_TYPES.Custom && subtype !== CUSTOM_LAYERS_SUBTYPES.raster)

export const REPORT_STATUS = {
  idle: 'idle',
  error: 'error',
  sent: 'sent',
}

export const INFO_STATUS = {
  HIDDEN: 1,
  LOADING: 2,
  LOADED: 3,
  ERROR: 4,
}

export const VESSEL_TYPE_VESSEL = 'vessel'
export const VESSEL_TYPE_REEFER = 'reefers'

export const TEMPORAL_EXTENTLESS = [[0, new Date(2100, 0, 0).getTime()]]

export const TRANSITION_TYPE = {
  ZOOM: 'ZOOM',
}

export const FLAGS = {
  0: 'AD',
  1: 'AE',
  2: 'AF',
  3: 'AG',
  4: 'AI',
  5: 'AL',
  6: 'AM',
  7: 'AO',
  8: 'AR',
  9: 'AS',
  10: 'AT',
  11: 'AU',
  12: 'AW',
  13: 'AZ',
  14: 'BA',
  15: 'BB',
  16: 'BD',
  17: 'BE',
  18: 'BF',
  19: 'BG',
  20: 'BH',
  21: 'BI',
  22: 'BJ',
  23: 'BM',
  24: 'BN',
  25: 'BO',
  26: 'BR',
  27: 'BS',
  28: 'BT',
  29: 'BW',
  30: 'BY',
  31: 'BZ',
  32: 'CA',
  33: 'CC',
  34: 'CD',
  35: 'CF',
  36: 'CH',
  37: 'CI',
  38: 'CK',
  39: 'CL',
  40: 'CM',
  41: 'CN',
  42: 'CO',
  43: 'CR',
  44: 'CU',
  45: 'CV',
  46: 'CX',
  47: 'CY',
  48: 'CZ',
  49: 'DE',
  50: 'DJ',
  51: 'DK',
  52: 'DM',
  53: 'DO',
  54: 'DZ',
  55: 'EC',
  56: 'EE',
  57: 'EG',
  58: 'ER',
  59: 'ES',
  60: 'ET',
  61: 'FI',
  62: 'FJ',
  63: 'FK',
  64: 'FM',
  65: 'FO',
  66: 'FR',
  67: 'GA',
  68: 'GB',
  69: 'GD',
  70: 'GE',
  71: 'GF',
  72: 'GH',
  73: 'GI',
  74: 'GL',
  75: 'GM',
  76: 'GN',
  77: 'GP',
  78: 'GQ',
  79: 'GR',
  80: 'GT',
  81: 'GY',
  82: 'HK',
  83: 'HN',
  84: 'HR',
  85: 'HT',
  86: 'HU',
  87: 'ID',
  88: 'IE',
  89: 'IL',
  90: 'IN',
  91: 'IQ',
  92: 'IR',
  93: 'IS',
  94: 'IT',
  95: 'JM',
  96: 'JO',
  97: 'JP',
  98: 'KE',
  99: 'KG',
  100: 'KH',
  101: 'KI',
  102: 'KM',
  103: 'KN',
  104: 'KR',
  105: 'KW',
  106: 'KY',
  107: 'KZ',
  108: 'LA',
  109: 'LB',
  110: 'LC',
  111: 'LI',
  112: 'LK',
  113: 'LR',
  114: 'LS',
  115: 'LT',
  116: 'LU',
  117: 'LV',
  118: 'LY',
  119: 'MA',
  120: 'MC',
  121: 'MD',
  122: 'ME',
  123: 'MG',
  124: 'MH',
  125: 'MK',
  126: 'ML',
  127: 'MM',
  128: 'MN',
  129: 'MO',
  130: 'MP',
  131: 'MQ',
  132: 'MR',
  133: 'MS',
  134: 'MT',
  135: 'MU',
  136: 'MV',
  137: 'MW',
  138: 'MX',
  139: 'MY',
  140: 'MZ',
  141: 'NA',
  142: 'NC',
  143: 'NE',
  144: 'NG',
  145: 'NI',
  146: 'NL',
  147: 'NO',
  148: 'NP',
  149: 'NR',
  150: 'NU',
  151: 'NZ',
  152: 'OM',
  153: 'PA',
  154: 'PE',
  155: 'PF',
  156: 'PG',
  157: 'PH',
  158: 'PK',
  159: 'PL',
  160: 'PM',
  161: 'PN',
  162: 'PR',
  163: 'PS',
  164: 'PT',
  165: 'PW',
  166: 'PY',
  167: 'QA',
  168: 'RE',
  169: 'RO',
  170: 'RS',
  171: 'RU',
  172: 'RW',
  173: 'SA',
  174: 'SB',
  175: 'SC',
  176: 'SD',
  177: 'SE',
  178: 'SEE',
  179: 'SG',
  180: 'SH',
  181: 'SI',
  182: 'SK',
  183: 'SL',
  184: 'SM',
  185: 'SN',
  186: 'SO',
  187: 'SR',
  188: 'SS',
  189: 'ST',
  190: 'SV',
  191: 'SY',
  192: 'SZ',
  193: 'TC',
  194: 'TD',
  195: 'TG',
  196: 'TH',
  197: 'TJ',
  198: 'TM',
  199: 'TN',
  200: 'TO',
  201: 'TR',
  202: 'TT',
  203: 'TV',
  204: 'TW',
  205: 'TZ',
  206: 'UA',
  207: 'UG',
  208: 'US',
  209: 'UY',
  210: 'UZ',
  211: 'VC',
  212: 'VE',
  213: 'VG',
  214: 'VI',
  215: 'VN',
  216: 'VU',
  217: 'WF',
  218: 'WS',
  219: 'YE',
  220: 'ZA',
  221: 'ZM',
  222: 'ZW',
}

export const FLAGS_SHORTCODES = {
  ac: [127462, 127464],
  ad: [127462, 127465],
  ae: [127462, 127466],
  af: [127462, 127467],
  ag: [127462, 127468],
  ai: [127462, 127470],
  al: [127462, 127473],
  am: [127462, 127474],
  ao: [127462, 127476],
  aq: [127462, 127478],
  ar: [127462, 127479],
  as: [127462, 127480],
  at: [127462, 127481],
  au: [127462, 127482],
  aw: [127462, 127484],
  ax: [127462, 127485],
  az: [127462, 127487],
  ba: [127463, 127462],
  bb: [127463, 127463],
  bd: [127463, 127465],
  be: [127463, 127466],
  bf: [127463, 127467],
  bg: [127463, 127468],
  bh: [127463, 127469],
  bi: [127463, 127470],
  bj: [127463, 127471],
  bl: [127463, 127473],
  bm: [127463, 127474],
  bn: [127463, 127475],
  bo: [127463, 127476],
  bq: [127463, 127478],
  br: [127463, 127479],
  bs: [127463, 127480],
  bt: [127463, 127481],
  bv: [127463, 127483],
  bw: [127463, 127484],
  by: [127463, 127486],
  bz: [127463, 127487],
  ca: [127464, 127462],
  cc: [127464, 127464],
  cd: [127464, 127465],
  cf: [127464, 127467],
  cg: [127464, 127468],
  ch: [127464, 127469],
  ci: [127464, 127470],
  ck: [127464, 127472],
  cl: [127464, 127473],
  cm: [127464, 127474],
  cn: [127464, 127475],
  co: [127464, 127476],
  cp: [127464, 127477],
  cr: [127464, 127479],
  cu: [127464, 127482],
  cv: [127464, 127483],
  cw: [127464, 127484],
  cx: [127464, 127485],
  cy: [127464, 127486],
  cz: [127464, 127487],
  de: [127465, 127466],
  dg: [127465, 127468],
  dj: [127465, 127471],
  dk: [127465, 127472],
  dm: [127465, 127474],
  do: [127465, 127476],
  dz: [127465, 127487],
  ea: [127466, 127462],
  ec: [127466, 127464],
  ee: [127466, 127466],
  eg: [127466, 127468],
  eh: [127466, 127469],
  er: [127466, 127479],
  es: [127466, 127480],
  et: [127466, 127481],
  eu: [127466, 127482],
  fi: [127467, 127470],
  fj: [127467, 127471],
  fk: [127467, 127472],
  fm: [127467, 127474],
  fo: [127467, 127476],
  fr: [127467, 127479],
  ga: [127468, 127462],
  gb: [127468, 127463],
  gd: [127468, 127465],
  ge: [127468, 127466],
  gf: [127468, 127467],
  gg: [127468, 127468],
  gh: [127468, 127469],
  gi: [127468, 127470],
  gl: [127468, 127473],
  gm: [127468, 127474],
  gn: [127468, 127475],
  gp: [127468, 127477],
  gq: [127468, 127478],
  gr: [127468, 127479],
  gs: [127468, 127480],
  gt: [127468, 127481],
  gu: [127468, 127482],
  gw: [127468, 127484],
  gy: [127468, 127486],
  hk: [127469, 127472],
  hm: [127469, 127474],
  hn: [127469, 127475],
  hr: [127469, 127479],
  ht: [127469, 127481],
  hu: [127469, 127482],
  ic: [127470, 127464],
  id: [127470, 127465],
  ie: [127470, 127466],
  il: [127470, 127473],
  im: [127470, 127474],
  in: [127470, 127475],
  io: [127470, 127476],
  iq: [127470, 127478],
  ir: [127470, 127479],
  is: [127470, 127480],
  it: [127470, 127481],
  je: [127471, 127466],
  jm: [127471, 127474],
  jo: [127471, 127476],
  jp: [127471, 127477],
  ke: [127472, 127466],
  kg: [127472, 127468],
  kh: [127472, 127469],
  ki: [127472, 127470],
  km: [127472, 127474],
  kn: [127472, 127475],
  kp: [127472, 127477],
  kr: [127472, 127479],
  kw: [127472, 127484],
  ky: [127472, 127486],
  kz: [127472, 127487],
  la: [127473, 127462],
  lb: [127473, 127463],
  lc: [127473, 127464],
  li: [127473, 127470],
  lk: [127473, 127472],
  lr: [127473, 127479],
  ls: [127473, 127480],
  lt: [127473, 127481],
  lu: [127473, 127482],
  lv: [127473, 127483],
  ly: [127473, 127486],
  ma: [127474, 127462],
  mc: [127474, 127464],
  md: [127474, 127465],
  me: [127474, 127466],
  mf: [127474, 127467],
  mg: [127474, 127468],
  mh: [127474, 127469],
  mk: [127474, 127472],
  ml: [127474, 127473],
  mm: [127474, 127474],
  mn: [127474, 127475],
  mo: [127474, 127476],
  mp: [127474, 127477],
  mq: [127474, 127478],
  mr: [127474, 127479],
  ms: [127474, 127480],
  mt: [127474, 127481],
  mu: [127474, 127482],
  mv: [127474, 127483],
  mw: [127474, 127484],
  mx: [127474, 127485],
  my: [127474, 127486],
  mz: [127474, 127487],
  na: [127475, 127462],
  nc: [127475, 127464],
  ne: [127475, 127466],
  nf: [127475, 127467],
  ng: [127475, 127468],
  ni: [127475, 127470],
  nl: [127475, 127473],
  no: [127475, 127476],
  np: [127475, 127477],
  nr: [127475, 127479],
  nu: [127475, 127482],
  nz: [127475, 127487],
  om: [127476, 127474],
  pa: [127477, 127462],
  pe: [127477, 127466],
  pf: [127477, 127467],
  pg: [127477, 127468],
  ph: [127477, 127469],
  pk: [127477, 127472],
  pl: [127477, 127473],
  pm: [127477, 127474],
  pn: [127477, 127475],
  pr: [127477, 127479],
  ps: [127477, 127480],
  pt: [127477, 127481],
  pw: [127477, 127484],
  py: [127477, 127486],
  qa: [127478, 127462],
  re: [127479, 127466],
  ro: [127479, 127476],
  rs: [127479, 127480],
  ru: [127479, 127482],
  rw: [127479, 127484],
  sa: [127480, 127462],
  sb: [127480, 127463],
  sc: [127480, 127464],
  sd: [127480, 127465],
  se: [127480, 127466],
  sg: [127480, 127468],
  sh: [127480, 127469],
  si: [127480, 127470],
  sj: [127480, 127471],
  sk: [127480, 127472],
  sl: [127480, 127473],
  sm: [127480, 127474],
  sn: [127480, 127475],
  so: [127480, 127476],
  sr: [127480, 127479],
  ss: [127480, 127480],
  st: [127480, 127481],
  sv: [127480, 127483],
  sx: [127480, 127485],
  sy: [127480, 127486],
  sz: [127480, 127487],
  ta: [127481, 127462],
  tc: [127481, 127464],
  td: [127481, 127465],
  tf: [127481, 127467],
  tg: [127481, 127468],
  th: [127481, 127469],
  tj: [127481, 127471],
  tk: [127481, 127472],
  tl: [127481, 127473],
  tm: [127481, 127474],
  tn: [127481, 127475],
  to: [127481, 127476],
  tr: [127481, 127479],
  tt: [127481, 127481],
  tv: [127481, 127483],
  tw: [127481, 127484],
  tz: [127481, 127487],
  ua: [127482, 127462],
  ug: [127482, 127468],
  um: [127482, 127474],
  us: [127482, 127480],
  uy: [127482, 127486],
  uz: [127482, 127487],
  va: [127483, 127462],
  vc: [127483, 127464],
  ve: [127483, 127466],
  vg: [127483, 127468],
  vi: [127483, 127470],
  vn: [127483, 127475],
  vu: [127483, 127482],
  wf: [127484, 127467],
  ws: [127484, 127480],
  xk: [127485, 127472],
  ye: [127486, 127466],
  yt: [127486, 127481],
  za: [127487, 127462],
  zm: [127487, 127474],
  zw: [127487, 127484],
}

export const FLAG_FILTER_GROUP_VALUES = getFlagFilterGroupValues()

export const POLYGON_LAYERS_AREA = 'POLYGON_LAYERS_AREA'
