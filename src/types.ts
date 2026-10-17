export type Address = {
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
};

export type Zone = "domestic" | "europe" | "international";

export type Order = {
  orderId: string;
  customerEmail: string;
  subtotalCents: number;
  weightKg: number;
  address: Address;
};

export type TrackingStatus = "label_created" | "shipped" | "out_for_delivery" | "delivered" | "returned";

export type Shipment = {
  trackingId: string;
  orderId: string;
  zone: Zone;
  shippingCents: number;
  status: TrackingStatus;
  address: Address;
  createdAt: Date;
};
