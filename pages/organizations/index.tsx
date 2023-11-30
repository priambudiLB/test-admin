import { useCreateOrganization, useOrganizations } from "api/organizations";
import Layout from "components/layout/Layout";
import { ACCESS_TOKEN_KEY } from "consts";
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string
  address: string
}

const Page: NextPage = () => {
  const router = useRouter()
  const { mutate, data, isLoading: isLoadingGet, isError: isErrorGet } = useOrganizations();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (!Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)) || localStorage.getItem(ACCESS_TOKEN_KEY) == 'undefined') router.replace('/')
  }, [router])
  const emailInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>()
  const { trigger, isLoading: isLoadingPost, isError: isErrorPost } = useCreateOrganization();
  const onSubmit: SubmitHandler<Inputs> = async ({ name, address }) => {
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

  const orgData = data?.object || []

  return (
    <Layout>
      <div className="container p-12">
        <h1 className="text-4xl my-8">Organizations</h1>
        <div className="flex justify-between mb-12">
          <Button color="light" onClick={() => setOpenModal(true)}>Create New Organization</Button>
        </div>

        {isLoadingGet ? <div role="status" className="max-w p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div> : <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                  <Link href={`/organizations/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                </td>
              </tr>
            })}
          </tbody>
        </table>}
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
              <Button color="light" type="submit" disabled={isLoadingPost}>Confirm</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Page;
