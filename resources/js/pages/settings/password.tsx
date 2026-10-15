import { Head, useForm } from "@inertiajs/react"
import { useRef } from "react"
import { Form } from "react-aria-components/Form"

import PasswordController from "@/actions/App/Http/Controllers/Settings/PasswordController"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { TextField } from "@/components/ui/text-field"
import AppLayout from "@/layouts/app-layout"
import SettingsLayout from "@/pages/settings/settings-layout"

const title = "Change Password"

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null)
  const currentPasswordInput = useRef<HTMLInputElement>(null)
  const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(PasswordController.update().url, {
      preserveScroll: true,
      onSuccess: () => {
        reset()
      },
      onError: () => {
        if (errors.password) {
          reset("password", "password_confirmation")
          passwordInput.current?.focus()
        }

        if (errors.current_password) {
          reset("current_password")
          currentPasswordInput.current?.focus()
        }
      },
    })
  }

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Ensure your account is using a long, random password to stay secure.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form validationErrors={errors} onSubmit={submit} className="max-w-lg space-y-6">
            <TextField
              value={data.current_password}
              onChange={(v) => setData("current_password", v)}
              autoFocus
              isRequired
            >
              <Label>Current Password</Label>
              <Input type="password" autoComplete="current-password" />
            </TextField>

            <TextField
              name="password"
              value={data.password}
              onChange={(v) => setData("password", v)}
              isRequired
            >
              <Label>Password</Label>
              <Input type="password" autoComplete="new-password" />
              <FieldError>{errors.password}</FieldError>
            </TextField>

            <TextField
              name="password_confirmation"
              value={data.password_confirmation}
              onChange={(v) => setData("password_confirmation", v)}
              isRequired
            >
              <Label>Confirm Password</Label>
              <Input type="password" autoComplete="new-password" />
              <FieldError>{errors.password_confirmation}</FieldError>
            </TextField>

            <div className="flex items-center gap-4">
              <Button type="submit" isDisabled={processing}>
                Save
              </Button>

              {recentlySuccessful && <p className="text-sm text-muted-foreground">Saved.</p>}
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

Password.layout = [AppLayout, SettingsLayout]
