import React from 'react';
import { Box, Button, Heading, Grommet } from 'grommet';
import { Notification } from 'grommet-icons';
import { theme } from './theme'
import { AppBar } from './components/AppBar'

function App() {
  return (
    <Grommet theme={theme}>
      <AppBar>
        My Blog
        <Heading level='3' margin='none'>Blog Posts</Heading>
        <Button icon={<Notification />} onClick={()=>{}}></Button>
      </AppBar>
      <Box flex align='center' justify='center'>
       blog body
     </Box>
    </Grommet>
  );
}

export default App;
