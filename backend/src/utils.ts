export const isValidImageUrl = (url: string): boolean => {
  const regex = /\.(jpg|jpeg)$/i;
  return regex.test(url);
};

export const handleError = (
  res: any,
  message: string,
  statusCode: number = 400
) => {
  return res.status(statusCode).json({ error: message });
};
