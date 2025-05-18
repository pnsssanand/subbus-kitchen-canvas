
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;  // Made optional with '?'
  description?: string;
  isSpecial?: boolean;
}
