import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import { getTheme, useAppDispatch, useAppSelector } from "@/common"
import { NavButton } from "@/common/components"
import { changeThemeModeAC, selectIsLoggedIn, selectThemeMode, setIsLoggedIn, statusLoading } from "@/app/app-slice.ts"
import LinearProgress from "@mui/material/LinearProgress"
import { useLogOutMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { baseApi } from "@/app/baseApi.ts"

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const isLoading = useAppSelector(statusLoading)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [logout] = useLogOutMutation()

  const changeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          localStorage.removeItem(AUTH_TOKEN)
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          //dispatch(baseApi.util.resetApiState())
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Container maxWidth={"lg"}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Container>
        {isLoggedIn && localStorage.getItem("email")}
        {isLoggedIn && <NavButton onClick={logoutHandler}> Logout</NavButton>}
        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
        <Switch color={"default"} onClick={changeThemeMode} />
      </Toolbar>
      {isLoading === "loading" && <LinearProgress />}
    </AppBar>
  )
}
