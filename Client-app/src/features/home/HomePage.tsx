import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
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
        <Header as='h2' inverted content='Welcome to Reactivities' />
        <Button as={Link} to={`/activities`} size='huge' inverted>
          Take me to th Activities
        </Button>
      </Container>
    </Segment>
  );
}
