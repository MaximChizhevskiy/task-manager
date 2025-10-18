import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "../../features/auth/ui/Login.tsx"
import { PageNotFound } from "@/common/components"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />}></Route>
      <Route path={Path.Login} element={<Login />}></Route>
      <Route path={Path.NotFound} element={<PageNotFound />}></Route>
    </Routes>
  )
}
