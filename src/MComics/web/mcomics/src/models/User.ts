export default class User {
  id: string;
  email: string;
  image?: string;

  constructor(id: string, email: string, image?: string) {
    this.id = id;
    this.email = email;
    this.image = image;
  }

  setImage(image: string) {
    this.image = image;
  }
}
