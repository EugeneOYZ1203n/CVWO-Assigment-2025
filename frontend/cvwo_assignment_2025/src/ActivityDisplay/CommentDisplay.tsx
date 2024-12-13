import React from 'react'
import { Comment } from '../types'
import { Box, Text } from '@chakra-ui/react'
import { formatDate } from '../helper/format_date'

interface CommentDisplayProps {
  comment: Comment
}

const CommentDisplay : React.FC<CommentDisplayProps> = ({comment}) => {
  return (
    <Box>
      <Text textAlign="start" color="teal.300">
        {formatDate(comment.created_at)}: <strong>{comment.user_name}</strong>
      </Text>
      <Text textAlign="start" color="gray.300">
        {comment.comment_body}
      </Text>
    </Box>
  )
}

export default CommentDisplay