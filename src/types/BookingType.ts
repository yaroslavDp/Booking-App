export interface BookType {
    id: string;
    userId: string;
    tripId: string;
    guests: number;
    date: string;
    trip: BookItem;
    totalPrice: number;
    createdAt: string;
}
  
export interface BookItem {
  title: string;
  duration: number;
  price: number;
}