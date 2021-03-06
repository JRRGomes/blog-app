import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardHeader, Heading, Grommet } from 'grommet';
import { Notification } from 'grommet-icons';
import { theme } from './theme'
import { AppBar } from './components/AppBar'
import { fetchPosts } from './components/fetchPosts';

const totalPosts = 95;
const pageSize = 20;

function App() {

  const [posts, setPosts] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getPosts = () => {
    setIsLoading(true)
    fetchPosts(totalPosts, pageSize)
    .then((res) => {
      setIsLoading(false)
      setPosts(res)
    })
    .catch(() =>{
      setIsLoading(false)
      setHasError(true)
    })
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Grommet theme={theme}>
      <AppBar>
        My Blog
        <Heading level='3' margin='none'>Blog Posts</Heading>
        <Button icon={<Notification />} onClick={()=>{}}></Button>
      </AppBar>
      {!hasError && !isLoading && <Box flex margin='large' gap='medium'>
        {posts.map((postObj) => (
          <Card height="small" width="small" background="light-1">
            <CardHeader pad="medium">{postObj.title}</CardHeader>
          </Card>
        ))}
     </Box>}
     {hasError && <div>Could not load posts</div>}
     {isLoading && <div>Loading...</div>}
    </Grommet>
  );
}

export default App;
