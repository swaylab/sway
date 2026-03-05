type PoolStatus = "open" | "bidding" | "selected" | "completed" | "cancelled";
type BidStatus = "pending" | "accepted" | "rejected";
type ParticipantStatus = "locked" | "refunded" | "released";

type Pool = {
  id: string;
  creator_wallet: string | null;
  title: string;
  description: string | null;
  category_id: string | null;
  image_url: string | null;
  individual_price: number;
  target_price: number;
  min_participants: number;
  current_participants: number;
  status: PoolStatus;
  bidding_ends_at: string | null;
  expires_at: string;
  contract_address: string | null;
  created_at: string;
  updated_at: string;
  // joined
  categories?: Category;
};

type Category = {
  id: string;
  label: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

type Seller = {
  id: string;
  wallet_address: string;
  company_name: string;
  location: string | null;
  rating: number;
  review_count: number;
  verified: boolean;
  website_url: string | null;
  created_at: string;
};

type Bid = {
  id: string;
  pool_id: string;
  seller_id: string;
  price: number;
  delivery_days: number;
  warranty: string | null;
  notes: string | null;
  status: BidStatus;
  created_at: string;
  updated_at: string;
  // joined
  sellers?: Seller;
};

type PoolParticipant = {
  id: string;
  pool_id: string;
  wallet_address: string;
  amount_locked: number;
  status: ParticipantStatus;
  tx_hash: string | null;
  joined_at: string;
};

type User = {
  id: string;
  wallet_address: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};
