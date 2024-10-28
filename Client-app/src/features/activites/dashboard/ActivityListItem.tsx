import { Link } from "react-router-dom";
import {
  Item,
  Button,
  Segment,
  Icon,
} from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/Store";

interface Props {
  activity: Activity;
}
export default function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  // const { deleteActivity, loading, activities } = activityStore;
  const { deleteActivity, loading } = activityStore;
  const [target, setTarget] = useState("");

  function handleDeletActivity(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src='/assests/user.png'
            ></Item.Image>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Karan</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />
          {activity.date}
          <Icon name='marker' />
          {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        Attendees goes here 
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content='View'/>

      </Segment>
    </Segment.Group>

    // <Item key={activity.id}>
    //   <ItemContent>
    //     <ItemHeader as='a'>{activity.title}</ItemHeader>
    //     <ItemMeta>{activity.date}</ItemMeta>
    //     <ItemDescription>
    //       <div>{activity.description}</div>
    //       <div>
    //         {activity.city},{activity.venue}
    //       </div>
    //     </ItemDescription>
    //     <ItemExtra>
    //       <Button
    //         floated='right'
    //         content='View'
    //         color='blue'
    //         as={Link}
    //         to={`/activities/${activity.id}`}
    //       />
    //       {/* <Button
    //               floated='right'
    //               content='View'
    //               color='blue'
    //               onClick={() => {
    //                 activityStore.selectActivity(activity.id);
    //               }}
    //             /> */}
    //       <Button
    //         name={activity.id}
    //         loading={loading && target === activity.id}
    //         floated='right'
    //         content='Delete'
    //         color='red'
    //         onClick={(e) => {
    //           handleDeletActivity(e, activity.id);
    //         }}
    //       />
    //       {/* <Button
    //               name={activity.id}
    //               loading={loading && target === activity.id}
    //               floated='right'
    //               content='Delete'
    //               color='red'
    //               onClick={(e) => {
    //                 handleDeletActivity(e, activity.id);
    //               }}
    //             /> */}
    //       <Label content={activity.category} basic />
    //     </ItemExtra>
    //   </ItemContent>
    // </Item>
  );
}
