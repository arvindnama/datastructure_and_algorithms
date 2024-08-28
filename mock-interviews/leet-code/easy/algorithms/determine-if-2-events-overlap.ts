/**
 * You are given two arrays of strings that represent two inclusive events that happened on the same day, event1 and event2, where:

event1 = [startTime1, endTime1] and
event2 = [startTime2, endTime2].
Event times are valid 24 hours format in the form of HH:MM.

A conflict happens when two events have some non-empty intersection (i.e., some moment is common to both events).

Return true if there is a conflict between two events. Otherwise, return false.
 */

function haveConflict(event1: string[], event2: string[]): boolean {
    /**
     * get a timestamp of both events.
     *  timestamp is a number that represent no. of mins from a reference time 00:00
     *  00:00 => 0 mins
     *  00:01 => 1 min (00:01 - 00:00)
     *  10:00 ==> 10 * 60 mins + 00 * 1 mins = 600 mins
     *
     *
     * once we have the timestamp  of events
     * Event-1: [tsS1, tsE1]
     * Event-2: [tsS2, tsE2]
     *
     * sort Event-2 & Event-1 on end time
     *
     * then tsS2 < tsE1 then there is a overlap.
     */

    const getTimeStamp = (timeStr: string): number => {
        const [hh, mm] = timeStr.split(':');
        return parseInt(hh) * 60 + parseInt(mm) * 1;
    };
    const getEventTimeStamp = (event: string[]): [number, number] => {
        return [getTimeStamp(event[0]), getTimeStamp(event[1])];
    };

    let [e1, e2] = [getEventTimeStamp(event1), getEventTimeStamp(event2)];
    if (e1[1] > e2[0]) {
        [e1, e2] = [e2, e1];
    }

    return e2[0] <= e1[1];
}

console.log(haveConflict(['01:15', '02:00'], ['02:00', '03:00']));
console.log(haveConflict(['01:00', '02:00'], ['01:20', '03:00']));
console.log(haveConflict(['10:00', '11:00'], ['14:00', '15:00']));
