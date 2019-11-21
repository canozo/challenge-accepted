const date = {};

date.now = () => {
  const dateObj = new Date();
  let dd = dateObj.getDate();
  let mm = dateObj.getMonth() + 1;
  const yyyy = dateObj.getFullYear();
  let hh = dateObj.getHours();
  let min = dateObj.getMinutes();
  let sec = dateObj.getSeconds();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  if (hh < 10) {
    hh = `0${hh}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  if (sec < 10) {
    sec = `0${sec}`;
  }

  return `${yyyy}-${mm}-${dd}_${hh}-${min}-${sec}`;
};

module.exports = date;
