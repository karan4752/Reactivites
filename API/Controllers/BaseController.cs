using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : ControllerBase
    {
        private readonly IMediator _mediator;

        protected IMediator Mediator => _mediator ?? HttpContext.RequestServices
        .GetService<IMediator>();

        protected ActionResult HandlerResult<T>(Result<T> result)
        {
            if (result == null) { return NotFound(); }
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            if (result.IsSuccess && result.Value == null)
            {
                return NotFound();
            }
            return BadRequest();
        }
    }
}