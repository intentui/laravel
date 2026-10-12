import AppLayout from "@/layouts/app-layout"
import { Head, useForm, usePage } from "@inertiajs/react"
import type { SharedData } from "@/types/shared"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "react-aria-components/Form"
import { TextField } from "@/components/ui/text-field"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import SettingsLayout from "@/pages/settings/settings-layout"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface Props {
  mustVerifyEmail: boolean
  status?: string
}

const title = "Profile"

export default function Profile({ mustVerifyEmail, status }: Props) {
  const { auth } = usePage<SharedData>().props
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: auth.user.name ?? "",
    email: auth.user.email ?? "",
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    patch("/settings/profile", {
      preserveScroll: true,
    })
  }

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account's profile information and email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form validationErrors={errors} onSubmit={submit} className="max-w-lg space-y-6">
            <TextField
              value={data.name}
              onChange={(v) => setData("name", v)}
              autoFocus
              autoComplete="name"
            >
              <Label>Name</Label>
              <Input />
              <FieldError>{errors.name}</FieldError>
            </TextField>
            <TextField
              value={data.email}
              onChange={(v) => setData("email", v)}
              autoComplete="email"
            >
              <Label>Email</Label>
              <Input type="email" />
              <FieldError>{errors.email}</FieldError>
            </TextField>

            {mustVerifyEmail && auth.user.email_verified_at === null && (
              <div>
                <p className="mt-2 text-base/6 sm:text-sm/6">
                  Your email address is unverified.
                  <Link
                    href="/email/verification-notification"
                    className="text-primary-subtle-foreground hover:underline"
                    method="post"
                  >
                    Click here to re-send the verification email.
                  </Link>
                </p>

                {status === "verification-link-sent" && (
                  <div className="mt-2 font-medium text-base/6 text-success-subtle-foreground hover:underline sm:text-sm/6">
                    A new verification link has been sent to your email address.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button type="submit" isDisabled={processing}>
                Save
              </Button>
              {recentlySuccessful && <p className="text-muted-foreground text-sm">Saved.</p>}
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

Profile.layout = [AppLayout, SettingsLayout]
