function HealthBar() {
  const healthStatus = [
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'Warning',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'Bad',
    'Bad',
    'Warning',
    'Warning',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'Warning',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'good',
    'Bad',
    'Bad',
    'Null',
    'Null',
  ];

  let flag = true;
  let time1 = 0;
  let time2 = 0;

  return (
    <div className='w-full h-8 flex flex-nowrap border-y border-l border-gray-200 rounded-md'>
      {healthStatus.map((status, index) => {
        const BackGroundColor =
          status === 'good'
            ? 'bg-lime-500'
            : status === 'Warning'
            ? 'bg-yellow-500'
            : status === 'Bad'
            ? 'bg-red-600'
            : 'bg-slate-400';

        const massageBoxColour =
          status === 'good'
            ? 'bg-teal-100'
            : status === 'Warning'
            ? 'bg-yellow-200'
            : status === 'Bad'
            ? 'bg-red-200'
            : 'bg-slate-100';

        const massageBoxBorderColour =
          status === 'good'
            ? 'border-teal-500'
            : status === 'Warning'
            ? 'border-orange-500'
            : status === 'Bad'
            ? 'border-red-500'
            : 'border-slate-500';

        const massageBoxTextColour =
          status === 'good'
            ? 'text-teal-950'
            : status === 'Warning'
            ? 'text-orange-950'
            : status === 'Bad'
            ? 'text-red-950'
            : 'text-slate-950';

        const massage =
          status === 'good'
            ? 'All Good'
            : status === 'Warning'
            ? 'Warning'
            : status === 'Bad'
            ? 'Alert'
            : '';

        const startTime = flag
          ? (() => {
              flag = false;
              return time1++;
            })()
          : (() => {
              flag = true;
              return time2++;
            })();

        const endTime = flag ? startTime + 1 : startTime;
        const startMin = flag ? '30' : '00';
        const endtMin = flag ? '00' : '30';

        return (
          <span
            key={index}
            className={`${BackGroundColor} w-full relative border-gray-200 border-r rounded-sm hover:rounded-md hover:border-2 cursor-pointer`}
          >
            <div className={`w-full h-full peer`}></div>
            <span
              className={`${massageBoxColour} ${massageBoxBorderColour} ${massageBoxTextColour} border-t-4 border-b-2 shadow-md rounded-lg p-1 absolute hidden peer-hover:block bottom-8 -left-16 pointer-events-none whitespace-pre`}
            >
              <div className='text-sm'>
                {startTime}:{startMin}-{endTime % 24}:{endtMin}
              </div>
              <div className='text-xs'>{massage}</div>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default HealthBar;
