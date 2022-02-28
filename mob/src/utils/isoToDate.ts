export default function isoToDate(dt: string) {
    const date = new Date(dt);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    var mth: string = month.toString();

    if (Number(dt) < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        mth = '0' + month;
    }

    return day + '/' + mth + '/' + year;
}