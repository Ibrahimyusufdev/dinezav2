import axios from "axios";
import type { ApiError } from "./apiResponse.types";

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    // Left handside checking indication if request hit the server and it's responded, so now left handside error now becomes error from server
    // Right handside checking implies error from axios, which means if the request did not went or something else. Overall, request never hit the server and axios did not get a response

    return {
      message: error.response?.data?.message || error.message,
      code: error.response?.data?.code || error.code,
      status: error.response?.status || 500,
    };
  }

  return {
    message: "An unexpected error occurred",
    code: "Unknown_Error",
    status: 500,
  };
};
