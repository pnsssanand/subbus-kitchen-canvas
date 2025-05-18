
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description?: string;
  isSpecial?: boolean;
}
