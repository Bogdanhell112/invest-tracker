/* eslint-disable */
/* elint-disable */

import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Stack, Card, CardHeader, CardBody, Text, StackDivider, Heading, HStack, Button, VStack, Icon} from "@chakra-ui/react";
import { PlusSquareIcon } from '@chakra-ui/icons'
import { api } from "~/utils/api";


const Home: NextPage = () => {
 const [infoUfVal, setInfo] = useState<string>('')
  const [infoFoName, setInfoFoName] = useState<string>('')
  const [infoUfVal2, setInfo2] = useState<string>('')
  const [infoFoName2, setInfoFoName2] = useState<string>('')

  const user = useUser();
  if (!user) return null;

  const {data} = api.example.getAll.useQuery();
  const {data: sumSimfonia} = api.example.getSumSim.useQuery();


  const getInfo = async () => {
    const res = await fetch('https://invest-tracker-nine.vercel.app/api/trpc/getInfo')
    //const res = await fetch('http://localhost:3000/api/trpc/getInfo')
    const {infoUfVal, infoFoName, infoUfVal2, infoFoName2 } = await res.json()
    setInfo(infoUfVal)
    setInfoFoName(infoFoName)
    setInfo2(infoUfVal2)
    setInfoFoName2(infoFoName2)

  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Stack >
        <HStack display='flex' justifyContent='space-between' padding='1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="red" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
            {!user.isSignedIn && <SignInButton><Button colorScheme='red' fontSize='xs' padding='1.5' height='-webkit-fit-content'  alignSelf='center'>Log In</Button></SignInButton>}
            {!!user.isSignedIn && <Text padding={2} textColor='black' fontWeight='bold'>Hello Bogdan!</Text>}
            {!!user.isSignedIn && <SignOutButton><Button colorScheme='red' fontSize='xs' padding='1.5' height='-webkit-fit-content'  alignSelf='center'>Log Out</Button></SignOutButton>}
        </HStack>
        </Stack>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        <Stack backgroundColor='gray.100'>
        <Stack justifyContent='center' p={3}>
        <Card w='99%' alignSelf='center' backgroundColor='white'>
          <CardHeader paddingTop='20px' paddingBottom={0} paddingLeft='20px' paddingRight='20px'>
          <Heading fontSize='md'>Investments</Heading>
          </CardHeader>
          <CardBody>
          <Stack divider={<StackDivider />} spacing='3'>
          {data?.map((post) => (
          <HStack justifyContent='space-between' textAlign='center' key={post.id}>
            <Text textColor='black' fontWeight='medium' > {post.investAmount} RON</Text>
            <Text textColor='gray.500' > {post.fondName} </Text>
            <Text textColor='gray.500'> {post.createdAt.toDateString()} </Text>
          </HStack>))}
          </Stack>
          </CardBody>
          </Card>
          <Card w='99%' alignSelf='center' backgroundColor='white'>
          <CardHeader paddingTop='20px' paddingBottom={0} paddingLeft='20px' paddingRight='20px'>
          <Heading fontSize='md'>Live Info</Heading>
          </CardHeader>
          <CardBody>
          <Stack divider={<StackDivider />} spacing='3'>
          <HStack justifyContent='space-between' textAlign='center'>
            <VStack alignItems='flex-start'spacing={0}>
              <Text textColor='black' fontWeight='medium' > {infoFoName}</Text>
              <Text textColor='gray.500' fontSize={14}>Valoare unitară titlu</Text>
            </VStack>
            <Text textColor='gray.500' > {parseFloat(infoUfVal)} RON</Text>
          </HStack>
          <HStack justifyContent='space-between' textAlign='center'>
            <VStack alignItems='flex-start'spacing={0}>
            <Text textColor='black' fontWeight='medium' > {infoFoName2}</Text>
            <Text textColor='gray.500' fontSize={14}>Valoare unitară titlu</Text>
            </VStack>
            <Text textColor='gray.500' > {parseFloat(infoUfVal2)} RON</Text>
          </HStack>
          <Button colorScheme='red' alignSelf='center'onClick={getInfo}>Live Feed</Button>
          </Stack>
          </CardBody>
          </Card>
          <Card w='99%' alignSelf='center' backgroundColor='white'>
          <CardHeader paddingTop='20px' paddingBottom={0} paddingLeft='20px' paddingRight='20px'>
          <Heading fontSize='md'>Your stats</Heading>
          </CardHeader>
          <CardBody>
          <Stack divider={<StackDivider />} spacing='3'>
          <HStack justifyContent='space-between' textAlign='center'>
            <VStack alignItems='center'spacing={0}>
            {sumSimfonia?.map((item) => (
              <><Text key={item.fondName} textColor='black' fontSize='15' fontWeight='medium'>
                {item.fondName}:
              </Text>
              <Text textColor='gray.500' fontSize='2xl'>
                  {item._sum.investAmount} RON
              </Text></>
                ))}
            {sumSimfonia?.map((item) => (
              <>
              <Text key={item.fondName} textColor='black' fontSize='15' fontWeight='medium'>
               Nr. de U.F. deținute:</Text>
              <Text textColor='gray.500' fontSize='2xl'>
                {item._sum.nrUf?.toFixed(4)} U.F.
              </Text>
              </>
                ))}
            </VStack>
            <VStack alignItems='center' align='center' spacing={0}>
             <Card alignItems='center' align='flex-start' backgroundColor='whatsapp.500' borderRadius='lg'>
             {sumSimfonia?.map((item) => {
               const nrUf = Number(item._sum?.nrUf).toFixed(4) ?? 0;
               const ufVal2 = Number(infoUfVal2).toFixed(4) ?? 0;
               const investAmount = Number(item._sum?.investAmount) ?? 0;
               const totalInvestment = (Number(parseFloat(nrUf)) * Number(parseFloat(ufVal2))).toFixed(4);
               const profit = (Number(parseFloat(totalInvestment).toFixed(4)) - investAmount).toFixed(4);
               return (
                 <>
                   <Text textColor='white' fontSize='15' fontWeight='medium'>
                     Valoarea totală a investiției:
                   </Text>
                   <Text key={item._sum?.nrUf} textColor='white' fontSize='2xl' fontWeight='medium'>
                     {totalInvestment} RON
                   </Text>
                   <Text textColor='white' fontSize='15' fontWeight='medium'>
                     Profit:
                   </Text>
                   <Text textColor='white' fontSize='2xl' fontWeight='medium'>
                     {profit} RON
                   </Text>
                 </>
               );
             })}
           </Card>
            </VStack>
            </HStack>
            </Stack>
            </CardBody>
            </Card>
            </Stack>
          </Stack>
          <div className=" flex justify-center w-full gap-4 bg-white border-x p-2 shadow-sm align-middle">
          <Stack  alignContent='end' justifyContent='end' backgroundColor='white' p={1}>
            <HStack justifyContent='center' p={1}>
              <VStack>
              <Text textColor='gray.500' fontSize={14}>Add Investment</Text>
              <PlusSquareIcon color='red' w={6} h={6} />
              </VStack>
            </HStack>
          </Stack>
          </div>
      </main>
    </>
  );
};

export default Home;
