'use client'

import { z } from 'zod'
import { useTranslation } from 'react-i18next'
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

const getFormSchema = (t: (key: string) => string) =>
  z.object({
    code: z.string().optional(),
    name: z.string().min(1, t('dialog.form.nameRequired')),
    description: z.string().min(1, t('dialog.form.descriptionRequired')),
    status: z.number().min(0, t('dialog.form.statusRequired')),
  })

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
  const { t } = useTranslation('campaign-management')
  const formSchema = getFormSchema(t)
  type CampaignForm = z.infer<typeof formSchema>
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
            {isEdit ? t('dialog.edit.title') : t('dialog.create.title')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('dialog.edit.description')
              : t('dialog.create.description')}
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
                        {t('dialog.form.code')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('dialog.form.codePlaceholder')}
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
                      {t('dialog.form.name')}{' '}
                      <span className='text-destructive'>
                        {t('dialog.form.requiredField')}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('dialog.form.namePlaceholder')}
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
                      {t('dialog.form.description')}{' '}
                      <span className='text-destructive'>
                        {t('dialog.form.requiredField')}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('dialog.form.descriptionPlaceholder')}
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
                      {t('dialog.form.status')}{' '}
                      <span className='text-destructive'>
                        {t('dialog.form.requiredField')}
                      </span>
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                      placeholder={t('dialog.form.statusPlaceholder')}
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
                  {t('dialog.form.statusWarning')}
                </p>
              )}
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='campaign-form' disabled={!isFormValid}>
            {t('dialog.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
