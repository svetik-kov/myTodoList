import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"

/*type Props = {
  children: ReactNode
  isAllowed: boolean
}

export const ProtectedRoute = ({ children, isAllowed }: Props) => {
  if (!isAllowed) {
    return <Navigate to={Path.Login} />
  }
  return children
}*/

type Props = {
  isAllowed: boolean
  children?: ReactNode
  redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}
