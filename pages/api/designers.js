import { getDesigners } from "../../lib/getDesigners";

export default async function handler(req, res) {
  try {
    const designers = await getDesigners();
    res.status(200).json(designers);
  } catch (error) {
    console.error("Failed to retrieve designers:", error);
    res.status(500).json({ error: "Failed to retrieve designers" });
  }
}