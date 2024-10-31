'use client'

import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Course } from '@prisma/client'
import { Combobox } from '@/components/ui/combobox'

interface CategoryFormProps {
  initialData: Course
  courseId: string
  options: { label: string; value: string }[]
}

const formSchema = z.object({
  categoryId: z.string().min(1),
})

export default function CategoryForm({
  initialData,
  courseId,
  options,
}: CategoryFormProps) {
  const [isEdditing, setIsEdditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: initialData?.categoryId || '' },
  })

  const router = useRouter()

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success('Course updated')
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const toggleEdit = () => setIsEdditing((prev) => !prev)

  const selectedOptions = options.find(
    (option) => option.value === initialData.categoryId,
  )

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 text-black">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button className="" onClick={toggleEdit} variant="ghost">
          {isEdditing ? (
            <>Cancel</>
          ) : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEdditing ? (
        <p
          className={cn(
            'text-sm mt-2',
            !initialData.categoryId && 'text-slate-500 italic',
          )}
        >
          {selectedOptions?.label || 'No category'}
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button className="bg-black text-white" type="submit" disabled={isSubmitting || !isValid}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
