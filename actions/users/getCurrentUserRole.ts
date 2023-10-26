import { getCurrentUser } from "./getCurrentUser";

export async function getCurrentUserRole() {
  const response = await getCurrentUser();

  if (!response?.data) {
    return null;
  }

  return response.data.role;
}