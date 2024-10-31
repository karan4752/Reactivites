import { Grid, GridColumn } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponenet from "../../../app/layout/loadingComponenet";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistory } = activityStore;
  useEffect(() => {
    if (activityRegistory.size <= 1) {
      loadActivities();
    }
  }, [activityRegistory.size]);

  if (activityStore.loadingInitial)
    return <LoadingComponenet content='Loading app' />;
  return (
    <Grid>
      <GridColumn width='10'>
        <ActivityList />
      </GridColumn>
      <GridColumn width='6'>
        <ActivityFilters/>
      </GridColumn>
    </Grid>
  );
});
