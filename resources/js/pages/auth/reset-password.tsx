import { Head, Form } from "@inertiajs/react"

import NewPasswordController from "@/actions/App/Http/Controllers/Auth/NewPasswordController"
import { Button } from "@/components/ui/button"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Loader } from "@/components/ui/loader"
import { TextField } from "@/components/ui/text-field"
import GuestLayout from "@/layouts/guest-layout"

interface ResetPasswordProps {
  token: string
  email: string
}

export default function ResetPassword(args: ResetPasswordProps) {
  const { token, email } = args

  return (
    <>
      <Head title="Reset Password" />

      <Form
        {...NewPasswordController.store.form()}
        className="space-y-6"
        transform={(data) => ({ ...data, token, email })}
      >
        {({ processing, errors }) => (
          <>
            <TextField name="email" isRequired>
              <Label>Email</Label>
              <Input type="email" autoComplete="username" />
              <FieldError>{errors.email}</FieldError>
            </TextField>

            <TextField name="password" isRequired autoFocus>
              <Label>Password</Label>
              <Input type="password" autoComplete="new-password" />
              <FieldError>{errors.password}</FieldError>
            </TextField>

            <TextField name="password_confirmation" isRequired>
              <Label>Confirm Password</Label>
              <Input type="password" autoComplete="new-password" />
              <FieldError>{errors.password_confirmation}</FieldError>
            </TextField>

            <div className="mt-4 flex items-center justify-end">
              <Button type="submit" className="ml-4" isPending={processing}>
                {processing && <Loader />}
                Reset Password
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

ResetPassword.layout = (page: any) => (
  <GuestLayout
    header="Reset Password"
    description="Please enter your email address and new password to reset your password."
    children={page}
  />
)
