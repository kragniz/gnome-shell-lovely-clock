const Lang = imports.lang;
const DateMenu = imports.ui.main.panel.statusArea.dateMenu;

const original_update_clock = imports.ui.dateMenu.DateMenuButton.prototype._updateClockAndDate;

function date_offset(offset) {
    // return new date from uct offset
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
}

const update_clock = function() {
    let dateFormat = "%a %H:%M ❤ ";
    let localDate = new Date();
    let farAwayDate = date_offset(-4);
    let text = localDate.toLocaleFormat(dateFormat) + farAwayDate.toLocaleFormat("%H:%M");
    this._clockDisplay.set_text(text);
}

function init() {
}

function enable() {
    DateMenu._updateClockAndDate = update_clock;
    date_menu_connection = DateMenu._clock.connect('notify::clock',
            Lang.bind(DateMenu, DateMenu._updateClockAndDate));
    DateMenu._updateClockAndDate();
}

function disable() {
    DateMenu._clock.disconnect(date_menu_connection);
    DateMenu._updateClockAndDate = original_update_clock;
    DateMenu._clock.connect('notify::clock',
            Lang.bind(DateMenu, DateMenu._updateClockAndDate));
    DateMenu._updateClockAndDate();
}

