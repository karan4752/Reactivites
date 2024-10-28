import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/Activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
export default class ActivityStore {
  //   title = "Hello from MobX";
  // activities: Activity[] = [];
  activityRegistory = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  constructor() {
    makeAutoObservable(this);
  }

  get activityByDate() {
    return Array.from(this.activityRegistory.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  get groupedActivities() {
    return Object.entries(
      this.activityByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => (this.selectedActivity = activity));
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getActivity = (id: string) => {
    return this.activityRegistory.get(id);
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistory.set(activity.id, activity);
    // this.activities.push(activity);
  };
  setLoadingInitial(state: boolean) {
    this.loadingInitial = state;
  }

  // selectActivity = (id: string) => {
  //   this.selectedActivity = this.activityRegistory.get(id);
  //   // this.selectedActivity = this.activities.find((x) => x.id === id);
  // };
  // cancelSelectedActivity = () => {
  //   this.selectedActivity = undefined;
  // };
  // openForm = (id?: string) => {
  //   id ? this.selectActivity(id) : this.cancelSelectedActivity();
  //   this.editMode = true;
  // };
  // closeForm = () => {
  //   this.editMode = false;
  // };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistory.set(activity.id, activity);
        // this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity.id, activity);
      runInAction(() => {
        // this.activities = [
        //   ...this.activities.filter((a) => a.id !== activity.id),
        //   activity,
        // ];
        this.activityRegistory.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistory.delete(id);
        // this.activities = [...this.activities.filter((a) => a.id !== id)];
        // if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  //      runInAction(() => {
  //   setTitle: action.bound,
  //   makeObservable(this, {
  //     title: observable,
  //     setTitle: action,
  //   });
  //   setTitle = () => {
  //     this.title = this.title + "!";
  //   };
}
