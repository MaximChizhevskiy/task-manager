import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import { changeThemeModeAC } from "@/app/app-reducer.ts"
import { selectThemeMode } from "@/app/app-selectors.ts"
import { getTheme, useAppDispatch, useAppSelector } from "@/common"
import { NavButton } from "@/common/components"

export const Header = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  const changeThemeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Container maxWidth={"lg"}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Container>
        <NavButton>Sign in</NavButton>
        <NavButton>Sign up</NavButton>
        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
        <Switch color={"default"} onClick={changeThemeMode} />
      </Toolbar>
    </AppBar>
  )
}
