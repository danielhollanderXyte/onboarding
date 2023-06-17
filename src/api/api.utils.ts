import axios from "axios";

export async function getData<T>(url: string) {
  const { data } = await axios.get(url);
  return data;
}
