import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../pages/constants/userConstants";

/**
 * Custom hook for fetching users and photos data with pagination
 * @returns {Object} - { users, photos, loading, error, refetch, pagination, goToPage }
 */
export const useFetchData = () => {
  const [users, setUsers] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [currentPhotos, setCurrentPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    totalPhotos: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 20
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch users
      const usersRes = await axios.get(API_ENDPOINTS.USERS);
      setUsers(usersRes.data);
      
      // Fetch all photos from multiple pages
      // Since API returns 20 per page, we fetch pages 1, 2, 3 to get all 50+ photos
      const allPhotosData = [];
      const maxPages = 3; // API has 3 pages
      
      try {
        // Fetch all pages in parallel
        const photoPromises = Array.from({ length: maxPages }, (_, i) =>
          axios.get(`${API_ENDPOINTS.PHOTOS}?page=${i + 1}`)
        );
        
        const photoResponses = await Promise.all(photoPromises);
        
        // Combine all photos from all pages
        photoResponses.forEach((response) => {
          const pageData = Array.isArray(response.data)
            ? response.data
            : response.data?.data || [];
          allPhotosData.push(...pageData);
        });
        console.log("ffff",photoResponses)
      } catch (photoErr) {
        console.warn("Could not fetch all photo pages, trying single request:", photoErr.message);
        // Fallback: try to get all photos from single request
        const photosRes = await axios.get(API_ENDPOINTS.PHOTOS);
        const singlePageData = Array.isArray(photosRes.data)
          ? photosRes.data
          : photosRes.data?.data || [];
        allPhotosData.push(...singlePageData);
      }
      
      setAllPhotos(allPhotosData);
      
      // Calculate pagination info
      const totalPhotos = allPhotosData.length;
      const perPage = 20;
      const totalPages = Math.ceil(totalPhotos / perPage);
      
      setPagination({
        totalPhotos,
        totalPages,
        currentPage: 1,
        perPage
      });
      
      // Set first page photos
      setCurrentPhotos(allPhotosData.slice(0, perPage));
      
    } catch (err) {
      setError(err.message || ERROR_MESSAGES.GENERIC_ERROR);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Navigate to a specific page
   * @param {number} pageNumber - Page number to go to
   */
  const goToPage = useCallback((pageNumber) => {
    if (pageNumber < 1 || pageNumber > pagination.totalPages) return;
    
    const startIndex = (pageNumber - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;
    
    setCurrentPhotos(allPhotos.slice(startIndex, endIndex));
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
  }, [allPhotos, pagination.totalPages, pagination.perPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { users, photos: currentPhotos, loading, error, refetch: fetchData, pagination, goToPage };
};
