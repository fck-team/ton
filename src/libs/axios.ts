import axios from "axios";
import rateLimit from "axios-rate-limit";

export const api = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 1000,
});
