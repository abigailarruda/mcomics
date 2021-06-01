import Character from "./Character";
import Event from "./Event";

export default class Comic {
  id?: number;
  title: string;
  description: string;
  images: string[];
  thumbnail: string;
  creators?: string[];
  characters: Character[];
  events: Event[];
  edition: number;

  constructor(
    title: string,
    description: string,
    images: string[],
    thumbnail: string,
    creators: string[],
    characters: Character[],
    events: Event[],
    edition: number
  ) {
    this.title = title;
    this.description = description;
    this.images = images;
    this.thumbnail = thumbnail;
    this.creators = creators;
    this.characters = characters;
    this.events = events;
    this.edition = edition;
  }

  setComicId(id: number) {
    this.id = id;
  }
}
