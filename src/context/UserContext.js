export function getUserRole() {
  const role = JSON.parse(localStorage.getItem('role')); // Lấy thông tin người dùng từ Local Storage
  return role ? role : 'customer'; // Nếu không có thông tin vai trò, trả về vai trò mặc định là 'customer'
}
