const ROOMS_KEY = "sd_rooms";
const MENU_KEY = "sd_menu";

export function loadRooms() {
  try {
    return JSON.parse(localStorage.getItem(ROOMS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveRooms(rooms) {
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
}

export function loadMenu() {
  try {
    return JSON.parse(localStorage.getItem(MENU_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveMenu(items) {
  localStorage.setItem(MENU_KEY, JSON.stringify(items));
}
const BOOKINGS_KEY = "sd_bookings";
const TABLE_KEY = "sd_table_reservations";

export function loadBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function loadTableReservations() {
  try {
    return JSON.parse(localStorage.getItem(TABLE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveTableReservations(list) {
  localStorage.setItem(TABLE_KEY, JSON.stringify(list));
}
