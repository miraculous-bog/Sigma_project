import { Box } from '@mui/material';

export default function Net() {
  return (
    <Box
      sx={{
        height: '100vh',
        minWidth: 900,
        display: 'grid',
        gridTemplateColumns: '120px 1fr', // sidebar | content
        gap: 0,
      }}
    >
      {/* Sidebar */}
      <Box
        component="aside"
        sx={{
          borderRight: '2px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          gap: 2,
        }}
      >
        {/* іконки-ботончики */}
        <Box sx={{ width: 64, height: 64, border: '2px solid', borderColor: 'text.primary' }} />
        <Box sx={{ width: 64, height: 64, border: '2px solid', borderColor: 'text.primary' }} />
        <Box sx={{ flex: 1 }} />
        {/* config */}
        <Box
          sx={{
            width: 64,
            height: 64,
            border: '2px solid',
            borderColor: 'text.primary',
            borderRadius: '20% / 40%', // просто плейсхолдер під "зірочку"
          }}
        />
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr', // SIGMA | WAZUH
          gap: 5,
          p: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* SIGMA panel */}
        <Box
          sx={{
            border: '3px solid',
            borderColor: 'text.primary',
            p: 2,
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto', // header | body | footer
            gap: 10,
            minWidth: 0,
          }}
        >
          {/* внутрішня рамка (як на макеті) */}
          {/* footer-кнопки */}
          <Box
            sx={{
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              pl: 2,
            }}
          >
            <Box>Edit</Box>
            <Box>Clear</Box>
            <Box>Conver</Box>
          </Box>
        </Box>

        {/* WAZUH panel */}
        <Box
          sx={{
            border: '3px solid',
            borderColor: 'text.primary',
            p: 2,
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            gap: 12,
            minWidth: 0,
          }}
        >
          {/* внутрішня рамка */}

          <Box
            sx={{
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              pl: 1,
              justifyContent: 'space-between',
              pr: 1,
            }}
          >
            <Box>Edit</Box>
            <Box>Copy</Box>
            <Box>Save</Box>
            <Box>Clear</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
