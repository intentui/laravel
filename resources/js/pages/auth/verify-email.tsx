import { Head, Form } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

import EmailVerificationNotificationController from "@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import GuestLayout from "@/layouts/guest-layout"

export default function VerifyEmail({ status }: { status?: string }) {
  return (
    <>
      <Head title="Email Verification" />
      {status === "verification-link-sent" && (
        <div className="mb-4 text-sm font-medium text-green-600">
          A new verification link has been sent to the email address you provided during
          registration.
        </div>
      )}

      <Form
        {...EmailVerificationNotificationController.store.form()}
        className="mt-4 flex items-center justify-between"
      >
        {({ processing }) => (
          <>
            <Button isPending={processing} type="submit">
              {processing && <Loader />}
              Resend Verification Email
            </Button>

            <Link href="/logout" method="post" className="text-primary-subtle-foreground">
              Log Out
            </Link>
          </>
        )}
      </Form>
    </>
  )
}

VerifyEmail.layout = (page: any) => (
  <GuestLayout
    header="Verify email"
    description="
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another."
    children={page}
  />
)
