import React, { useContext, useEffect, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet } from 'react-native'
import CarouselCards from './CarouselCards'
import LikeDislikeContext from '@/Context/UpdateLikeDislikeContext';



export default function CarouselMain({data}:any) {
  const updateLikeAndDislikeCount = useContext(LikeDislikeContext);
  const handlePress = () => {
    updateLikeAndDislikeCount(data._id);
  }
 
  return (
    <SafeAreaView>
      <CarouselCards data={data} onPress={handlePress}/>
      </SafeAreaView>
    
  );
}

// import { usePostDetailMutation } from '@/services/modules/post'
// import { logToCrashlytics, onTokenExpired } from '@/theme/Common'
// import { useDispatch, useSelector } from 'react-redux'
// const [getDetail, { isDetailLoading }] = usePostDetailMutation()
// const [postDetailData, setPostDetailData] = useState()
// const dispatch = useDispatch()
// const authData = useSelector((state:any)=>state.auth.authData) 
// const token = useSelector((state:any)=>state.auth.token)
// const CarouselMain = ({data}: any, {props, ref}: any) => {
//   const [updatedData, setUpdatedData] = useState(null);

//   const handleUpdateLikeAndDislikeCount = (postId) => {
//     const updatedValue = updateLikeAndDislikeCount(postId);
//     setUpdatedData(updatedValue);
//   }

  // const getpostDetail = async (postId) => {
  //   logToCrashlytics('get post detail api call')
  //   const result: any = await getDetail({ id: postId, token });
  //   if (result?.data?.statusCode === 200) {
  //     setPostDetailData(result?.data?.result)
  //   } else {

  //     if (result?.error?.data) {
  //       Alert.alert(result?.error?.data?.message)
  //     }
  //     if (result?.error?.error) {
  //       logToCrashlytics('get post detail api error', result?.error?.error)
  //       Alert.alert('Something went wrong !!')
  //     }
  //     if (result.error && result.error.status === 401) {
  //       onTokenExpired(dispatch)
  //     }
  //   }
  // }

  // useEffect(() => {
  //  getpostDetail(data?._id)
  // }, [])

  // const updatePostDetails = (postId) => {
  //   getpostDetail(postId)
  // } 
   //onLikeDislike={updatePostDetails}


//   return (<SafeAreaView>
//     <CarouselCards data={updatedData}/> 
//     </SafeAreaView>
//   )
//   }

// export default CarouselMain;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 50
//   },
// });