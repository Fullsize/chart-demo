import { useLazyAxios } from 'fl-hooks';
import { useEcMockF } from '@/service';
export const useEcAxiosPost = (
    reqPath: string,
    reqParams?: {
        [x: string]: any;
    },
): [
    {
        loading: boolean;
        error?: any;
        data: any;
    },
    (data?: { [x: string]: any }) => void,
] => {
    const [data, fn] = useLazyAxios({
        url: reqPath,
        method: 'post',
        data: reqParams,
    });
    const fna = (reqParams?: { [x: string]: any }) => {
        fn({
            data: reqParams,
        });
    };
    return [useEcMockF(data, data.data?.data), fna];
};
