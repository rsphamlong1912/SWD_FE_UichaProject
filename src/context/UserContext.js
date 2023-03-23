export function getUserRole() {
  const role = localStorage.getItem('role');
  return role;
}
