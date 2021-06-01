import Comic from "./Comic";
import Event from "./Event";

export default class Character {
  id?: number;
  name: string;
  description: string;
  image: string;
  comics: Comic[];
  events: Event[];

  constructor(
    name: string,
    description: string,
    image: string,
    comics: Comic[],
    events: Event[]
  ) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.comics = comics;
    this.events = events;
  }
}
