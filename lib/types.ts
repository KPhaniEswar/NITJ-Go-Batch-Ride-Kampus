export interface Passenger {
  id: string
  name: string
  phone: string
}

export interface Ride {
  id: string
  creatorName: string
  creatorPhone: string
  origin: string
  destination: string
  departureTime: string
  capacity: number
  passengers: Passenger[]
  createdAt: string
}

export const CAMPUS_LOCATIONS = [
  "NITJ Main Gate",
  "Hostel Block A",
  "Hostel Block B",
  "Hostel Block C",
  "Hostel Block D",
  "Girls Hostel",
  "Academic Block",
  "Library",
  "Canteen",
  "Sports Complex",
  "Maqsuda",
  "Patel Chowk",
  "Jyoti Chowk",
  "MBD Mall",
  "Model Town",
  "PPR Mall",
  "Bus Stand Jalandhar",
  "Curo Mall",
  "City Railway Station",
  "Cantt. Railway Station",
  "Toor Enclave",
  "Verka Milkplant",
  "PAP Chowk",
  "Rama Mandi",
  "LPU Phagwara",
  "Bidhipur",
  "Kartarpur",
] as const

export const SECURITY_CONTACTS = [
  { name: "Campus Security Control Room", phone: "0181-2690301" },
  { name: "NITJ Security Officer", phone: "0181-2690453" },
  { name: "Jalandhar Police", phone: "112" },
] as const

export const OFFICIAL_DRIVERS = [
  { name: "Mr. Buta Ram", phone: "8427947664", vehicle: "PB08FL5461" },
  { name: "Mr. Dalip Kumar", phone: "9056598913", vehicle: "PB08BJ3266" },
  { name: "Mr. Rajesh Kumar Maurya", phone: "9888258122", vehicle: "PB08CB6756" },
  { name: "Mr. Talwinder Singh", phone: "9463787031", vehicle: "PB08FM6267" },
  { name: "Mr. Deepak Mishra", phone: "6283102788", vehicle: "PB08EJ4263" },
  { name: "Mr. Balwinder", phone: "7986478437", vehicle: "PB08FT6965" },
  { name: "Mr. Lakhwinder Singh", phone: "8968893936", vehicle: "PB08Z7767" },
  { name: "Mr. RajKumar", phone: "7696171228", vehicle: "PB09X1832" },
  { name: "Mr. Rajinder Kumar", phone: "9872071380", vehicle: "PB08FH5387" },
  { name: "Mr. Prashant Sircar", phone: "8847573188", vehicle: "PB08FF3784" },
] as const

export interface FareEntry {
  destination: string
  sharing: number
  privateDay: number
  privateNight: number
  towardNITJNight: number
}

export const FARE_CHART: FareEntry[] = [
  { destination: "Maqsuda", sharing: 20, privateDay: 120, privateNight: 200, towardNITJNight: 250 },
  { destination: "Patel Chowk", sharing: 30, privateDay: 180, privateNight: 300, towardNITJNight: 350 },
  { destination: "Jyoti Chowk", sharing: 50, privateDay: 200, privateNight: 350, towardNITJNight: 400 },
  { destination: "MBD Mall", sharing: 50, privateDay: 200, privateNight: 400, towardNITJNight: 450 },
  { destination: "Model Town", sharing: 50, privateDay: 300, privateNight: 400, towardNITJNight: 450 },
  { destination: "PPR Mall", sharing: 60, privateDay: 350, privateNight: 500, towardNITJNight: 550 },
  { destination: "Bus Stand", sharing: 50, privateDay: 300, privateNight: 400, towardNITJNight: 450 },
  { destination: "Curo Mall", sharing: 70, privateDay: 350, privateNight: 500, towardNITJNight: 550 },
  { destination: "City Railway Station", sharing: 50, privateDay: 300, privateNight: 400, towardNITJNight: 450 },
  { destination: "Guru Nanak Mission Chowk", sharing: 50, privateDay: 300, privateNight: 400, towardNITJNight: 450 },
  { destination: "Toor Enclave", sharing: 20, privateDay: 50, privateNight: 150, towardNITJNight: 200 },
  { destination: "Verka Milkplant", sharing: 20, privateDay: 50, privateNight: 150, towardNITJNight: 200 },
  { destination: "SERB Complex", sharing: 30, privateDay: 100, privateNight: 200, towardNITJNight: 250 },
  { destination: "Pathankot Bypass", sharing: 30, privateDay: 100, privateNight: 250, towardNITJNight: 300 },
  { destination: "PAP Chowk", sharing: 50, privateDay: 300, privateNight: 450, towardNITJNight: 450 },
  { destination: "Rama Mandi", sharing: 60, privateDay: 300, privateNight: 450, towardNITJNight: 500 },
  { destination: "Cantt. Railway Station", sharing: 60, privateDay: 350, privateNight: 450, towardNITJNight: 500 },
  { destination: "Saffron Tower (Jalandhar-Phagwara Rd)", sharing: 70, privateDay: 300, privateNight: 500, towardNITJNight: 550 },
  { destination: "Havelli / EastWood Village", sharing: 80, privateDay: 400, privateNight: 550, towardNITJNight: 600 },
  { destination: "LPU Phagwara", sharing: 80, privateDay: 450, privateNight: 600, towardNITJNight: 650 },
  { destination: "Bidhipur", sharing: 20, privateDay: 50, privateNight: 100, towardNITJNight: 150 },
  { destination: "Kartarpur", sharing: 30, privateDay: 100, privateNight: 200, towardNITJNight: 250 },
]
