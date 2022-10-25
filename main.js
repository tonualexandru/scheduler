function isOverlapping(event, events) {
    let overlaps = 0;

    for (let item in events) {
        const eventStart = Date.parse(event.start);
        const eventEnd = Date.parse(event.start);
        const itemStart = Date.parse(item.start);

        if (eventStart <= itemStart && eventEnd >= itemStart ||
            eventStart >= itemStart) {
            overlaps++;
        }
    }

    return overlaps;
}

function sortEvents(eventOne, eventTwo) {
    const eventOneStart = Date.parse(eventOne.start);
    const eventOneEnd = Date.parse(eventOne.end);
    const eventTwoStart = Date.parse(eventTwo.start);
    const eventTwoEnd = Date.parse(eventTwo.end);
    const firstEvent = { start: eventOneStart, end: eventOneEnd };
    const secondEvent = { start: eventTwoStart, end: eventTwoEnd };

    if (eventOneStart > eventTwoStart) {
        firstEvent.start = eventTwoStart;
        firstEvent.end = eventTwoEnd;

        secondEvent.start = eventOneStart;
        secondEvent.end = eventOneEnd;
    }

    return [firstEvent, secondEvent];
}

function debugEvent(event) {
    return new Date(event.start).getHours() + ':' + new Date(event.start).getMinutes() + '-' + new Date(event.end).getHours() + ':' + new Date(event.end).getMinutes()
}

function getOverlap(eventOne, eventTwo) {
    const [firstEvent, secondEvent] = sortEvents(eventOne, eventTwo);

    if (firstEvent.start <= secondEvent.end && firstEvent.end > secondEvent.end) {
        return { start: secondEvent.start, end: firstEvent.end < secondEvent.end ? firstEvent.end : secondEvent.end }
    }

    // no overlap detected
    return false;
}

function calculateWidth(event, events) {
    let overlappingRange = { ...event };
    let maxOverlaps = 0;

    for (let item of events) {
        let overlap = getOverlap(overlappingRange, item);

        if (overlap) {
            overlappingRange = { ...overlap };
            maxOverlaps++;
        } else {
            overlappingRange = { ...event };
        }

        console.log(debugEvent(overlappingRange));
    }

    return maxOverlaps;
}

window.addEventListener('DOMContentLoaded', () => {
    const events = [
        { start: '25 Oct 2022 03:00', end: '25 Oct 2022 04:30', label: 'event 1' },
        { start: '25 Oct 2022 03:10', end: '25 Oct 2022 03:40', label: 'event 2' },
        { start: '25 Oct 2022 03:30', end: '25 Oct 2022 06:30', label: 'event 3' },
        { start: '25 Oct 2022 04:00', end: '25 Oct 2022 04:30', label: 'event 4' },
        { start: '25 Oct 2022 05:30', end: '25 Oct 2022 06:00', label: 'event 5' },
    ];

    const grid = document.querySelector('#grid');

    for (const event of events) {
        event.width = calculateWidth(event, events);
    }

    console.log(events);
});

