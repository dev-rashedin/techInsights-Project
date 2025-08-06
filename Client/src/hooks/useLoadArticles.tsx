import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useLoadArticles = (
  status: 'approved',
  page : number,
  size : number,
  filter : string,
  search : string,
  sort : string
) => {
  // console.log(page, size)

  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['articles', status, page, size, filter, search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/articles?status=${status}&page=${page}&size=${size}&filter=${filter}&search=${search}&sort=${sort}`
      );
      return res.data;
    },
  });

  return [articles, refetch, isLoading, isError, error];
};

export default useLoadArticles;
