import axios from "axios";

export async function getData<TData>(url: string) {
  const { data } = await axios.get<TData>(url);
  return data;
}
