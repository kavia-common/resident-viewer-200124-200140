/**
 * Mock resident dataset used by the frontend in lieu of a backend.
 * Keep this as the single source of truth for initial UI development.
 */

/**
 * PUBLIC_INTERFACE
 * @typedef {Object} Resident
 * @property {string} id - Unique ID for the resident record.
 * @property {string} name - Full name.
 * @property {string} portraitUrl - URL to a portrait image (can be a placeholder).
 * @property {string} address - Street address.
 * @property {string} apartmentNumber - Apartment/suite identifier.
 * @property {string} [phone] - Optional phone number.
 * @property {string} [occupation] - Optional occupation.
 * @property {string} [family] - Optional family/household notes.
 * @property {number} [moveInYear] - Optional move-in year.
 */

/** @type {Resident[]} */
export const mockResidents = [
  {
    id: "r-001",
    name: "Ava Thompson",
    portraitUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=256&h=256&q=80",
    address: "124 Maple Street",
    apartmentNumber: "2B",
    phone: "(555) 010-1201",
    occupation: "Architect",
    family: "Lives with partner",
    moveInYear: 2019,
  },
  {
    id: "r-002",
    name: "Marcus Lee",
    portraitUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=256&h=256&q=80",
    address: "124 Maple Street",
    apartmentNumber: "7A",
    phone: "(555) 010-3344",
    occupation: "Software Engineer",
    family: "Single",
    moveInYear: 2021,
  },
  {
    id: "r-003",
    name: "Sofia Patel",
    portraitUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=256&h=256&q=80",
    address: "124 Maple Street",
    apartmentNumber: "3C",
    occupation: "Nurse",
    family: "Two kids",
    moveInYear: 2016,
  },
  {
    id: "r-004",
    name: "Ethan Rivera",
    portraitUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=256&h=256&q=80",
    address: "124 Maple Street",
    apartmentNumber: "11D",
    phone: "(555) 010-8890",
    occupation: "Teacher",
    family: "Lives with spouse",
    moveInYear: 2014,
  },
  {
    id: "r-005",
    name: "Grace Nguyen",
    portraitUrl: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=facearea&w=256&h=256&q=80",
    address: "124 Maple Street",
    apartmentNumber: "5F",
    phone: "(555) 010-4545",
    occupation: "Chef",
    family: "Roommate",
    moveInYear: 2020,
  },
];
