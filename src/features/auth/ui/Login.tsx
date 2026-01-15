import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import { getTheme, useAppDispatch, useAppSelector } from "@/common/"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { type loginArgs, loginSchema } from "@/features/auth/lib/schemas"
import { useLoginMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { AUTH_TOKEN } from "@/common/constants"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<loginArgs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<loginArgs> = (data) => {
    login(data).then((res) => {
      const email = "email"
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        localStorage.setItem(email, data.email)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    })
  }

  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Controller
              name={"email"}
              control={control}
              render={({ field: { ...rest } }) => (
                <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} {...rest} />
              )}
            />
            {errors && <span className={s.errorMessage}>{errors.email?.message}</span>}
            <Controller
              name={"password"}
              control={control}
              render={({ field: { ...rest } }) => (
                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  error={!!errors.password}
                  {...register("password")}
                  {...rest}
                />
              )}
            />

            {errors && <span className={s.errorMessage}>{errors.password?.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                />
              }
            />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
