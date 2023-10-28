interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  birthdate: Date;
}
interface IBook {
  id: number;
  title: string;
  isbn: string;
  genre: string;
  author: string;
  year: number;
  quantity: number;
}
interface IRent {
  id: number;
  user_id: number;
  book_id: number;
  startDate: Date;
  endDate: Date;
  notes: string;
  status: "rented" | "returned";
}

export { IUser, IBook, IRent };
