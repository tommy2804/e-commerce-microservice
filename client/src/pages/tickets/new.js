import FormContainer from '@/components/form/form-container';
import Input from '@/components/form/input';
import Button from '@/components/form/button';
import { useState } from 'react';
import useRequest from '@/hooks/use-request';
import Router from 'next/router';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <FormContainer onSubmit={onSubmit} title="Sell a ticket">
      <div className="  h-96">
        <div className="">
          <div id="input" className="flex flex-col w-full my-5">
            <label className="text-gray-500 mb-2">Title</label>
            <Input value={title} onChange={(e) => setTitle(e)} />
          </div>
          <div id="input" className="flex flex-col w-full my-5">
            <label className="text-gray-500 mb-2">Price</label>
            <Input onBlur={onBlur} value={price} onChange={(e) => setPrice(e)} />
            {errors}
          </div>

          <div className="w-1/2 flex items-center">
            <button type="submit" className="w-full py-4  bg-slate-800 rounded-lg text-green-100">
              <div className="flex flex-row items-center justify-center">
                <div className="mr-2"></div>
                <div className="font-bold">Submit</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default NewTicket;
