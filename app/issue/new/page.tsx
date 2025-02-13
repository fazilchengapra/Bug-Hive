'use client'
import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useForm} from 'react-hook-form'


interface issueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const route = useRouter()
  const {register, handleSubmit} =useForm<issueForm>()
  return (
    <div>
      <form className="max-w-xl space-y-2" onSubmit={handleSubmit(async(data) => {
        const result = await axios.post('/api/issues', data)
        console.log(result)
        route.push('/issue')
      })}>
        <TextField.Root {...register('title')}
          placeholder="Title"
        ></TextField.Root>
        <TextArea placeholder="Description" {...register('description')} />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
