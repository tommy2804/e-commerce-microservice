import useRequest from '@/hooks/use-request';
import Router from 'next/router';
const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });
  return (
    <div className="bg-white p-10 flex flex-col w-full ">
      <h1 className="text-2xl font-bold text-gray-800 text-left mb-5">{ticket.title}</h1>
      <h4 className="text-xl font-semibold text-gray-600 text-left mb-5">Price: {ticket.price}</h4>
      {errors}
      <button
        onClick={() => doRequest()}
        className="w-1/6 py-4 bg-slate-800 rounded-lg text-white hover:bg-slate-700">
        <div className="flex flex-row items-center justify-center">
          <div className="mr-2"></div>
          <div className="font-bold text-xl">Purchase</div>
        </div>
      </button>
    </div>
  );
};
TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: data };
};
export default TicketShow;
