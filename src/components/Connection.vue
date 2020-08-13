<template>
    <div class="connection">
        <div class="conxIcon">
            <i class="fa fa-user-circle conxIcon" onclick="conxUI()" aria-hidden="true"> </i>
            <label class="conxIcon" id="conxIconLabel"> Conexão </label>
        </div>
        <div class=" conxBox " id="conx">
            <div class="conx">
                <input type="text" id="userCode" class="cod" value="1" placeholder="Código">
                <select name="chatType" class="cod" id="chatType">
                    <option value="user" selected>User</option>
                    <option value="admin">Admin</option>
                </select>
                <button class="conxBtn cod" onclick="connect()">Conectar</button>
            </div>

            <div class=" userInfo conx " id="userInfo" style="display: none;">
                <label class="userInfo" id="displayName">   </label>
                <label class="userInfo" id="name">          </label>
                <label class="userInfo" id="email">         </label>
                <label class="userInfo" id="id">            </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Connection',
}
</script>