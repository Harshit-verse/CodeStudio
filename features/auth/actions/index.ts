"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";


export const getUserById = async (id:string)=>{
    try {
        const user = await db.user.findUnique({
            where:{id},
            include:{accounts:true}
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAccountByUserId = async (userId:string)=>{
    try {
        const account = await db.account.findFirst({
            where:{
                userId
            }
        })
        return account
    } catch (error) {
        console.log(error)
        return null
    }
}

//export const currentUser = async()=>{
 //   const user = await auth()
  //  return user?.user;
//}


/*
export const currentUser = async () => {
    const session = await auth();

    if (!session?.user?.email) return null;

    const user = await db.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    return user;
}; */

export const currentUser = async () => {
    const session = await auth();

    if (!session?.user?.email) return null;

    let user = await db.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!user) {
        user = await db.user.create({
            data: {
                email: session.user.email,
                name: session.user.name,
                image: session.user.image,
            },
        });
    }

    return user;
};