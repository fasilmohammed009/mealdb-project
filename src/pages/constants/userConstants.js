// API Configuration
export const API_ENDPOINTS = {
  USERS: import.meta.env.VITE_BASE_URL_USER,
  PHOTOS: import.meta.env.VITE_BASE_URL_PHOTOS
};

// Tab Configuration
export const TABS = {
  USERS: "users",
  PHOTOS: "photos"
};

export const TAB_CONFIG = [
  {
    id: TABS.USERS,
    label: "👥 Users",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: TABS.PHOTOS,
    label: "📸 Photos",
    gradient: "from-pink-500 to-orange-500"
  }
];

// Styling Constants
export const STYLES = {
  CARD: "bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 transform overflow-hidden border border-gray-100",
  TAB_BUTTON_ACTIVE: (gradient) => `bg-gradient-to-r ${gradient} text-white shadow-lg`,
  TAB_BUTTON_INACTIVE: "bg-white text-gray-700 shadow-md hover:shadow-lg border-2 border-gray-200",
  GRID_USERS: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  GRID_PHOTOS: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
};

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: "Failed to fetch data",
  GENERIC_ERROR: "Something went wrong. Please try again."
};
