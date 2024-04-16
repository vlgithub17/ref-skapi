<template lang="pug">
main
    h1 UI guide
    hr
    h2 Buttons
    button.final .final
    button.unFinished .unFinished
    button.noLine .noLine
    br
    br
    button.final.warning .final.warning
    button.unFinished.warning .unFinished.warning
    button.noLine.warning .noLine.warning
    br
    br
    button.final.disabled .final.disabled
    button.unFinished.disabled .unFinished.disabled
    button.noLine.disabled .noLine.disabled
    br
    br
    button.final.disabled.warning .final.disabled.warning
    button.unFinished.disabled.warning .unFinished.disabled.warning
    button.noLine.disabled.warning .noLine.disabled.warning

    br
    br

    h2 OK / Cancel
    p OK is always on the right side:
    div
        button.noLine(type="button") Cancel
        | &nbsp;
        button.final(type="button") OK
        
    br
    br

    h2 Input 
    p Input is either .big or .line:

    input.big(placeholder="input.big")
    br
    br
    input.line(placeholder="input.line")

    br
    br

    input.big.disabled(placeholder="input.big.disabled")
    br
    br
    input.line.disabled(placeholder="input.line.disabled")

    br
    br

    h2 Form

    p Form submit is on the right side:

    form(style='width:400px;')
        label
            | Input
            input.big(placeholder="Enter something")
        
        label
            | Input
            input.big(placeholder="Enter something")

        br

        div(style='text-align:right')
            button.final(type="submit") Submit
    
    br
    br

    p Use &lt;a&gt; for additional form option:

    form(style='width:400px;')
        label
            | Input
            input.big(placeholder="Enter something")
        
        label
            | Input
            input.big(placeholder="Enter something")

        br

        div(style='display:flex;justify-content:space-between;align-items:center;')
            span
                | Other&nbsp;
                a(href='/') options
            button.final(type="submit") Submit

    br
    br
    br
    br
</template>
<style lang="less">
main {
    margin: 0 auto;
    max-width: 1000px;
}
form {
    >label {
        margin-bottom: 16px;
    }
}
</style>