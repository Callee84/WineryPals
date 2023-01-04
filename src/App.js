import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom'
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import CreatePost from './pages/posts/CreatePost';
import PostViewPage from './pages/posts/PostViewPage';
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './context/CurrentUser';



function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || ""; 

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path='/' render={() => (<PostsPage message="No results found. Please search for something else." /> )} />
          <Route exact path='/feed' render={() => (
                <PostsPage 
                  message="No results found. Please search for something else or try following another fellow Winerypal." /> )} 
                  filter={`owner__followed__owner__profile=${profile_id}&`} />
          <Route exact path='/signin' render={() => <LogInForm />} />
          <Route exact path='/signup' render={() => <SignUpForm />} />
          <Route exact path='/posts/create' render={() => <CreatePost />} />
          <Route exact path='/posts/:id' render={() => <PostViewPage />} />
          <Route exact path='/wines/' render={() => <h1>Wine</h1>} />
          <Route render={() => <h1>Page not found!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;