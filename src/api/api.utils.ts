import { useQuery } from "react-query";
import axios from "axios";

const getDataById = async (url: string, id: string | undefined) => {
  const { data } = await axios.get(`${url}/${id == undefined ? "" : id}`);
  return Array.isArray(data) ? data : [data];
};

export function useGet(url: string, id: string | undefined) {
  return useQuery(["post", id], () => getDataById(url, id));
}
