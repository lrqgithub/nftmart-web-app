import axiosClient from '../apiClient/axiosClient';

type NftsList = {
  list: NFT[],
} & Pagination

export default async (type?: string) => {
  const res = await axiosClient.get<NftsList>('/nfts', {
    params: {
      type,
    },
  });
  return res.data;
};
