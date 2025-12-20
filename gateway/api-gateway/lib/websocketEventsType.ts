export const WebsocketEventsType={
    CLIENT:{
        SEND_MESSAGE:'client_send_message',
        JOIN_ROOM:'client_join_room',
        LEAVE_ROOM:'client_leave_room',

        TYPING:'client_typing',
        STOP_TYPING:'client_stop_typing',
        
        SEEN_MESSAGE:'client_seen_message',
        RECEIVE_MESSAGE:'client_receive_message',
    },
    SERVER:{
        MESSAGE_SENT: 'server_message_sent',
        MESSAGE_ERROR: 'server_message_error',

        // Room management
        USER_JOINED_ROOM: 'server_user_joined_room',
        USER_LEFT_ROOM: 'server_user_left_room',

        // UX events
        USER_TYPING: 'server_user_typing',
        USER_STOP_TYPING: 'server_user_stop_typing',

        // Read receipts
        MESSAGE_SEEN: 'server_message_seen',
    }


}