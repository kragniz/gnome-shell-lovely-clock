const Lang = imports.lang;
const DateMenu = imports.ui.main.panel.statusArea.dateMenu;

const original_update_clock = imports.ui.dateMenu.DateMenuButton.prototype._updateClockAndDate;

const update_clock = function() {
    let displayDate = new Date();
    this._clockDisplay.set_text("hi ❤ there");
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

