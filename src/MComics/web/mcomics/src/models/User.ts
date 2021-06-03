export default class User {
  id: string;
  email: string;
  image?: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }

  setImage(image: string) {
    this.image = image;
  }
}
