import { rolePolicyMap } from "../config/rolePolicyMap.js";
import { POLICIES } from "../utils/constants/policies.js";

export async function checkPolicy({ user, policy, resourceId = null }) {
  const userPolicies = rolePolicyMap[user.role] || [];

  // Không có policy
  if (!userPolicies.includes(policy)) {
    return false;
  }

  // ================= USER =================
  if (policy === POLICIES.USER_VIEW_SELF) {
    if (user.role === "admin") return true;
    return user.id === Number(resourceId);
  }

  // ================= NHÂN VIÊN =================
  if (policy === POLICIES.NHANVIEN_VIEW_SELF) {
    if (user.role === "admin") return true;
    return user.id === Number(resourceId);
  }

  // ================= KHÁCH HÀNG =================
  if (policy === POLICIES.KHACHHANG_VIEW_SELF) {
    if (user.role === "admin") return true;
    return user.id === Number(resourceId);
  }


  return true;
}
