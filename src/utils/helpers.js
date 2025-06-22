export function isValidVideoExtension(source) {
  const validExtensions = [
    "mp4",
    "avi",
    "mkv",
    "mov",
    "wmv",
    "flv",
    "webm",
    "m4v",
    "3gp",
    "ts",
  ];
  const extension = source.split(".").pop().toLowerCase();
  return validExtensions.includes(extension);
}
