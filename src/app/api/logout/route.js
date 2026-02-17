// pages/api/auth/logout.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Agar JWT token use kar rahe ho, client side se cookie delete kar do
      res.setHeader("Set-Cookie", `token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`);
      return res.status(200).json({ message: "Logged out" });
    } catch (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
