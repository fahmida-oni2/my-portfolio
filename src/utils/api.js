export async function getLatestCV() {
  const folderId = import.meta.env.VITE_GOOGLE_FOLDER_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  if (!folderId || !apiKey) {
    console.error("Error: Missing environment variables!");
    return "#";
  }

  const url = `https://drive.google.com/file/d/11Ik49GWD7VysGTHj74pjGjnH0N_0ZapF/view?usp=sharing`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    if (!data.files || !data.files.length) {
      console.error("No files found in the Google Drive folder.");
      return "#";
    }

    return `https://drive.google.com/file/d/${data.files[0].id}/view`;
  } catch (error) {
    console.error("Error fetching latest CV:", error);
    return "#";
  }
}
