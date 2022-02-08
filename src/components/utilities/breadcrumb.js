import {
  MDBContainer,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from "mdb-react-ui-kit"
import { Link } from "react-router-dom"

export default function Breadcrumb({ role, page }) {
  return (
    <MDBBreadcrumb>
      <MDBBreadcrumbItem>
        <Link to={`/${role.toLowerCase()}/`}>
          {role}
        </Link>
      </MDBBreadcrumbItem>
      <MDBBreadcrumbItem>
        {page}
      </MDBBreadcrumbItem>
    </MDBBreadcrumb>
  )
} 