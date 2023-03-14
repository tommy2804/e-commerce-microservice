
import axios from 'axios';
import { useState } from 'react';
import { RequestType } from '../utils/types/request-type';

interface Props {
  url: string;
  method: RequestType;
  body?: {};
  onSuccess?: (data: any) => void;
}

function useRequest({ url, method, body, onSuccess }: Props) {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const doRequest = async (props = {}) => {
    setLoading(true);
    try {
      setErrors(null);
      const response = await axios[method](url, {
        ...body,
        ...props,
      });

      if (onSuccess) {
        onSuccess(response.data);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setErrors(error);
      setLoading(false);
    }
  };
  return { doRequest, errors, loading };
}

export default useRequest;
