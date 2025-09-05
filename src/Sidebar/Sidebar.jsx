import * as React from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
  Badge,
  Box,
} from '@mui/material'
import {
  Dashboard,
  Analytics as AnalyticsIcon,
  Settings,
  People,
  Folder,
  ExpandLess,
  ExpandMore,
  Article,
  Assessment,
  Tune,
  Security,
} from '@mui/icons-material'

// --- Component Sidebar ---
function walk(nodes, fn) {
  nodes.forEach((n) => { fn(n); if (n.children) walk(n.children, fn) })
}

function iconFor(node) {
  if (node.kind === 'group') {
    if (node.id.includes('analytics')) return <AnalyticsIcon />
    if (node.id.includes('settings')) return <Settings />
    return <Folder />
  }
  if (node.kind === 'section') {
    if (node.id.includes('users')) return <People />
    if (node.id.includes('security')) return <Security />
    if (node.id.includes('reports')) return <Assessment />
    if (node.id.includes('dashboards')) return <Dashboard />
    return <Folder />
  }
  if (node.id.includes('audit') || node.id.includes('policies')) return <Article />
  if (node.id.includes('kpi') || node.id.includes('overview')) return <Dashboard />
  if (node.id.includes('roles')) return <Tune />
  return <Article />
}

function useFilteredMenu(tree, role) {
  return React.useMemo(() => {
    const filter = (nodes) =>
      nodes
        .filter((n) => !n.meta?.roles || n.meta.roles.includes(role))
        .map((n) => ({ ...n, children: n.children ? filter(n.children) : undefined }))
        .filter((n) => (n.kind === 'item' ? true : (n.children?.length ?? 0) > 0))
    return filter(tree)
  }, [tree, role])
}

export default function Sidebar({
  data,
  role = 'user',
  width = 280,
  persistKey,
  LinkComponent,
  onNavigate,
}) {
  const menu = useFilteredMenu(data, role)

  const [open, setOpen] = React.useState(() => {
    const base = {}
    walk(menu, (n) => n.defaultOpen && (base[n.id] = true))
    if (!persistKey) return base
    try {
      const saved = JSON.parse(localStorage.getItem(persistKey) || '{}')
      return { ...base, ...saved }
    } catch { return base }
  })

  React.useEffect(() => {
    if (persistKey) localStorage.setItem(persistKey, JSON.stringify(open))
  }, [open, persistKey])

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width, boxSizing: 'border-box', borderRight: 0 },
      }}
    >
      <Box sx={{ overflowY: 'auto', pt: 1 }}>
        <List disablePadding>
          {menu.map((node) => (
            <Node
              key={node.id}
              node={node}
              open={open}
              setOpen={setOpen}
              LinkComponent={LinkComponent}
              onNavigate={onNavigate}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

function Node({ node, open, setOpen, LinkComponent, onNavigate }) {
  if (node.kind === 'item') {
    const content = (
      <>
        <ListItemIcon sx={{ minWidth: 36 }}>{iconFor(node)}</ListItemIcon>
        <ListItemText
          primary={
            node.meta?.badge ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{node.title}</span>
                <Badge badgeContent={node.meta.badge} color="default" />
              </Box>
            ) : (
              node.title
            )
          }
        />
      </>
    )

    if (node.path && LinkComponent) {
      return (
        <ListItemButton component={LinkComponent} to={node.path} sx={{ pl: 3 }}>
          {content}
        </ListItemButton>
      )
    }

    return (
      <ListItemButton sx={{ pl: 3 }} onClick={() => node.path && onNavigate?.(node.path)}>
        {content}
      </ListItemButton>
    )
  }

  const isOpen = !!open[node.id]
  const hasChildren = (node.children?.length ?? 0) > 0

  return (
    <Box>
      <ListItemButton onClick={() => hasChildren && setOpen((s) => ({ ...s, [node.id]: !s[node.id] }))} sx={{ pt: 1, pb: 1, pl: node.kind === 'group' ? 2 : 3 }}>
        <ListItemIcon sx={{ minWidth: 36 }}>{iconFor(node)}</ListItemIcon>
        <ListItemText
          primary={
            node.kind === 'group' ? (
              <Typography variant="caption" sx={{ letterSpacing: 0.6, opacity: 0.8 }}>
                {node.title.toUpperCase()}
              </Typography>
            ) : (
              node.title
            )
          }
        />
        {hasChildren ? (isOpen ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItemButton>

      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children.map((ch) => (
              <Node key={ch.id} node={ch} open={open} setOpen={setOpen} LinkComponent={LinkComponent} onNavigate={onNavigate} />
            ))}
          </List>
        </Collapse>
      )}

      {node.kind === 'group' && <Divider sx={{ my: 1 }} />}
    </Box>
  )
}
