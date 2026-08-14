import { useLocation } from 'react-router-dom';

/**
 * Custom hook to extract guest name from URL query parameter or path fallback.
 * Examples:
 * - /budi-and-ani?to=Budi+Sudarsono -> "Budi Sudarsono"
 * - /budi-and-ani?to=budi -> "Budi"
 * - /budi-and-ani?nama=Budi -> "Budi"
 * - /budi-and-ani/budi -> "Budi"
 */
export function useGuestName(): string {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Check URL parameters first: ?to=Nama or ?nama=Nama or ?tamu=Nama or ?n=Nama
  const queryGuest =
    searchParams.get('to') ||
    searchParams.get('nama') ||
    searchParams.get('tamu') ||
    searchParams.get('n') ||
    searchParams.get('guest');

  if (queryGuest && queryGuest.trim() !== '') {
    return decodeURIComponent(queryGuest.trim());
  }

  // Fallback: Check if there's an extra path segment after slug, e.g. /budi-and-ani/budi-sudarsono
  const pathSegments = location.pathname.split('/').filter(Boolean);
  if (pathSegments.length >= 2) {
    const rawPathGuest = pathSegments[pathSegments.length - 1];
    // Exclude system static routes
    const excludedRoutes = ['templates', 'buy', 'payment-pending', 'setup-wedding', 'admin'];
    if (!excludedRoutes.includes(pathSegments[0])) {
      const decoded = decodeURIComponent(rawPathGuest.replace(/[-_]/g, ' '));
      // Capitalize words nicely
      return decoded
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }

  return '';
}
