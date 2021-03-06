import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import RefreshButton from './containers/RefreshButton'
import MenuButton from './containers/MenuButton'
import { Tabs, Tab, Box, Drawer, IconButton, Tooltip } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Logo from 'components/Logo'

const routes = [
  { path: '/budget', label: 'Бюджет' },
  { path: '/transactions', label: 'История' },
]

const NavigationDrawer = ({
  location,
  match,
  history,
  staticContext,
  ...rest
}) => {
  const theme = useTheme()
  const SmallTab = withStyles({ root: { minWidth: 120 } })(Tab)
  return (
    <Drawer {...rest}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
      >
        <Box py={3} px={2}>
          <Logo width="120" fill={theme.palette.text.secondary} />
        </Box>

        <Box width="100%" py={3}>
          <Tabs
            value={routes.findIndex(route => route.path === location.pathname)}
            indicatorColor="primary"
            orientation="vertical"
            variant="scrollable"
          >
            {routes.map(route => (
              <SmallTab
                component={Link}
                label={route.label}
                to={route.path}
                key={route.path}
              />
            ))}
            <SmallTab
              label="О проекте"
              component="a"
              href="https://www.notion.so/ZERRO-a943f930d0a64d008712e20ecd299dbd"
              target="_blank"
              rel="noopener noreferrer"
            />
          </Tabs>
        </Box>

        <Box mt="auto" pt={3} pb={5} display="flex" flexDirection="column">
          <Tooltip title="Поддержать проект">
            <IconButton
              component="a"
              href="https://money.yandex.ru/to/4100110993756505/200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AttachMoneyIcon />
            </IconButton>
          </Tooltip>
          <RefreshButton />
          <MenuButton />
        </Box>
      </Box>
    </Drawer>
  )
}

export default withRouter(NavigationDrawer)
