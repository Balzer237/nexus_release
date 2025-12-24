export function getFileType(mimetype: string): string {
  if (!mimetype) return 'unknown';

  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype === 'application/pdf') return 'pdf';
  if (
    mimetype === 'application/msword' ||
    mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  )
    return 'word';
  if (
    mimetype === 'application/vnd.ms-excel' ||
    mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
    return 'excel';
  if (
    mimetype === 'application/vnd.ms-powerpoint' ||
    mimetype ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
    return 'powerpoint';
  if (mimetype === 'text/plain') return 'text';

  return 'other';
}
