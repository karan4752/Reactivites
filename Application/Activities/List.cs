using Application.Activities;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _mapper = mapper;
                _dataContext = dataContext;
            }
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _dataContext.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                // .Include(a => a.Attendees)
                // .ThenInclude(u => u.AppUser)
                .ToListAsync();

                // var activityToReturn = _mapper.Map<List<ActivityDto>>(activities);
                // return Result<List<ActivityDto>>.Success(activityToReturn);
                return Result<List<ActivityDto>>.Success(activities);
            }
        }

    }
}