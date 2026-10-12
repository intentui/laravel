import GuestLayout from "@/layouts/guest-layout"
import { Head, Form } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/text-field"
import { Loader } from "@/components/ui/loader"
import ConfirmablePasswordController from "@/actions/App/Http/Controllers/Auth/ConfirmablePasswordController"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function ConfirmPassword() {
  return (
    <>
      <Head title="Confirm Password" />

      <div className="mb-4 text-muted-foreground text-sm">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <Form {...ConfirmablePasswordController.store.form()} resetOnSuccess={["password"]}>
        {({ processing, errors }) => (
          <>
            <TextField id="password" name="password" autoFocus>
              <Label>Password</Label>
              <Input type="password" />
              <FieldError>{errors.password}</FieldError>
            </TextField>

            <div className="mt-4 flex items-center justify-end">
              <Button isPending={processing}>
                {processing && <Loader />}
                Confirm
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

ConfirmPassword.layout = (page: any) => <GuestLayout header="Confirm password" children={page} />
