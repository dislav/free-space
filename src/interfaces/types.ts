export type PromiseStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type ActionSaga<T extends {} = any> = {
  payload: T;
  type: string;
};

export type ReduxStatus = {
  status: PromiseStatus;
  error?: string | null;
};

export type Response<T extends {} = any> = {
  status: boolean;
  data: { session?: boolean } & T;
  message?: string;
};

export type Auth = {
  id: string;
  hash: string;
  hash2: string;
  group: string[];
};

export type BaseUser = {
  id: string;
  mail: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  pic: string;
};

export type WashUser = {
  id: string;
  name: string;
  active: string;
  moderation: string;
  description: string;
  pic: string;
  city: string;
  street: string;
  worktime: string;
  phone: string;
  legal_info: string;
  created: string;
  updated: string;
  lat: string;
  lon: string;
};

export type Wash = {
  id: string;
  name: string;
  description: string;
  active: string;
  city: string;
  street: string;
  lat: string;
  lon: string;
  worktime: string;
  phone: string;
};

export type CreateWash = {
  owner_id: string;
  pass: string;
  nick: string;
  wash: string;
  group: boolean;
  link_wash: boolean;
};

export type City = {
  id: string;
  name: string;
  region_id: string;
};

export type Region = {
  id: string;
  name: string;
};

export type CarBody = {
  id: string;
  name: string;
  active: string;
  created: string;
};

export type Service = {
  id: string;
  name: string;
  about: string;
  price: any;
  active: string;
  service_id: string;
};

export type BaseService = {
  id: string;
  name: string;
  active: string;
  type: string;
  created: string;
};

export type GeoCode = {
  source: string;
  result: string;
  postal_code: string;
  country: string;
  country_iso_code: string;
  federal_district: string;
  region_fias_id: string;
  region_kladr_id: string;
  region_iso_code: string;
  region_with_type: string;
  region_type: string;
  region_type_full: string;
  region: string;
  area_fias_id: string | null;
  area_kladr_id: string | null;
  area_with_type: string | null;
  area_type: string | null;
  area_type_full: string | null;
  area: string | null;
  city_fias_id: string;
  city_kladr_id: string;
  city_with_type: string;
  city_type: string;
  city_type_full: string;
  city: string;
  city_area: string | null;
  city_district_fias_id: string | null;
  city_district_kladr_id: string | null;
  city_district_with_type: string;
  city_district_type: string;
  city_district_type_full: string;
  city_district: string;
  settlement_fias_id: string | null;
  settlement_kladr_id: string | null;
  settlement_with_type: string | null;
  settlement_type: string | null;
  settlement_type_full: string | null;
  settlement: string | null;
  street_fias_id: string;
  street_kladr_id: string;
  street_with_type: string;
  street_type: string;
  street_type_full: string;
  street: string;
  house_fias_id: string | null;
  house_kladr_id: string | null;
  house_type: string;
  house_type_full: string;
  house: string;
  block_type: string;
  block_type_full: string;
  block: string;
  entrance: string | null;
  floor: string | null;
  flat_fias_id: string | null;
  flat_type: string | null;
  flat_type_full: string | null;
  flat: string | null;
  flat_area: string | null;
  square_meter_price: string | null;
  flat_price: string | null;
  postal_box: string | null;
  fias_id: string;
  fias_code: string;
  fias_level: string;
  fias_actuality_state: string;
  kladr_id: string;
  capital_marker: string;
  okato: string;
  oktmo: string;
  tax_office: string;
  tax_office_legal: string;
  timezone: string;
  geo_lat: string;
  geo_lon: string;
  beltway_hit: string | null;
  beltway_distance: string | null;
  qc_geo: string;
  qc_complete: string;
  qc_house: string;
  qc: string;
  unparsed_parts: string | null;
  metro: string | null;
};

export type Box = {
  id: string;
  name: string;
  active: string;
};

export type Promotion = {
  id: string;
  wash_id: string | null;
  active: string;
  name: string;
  description: string;
  service: {
    service_id: string;
  }[];
  start: string;
  startlimit: string;
  end: string;
  endlimit: string;
  moderation: string;
  created: string;
  updated: string;
};

export type Order = {
  id: string;
  body: string;
  price: string;
  services: string[];
  wash_id: string;
  phone: string;
  time: string;
  date: string;
  status: string;
  box: string;
  hash: string;
  created: string;
  updated: string;
};

export type OptionProps = {
  label: string;
  value: string;
};

export type StatProps = {
  wash_list: string[];
  orders: number;
  orders_done: number;
  orders_approved: number;
  orders_cancel: number;
  sum: number;
  sum_done: number;
  sum_approved: number;
  sum_cancel: number;
  date: string;
  date_micro: number;
};

export type ChatProps = {
  id: string;
  key: string;
  messagetime: string;
  created: string;
};

export type ChatMessageProps = {
  id: string;
  text: string;
  status: string;
  user: string;
  hash: string;
  created: string;
};
