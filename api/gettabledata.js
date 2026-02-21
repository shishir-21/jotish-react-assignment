export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://backend.jotish.in/backend_dev/gettabledata.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "test",
          password: "123456",
        }),
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "API fetch failed" });
  }
}