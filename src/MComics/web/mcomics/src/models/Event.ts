import Character from "./Character";
import Comic from "./Comic";

export default class Event {
  id?: number;
  title: string;
  description: string;
  image: string;
  comics: Comic[];
  characters: Character[];

  constructor(
    title: string,
    description: string,
    image: string,
    comics: Comic[],
    characters: Character[]
  ) {
    this.title = title;
    this.description = description;
    this.image = image + "/portrait_uncanny.jpg";
    this.comics = comics;
    this.characters = characters;
  }

  setEventId(id: number) {
    this.id = id;
  }
}
