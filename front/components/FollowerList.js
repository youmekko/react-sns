import { List, Card } from 'antd'
import PropTypes from 'prop-types'
import { StopOutlined } from '@ant-design/icons'

function FollowerList({ header, data}) {
    return (
        <List 
            style={{ marginBottom: 20}}
            grid={{ gutter: 4, xs: 2, md: 3}}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={{ textAlign: 'center', margin: '10px 0' }}><button>Show more...</button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[<StopOutlined key="stop" />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    )
}

FollowerList.prototypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

export default FollowerList