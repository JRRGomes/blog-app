import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Grommet } from 'grommet';
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
      {!hasError && !isLoading && <Box flex direction='row' width='100%' wrap margin={{top: 'small'}} gap='small'>
        {posts.map((postObj) => (
          <Box margin={{bottom: 'small'}} background="light-3">
            <Box pad="small">Title: {postObj.title}</Box>
            <Box pad="small">Body: {postObj.body}</Box>
            {postObj.comment.map((comment) => (
              <Box pad="small">Comment: {comment.body}</Box>
            ))}
          </Box>
        ))}
     </Box>}
     {hasError && <div>Could not load posts</div>}
     {isLoading && <div>Loading...</div>}
    </Grommet>
  );
}

export default App;
