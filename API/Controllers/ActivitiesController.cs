using Application;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities()
        {
            return HandlerResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")] //api/activities/id
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandlerResult(await Mediator.Send(new Detail.Query { Id = id }));

        }
        [HttpPost]//api/activities.{activity}
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(HandlerResult(await Mediator.Send(new Create.Command { Activity = activity })));
        }
        [Authorize(Policy ="IsActivityHost")]
        [HttpPut("{id}")]//api/activities/id.{activity}
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            // await Mediator.Send(new Edit.Command { Activity = activity });
            return HandlerResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        [Authorize(Policy ="IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandlerResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandlerResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}
