import axios from "axios";

// @ts-expect-error disabling return value
export async function getData<TData = never>(url: string) {
  const { data } = await axios.get(url);
  return data;
}
