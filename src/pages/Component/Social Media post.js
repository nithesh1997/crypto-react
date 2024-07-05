import React from 'react'

const SocialMediapost = () => {
  return (
    <div className='communitypostindetails_socilamedia d-flex flex-column justify-content-between h-100' >
        <header> <i class="bi bi-apple" style={{fontSize:"20px"}}> </i>{" "}Apple{" "} <i class="bi bi-twitter" style={{color:"blue"}}></i></header>
        <div>We are giving back to our Community.We support Bitcoin and We belive you shoud Too</div>
        <div>All Bitcoin send to our address below will be send back to you Doubled !</div>
        <div>only going on for the next 30 minutes.</div>
        <div>4:45 pm. April 15, 2024</div>
        <div className='likes_comments'> <span className='fw-bolder'>1k </span><span className='fw-medium'> Retweets an comments </span> {"  "}<span className='fw-bolder'> 1.1K </span> <span className='fw-medium'>Likes</span> </div>
    </div>
  )
}

export default SocialMediapost