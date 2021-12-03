import lineData from '../data.json';

function dateFunc(getYear) {
  const getDates = lineData[0].response.data.map((value) => {
    const getDateFromjson = String(value.date).match(
      /([0-9]{4})([0-9]{2})([0-9]{2})/
    );

    const date = new Date(getDateFromjson[1], getDateFromjson[2], [
      getDateFromjson[3],
    ]);
    const formatDate =
      getYear === 'Yes'
        ? date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })
        : date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
          });
    return {
      date: formatDate,
      PD: value.PD,
      PDMedianProxyBps: value.PDMedianProxyBps,
      Rating: value.Rating,
      PDContributionCount: value.PDContributionCount,
      SP: value.SP,
    };
  });
  return getDates;
}
export { dateFunc };
