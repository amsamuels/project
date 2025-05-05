// src/pages/api/user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession(req, res);
    const { accessToken } = await getAccessToken(req, res);

    if (!session?.user?.email) {
      return res.status(400).json({ error: "User email not found in session" });
    }

    const goApiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/login`, {
      method: "POST", // Change to POST since you're sending a body
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.user.email,
      }),
    });

    if (!goApiRes.ok) {
      const errorBody = await goApiRes.text();
      console.error("backend error:", goApiRes.status, errorBody);
      return res.status(goApiRes.status).json({ error: "failed to fetch user from Go backend" });
    }

    const user = await goApiRes.json();
    res.status(200).json(user);
  } catch (err) {
    console.error("error in /api/me route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
