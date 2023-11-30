import { useCreateGroup } from "api/groups";
import { useCreateOrganization, useOrganizationGroups, useOrganizationUsers, useOrganizations } from "api/organizations";
import { useCreateOrganizationUser } from "api/users";
import Layout from "components/layout/Layout";
import { ACCESS_TOKEN_KEY } from "consts";
import { Button, Label, Modal, Select, Tabs, TextInput } from 'flowbite-react';
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type GroupInputs = {
  groupName: string
  groupDescription: string
}

type StudentInputs = {
  username: string
  name: string
  password: string
  role: string
}

const Page: NextPage = () => {
  const router = useRouter();

  const { organizationId } = router.query;
  const { mutate: mutateGroup, data, isLoading: isLoadingGetGroup, isError: isErrorGetGroup } = useOrganizationGroups(organizationId as string);
  const { mutate: mutateStudent, data: dataStudent, isLoading: isLoadingGetStudent, isError: isErrorGetStudent } = useOrganizationUsers(organizationId as string);
  const [openModalGroup, setOpenModalGroup] = useState(false);
  const [openModalStudent, setOpenModalStudent] = useState(false);
  useEffect(() => {
    if (!Boolean(localStorage.getItem(ACCESS_TOKEN_KEY)) || localStorage.getItem(ACCESS_TOKEN_KEY) == 'undefined') router.replace('/')
  }, [router])
  const emailInputRef = useRef<HTMLInputElement>(null);
  const {
    register: registerGroup,
    handleSubmit: handleSubmitGroup,
    reset: resetGroup,
  } = useForm<GroupInputs>()
  const {
    register: registerStudent,
    handleSubmit: handleSubmitStudent,
    reset: resetStudent,
  } = useForm<StudentInputs>()
  const { trigger: triggerGroup, isLoading: isLoadingGroup, isError: isErrorGroup } = useCreateGroup();
  const { trigger: triggerStudent, isLoading: isLoadingStudent, isError: isErrorStudent } = useCreateOrganizationUser();
  const onSubmitGroup: SubmitHandler<GroupInputs> = async ({ groupName, groupDescription }) => {
    try {
      const result = await triggerGroup({ groupName, groupDescription, organizationId: (organizationId as string) })
      console.log(result)
      mutateGroup().then(() => {
        setOpenModalGroup(false)
        resetGroup()
      }).catch(console.error)
    } catch (e) {
      console.error(e)
    }
  }

  const omSubmitStudent: SubmitHandler<StudentInputs> = async ({ name, username, password, role }) => {
    try {
      const result = await triggerStudent({ name, username, password, role, organizationId: (organizationId as string) })
      console.log(result)
      mutateStudent().then(() => {
        setOpenModalStudent(false)
        resetStudent()
      }).catch(console.error)
    } catch (e) {
      console.error(e)
    }
  }

  const studentData = dataStudent?.object || []
  const groupData = data?.object || []

  return (
    <Layout>
      <div className="container p-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl my-8">Organization ID: {organizationId}</h1>
          <div className="flex">
            <Button color="light" className="h-8 mr-4" onClick={() => setOpenModalGroup(true)}>Create New Groups</Button>
            <Button color="light" className="h-8" onClick={() => setOpenModalStudent(true)}>Create New Players</Button>
          </div>
        </div>
        <Tabs aria-label="Tabs with underline" style="underline">
          <Tabs.Item active title="Players">
            {isLoadingGetStudent ?
              <div role="status" className="max-w p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
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
              </div> :
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Username</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((item: any) => {
                    return <tr key={item.id} className="even:bg-white even:dark:bg-gray-900 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900">
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.username}</td>
                      <td className="px-6 py-4">{item.role}</td>
                    </tr>
                  })}
                </tbody>
              </table>}
          </Tabs.Item>
          <Tabs.Item title="Groups">
            {isLoadingGetGroup ?
              <div role="status" className="max-w p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
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
              </div> :
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3">Class</th>
                    <th scope="col" className="px-6 py-3">Number of students</th>
                  </tr>
                </thead>
                <tbody>
                  {groupData.map((item: any) => {
                    return <tr key={item.id} className="even:bg-white even:dark:bg-gray-900 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900">
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.groupName}</td>
                      <td className="px-6 py-4">{item.GroupMembers.length || 0}</td>
                    </tr>
                  })}
                </tbody>
              </table>}
          </Tabs.Item>
        </Tabs>
      </div>
      <Modal show={openModalGroup} size="md" popup onClose={() => setOpenModalGroup(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmitGroup(onSubmitGroup)}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create New Group</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" required {...registerGroup("groupName", { required: true })} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <TextInput id="address" required {...registerGroup("groupDescription", { required: true })} />
            </div>
            <div className="flex justify-end">
              <Button color="light" type="submit">Confirm</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={openModalStudent} size="md" popup onClose={() => setOpenModalStudent(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmitStudent(omSubmitStudent)}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create New Player</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput id="username" required {...registerStudent("username", { required: true })} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" required {...registerStudent("name", { required: true })} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput type="password" id="password" required {...registerStudent("password", { required: true })} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <Select id="countries" required {...registerStudent("role", { required: true })}>
                <option>ORGANIZATION_USER</option>
                <option>SUPER_ADMIN</option>
                <option>ORGANIZATION_OWNER</option>
                <option>GAME_PLAYER</option>
              </Select>
            </div>
            <div className="flex justify-end">
              <Button color="light" type="submit" disabled>Confirm</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
};

export default Page;
