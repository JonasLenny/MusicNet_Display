'use strict'

const EventConstants = {
    // default events
    CONNECT             : 'connect',
    CONNECT_ERROR       : 'connect_error',
    CONNECT_TIMEOUT     : 'connect_timeout',
    ERROR               : 'error',
    DISCONNECTING       : 'disconnecting',

    // system events
    ROLE_USER           : 'role_user',
    ROLE_DISPLAY        : 'role_display',
    ROOM_USER           : 'room_user',
    ROOM_DISPLAY        : 'room_display',

    // interaction events
    REGISTER            : 'register',
    REGISTER_RESPONSE   : 'register_response',
    SEARCH              : 'search',
    SEARCH_RESPONSE     : 'search_response',
    SEND_TRACK          : 'send_track',
    SEND_TRACK_RESPONSE : 'send_track_response',
}

export default EventConstants
