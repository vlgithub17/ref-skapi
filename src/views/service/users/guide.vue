<template lang="pug">
    p(style="margin-bottom: 0").
      Search and manage your service users.
      #[br]
      #[b User must have at least one successful login to be searchable.]

    p.
      The example below shows how to setup a basic sign-up / login form for your website.

    Code
      pre.
        #[span(style="color: #999") &lt;!-- signup.html --&gt;]
        #[span(style="color: #999") &lt;]#[span(style="color: #33adff") h1]#[span(style="color: #999") &gt;]Signup#[span(style="color: #999") &lt;/]#[span(style="color: #33adff") h1]#[span(style="color: #999") &gt;]
        #[span(style="color: #999") &lt;]#[span(style="color: #33adff") form] #[span(style="color: #44e9ff") action]=#[span(style="color: #ffed91") "login.html"] #[span(style="color: #44e9ff") onsubmit]=#[span(style="color: #ffed91") "skapi.signup(event).catch(err=>alert(err.message))"]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]
                Email
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") input] #[span(style="color: #44e9ff") type]=#[span(style="color: #ffed91") "email"] #[span(style="color: #44e9ff") name]=#[span(style="color: #ffed91") "email"] #[span(style="color: #44e9ff") placeholder]=#[span(style="color: #ffed91") "user@email.com"] #[span(style="color: #44e9ff") required]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;/]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]
                Password
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") input] #[span(style="color: #44e9ff") type]=#[span(style="color: #ffed91") "password"] #[span(style="color: #44e9ff") name]=#[span(style="color: #ffed91") "password"] #[span(style="color: #44e9ff") minlength]=#[span(style="color: #ffed91") "6"] #[span(style="color: #44e9ff") placeholder]=#[span(style="color: #ffed91") "At least 6 characters"] #[span(style="color: #44e9ff") required]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;/]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;]#[span(style="color: #33adff") input] #[span(style="color: #44e9ff") type]=#[span(style="color: #ffed91") "submit"] #[span(style="color: #44e9ff") value]=#[span(style="color: #ffed91") "Signup"]#[span(style="color: #999") &gt;]
        #[span(style="color: #999") &lt;/]#[span(style="color: #33adff") form]#[span(style="color: #999") &gt;]

    br

    Code
      pre.
        #[span(style="color: #999") &lt;!-- login.html --&gt;]
        #[span(style="color: #999") &lt;]#[span(style="color: #33adff") h1]#[span(style="color: #999") &gt;]Login#[span(style="color: #999") &lt;/]#[span(style="color: #33adff") h1]#[span(style="color: #999") &gt;]
        #[span(style="color: #999") &lt;]#[span(style="color: #33adff") form] #[span(style="color: #44e9ff") action]=#[span(style="color: #ffed91") "welcome.html"] #[span(style="color: #44e9ff") onsubmit]=#[span(style="color: #ffed91") "skapi.login(event).catch(err=>alert(err.message))"]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]
                Email
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") input] #[span(style="color: #44e9ff") type]=#[span(style="color: #ffed91") "email"] #[span(style="color: #44e9ff") name]=#[span(style="color: #ffed91") "email"] #[span(style="color: #44e9ff") #[span(style="color: #44e9ff") placeholder]=#[span(style="color: #ffed91") "your@email.com"] required]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;/]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]
                Password
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
                #[span(style="color: #999") &lt;]#[span(style="color: #33adff") input] #[span(style="color: #44e9ff") type]=#[span(style="color: #ffed91") "password"] #[span(style="color: #44e9ff") name]=#[span(style="color: #ffed91") "password"] #[span(style="color: #44e9ff") #[span(style="color: #44e9ff") placeholder]=#[span(style="color: #ffed91") "Login password"] required]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;/]#[span(style="color: #33adff") label]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]#[span(style="color: #999") &lt;]#[span(style="color: #33adff") br]#[span(style="color: #999") &gt;]
            #[span(style="color: #999") &lt;]#[span(style="color: #33adff") input] #[span(style="color: #44e9ff") type]=#[span(style="color: #ffed91") "submit"] #[span(style="color: #44e9ff") value]=#[span(style="color: #ffed91") "Login"]#[span(style="color: #999") &gt;]
        #[span(style="color: #999") &lt;/]#[span(style="color: #33adff") form]#[span(style="color: #999") &gt;]
    p.
      Once the user have logged in for the first time, they will be listed on your #[b Users] section below.
    p For more details, please refer to the #[a(href="https://docs.skapi.com/authentication/create-account.html", target="_blank") Documentation]
</template>

<script setup lang="ts">
import Code from "@/components/code.vue";
</script>