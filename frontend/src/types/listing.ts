export interface Listing {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: {
    _id: string;
    name: string;
  };
  pricePerDay: number;
  previousPrice?: number;
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  viewCount: number;
  contactClicks: Array<{
    user: {
      _id: string;
      name: string;
      email: string;
    };
    timestamp: string;
  }>;
  createdAt: string;
}
