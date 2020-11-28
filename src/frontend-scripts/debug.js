function debug_supportConnect ( ) {
    console.log(realTime.supportQueueObj[ supportQueueSelector.options[supportQueueSelector.selectedIndex].text ])
    realTime.supportConnect( realTime.supportQueueObj[ supportQueueSelector.options[supportQueueSelector.selectedIndex].text ] );
}

function debug_supportDisconnect ( ) {
    realTime.supportDisconnect( );
}