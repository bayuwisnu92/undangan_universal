const eventDate = new Date("2026-07-07T08:00:00+07:00").getTime();


  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      clearInterval(countdown);
      document.querySelector('.countdown').innerHTML =
        "<h5>Acara telah dimulai</h5>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }, 1000);