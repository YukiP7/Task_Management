import React , {useEffect , useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


export default function Protected({children}) {

    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)

    const authStatus = useSelector(state => state.auth.status)
    useEffect(() => {
        if( !authStatus === "false" ){
            navigate('/login')
        }else{
            navigate('/')
        }
        setLoader(false)
    } , [authStatus , navigate ])

  return loader? <h1>Loading...</h1> : <>{children}</>
}