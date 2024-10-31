using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Detail
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;

            }
            public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Id);
                return Result<Activity>.Success(activity);
            }
        }
    }
}