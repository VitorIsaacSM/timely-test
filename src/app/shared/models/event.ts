export default interface Event {
  end_datetime: Date;
  start_datetime: Date;
  title: string;
  url: string;
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
    medium?: ImageProps;
    small?: ImageProps;
    thumbnail?: ImageProps;
  };
  title: string;
}
