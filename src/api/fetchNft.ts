import axiosClient from '../apiClient/axiosClient';

export default async (id: string) => {
  const res = await axiosClient.get<NFT>('/nfts', {
    params: {
      id,
    },
  });
  return res.data;
};
