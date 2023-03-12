import SearchBox from '../search-box';
import Link from 'next/link';
import { BiUserCircle, BiCart, BiHeart, BiDoorOpen } from 'react-icons/bi';
export default function Header({ currentUser }) {
  const links = [
    !currentUser && { lable: 'Sign In', href: '/auth/signin' },
    currentUser && { lable: 'Log Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ lable, href }) => {
      return (
        <Link key={href} href={href}>
          <p className="">{lable}</p>
        </Link>
      );
    });

  return (
    <div className="w-full h-28 flex flex-row justify-evenly items-center bg-gray-100 ">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center">
          <img
            className="w-10 h-10 rounded-full"
            src="https://cdn.iconscout.com/icon/free/png-256/logo-512.png"
            alt="logo"
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <Link href="/">
            <p className="font-semibold text-2xl text-black-500"> GetTix.IO</p>
          </Link>
        </div>
      </div>
      <SearchBox />

      <div className="flex flex-row w-1/2 justify-between ">
        {currentUser && (
          <>
            <div className="flex justify-evenly items-center w-1/2">
              <button className=" w-full flex justify-evenly items-center ">
                <BiHeart fill="gray" size={22} />
                <Link href="/tickets/new">
                  <p className="">Sell Tickets</p>
                </Link>
              </button>
            </div>
            <div className="flex justify-evenly items-center w-1/2">
              <button className=" w-full flex justify-evenly items-center ">
                <BiCart fill="gray" size={22} />
                <Link href="/orders">
                  <p className="">My Orders</p>
                </Link>
              </button>
            </div>
          </>
        )}
        <div className="flex justify-evenly items-center w-1/2">
          <button className=" w-full flex justify-evenly items-center ">
            <BiUserCircle fill="gray" size={22} />
            <p className=""> Profile </p>
          </button>
        </div>

        <div className="flex justify-evenly items-center w-full">
          <button className=" w-full flex items-center ">
            <BiDoorOpen fill="gray" size={25} />
            {links}
          </button>
        </div>
      </div>
    </div>
  );
}
