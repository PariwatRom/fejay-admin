export enum AppView {
  // User Portal
  USER_BOOKING = 'USER_BOOKING',
  USER_QUEUE = 'USER_QUEUE',
  
  // Shared Booking Flow
  EVENTS = 'EVENTS',
  MODELS = 'MODELS',
  SUMMARY = 'SUMMARY',
  CUSTOMER_FORM = 'CUSTOMER_FORM',
  PAYMENT = 'PAYMENT',
  SUCCESS = 'SUCCESS',
  
  // Staff Portal
  STAFF_DASHBOARD = 'STAFF_DASHBOARD',
  
  // Admin Portal
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ADMIN_EVENTS = 'ADMIN_EVENTS',
  ADMIN_SETTINGS = 'ADMIN_SETTINGS',
  
  // Finance Portal (Legacy/Extra)
  FINANCE_DASHBOARD = 'FINANCE_DASHBOARD',
  
  // Auth & Profile
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  PROFILE = 'PROFILE',
  
  // Legacy
  CHECK_QUEUE = 'CHECK_QUEUE'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  FINANCE = 'FINANCE',
  USER = 'USER'
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  phone: string;
  email: string;
  role: UserRole;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  monthGroup?: string;
  stock: {
    s24u: number;
    i15pm: number;
  };
  booked: {
    s24u: number;
    i15pm: number;
  };
  soldOut?: boolean;
}

export interface Booking {
  id: string;
  nickname: string;
  phone: string;
  model: 'S24 Ultra' | 'iPhone 15 Pro Max';
  eventId: string;
  eventName: string;
  status: 'PENDING' | 'PICKED_UP' | 'RETURNED' | 'CANCELLED';
  timestamp: string;
}

export interface Device {
  sku: string;
  name: string;
  price: number;
  available_qty: number;
  total_qty: number;
  image: string;
  colorHex?: string;
  emoji?: string;
  description?: string;
}

export interface DeviceModel {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  emoji: string;
  availableCount: number;
}

export interface DeviceUnit {
  id: string;
  unitNo: string;
  modelId: string;
  status: 'AVAILABLE' | 'BOOKED' | 'BLOCKED';
  lockedUntil?: number;
}

export interface BookingRequest {
  eventId: string;
  modelId: string;
  unitId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phone: string;
  paymentType: 'DEPOSIT' | 'FULL';
}

export interface BookingResponse {
  bookingId: string;
  shortCode: string;
  totalPrice: number;
  paidAmount: number;
  remainingAmount: number;
  qrCodeUrl: string;
  expireAt: number;
  status: 'PENDING_PAYMENT' | 'PAID' | 'CANCELLED';
  event: string;
  model: string;
  unit: string;
  nickname?: string;
  phone?: string;
}
