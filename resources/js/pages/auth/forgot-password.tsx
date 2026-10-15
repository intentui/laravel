import { Head, Form } from "@inertiajs/react"

import PasswordResetLinkController from "@/actions/App/Http/Controllers/Auth/PasswordResetLinkController"
import { Button } from "@/components/ui/button"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Loader } from "@/components/ui/loader"
import { TextField } from "@/components/ui/text-field"
import GuestLayout from "@/layouts/guest-layout"

interface ForgotPasswordProps {
  status: string
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  return (
    <>
      <Head title="Forgot Password" />
      {status && <div className="text-sm font-medium text-success">{status}</div>}

      <Form className="mt-4 space-y-4" {...PasswordResetLinkController.store.form()}>
        {({ processing, errors }) => (
          <>
            <TextField name="email" isRequired autoFocus>
              <Label className="sr-only">Email</Label>
              <Input type="email" />
              <FieldError>{errors.email}</FieldError>
            </TextField>

            <div className="flex items-center justify-end">
              <Button type="submit" className="w-full" isPending={processing}>
                {processing && <Loader />}
                Email Password Reset Link
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

ForgotPassword.layout = (page: any) => (
  <GuestLayout
    header="Forgot Password"
    description="
                    Forgot your password? No problem. Just let us know your email address and we will email you a password
                    reset link that will allow you to choose a new one."
    children={page}
  />
)
