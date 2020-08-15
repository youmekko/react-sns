import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import NickNameEditForm from '../components/NickNameEditForm'
import FollowList from '../components/followList'
import FollowerList from '../components/FollowerList'

function profile() {

    const followList = [{ nickname: '엘사'}, { nickname: '안나'}]
    const followerList = [{ nickname: '울라프'}, { nickname: '크리스토프'}]
    

    return (
        <>
            <Head>
                <title>Profile | React SNS</title>
            </Head>
            <AppLayout>
                <NickNameEditForm />
                <FollowList header="Follow List" data={followList} />
                <FollowerList header="Follower List" data={followerList} />
            </AppLayout>
        </>
    )
}

export default profile
