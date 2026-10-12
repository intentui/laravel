import GuestLayout from "@/layouts/guest-layout"
import { Head, Form } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "@/components/ui/link"
import { TextField } from "@/components/ui/text-field"
import { Loader } from "@/components/ui/loader"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface LoginProps {
  status: string
  canResetPassword: boolean
}

export default function Login(args: LoginProps) {
  const { status, canResetPassword } = args
  return (
    <>
      <Head title="Log in" />

      {status && <div className="mb-4 font-medium text-success-subtle-foreground">{status}</div>}

      <Form
        method="post"
        action="/login"
        resetOnSuccess={["password"]}
        className="flex flex-col gap-y-4"
      >
        {({ processing, errors }) => (
          <>
            <TextField name="email" autoComplete="username" autoFocus>
              <Label>Email</Label>
              <Input type="email" />
              <FieldError>{errors.email}</FieldError>
            </TextField>
            <TextField name="password" autoComplete="current-password">
              <Label>Password</Label>
              <Input type="password" />
              <FieldError>{errors.password}</FieldError>
            </TextField>
            <div className="flex items-center justify-between">
              <Checkbox name="remember">Remember me</Checkbox>
              {canResetPassword && (
                <Link
                  href="/forgot-password"
                  className="text-base/6 text-primary-subtle-foreground hover:underline sm:text-sm/6"
                >
                  Forgot your password?
                </Link>
              )}
            </div>
            <Button isPending={processing} type="submit">
              {processing && <Loader />}
              Log in
            </Button>
            <div className="text-center">
              <Link
                href="/register"
                className="text-base/6 text-primary-subtle-foreground hover:underline sm:text-sm/6"
              >
                Dont have account? Register
              </Link>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

Login.layout = (page: React.ReactNode) => (
  <GuestLayout
    header="Login"
    description="Sign in with your email or continue with a connected account."
    children={page}
  />
)
