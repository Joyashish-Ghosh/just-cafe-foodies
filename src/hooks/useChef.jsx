import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useChef = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isChef, isPending: isChefLoading } = useQuery({
    queryKey: ["isChefCheck"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/Chef/${user?.email}`);
      return res.data?.chef;
    },
  });
  return [isChef, isChefLoading];
};

export default useChef;
