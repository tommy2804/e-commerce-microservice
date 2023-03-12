import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr className="border-b dark:border-neutral-500" key={ticket.id}>
        <td className="whitespace-nowrap px-6 py-4 font-medium">{ticket.title}</td>
        <td className="whitespace-nowrap px-6 py-4 font-medium">{ticket.price}</td>
        <td className="whitespace-nowrap px-6 py-4 font-medium">
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <p className="text-indigo-600 hover:text-indigo-900">View</p>
          </Link>
        </td>
      </tr>
    );
  });
  console.log(currentUser, tickets);
  return (
    <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 text-left mb-5">Tickets</h1>
      <table className="table-auto min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Title
            </th>
            <th scope="col" className="px-6 py-4">
              Price
            </th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
