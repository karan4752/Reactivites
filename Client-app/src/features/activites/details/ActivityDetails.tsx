import {
  Card,
  CardContent,
  CardHeader,
  CardMeta,
  CardDescription,
  Image,
  ButtonGroup,
  Button,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import LoadingComponenet from "../../../app/layout/loadingComponenet";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    // openForm,
    // cancelSelectedActivity,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);
  if (loadingInitial || !activity) {
    return <LoadingComponenet />;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activity={activity} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>

    // <Card fluid>
    //   <Image src={`/assests/categoryImages/${activity.category}.jpg`} />
    //   <CardContent>
    //     <CardHeader>{activity.title}</CardHeader>
    //     <CardMeta>
    //       <span className='date'>{activity.date}</span>
    //     </CardMeta>
    //     <CardDescription>{activity.description}</CardDescription>
    //   </CardContent>
    //   <CardContent extra>
    //     <ButtonGroup widths={"2"}>
    //       <Button
    //         basic
    //         color='blue'
    //         content='Edit'
    //         as={Link}
    //         to={`/manage/${activity.id}`}
    //         // onClick={() => {
    //         //   openForm(activity.id);
    //         // }}
    //       />
    //       <Button
    //         basic
    //         color='grey'
    //         content='Cancel'
    //         as={Link}
    //         to={`/activities`}
    //         // onClick={cancelSelectedActivity}
    //       />
    //     </ButtonGroup>
    //   </CardContent>
    // </Card>
  );
});
