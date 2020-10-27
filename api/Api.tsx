import axios from "axios";

export async function getNews(): Promise<any> {
  const url = `https://api.nytimes.com/svc/news/v3/content/all/all.json?limit=20&api-key=`;

  try {
    const issuesResponse = await axios.get<any[]>(url);

    return {
      issues: issuesResponse.data?.results,
    };
  } catch (err) {
    throw err;
  }
}
