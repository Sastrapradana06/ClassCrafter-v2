import { createTheme } from 'react-data-table-component';

export const themeTable = createTheme('themeTable', {
  text: {
    primary: '#ffff', 
    secondary: 'white',
  },
  background: {
    default: '#404556',
  },
  context: {
    background: '#FF6666',
    text: '#FFFFFF',
  },
  divider: {
    default: '#CCCCCC',
  },
  action: {
    button: '#666666',
    hover: '#DDDDDD', 
    disabled: '#CCCCCC',
  },
}, 'dark');


