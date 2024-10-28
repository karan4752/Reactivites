import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/Store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/Activity";
import LoadingComponenet from "../../../app/layout/loadingComponenet";
import { v4 as uuid } from "uuid";
export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    // selectedActivity,
    // closeForm,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState<Activity>({
    id: "",
    category: "",
    city: "",
    date: "",
    description: "",
    venue: "",
    title: "",
  });
  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  // const initialState = selectedActivity ?? {
  //   id: "",
  //   category: "",
  //   city: "",
  //   date: "",
  //   description: "",
  //   venue: "",
  //   title: "",
  // };
  // const [activity, setActivity] = useState(initialState);
  function handleSubmit() {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
    // activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }
  if (loadingInitial) {
    return <LoadingComponenet content='Loading Activity...' />;
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={handleInputChange}
        />
        <Form.Input
          type='date'
          placeholder='Date'
          value={activity.date}
          name='date'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
          name='venue'
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          as={Link}
          to={`/activities`}
          floated='right'
          type='button'
          content='Cancel'
          // onClick={closeForm}
        />
      </Form>
    </Segment>
  );
});
