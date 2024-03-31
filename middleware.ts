export { auth as middleware } from "./auth.config";
export const config = {
  matcher: ["/admin/:url*", "/api/admin/:url*"],
};
