/**
 * Dynamic Resume Media Service
 * Connects directly to backend API (/api/public/media/portfolio & /api/public/media/resume/download)
 * Guarantees zero hardcoded fallback, dynamically streaming the active resume uploaded by admin.
 */

export interface ResumeMetadata {
  resumeUrl: string;
  resumeFileName: string;
  resumeUpdatedAt?: string;
  resumeFileSize?: number | null;
  introVideoUrl?: string;
  introVideoPosterUrl?: string;
  introVideoTitle?: string;
}

import { getApiUrl } from './apiConfig';

/**
 * Returns the dynamic API download endpoint for the resume
 */
export function getResumeDownloadEndpoint(): string {
  return getApiUrl('/api/public/media/resume/download');
}

/**
 * Returns the dynamic API inline view endpoint for the resume
 */
export function getResumeViewEndpoint(): string {
  return getApiUrl('/api/public/media/resume/view');
}

/**
 * Fetches dynamic resume metadata directly from the backend API endpoint
 */
export async function fetchResumeMetadata(): Promise<ResumeMetadata> {
  const url = getApiUrl('/api/public/media/portfolio');

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch dynamic resume metadata (HTTP ${res.status})`);
  }

  const data = await res.json();
  return {
    resumeUrl: data.resumeUrl,
    resumeFileName: data.resumeFileName || 'Himanshu_Bharti_Resume.pdf',
    resumeUpdatedAt: data.resumeUpdatedAt,
    resumeFileSize: data.resumeFileSize,
    introVideoUrl: data.introVideoUrl,
    introVideoPosterUrl: data.introVideoPosterUrl,
    introVideoTitle: data.introVideoTitle,
  };
}

/**
 * Initiates direct download of the active resume via backend API stream
 */
export async function downloadResumeViaApi(
  onTriggerToast?: (msg: string) => void,
  customFileName?: string
): Promise<void> {
  const downloadUrl = getResumeDownloadEndpoint();
  const fileName = customFileName || 'Himanshu_Bharti_Resume.pdf';

  if (onTriggerToast) {
    onTriggerToast(`Fetching live dynamic resume: ${fileName}...`);
  }

  try {
    // Direct fetch with blob to trigger clean native browser download
    const res = await fetch(downloadUrl);
    if (!res.ok) {
      throw new Error(`Download failed with status ${res.status}`);
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    if (onTriggerToast) {
      onTriggerToast(`✓ Resume downloaded successfully from live API.`);
    }
  } catch (err: any) {
    console.error('[ResumeService] Direct blob download failed, falling back to window location redirect:', err);
    // Standard window fallback redirect to the dynamic API endpoint
    window.location.href = downloadUrl;
  }
}
