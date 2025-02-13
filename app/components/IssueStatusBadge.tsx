import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMapp: Record<Status, {label: string, color: 'red' | 'purple' | 'green'}> ={
    OPEN:{label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'Progress', color:'purple'},
    CLOSED: {label: 'Closed', color: 'green'}
}

const IssueStatusBadge = ({status}:{status:Status}) => {
  return (
    <Badge color={statusMapp[status].color}>{statusMapp[status].label}</Badge>
  )
}

export default IssueStatusBadge