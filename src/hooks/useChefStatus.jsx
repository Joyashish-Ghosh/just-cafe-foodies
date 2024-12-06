// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

 const useChefStatus = () => {
    const axiosPublic = useAxiosPublic();

const {data: status = [], isPending: statusPending, refetch} = useQuery({
    queryKey: ['chef-status'],
    queryFn: async() => {
        const res = await axiosPublic.get('/chef/status');
        return res.data;
    }
})

    return [status, statusPending, refetch]
}
export default useChefStatus;