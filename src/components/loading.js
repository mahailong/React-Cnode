import { ActivityIndicator } from 'antd-mobile';

export default function ({ bool, children }) {
    return(<span>{ bool
        ? children
        : <ActivityIndicator
            toast
            text="正在加载"
        />
    }</span>)
}
