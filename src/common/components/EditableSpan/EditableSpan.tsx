import { type ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import type { RequestStatusLoading } from "@/common/types"

type Props = {
  value: string
  onChange: (title: string) => void
  entityStatus?: RequestStatusLoading
}
export const EditableSpan = ({ value, onChange, entityStatus }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(value)
  const turnOnEditMode = () => {
    setIsEditMode(true)
  }
  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }
  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  return (
    <>
      {isEditMode && entityStatus !== "loading" ? (
        <TextField
          variant={"outlined"}
          size={"small"}
          value={title}
          autoFocus={true}
          onBlur={turnOffEditMode}
          onChange={changeTitle}
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}
