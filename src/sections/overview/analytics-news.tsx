import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';
import type { SelectChangeEvent } from '@mui/material/Select';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  classes: string[];
  list: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
    postedAt: string | number | null;
    studentClass: string;
    rank?: number;
  }[];
};

export function AnalyticsNews({ title, subheader, classes, list, sx, ...other }: Props) {
  const [selectedClass, setSelectedClass] = useState('All');

  const handleClassChange = (event: SelectChangeEvent) => {
    setSelectedClass(event.target.value);
  };

  const filteredList = selectedClass === 'All' 
    ? list 
    : list.filter((item) => item.studentClass === selectedClass);

  return (
    <Card sx={sx} {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        sx={{ mb: 1 }} 
        action={
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={selectedClass}
              label="Class"
              onChange={handleClassChange}
            >
              <MenuItem value="All">All Classes</MenuItem>
              {classes.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />

      <Scrollbar sx={{ minHeight: 405 }}>
        <Box sx={{ minWidth: 640 }}>
          {filteredList.map((item, index) => (
            <Item key={item.id} item={item} rank={item.rank ?? (index + 1)} />
          ))}
        </Box>
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View full rankings
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = BoxProps & {
  item: Props['list'][number];
  rank: number;
};

function Item({ item, rank, sx, ...other }: ItemProps) {
  return (
    <Box
      sx={[
        (theme) => ({
          py: 2,
          px: 3,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: 40, 
        height: 40, 
        borderRadius: '50%', 
        bgcolor: 'primary.main', 
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        flexShrink: 0
      }}>
        #{rank}
      </Box>

      {/* <Avatar
        variant="rounded"
        alt={item.title}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      /> */}

      <ListItemText
        primary={item.title}
        secondary={item.description}
        slotProps={{
          primary: { noWrap: true },
          secondary: {
            noWrap: true,
            sx: { mt: 0.5 },
          },
        }}
      />

      <Box sx={{ flexShrink: 0, typography: 'caption', color: 'text.disabled' }}>
        {fToNow(item.postedAt)}
      </Box>
    </Box>
  );
}