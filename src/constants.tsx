import { Device, Event } from './types';

export const DEVICES: Device[] = [
  { 
    sku: 'S23U', 
    name: 'Samsung Galaxy S23 Ultra', 
    price: 900, 
    available_qty: 6, 
    total_qty: 6, 
    image: '', 
    colorHex: '#556B2F',
    emoji: '🔭',
    description: 'Legendary Moon Zoom, Night Vision'
  },
  { 
    sku: 'S24U', 
    name: 'Samsung Galaxy S24 Ultra', 
    price: 900, 
    available_qty: 6, 
    total_qty: 6, 
    image: '', 
    colorHex: '#4682B4',
    emoji: '📷',
    description: '100x Zoom, Titanium Finish'
  },
  { 
    sku: 'S25U', 
    name: 'Samsung Galaxy S25 Ultra', 
    price: 900, 
    available_qty: 6, 
    total_qty: 6, 
    image: '', 
    colorHex: '#191970',
    emoji: '👑',
    description: '100x AI Space Zoom, S-Pen included'
  },
  { 
    sku: 'VX200P', 
    name: 'Vivo X200 Pro', 
    price: 900, 
    available_qty: 4, 
    total_qty: 4, 
    image: '', 
    colorHex: '#00008B',
    emoji: '📸',
    description: 'Pro Imaging Chip, High Speed'
  },
  { 
    sku: 'VX200U', 
    name: 'Vivo X200 Ultra', 
    price: 900, 
    available_qty: 4, 
    total_qty: 4, 
    image: '', 
    colorHex: '#4B0082',
    emoji: '💎',
    description: 'The Ultimate Camera Phone'
  },
  { 
    sku: 'VX300P', 
    name: 'Vivo X300 Pro', 
    price: 900, 
    available_qty: 3, 
    total_qty: 3, 
    image: '', 
    colorHex: '#800000',
    emoji: '🎨',
    description: 'Enhanced Pro Video Features'
  }
];

export const EVENTS: Event[] = [
  { 
    id: 'EV-FEB-01', 
    name: '[Fri] RISER CONCERT : THE FIRST RISE', 
    date: 'ศุกร์ 13 กุมภาพันธ์ 2569 17.00', 
    location: 'Impact Arena', 
    monthGroup: 'February 2026',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=300&h=450',
    soldOut: true
  },
  { 
    id: 'EV-FEB-02', 
    name: 'SMTOWN LIVE 2025-26 in BANGKOK', 
    date: 'เสาร์ 14 กุมภาพันธ์ 2569 18.00', 
    location: 'Rajamangala Stadium', 
    monthGroup: 'February 2026',
    image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-FEB-03', 
    name: '[Sat] RISER CONCERT : THE FIRST RISE', 
    date: 'เสาร์ 14 กุมภาพันธ์ 2569 17.00', 
    location: 'Impact Arena', 
    monthGroup: 'February 2026',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-FEB-04', 
    name: '[Sat] 2026 G-DRAGON FAM MEETING', 
    date: 'เสาร์ 21 กุมภาพันธ์ 2569 TBA', 
    location: 'Union Hall', 
    monthGroup: 'February 2026',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=300&h=450',
    soldOut: true
  },
  { 
    id: 'EV-FEB-05', 
    name: '[Sun] 2026 G-DRAGON FAM MEETING', 
    date: 'อาทิตย์ 22 กุมภาพันธ์ 2569 TBA', 
    location: 'Union Hall', 
    monthGroup: 'February 2026',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-FEB-06', 
    name: '[Sat] MARK TUAN Silhouette: The Shape of You FANCON 2026', 
    date: 'เสาร์ 28 กุมภาพันธ์ 2569 TBA', 
    location: 'QSNCC', 
    monthGroup: 'February 2026',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-MAR-01', 
    name: '[Sun] MARK TUAN Silhouette: The Shape of You FANCON 2026', 
    date: 'อาทิตย์ 1 มีนาคม 2569 19.00', 
    location: 'QSNCC', 
    monthGroup: 'March 2026',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-MAR-02', 
    name: '[Sun] POLCA FAM MEETING', 
    date: 'อาทิตย์ 1 มีนาคม 2569 17.00', 
    location: 'Thunder Dome', 
    monthGroup: 'March 2026',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-MAR-03', 
    name: 'Three Man Down Live At สนามศุภชลาศัย', 
    date: 'เสาร์ 7 มีนาคม 2569 18.30', 
    location: 'National Stadium', 
    monthGroup: 'March 2026',
    image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-MAR-04', 
    name: 'Three Man Down Live At สนามศุภชลาศัย', 
    date: 'อาทิตย์ 8 มีนาคม 2569 18.30', 
    location: 'National Stadium', 
    monthGroup: 'March 2026',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-MAR-05', 
    name: '[Fri] BILLKIN CONCERT 2026', 
    date: 'ศุกร์ 13 มีนาคม 2569 TBA', 
    location: 'Impact Arena', 
    monthGroup: 'March 2026',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=300&h=450' 
  },
  { 
    id: 'EV-MAR-06', 
    name: '[Sat] SEVENTEEN WORLD TOUR [NEW_] IN BANGKOK', 
    date: 'เสาร์ 14 มีนาคม 2569 18.30', 
    location: 'Rajamangala Stadium', 
    monthGroup: 'March 2026',
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=300&h=450' 
  }
];
