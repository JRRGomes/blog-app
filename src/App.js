import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardHeader, CardBody, Heading, Grommet } from 'grommet';
import { Notification } from 'grommet-icons';
import { theme } from './theme'
import { AppBar } from './components/AppBar'
import { fetchPosts } from './components/fetchPosts';

function App() {

  const [posts, setPosts] = useState([])

  const getPosts = () => {
    fetchPosts.then((res) => {
      setPosts(res)
    })
  }

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts)

  return (
    <Grommet theme={theme}>
      <AppBar>
        My Blog
        <Heading level='3' margin='none'>Blog Posts</Heading>
        <Button icon={<Notification />} onClick={()=>{}}></Button>
      </AppBar>
      <Box flex margin='large' gap='medium'>
        {posts.map((postObj) => (
          <Card height="small" width="small" background="light-1">
            <CardHeader pad="medium">{postObj.title}</CardHeader>
          </Card>
        ))}
     </Box>
    </Grommet>
  );
}

export default App;
