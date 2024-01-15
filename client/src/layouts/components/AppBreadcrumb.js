import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import routes from 'src/routes/main'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  const getRouteName = (pathname) => {
    const currentRoute = routes.find((route) => {
      return route.breadcrumbs === pathname
    })
    return currentRoute?.name
  }

  const getBreadcrumbs = (locations) => {
    const breadcrumbs = []
    locations
      .split('/')
      .filter((loca, index) => {
        if (loca.length === 24 && index === 2) return false
        return true
      })
      .reduce((prev, curr, index, array) => {
        const currentPathname = `${prev}/${curr}`
        if (getRouteName(currentPathname)) {
          breadcrumbs.push({
            pathname: currentPathname,
            name: getRouteName(currentPathname),
            active: index + 1 === array.length,
          })
        }
        return currentPathname
      })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem>
        <Link to="/">Trang chủ</Link>
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        if (breadcrumb.pathname === '/') return null
        return (
          <CBreadcrumbItem active={breadcrumb.active} key={index}>
            {!breadcrumb.active ? (
              <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
            ) : (
              breadcrumb.name
            )}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
