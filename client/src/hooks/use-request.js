import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
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
    } catch (error) {
      setErrors(
        <div>
          <ul className="font-bold text-red-400">
            {error.response.data.errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
      setLoading(false);
    }
  };
  return { doRequest, errors, loading };
};
