import axiosClient from '../apiClient/axiosClient';

type Collections = {
  data: {
    collections: Collection[],
  }
}

export type FetchCollectionsParams = {
  address?: string
}

export default async ({ address }: FetchCollectionsParams) => {
  const res = await axiosClient.get<Collections>('/collections', {
    params: {
      address,
    },
  });
  return res.data;
};
