export default interface Event {
  allday: boolean;
  calendar_id: number;
  canonical_url: string;
  cost_display: string;
  cost_external_url: string;
  cost_type: string;
  custom_url: string;
  end_datetime: Date;
  event_status: string;
  feed_id: number;
  id: number;
  instance: string;
  is_example_event: boolean;
  post_to_facebook: boolean;
  post_to_twitter: boolean;
  start_datetime: Date;
  // taxonomies: {, … }
  timezone: string;
  title: string;
  uid: string;
  url: string;
  user: string;
  images?: EventImage[];
  description_short?: string;
}

export interface ImageProps {
  width: number;
  height: number;
  url: string;
}
export interface EventImage {
  id: number;
  sizes: {
    full: ImageProps;
    medium: ImageProps;
    small: ImageProps;
    thumbnail: ImageProps;
  };
  title: string;
}
