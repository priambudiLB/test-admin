import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from 'next/router'
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import iTILESLogo from '../components/layout/iTILES_Logo_Solid.png';
import { useLogin } from "api/auth";
import { ACCESS_TOKEN_KEY } from 'consts'

type Inputs = {
  email: string
  password: string
}

const Page: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()
  const { trigger, isLoading } = useLogin();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const result = await trigger({ username: email, password })
      localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(result.object))
      router.push("/organizations");
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src={iTILESLogo}
          width={157}
          height={100}
          alt="Picture of the author"
          className="mx-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email / Username
            </label>
            <div className="mt-2">
              <input type="text" autoComplete="username" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register("email", { required: true })} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input type="password" autoComplete="current-password" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register("password", { required: true })} />
              {/* <div className="text-sm text-right">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div> */}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-[white] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
