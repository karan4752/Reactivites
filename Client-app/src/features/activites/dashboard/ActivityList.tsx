import { Header } from "semantic-ui-react";
// import { useState } from "react";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  // const { deleteActivity, loading, activities } = activityStore;
  const { groupedActivities } = activityStore;
  // const [target, setTarget] = useState("");

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {activities.map((activity) => [
            <ActivityListItem key={activity.id} activity={activity} />,
          ])}
        </Fragment>
      ))}
    </>
  );
});
