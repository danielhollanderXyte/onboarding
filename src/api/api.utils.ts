import axios from "axios";

export async function getData<TData = never>(url: string): Promise<TData> {
  const { data } = await axios.get(url);
  return data as TData;
}
