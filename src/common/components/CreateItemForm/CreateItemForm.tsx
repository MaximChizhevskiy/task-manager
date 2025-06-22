import React, { type ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"

type Props = {
  onCreateItem: (title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [error, setError] = useState<string | null>("")
  const [title, setTitle] = useState("")

  const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const createItemHandler = () => {
    const trimmedTitle = title.trim()
    if (trimmedTitle !== "") {
      onCreateItem(trimmedTitle)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }
  const createTaskOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createItemHandler()
    }
  }
  return (
    <div>
      <TextField
        className={error ? "error" : "create-form"}
        variant={"outlined"}
        label={"Enter a title"}
        value={title}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeItemTitleHandler}
        onKeyDown={createTaskOnEnterHandler}
      />
      <IconButton color={"primary"} onClick={createItemHandler}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
