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
    }
}