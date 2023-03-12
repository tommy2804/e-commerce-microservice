import { useState } from 'react';
import useRequest from '@/hooks/use-request';
import Router from 'next/router';
import Button from '@/components/form/button';
import FormContainer from '@/components/form/form-container';
import { BsTwitter, BsGoogle, BsGithub } from 'react-icons/bs';
import Input from '../../components/form/input';
import Link from 'next/link';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors, loading } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    if (email.length > 0 && password.length > 0) {
      event.preventDefault();

      doRequest();
    }
  };
  return (
    <FormContainer onSubmit={onSubmit} title="Sign In">
      <div id="input" className="flex flex-col w-full my-5">
        <label htmlFor="email" className="text-gray-500 mb-2">
          Email
        </label>
        <Input
          value={email}
          type="text"
          onChange={(e) => setEmail(e)}
          placeholder="Please insert your email"
        />
      </div>
      <div className="flex flex-col w-full my-5">
        <label htmlFor="password" className="text-gray-500 mb-2">
          Password
        </label>
        <Input
          value={password}
          type="password"
          onChange={(e) => setPassword(e)}
          placeholder="Please insert your password"
        />
      </div>
      <div id="button-group" className="flex flex-col w-full my-5">
        <button type="submit" className="w-full py-4 bg-green-600 rounded-lg text-green-100">
          <div className="flex flex-row items-center justify-center">
            <div className="mr-2"></div>
            <div className="font-bold">Sign In</div>
          </div>
        </button>
        {errors}
        <div className="w-full flex items-center justify-between py-5">
          <hr className="w-full bg-gray-400" />
          <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
          <hr className="w-full bg-gray-400  " />
        </div>
        <div className="w-3/4 justify-center self-center flex flex-col ">
          <Button type="button" onClick={() => console.log('hi')}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                fill="#4285F4"
              />
              <path
                d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                fill="#34A853"
              />
              <path
                d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                fill="#FBBC05"
              />
              <path
                d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                fill="#EB4335"
              />
            </svg>{' '}
            <p className="text-base font-medium ml-4 text-gray-700">Continue with google</p>
          </Button>
          <Button type="button" onClick={() => {}}>
            <BsGithub size={21} />
            <p className="text-base font-medium ml-4 text-gray-700">Continue with Github</p>
          </Button>
          <Button type="button" onClick={() => {}}>
            <BsTwitter size={21} fill="#1DA1F2" />
            <p className="text-base font-medium ml-4 text-gray-700">Continue with Twitter</p>
          </Button>
        </div>
        <div>
          <span>Don't have an account yet?</span>
          <Link href="/auth/signup">
            <span> Sign Up</span>
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};
