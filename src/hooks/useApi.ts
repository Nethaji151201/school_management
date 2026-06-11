import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { apiService } from "../services/api/apiService";
import { type ApiResponse } from "../types";
import toast from "react-hot-toast";

/**
 * Custom hook for GET requests
 */
export const useApiQuery = <T>(
  key: string[],
  url: string,
  options?: UseQueryOptions<ApiResponse<T>>,
) => {
  return useQuery({
    queryKey: key,
    queryFn: () => apiService.get<T>(url),
    ...options,
  });
};

/**
 * Custom hook for POST requests
 */
export const useApiMutation = <T, D = any>(
  mutationFn: (data: D) => Promise<ApiResponse<T>>,
  options?: UseMutationOptions<ApiResponse<T>, any, D>,
) => {
  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      toast.success(data.message || "Operation successful");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
    ...options,
  });
};

/**
 * Custom hook for creating an item
 */
export const useCreate = <T, D = any>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<T>, any, D>,
) => {
  return useApiMutation(
    (data: D) => apiService.post<T>(endpoint, data),
    options,
  );
};

/**
 * Custom hook for updating an item
 */
export const useUpdate = <T, D = any>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<T>, any, D>,
) => {
  return useApiMutation(
    (data: D) => apiService.put<T>(endpoint, data),
    options,
  );
};

/**
 * Custom hook for deleting an item
 */
export const useDelete = <T>(
  endpoint: string,
  options?: UseMutationOptions<ApiResponse<T>, any, void>,
) => {
  return useApiMutation(() => apiService.delete<T>(endpoint), options);
};
