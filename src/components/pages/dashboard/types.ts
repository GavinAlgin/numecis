export type Package = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    currency: string | null;
  };
  
  export type Lesson = {
    id: string;
    package_id: string;
    title: string;
    subtitle: string | null;
    file_url: string;
    order_index: number;
  };
  
  export type UserPurchase = {
    package_id: string;
  };