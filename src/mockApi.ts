import { BookingRequest, BookingResponse, DeviceUnit, DeviceModel, Event } from './types';
import { DEVICES, EVENTS } from './constants';

let mockUnits: DeviceUnit[] = [];

const initializeUnits = () => {
  if (mockUnits.length > 0) return;
  
  DEVICES.forEach(model => {
    for (let i = 1; i <= model.total_qty; i++) {
      mockUnits.push({
        id: `${model.sku}-${i}`,
        unitNo: `#${i}`,
        modelId: model.sku,
        status: i <= model.available_qty ? 'AVAILABLE' : 'BOOKED' 
      });
    }
  });
};

initializeUnits();

let mockBookings: BookingResponse[] = [];

export const apiGetEvents = async (): Promise<Event[]> => {
  return new Promise(resolve => setTimeout(() => resolve(EVENTS), 300));
};

export const apiGetModels = async (eventId: string): Promise<DeviceModel[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const models = DEVICES.map(d => ({
        id: d.sku,
        name: d.name,
        price: d.price,
        image: d.image,
        description: d.description || '',
        emoji: d.emoji || '📱',
        availableCount: mockUnits.filter(u => u.modelId === d.sku && u.status === 'AVAILABLE').length
      }));
      resolve(models);
    }, 300);
  });
};

export const apiGetUnits = async (eventId: string, modelId: string): Promise<DeviceUnit[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const units = mockUnits.filter(u => u.modelId === modelId);
      resolve(units);
    }, 300);
  });
};

export const apiCreateBooking = async (req: BookingRequest): Promise<BookingResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const unitIndex = mockUnits.findIndex(u => u.id === req.unitId);
      if (unitIndex === -1 || mockUnits[unitIndex].status !== 'AVAILABLE') {
        reject(new Error("Device is no longer available"));
        return;
      }

      mockUnits[unitIndex].status = 'BOOKED';

      const bookingId = `BK-${Date.now().toString().slice(-6)}`;
      const shortCode = `FJ${Math.floor(1000 + Math.random() * 9000)}`;
      const model = DEVICES.find(d => d.sku === req.modelId);
      const event = EVENTS.find(e => e.id === req.eventId);
      
      const price = model ? model.price : 0;
      const deposit = 300;
      const paid = req.paymentType === 'DEPOSIT' ? deposit : (price + deposit);

      const newBooking: BookingResponse = {
        bookingId,
        shortCode,
        totalPrice: price + 300,
        paidAmount: paid,
        remainingAmount: (price + 300) - paid,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}`,
        expireAt: Date.now() + 10 * 60 * 1000,
        status: 'PENDING_PAYMENT',
        event: event?.name || '',
        model: model?.name || '',
        unit: req.unitId
      };

      mockBookings.push(newBooking);
      resolve(newBooking);
    }, 800);
  });
};

export const apiGetBookingStatus = async (code: string): Promise<BookingResponse | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const booking = mockBookings.find(b => b.bookingId === code || b.shortCode === code);
      resolve(booking || null);
    }, 500);
  });
};
