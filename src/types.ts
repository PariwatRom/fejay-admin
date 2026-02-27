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
  time?: string;
  location: string;
  venue?: string;
  image: string;
  description?: string;
  capacity?: number;
  price?: number;
  status?: 'OPEN' | 'CLOSED' | 'DRAFT';
  monthGroup?: string;
  stock: {
    s24u: number;
    i15pm: number;
  };
  booked: {
    s24u: number;
    i15pm: number;
  };
  mobilePrices?: {
    productId: string;
    modelName: string;
    eventPrice: number;
  }[];
  soldOut?: boolean;
}

export interface Booking {
  id: string;
  nickname: string;
  phone: string;
  idCard?: string;
  model: 'S24 Ultra' | 'iPhone 15 Pro Max';
  eventId: string;
  eventName: string;
  status: 'PENDING' | 'PAID' | 'PICKED_UP' | 'RECEIVED' | 'RETURNED' | 'CANCELLED';
  timestamp: string;
  receiveDate?: string;
  receiverName?: string;
  receiverPhone?: string;
  notes?: string;
}

export interface ProductUnit {
  id: string;
  productId: string;
  modelName: string;
  serialNumber: string;
  usageCount: number;
  batteryHealth: number;
  conditionScore: number;
  maintenanceStatus: 'Excellent' | 'Good' | 'Warning' | 'Maintenance Required';
  lastMaintenance?: string;
  createdAt: string;
}

export interface MaintenanceLog {
  id: string;
  unitId: string;
  issueType: string;
  description: string;
  repairCost: number;
  repairDate: string;
  technician: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  inUseStock: number;
  lowStockThreshold: number;
  image: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  lastUpdated: string;
  updatedBy: string;
}

export interface ScanHistory {
  id: string;
  timestamp: string;
  bookingId: string;
  customerName: string;
  productName: string;
  status: 'VALID' | 'USED' | 'EXPIRED' | 'RECEIVED';
  adminName: string;
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
