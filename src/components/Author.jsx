// import React from 'react'


// function Author({userId}) {
//   const {user, isLoading, isSuccess}=useGetUsersQuery("getUsers",{
//     selectFromResult: (data,isLoading)=>{
//       data.filter(user=>{ return user.id===userId}),
//       isLoading
//     }
//   })
   
 
//   return (
//    <span className='font-bold text-slate-700 dark: bg-slate-50'>by {user.length>0 ? user[0].name : "Unknown Author"}</span>
//   )
// }

// export default Author