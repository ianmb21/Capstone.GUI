import {
  MDBContainer,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from "mdb-react-ui-kit"

export default function Breadcrumb({ role, page }) {
  return (
    <MDBBreadcrumb>
      <MDBBreadcrumbItem>
        <a href={`/${role.toLowerCase()}/`}>{role}</a>
      </MDBBreadcrumbItem>
      <MDBBreadcrumbItem>
        {page}
      </MDBBreadcrumbItem>
    </MDBBreadcrumb>
  )
} 