import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";

// eslint-disable-next-line react-refresh/only-export-components
export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as={"h1"} inverted>
          <Image
            size='massive'
            src='/assests/logo.png'
            alt='logo'
            style={{ marginBotttom: 12 }}
          />
        </Header>
        {userStore.isLogggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button as={Link} to={`/activities`} size='huge' inverted>
              Go to activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size='huge'
              inverted
            >
              Login!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<h1>Register</h1>)}
              size='huge'
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
