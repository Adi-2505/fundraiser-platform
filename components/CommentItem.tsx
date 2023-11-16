import React from 'react'

interface CommentItemProps {
  username: string;
  comment: string;
  avatarUrl: string;
}


const CommentItem = ({
  username,
  comment,
  avatarUrl
}: CommentItemProps) => {
  return (
    <div className='w-full'>
      <div className='flex items-center'>
        <img src={avatarUrl} alt="img" className='w-8 h-8 rounded-full' />
        <div className='ml-2'>
          <div className='text-sm font-semibold'>{username}</div>
          <div className='text-sm font-light'>{comment}</div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem