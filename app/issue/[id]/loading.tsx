import { Card, Flex} from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '../../components'

const IssueDetailsLoading = () => {
  return (
    <div>
      <Skeleton width={300} className='mb-3'/>
      <Flex gapX="3">
        <Skeleton width={50}/>
        <Skeleton width={100}/>
      </Flex>
      <Card mt='2' className="max-w-prose"><Skeleton count={3}/></Card>
    </div>
  )
}

export default IssueDetailsLoading