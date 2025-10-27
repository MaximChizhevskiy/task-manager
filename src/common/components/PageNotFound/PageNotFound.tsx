import styles from "./PageNotFound.module.css"
import Button from "@mui/material/Button"
import { Path } from "@/common/routing/Routing.tsx"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button
      sx={{ display: "block", mx: "auto", mt: 2 }}
      className={styles.button}
      color={"primary"}
      variant={"contained"}
      href={Path.Main}
    >
      Main page
    </Button>
  </>
)
