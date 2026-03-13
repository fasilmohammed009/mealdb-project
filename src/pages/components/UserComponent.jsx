import { STYLES } from "../constants/userConstants";

/**
 * Loading Spinner Component
 */
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
     <div className="animate-spin rounded-full w-12 h-12 border-t-4 border-red-600"></div>
    </div>
);

/**
 * Error State Component
 */
export const ErrorState = ({ error, onRetry }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center bg-red-50 p-8 rounded-lg border-2 border-red-300">
      <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg cursor-pointer transition duration-300 transform hover:scale-105"
        aria-label="Retry loading data"
      >
        Retry
      </button>
    </div>
  </div>
);

/**
 * User Card Component
 */
export const UserCard = ({ user }) => (
  <div key={user.id} className={`${STYLES.CARD} hover:-translate-y-1`}>
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>

    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
      <p className="text-purple-600 font-medium mb-4">@{user.username}</p>

      <a
        href={`https://${user.website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 block"
      >
        🌐 {user.website}
      </a>

      {/* Address Section */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
          📍 Address
        </p>
        <p className="text-gray-600 text-sm mb-1">{user.address.street}</p>
        <p className="text-gray-600 text-sm mb-1">{user.address.suite}</p>
        <p className="text-gray-600 text-sm font-semibold">
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>

      {/* Phone Section */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
          ☎️ Phone
        </p>
        <a
          href={`tel:${user.phone}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {user.phone}
        </a>
      </div>

      {/* Company Section */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
          🏢 Company
        </p>
        <p className="text-gray-700 font-semibold mb-1">{user.company.name}</p>
        <p className="text-gray-600 text-sm italic mb-1">
          "{user.company.catchPhrase}"
        </p>
        <p className="text-gray-500 text-xs">{user.company.bs}</p>
      </div>
    </div>
  </div>
);

/**
 * Photo Card Component
 */
export const PhotoCard = ({ photo }) => (
  <div key={photo._id} className={`${STYLES.CARD} hover:-translate-y-2 group`}>
    <div className="bg-gradient-to-r from-pink-500 to-orange-500 h-2"></div>

    <div className="relative overflow-hidden bg-gray-100">
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        className="w-full h-40 object-cover transition duration-300 group-hover:scale-110"
        loading="lazy"
      />
    </div>

    <div className="p-4">
      <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-3 group-hover:text-pink-600 transition">
        {photo.title}
      </h3>

      <a
        href={photo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full text-center px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold rounded-lg text-xs hover:shadow-lg transition transform hover:scale-105"
      >
        View Full
      </a>
    </div>
  </div>
);

/**
 * Tab Navigation Button Component
 */
export const TabButton = ({ tab, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105 cursor-pointer ${
      isActive
        ? `${STYLES.TAB_BUTTON_ACTIVE(tab.gradient)}`
        : STYLES.TAB_BUTTON_INACTIVE
    }`}
    aria-selected={isActive}
    role="tab"
  >
    {tab.label}
  </button>
);

/**
 * Pagination Controls Component
 * Displays page navigation buttons and info
 */
export const PaginationControls = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages, totalPhotos, perPage } = pagination;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-6 mt-12">
      {/* Pagination Info */}
      <div className="text-center">
        <p className="text-gray-700 font-semibold mb-2">
          Showing {(currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, totalPhotos)} of {totalPhotos} photos
        </p>
        <p className="text-gray-500 text-sm">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105"
          aria-label="Previous page"
        >
          ← Previous
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg font-semibold transition duration-300 ${
              currentPage === page
                ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg scale-110"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-500 hover:shadow-md"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105"
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
