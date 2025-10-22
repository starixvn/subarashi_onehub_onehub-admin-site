'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SelectDropdown } from '@/components/select-dropdown'
import { status } from '../../data/data'
import { type Campaign } from '../../data/schema'

const formSchema = z.object({
  code: z.string().optional(),
  name: z.string().min(1, 'Name is required.'),
  description: z.string().min(1, 'Description is required.'),
  status: z.number().min(0, 'Status is required.'),
})

type CampaignForm = z.infer<typeof formSchema>

type CampaignActionDialogProps = {
  currentRow?: Campaign
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CampaignActionDialog({
  currentRow,
  open,
  onOpenChange,
}: CampaignActionDialogProps) {
  const isEdit = !!currentRow
  const form = useForm<CampaignForm>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: isEdit
      ? currentRow
      : {
          name: '',
          description: '',
          status: 0,
        },
  })

  const onSubmit = (values: CampaignForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  const isStatusModified = !!form.formState.dirtyFields.status
  const isFormValid = form.formState.isValid

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Edit Campaign' : 'Add New Campaign'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the campaign here. '
              : 'Create new campaign here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='campaign-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              {isEdit && (
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-end'>
                        Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='CAMP001'
                          className='col-span-4'
                          autoComplete='off'
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Name <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Summer Campaign'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 pt-2 text-end'>
                      Description <span className='text-destructive'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Campaign description...'
                        className='col-span-4 min-h-24'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Status <span className='text-destructive'>*</span>
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                      placeholder='Select a status'
                      className='col-span-4'
                      items={status.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              {isStatusModified && (
                <p className='px-0.5 text-sm font-medium text-amber-600 dark:text-amber-500'>
                  Only active campaigns are available for selection when
                  creating a new landing page.
                </p>
              )}
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='campaign-form' disabled={!isFormValid}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
