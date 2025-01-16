import { height } from "@mui/system";
import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";

export const mockPatientData = [
  {
    id: 1,
    dateOfEntry: "2022-01-01",
    fullName: "John Doe",
    firstName: "John",
    lastName: "Doe",
    referredByDoctor: "Dr. Smith",
    status: "In Treatment",
    gender: "Male",
    age: 35,
    address: "123 Main St, Anytown USA",
    phoneNumber: "555-1234"
  },
  {
    id: 2,
    dateOfEntry: "2022-01-05",
    fullName: "Jane Smith",
    firstName: "Jane",
    lastName: "Smith",
    referredByDoctor: "Dr. Johnson",
    status: "Discharged",
    gender: "Female",
    age: 42,
    address: "456 Oak St, Anytown USA",
    phoneNumber: "555-5678"
  },
  {
    id: 3,
    dateOfEntry: "2022-01-05",
    fullName: "Jane Smith",
    firstName: "Jane",
    lastName: "Smith",
    referredByDoctor: "Dr. Johnson",
    status: "Discharged",
    gender: "Female",
    age: 42,
    address: "456 Oak St, Anytown USA",
    phoneNumber: "555-5678"
  },
  {
    id: 4,
    dateOfEntry: "2022-01-05",
    fullName: "Jane Smith",
    firstName: "Jane",
    lastName: "Smith",
    referredByDoctor: "Dr. Johnson",
    status: "Discharged",
    gender: "Female",
    age: 42,
    address: "456 Oak St, Anytown USA",
    phoneNumber: "555-5678"
  },
  {
    id: 5,
    dateOfEntry: "2022-01-05",
    fullName: "Jane Smith",
    firstName: "Jane",
    lastName: "Smith",
    referredByDoctor: "Dr. Johnson",
    status: "Discharged",
    gender: "Female",
    age: 42,
    address: "456 Oak St, Anytown USA",
    phoneNumber: "555-5678"
  },
  {
    id: 6,
    dateOfEntry: "2022-01-05",
    fullName: "Jane Smith",
    firstName: "Jane",
    lastName: "Smith",
    referredByDoctor: "Dr. Johnson",
    status: "Discharged",
    gender: "Female",
    age: 42,
    address: "456 Oak St, Anytown USA",
    phoneNumber: "555-5678"
  },
  {
    id: 7,
    dateOfEntry: "2022-01-05",
    fullName: "Jane Smith",
    firstName: "Jane",
    lastName: "Smith",
    referredByDoctor: "Dr. Johnson",
    status: "Discharged",
    gender: "Female",
    age: 42,
    address: "456 Oak St, Anytown USA",
    phoneNumber: "555-5678"
  }
];

export const mockDoctorsData = [
  {
    id: 1,
    fullName: "John Doe",
    gender: "Male",
    specialist: "Cardiologist",
    phone: "555-1234",
    email: "johndoe@email.com",
    education: "MBBS, MD"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    gender: "Female",
    specialist: "Cardiologist",
    phone: "555-5678",
    email: "janesmith@email.com",
    education: "MBBS"
  },
  {
    id: 3,
    fullName: "Jane Smith",
    gender: "Female",
    specialist: "Cardiologist",
    phone: "555-5678",
    email: "janesmith@email.com",
    education: "MBBS, MD"
  },
  {
    id: 4,
    fullName: "Jane Smith",
    gender: "Male",
    specialist: "Cardiologist",
    phone: "555-5678",
    email: "janesmith@email.com",
    education: "MBBS, MD"
  },
  {
    id: 5,
    fullName: "Jane Smith",
    gender: "Male",
    specialist: "Cardiologist",
    phone: "555-5678",
    email: "janesmith@email.com",
    education: "MBBS, MD"
  },
  {
    id: 6,
    fullName: "Jane Smith",
    gender: "Female",
    specialist: "Dentist",
    phone: "555-5678",
    email: "janesmith@email.com",
    education: "BDS, MDS"
  },
  {
    id: 7,
    fullName: "Jane Smith",
    gender: "Female",
    specialist: "Cardiologist",
    phone: "555-5678",
    email: "janesmith@email.com",
    education: "MBBS"
  }
];

export const appointmentsData = [
  {
    id: 1,
    fullName: "John Doe",
    gender: "Male",
    phone: "555-1234",
    age: "19",
    appointmentDate: "2022-01-01",
    referredByDoctor: "Dr. Smith",
    assignedDoctor: "Dr. John",
    status: "open"
  },
  {
    id: 2,
    fullName: "John Doe",
    gender: "Male",
    phone: "555-1234",
    age: "19",
    appointmentDate: "2022-01-01",
    referredByDoctor: "Dr. Smith",
    assignedDoctor: "Dr. John",
    status: "open"
  },
  {
    id: 3,
    fullName: "John Doe",
    gender: "Male",
    phone: "555-1234",
    age: "19",
    appointmentDate: "2022-01-01",
    referredByDoctor: "Dr. Smith",
    assignedDoctor: "Dr. John",
    status: "open"
  },
  {
    id: 4,
    fullName: "John Doe",
    gender: "Male",
    phone: "555-1234",
    age: "19",
    appointmentDate: "2022-01-01",
    referredByDoctor: "Dr. Smith",
    assignedDoctor: "Dr. John",
    status: "completed"
  }
];

export const labResults = [
  {
    type: "Blood Test",
    result: "7.8",
    referenceRange: "4.0 - 6.0",
    unit: "mmol/L"
  },
  {
    type: "Urine Test",
    result: "Negative",
    referenceRange: "Negative",
    unit: null
  },
  {
    type: "ECG",
    result: "Normal sinus rhythm",
    referenceRange: null,
    unit: null
  }
];

