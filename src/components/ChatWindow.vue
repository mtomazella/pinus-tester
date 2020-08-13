<template>
    <div class="bordinha" id="maxChat">
        <div class="botoes">
            <i class="fa fa-window-minimize icon" aria-hidden="true" onclick=" hide() "></i>
            <i class="fas fa-window-maximize icon"></i>
            <i class="fa fa-times icon" aria-hidden="true"></i>
        </div>
        <div class="col-12 chat" id="chat"></div> 
        <div class="col-12 write">
            <form class="write row" autocomplete="off">
                <input autocomplete="false" name="hidden" type="text" style="display:none;">
                <input type="text" class="write badge-pill px-3" autocapitalize="on" autocomplete="off" name="input" id="input">
                <button type="button" class="send rounded rounded-circle" name="send" onclick="post()"> <i class="fa fa-location-arrow icon send" aria-hidden="true"></i> </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatWindow'
}
</script>