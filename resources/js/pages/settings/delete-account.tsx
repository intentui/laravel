import { Head, useForm } from "@inertiajs/react"
import { useState } from "react"
import DeleteAccountController from "@/actions/App/Http/Controllers/Settings/DeleteAccountController"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { TextField } from "@/components/ui/text-field"
import AppLayout from "@/layouts/app-layout"
import SettingsLayout from "@/pages/settings/settings-layout"

const title = "Delete Account"
export default function DeleteAccount() {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  })

  const deleteUser = () => {
    destroy(DeleteAccountController.destroy().url, {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    })
  }

  const closeModal = () => {
    setConfirmingUserDeletion(false)
    reset()
  }

  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="max-w-lg">
            Once your account is deleted, all of its resources and data will be permanently deleted.
            Before deleting your account, please download any data or information that you wish to
            retain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DialogTrigger onOpenChange={setConfirmingUserDeletion} isOpen={confirmingUserDeletion}>
            <Button onPress={() => setConfirmingUserDeletion(true)} intent="danger">
              Delete Account
            </Button>
            <Dialog>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete your account? Once your account is deleted, all of
                  its resources and data will be permanently deleted. Please enter your password to
                  confirm you would like to permanently delete your account.
                </DialogDescription>
              </DialogHeader>

              <DialogBody>
                <TextField
                  value={data.password}
                  onChange={(v) => setData("password", v)}
                  isRequired
                >
                  <Label className="sr-only">Password</Label>
                  <Input type="password" placeholder="Password" />
                  <FieldError>{errors.password}</FieldError>
                </TextField>
              </DialogBody>
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <Button intent="danger" type="submit" onPress={deleteUser} isDisabled={processing}>
                  Continue
                </Button>
              </DialogFooter>
            </Dialog>
          </DialogTrigger>
        </CardContent>
      </Card>
    </>
  )
}

DeleteAccount.layout = [AppLayout, SettingsLayout]
