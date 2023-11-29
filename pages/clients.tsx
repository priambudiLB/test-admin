import { useRefreshToken } from "api/auth";
import { useCreateOrganization, useOrganizations } from "api/organizations";
import Layout from "components/layout/Layout";
import { ACCESS_TOKEN_KEY } from "consts";
import { Button, Checkbox, Label, Modal, Select, Table, TextInput } from 'flowbite-react';
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string
  address: string
}

const Page: NextPage = () => {
  const { trigger: triggerRefresh } = useRefreshToken()
  setInterval(async () => {
    console.log(localStorage.getItem(ACCESS_TOKEN_KEY))
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      const result = await trigger(JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) as string))
      localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(result.object))
    }
  }, 10000)

  const { mutate, data, isLoading: isLoadingGet, isError: isErrorGet } = useOrganizations();
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>()
  const { trigger, isLoading: isLoadingPost, isError: isErrorPost } = useCreateOrganization();
  const onSubmit: SubmitHandler<Inputs> = async ({ name, address }) => {
    console.log(name, address)
    try {
      const result = await trigger({ name, address })
      console.log(result)
      mutate().then(() => {
        setOpenModal(false)
        reset()
      }).catch(console.error)
    } catch (e) {
      console.error(e)
    }
  }

  const orgData = data?.object || [{
    "id": "org_1700965374163",
    "name": "organization guinea pig",
    "address": "bla, blaaaa,blaaaaaa",
    "createdAt": "2023-11-26T02:22:54.000Z",
    "updatedAt": "2023-11-26T02:22:54.000Z"
  },
  {
    "id": "org_1700965374164",
    "name": "organization guinea pig",
    "address": "bla, blaaaa,blaaaaaa",
    "createdAt": "2023-11-26T02:22:54.000Z",
    "updatedAt": "2023-11-26T02:22:54.000Z"
  }]

  return (
    <Layout>
      <div className="container p-12">
        <h1 className="text-4xl my-8">Clients</h1>
        <div className="flex justify-between mb-12">
          <Button color="light" onClick={() => setOpenModal(true)}>Create New Organization</Button>

          <TextInput id="search" type="text" icon={() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          } placeholder="Search" />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Organization Name</th>
              <th scope="col" className="px-6 py-3">Organization ID</th>
              <th scope="col" className="px-6 py-3">Address</th>
            </tr>
          </thead>
          <tbody>
            {orgData.map((item: any) => {
              return <tr key={item.id} className="even:bg-white even:dark:bg-gray-900 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.address}</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                </td>
              </tr>
            })}
          </tbody>
        </table>
        <div className="grid place-content-center min-h-screen">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl my-8">Clients</h1>
          </div>
        </div>
      </div>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create New Organization</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" required {...register("name", { required: true })} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput id="address" required {...register("address", { required: true })} />
            </div>
            <div className="flex justify-end">
              <Button color="light" type="submit">Confirm</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Page;
