import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import NickNameEditForm from '../components/NickNameEditForm'
import FollowList from '../components/followList'
import FollowerList from '../components/FollowerList'
import { useSelector } from 'react-reudx'

function profile() {
    const { me } = useSelector(state => state.user)

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
