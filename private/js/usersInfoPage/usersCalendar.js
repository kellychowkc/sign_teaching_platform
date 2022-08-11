
async function getBookedLessonData() {
    const resp = await fetch("/userInfo/displayCalendar", { method: "POST" });
    const result = await resp.json();
    if (result.success === true) {
        const events = result.message;
        return events;
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: Date.now(),
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: await getBookedLessonData(),
    });

    calendar.render();
});