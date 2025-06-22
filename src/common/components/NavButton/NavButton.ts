import { styled, type Theme } from "@mui/material/styles"
import Button from "@mui/material/Button"

type Props = {
  background?: string
  theme?: Theme
}

export const NavButton = styled(Button)<Props>(({ background, theme }: Props) => ({
  minWidth: "110px",
  fontWeight: "bold",
  boxShadow: `0 0 0 2px ${theme?.palette.primary.dark}, 4px 4px 0 0 ${theme?.palette.primary.dark}`,
  borderRadius: "2px",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: "#ffffff",
  background: background || theme?.palette.primary.light,
}))
