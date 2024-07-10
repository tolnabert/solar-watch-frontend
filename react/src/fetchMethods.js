export async function fetchGetWithAuth(url, jwtToken) {
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    if (!response.ok) {
      const error = new Error(`Failed to fetch data: ${response.status}`);
      console.error(error);
      throw error;
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