//* calendar Events
let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}
let todayStr = moment().format("YYYY-MM-DD"); // YYYY-MM-DD of today

interface Event {
  id: string;
  title: string;
  start: string;
}

export const INITIAL_EVENTS: Event[] = [
  {
    id: createEventId(),
    title: "Lunch Pary",
    start: todayStr + "T09:00:00"
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + "T16:00:00"
  },
  {
    id: createEventId(),
    title: "Head Meetup",
    start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + "T20:00:00"
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + "T09:00:00"
  },
  {
    id: createEventId(),
    title: "Payment Shedules",
    start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + "T13:00:00"
  },
  {
    id: createEventId(),
    title: "VC Meeting",
    start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + "T13:00:00"
  }
];

export const INITIAL_TASKS = [
  {
    id: uuidv4(),
    title: "Lunch Pary",
    state: "PLANNED"
  },
  {
    id: uuidv4(),
    title: "Timed event",
    state: "PLANNED"
  }
];


export const searchData = [
  {
    chartId: 1,
    diagnosis: "Hypertension",
    medication: "Lisinopril",
    firstName: "John",
    lastName: "Doe",
    mi: "A",
    dob: "1980-04-15",
    age: 43,
    phone: "555-123-4567"
  },
  {
    chartId: 2,
    diagnosis: "Type 2 Diabetes",
    medication: "Metformin",
    firstName: "Mary",
    lastName: "Johnson",
    mi: "B",
    dob: "1975-09-20",
    age: 48,
    phone: "555-987-6543"
  },
  {
    chartId: 3,
    diagnosis: "Asthma",
    medication: "Albuterol",
    firstName: "James",
    lastName: "Williams",
    mi: "C",
    dob: "1990-07-05",
    age: 33,
    phone: "555-654-3210"
  },
  {
    chartId: 4,
    diagnosis: "Hyperlipidemia",
    medication: "Atorvastatin",
    firstName: "Patricia",
    lastName: "Brown",
    mi: "D",
    dob: "1985-12-12",
    age: 38,
    phone: "555-321-0987"
  },
  {
    chartId: 5,
    diagnosis: "Anxiety",
    medication: "Sertraline",
    firstName: "Michael",
    lastName: "Jones",
    mi: "E",
    dob: "1995-03-25",
    age: 29,
    phone: "555-789-1234"
  },
  {
    chartId: 6,
    diagnosis: "Chronic Pain",
    medication: "Gabapentin",
    firstName: "Linda",
    lastName: "Miller",
    mi: "F",
    dob: "1968-08-14",
    age: 55,
    phone: "555-432-6789"
  },
  {
    chartId: 7,
    diagnosis: "Depression",
    medication: "Fluoxetine",
    firstName: "Robert",
    lastName: "Davis",
    mi: "G",
    dob: "1987-01-22",
    age: 36,
    phone: "555-876-5432"
  },
  {
    chartId: 8,
    diagnosis: "COPD",
    medication: "Tiotropium",
    firstName: "Barbara",
    lastName: "Garcia",
    mi: "H",
    dob: "1970-10-11",
    age: 53,
    phone: "555-345-9876"
  },
  {
    chartId: 9,
    diagnosis: "Arthritis",
    medication: "Ibuprofen",
    firstName: "Thomas",
    lastName: "Martinez",
    mi: "I",
    dob: "1960-06-07",
    age: 63,
    phone: "555-234-5678"
  },
  {
    chartId: 10,
    diagnosis: "Insomnia",
    medication: "Zolpidem",
    firstName: "Susan",
    lastName: "Hernandez",
    mi: "J",
    dob: "1992-11-03",
    age: 31,
    phone: "555-654-9870"
  }
];



export const vitalSignsData = [
  { date: '2024-07-01', systolic: 145, diastolic: 90, temperature: 98.7, weight: 140, height: 64, respiration: 39, pulse: 97, spO2: 86 },
  { date: '2024-09-02', systolic: 135, diastolic: 85, temperature: 98.6, weight: 132, height: 64, respiration: 37, pulse: 95, spO2: 88 },
  { date: '2025-01-03', systolic: 120, diastolic: 80, temperature: 98.5, weight: 101, height: 64, respiration: 36, pulse: 90, spO2: 92 },
  { date: '2025-01-04', systolic: 140, diastolic: 88, temperature: 98.8, weight: 103, height: 64, respiration: 38, pulse: 94, spO2: 89 },
  { date: '2025-01-05', systolic: 130, diastolic: 84, temperature: 98.6, weight: 104, height: 64, respiration: 37, pulse: 92, spO2: 91 },
  { date: '2025-01-06', systolic: 150, diastolic: 92, temperature: 99.0, weight: 105, height: 64, respiration: 40, pulse: 98, spO2: 85 },
  { date: '2025-01-07', systolic: 125, diastolic: 82, temperature: 98.4, weight: 102, height: 64, respiration: 35, pulse: 89, spO2: 90 },
  { date: '2025-01-08', systolic: 138, diastolic: 87, temperature: 98.7, weight: 101, height: 64, respiration: 37, pulse: 93, spO2: 88 },
  { date: '2025-01-09', systolic: 132, diastolic: 83, temperature: 98.5, weight: 100, height: 64, respiration: 36, pulse: 91, spO2: 92 },
  { date: '2025-01-10', systolic: 145, diastolic: 90, temperature: 98.9, weight: 106, height: 64, respiration: 39, pulse: 96, spO2: 87 },
];
