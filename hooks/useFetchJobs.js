// import { Alert } from 'react-native';
import { useQuery } from 'react-query';
import axios from "axios";
import { RAPID_API_KEY } from '@env';

export const useFetchJobs = (endPoint, paramsObj, queryKey) => {
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endPoint}`, //search
    params: { ...paramsObj },
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  const { isLoading, isSuccess, data, isError, refetch, isRefetching } = useQuery({
    queryKey: ["fetch-jobs", queryKey],
    queryFn: async () => {
      const { data } = await axios.request(options);
      return data.data;
    },
    onError(error) {
      if(error?.response) {
        if(error.response.status === 429) {
          // Alert.alert("Error occured", "You have exceeded the MONTHLY quota for Requests on your current plan.")
        }
      }
    }
  });

  return { isLoading, isSuccess, data, isError, refetch, isRefetching };
}