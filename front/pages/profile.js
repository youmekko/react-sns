import React from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NickNameEditForm from '../components/NickNameEditForm'
import FollowList from '../components/FollowList'
import FollowerList from '../components/FollowerList'

function profile() {
    const { me } = useSelector((state) => state.user)

    return (
        <>
            <Head>
                <title>Profile | React SNS</title>
            </Head>
            <AppLayout>
                <NickNameEditForm />
                <FollowList header="Follows" data={me.Follows} />
                <FollowerList header="Followers" data={me.Followers} />
            </AppLayout>
        </>
    )
}

export default profile
