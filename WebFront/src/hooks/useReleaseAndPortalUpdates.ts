import { useState } from 'react';
import { API_BASE_URL } from '../constants';

export const useReleaseAndPortalUpdates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncFromBackend = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch Release Notes
      const releaseRes = await fetch(`${API_BASE_URL}/release-notes/latest`);
      const releaseData = await releaseRes.json();
      if (releaseRes.ok) {
        localStorage.setItem('ReleaseNotesVersion', releaseData.version);
        localStorage.setItem('ReleaseNotesDate', releaseData.date);
        localStorage.setItem('ReleaseNotesContent', releaseData.content);
      }

      // Fetch Portal Updates
      const portalRes = await fetch(`${API_BASE_URL}/portal-updates/latest`);
      const portalData = await portalRes.json();
      if (portalRes.ok) {
        localStorage.setItem('PortalUpdatesVersion', portalData.version);
        localStorage.setItem('PortalUpdatesUpdatedAt', portalData.updated_at);
        localStorage.setItem('PortalUpdatesNextScheduledUpdate', portalData.next_scheduled_update);
        localStorage.setItem('PortalUpdatesEnabled', String(portalData.enabled));
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch updates from backend');
    } finally {
      setIsLoading(false);
    }
  };

  const syncToBackend = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Release Notes PUT
      const releasePayload = {
        version: localStorage.getItem('ReleaseNotesVersion'),
        date: localStorage.getItem('ReleaseNotesDate'),
        content: localStorage.getItem('ReleaseNotesContent'),
      };

      const releasePut = await fetch(`${API_BASE_URL}/release-notes/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(releasePayload),
      });

      if (!releasePut.ok) throw new Error('Failed to update Release Notes');

      // Portal Updates PUT
      const portalPayload = {
        version: localStorage.getItem('PortalUpdatesVersion'),
        next_scheduled_update: localStorage.getItem('PortalUpdatesNextScheduledUpdate'),
        enabled: localStorage.getItem('PortalUpdatesEnabled') === 'true',
      };

      const portalPut = await fetch(`${API_BASE_URL}/portal-updates/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portalPayload),
      });

      if (!portalPut.ok) throw new Error('Failed to update Portal Updates');

    } catch (err) {
      console.error(err);
      setError('Failed to sync updates to backend');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    syncFromBackend,
    syncToBackend,
    isLoading,
    error,
  };
};
