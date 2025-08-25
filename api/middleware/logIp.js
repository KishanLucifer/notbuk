export const logIpMiddleware = (req, res, next) => {
  const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`Request to ${req.originalUrl} from IP: ${userIp}`);
  next();
};
