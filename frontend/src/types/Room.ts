export interface Room {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  size: number;
  capacity: number;
  badge: 'standard' | 'premium' | 'suite';
  featured?: boolean;
  imageUrl: string;
}
