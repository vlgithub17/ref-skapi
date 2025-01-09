<template lang="pug">
section.infoBox
    .titleHead
        h2 Database
            
        span.moreInfo(@click="showDes = !showDes" @mouseover="hovering = true" @mouseleave="hovering = false")
            span More Info&nbsp;
            template(v-if="showDes")
                //- .material-symbols-outlined.notranslate.fill expand_circle_up 
                //- .material-symbols-outlined.notranslate.noFill expand_circle_up
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-up")
            template(v-else) 
                //- .material-symbols-outlined.notranslate.fill expand_circle_down
                //- .material-symbols-outlined.notranslate.noFill expand_circle_down
                svg(v-if="hovering" style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down-fill")
                svg(v-else style="width: 25px; height: 25px; fill: black;")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-expand-circle-down")

    template(v-if="showDes")
        p(style='margin-bottom: 0').
            The example below shows how you can let your users to upload / fetch their data from your service.
            The indexing and the security level is defined from your HTML without any server side code.
            Skapi can handle any type of data including huge binary files.
        Code
            pre.
                #[span(style="color:#999") &lt;!-- Uploading data --&gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.postRecord(event, { table: { name: 'my_collection', access_group: 'authorized' } }).then(r => console.log(r))"]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "something"] #[span(style="color:#44E9FF") placeholder]=#[span(style="color:#FFED91") "Write something"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "file"] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "my_file"]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]#[span(style="color:#999") &lt;]#[span(style="color:#33adff") br]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Submit"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

        Code
            pre.
                #[span(style="color:#999") &lt;!-- Fetching data --&gt;]
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") form] #[span(style="color:#44E9FF") onsubmit]=#[span(style="color:#FFED91") "skapi.getRecords(event).then(r => console.log(r))"]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "table&#91;name&#93;"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "my_collection"] #[span(style="color:#44E9FF") hidden]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") name]=#[span(style="color:#FFED91") "table&#91;access_group&#93;"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "authorized"] #[span(style="color:#44E9FF") hidden]#[span(style="color:#999") &gt;]
                    #[span(style="color:#999") &lt;]#[span(style="color:#33adff") input] #[span(style="color:#44E9FF") type]=#[span(style="color:#FFED91") "submit"] #[span(style="color:#44E9FF") value]=#[span(style="color:#FFED91") "Get Data"]#[span(style="color:#999") &gt;]
                #[span(style="color:#999") &lt;/]#[span(style="color:#33adff") form]#[span(style="color:#999") &gt;]

        p For more details, please refer to the #[a(href="https://docs.skapi.com/database/create.html" target="_blank") Documentation]

    hr
    .error(v-if='!user?.email_verified')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        router-link(to="/account-setting") Please verify your email address to modify settings.
        
    .error(v-else-if='currentService.service.active == 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently disabled.

    .error(v-else-if='currentService.service.active < 0')
        //- .material-symbols-outlined.notranslate.fill warning
        svg
            use(xlink:href="@/assets/img/material-icon.svg#icon-warning-fill")
        span This service is currently suspended.

    p(style='margin-bottom:0') Search and manage your database records.


form#searchForm(@submit.prevent="setCallParams")
    .inner(style='padding: 1.2rem;')
        input(hidden name='service' :value='currentService.id')
        input(hidden name='owner' :value='currentService.owner')
        
        .groupWrap(style='margin-bottom:.5rem;')
            .group(:class="{active : searchFormValue.table.access_group == 'public'}" title="public" @click.stop="searchFormValue.table.access_group = 'public'") <!--language--> 
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-language")
            .group(:class="{active : searchFormValue.table.access_group == 'authorized'}" title="authorized" @click.stop="searchFormValue.table.access_group = 'authorized'") <!--  person -->
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-person-fill")
            .group(:class="{active : searchFormValue.table.access_group == 'private'}" title="private" @click.stop="searchFormValue.table.access_group = 'private'") <!-- vpn_key-->
                svg
                    use(xlink:href="@/assets/img/material-icon.svg#icon-vpn-key-fill")
        .search(style='margin-bottom:.5rem;')
            input.big(name='table[name]' :placeholder="searchFormValue.table.access_group.charAt(0).toUpperCase() + searchFormValue.table.access_group.slice(1) + ' Table.Name'" :required="showAdvanced === true || null" style="padding-right: 40px;")
            button.icon(type="button" :style='{color: !showAdvanced ? "black" : "var(--main-color)"}' style="border:0;padding:0" @click="showAdvanced = !showAdvanced;")
                //- .material-symbols-outlined.notranslate.fill tune
                svg.svgIcon.reactive()
                    use(xlink:href="@/assets/img/material-icon.svg#icon-tune")
        button.btn.final(type="submit" v-if='!showAdvanced' style='margin-bottom:.5rem;') Search

        // table 검색일때 추가적인 필드
        .content(v-if="showAdvanced" style="width:100%;padding: 0;overflow:visible;")
            //- .row(style="margin-bottom:6px")
                    .key Subscription ID
                    .value(style='min-width: 300px;')
                        input.line(pattern='[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' title='Subscription ID should be the user\'s ID' placeholder="User ID of the subscription" name='table[subscription]')
            
            .row(style="margin-bottom:6px")
                    .key Reference ID
                    .value(style='min-width: 300px;')
                        input.line(placeholder="Referenced Record ID" name='reference')

            .row(style="margin-bottom:6px")
                .key Search Index:&nbsp;&nbsp;
                .value(style='min-width: 300px;')
                    select(v-model='searchIndex')
                        option(selected value='null') None
                        option(value='name') By index name
                        option(value='$updated') By updated timestamp
                        option(value='$uploaded') By uploaded timestamp
                        option(value='$referenced_count') By referenced count
                        option(value='$user_id') By user ID

            template(v-if='searchIndex !== "null"')
                .row.indent(v-if='searchIndex == "name"')
                    .key Name
                    .value(style='min-width: 300px;')
                        input.line(v-model='index_name' name='index[name]' placeholder='Alphanumeric, periods only. (Required)' required)
                input(v-else name='index[name]' hidden :value='searchIndex')

                template(v-if='searchIndex == "name"')
                    .row.indent
                        .key Value
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            select(v-model='searchIndexType')
                                option(value='string' selected) String
                                option(value='number') Number
                                option(value='boolean') Boolean

                            input.line(
                                v-if="searchIndexType !== 'boolean'"
                                    name='index[value]'
                                    :type='searchIndexType' :placeholder='searchIndexType === "string" ? "Alphanumeric, space only. (Required)" : searchIndexType === "number" ? "Number value (Required)" : "Boolean value"'
                                    required
                                    style="flex-grow:30; width:unset; vertical-align:middle;")
                            
                            template(v-else)
                                label(style='width:unset;display: flex;align-items: center;')
                                    input(type='radio' name='index[value]' value='true' checked style='margin:0;width:unset;')
                                    | &nbsp;True
                                label(style='width:unset;display: flex;align-items: center;')
                                    input(type='radio' name='index[value]' value='false' style='margin:0;width:unset;')
                                    | &nbsp;False

                    .row.indent(v-if='searchIndexType !== "boolean"')
                        .key Condition
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            select(v-model='searchIndexCondition')
                                option(value='=' selected) =
                                option(value='>=') Greater or =
                                option(value='>') Greater
                                option(value='<=') Less or =
                                option(value='<') Less
                                option(value='range') Range

                            input(v-if='searchIndexCondition !== "range"' hidden :value='searchIndexCondition' name='index[condition]')
                            template(v-else)
                                input.line(
                                        name='index[range]'
                                        :type='searchIndexType' :placeholder='searchIndexType === "string" ? "Alphanumeric, space only. (Required)" : searchIndexType === "number" ? "Number value (Required)" : "Boolean value"'
                                        required
                                        style="flex-grow:30; width:unset; vertical-align:middle;")

                template(v-else-if='searchIndex == "$user_id"')
                    .row.indent
                            .key Value
                            .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                                input.line(
                                        name='index][value]'
                                        type='string' placeholder='User ID'
                                        required
                                        pattern='[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' 
                                        title='Invalid user\'s ID' 
                                        style="flex-grow:30; width:unset; vertical-align:middle;")

                template(v-else)
                    .row.indent
                        .key Value
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            input.line(
                                    name='index[value]'
                                    type='number' :placeholder='searchIndex == "$referenced_count" ? "Number of references" : "13 Digit timestamp"'
                                    required
                                    style="flex-grow:30; width:unset; vertical-align:middle;")

                    .row.indent
                        .key Condition
                        .value(style="display:flex; flex-wrap:wrap; gap:10px;min-width: 300px;")
                            select(v-model='searchIndexCondition' name='index[condition]')
                                option(value='=' selected) =
                                option(value='>=') Greater or =
                                option(value='>') Greater
                                option(value='<=') Less or =
                                option(value='<') Less
                                option(value='range') Range

                            input(v-if='searchIndexCondition !== "range"' hidden :value='searchIndexCondition' name='config[index][condition]')
                            template(v-else)
                                input.line(
                                        name='index[range]'
                                        type='name' :placeholder='searchIndex == "$referenced_count" ? "Number of references" : "13 Digit timestamp"'
                                        required
                                        style="flex-grow:30; width:unset; vertical-align:middle;")
                

            br
            
            .row 
                .key Tag
                .value(style='min-width: 300px;')
                    input.line(v-model="selectedRecord.tags" name='tags' placeholder="Tag name. Alphanumeric and space only.")

            br

            div(style='text-align:right')
                button.btn.final.wideOnMobile(type="submit") Search
                br
                br
                br

br

.tableMenu
    .iconClick.square(@click.stop="(e)=>{showDropDown(e)}")
        //- .material-symbols-outlined.notranslate.fill checklist_rtl
        svg.svgIcon()
            use(xlink:href="@/assets/img/material-icon.svg#icon-checklist-rtl")
        span &nbsp;&nbsp;Show Columns
        .moreVert(@click.stop style="--moreVert-left:0;display:none;font-weight:normal; color:black")
            .inner
                Checkbox(v-model="filterOptions.table" style="display:flex;") Table
                Checkbox(v-model="filterOptions.record_id" style="display:flex") Record ID
                Checkbox(v-model="filterOptions.user_id" style="display:flex") User ID 
                //- Checkbox(v-model="filterOptions.subscription" style="display:flex") Subscription
                Checkbox(v-model="filterOptions.reference" style="display:flex") Reference
                Checkbox(v-model="filterOptions.index" style="display:flex") Index/Value
                Checkbox(v-model="filterOptions.tag" style="display:flex") Tag
                Checkbox(v-model="filterOptions.files" style="display:flex") Files
                Checkbox(v-model="filterOptions.data" style="display:flex") Data
                Checkbox(v-model="filterOptions.updated" style="display:flex") Updated
                Checkbox(v-model="filterOptions.uploaded" style="display:flex") Uploaded
                Checkbox(v-model="filterOptions.readonly" style="display:flex") Read Only 
                Checkbox(v-model="filterOptions.referencing_limit" style="display:flex") Referencing Limit
                Checkbox(v-model="filterOptions.referenced" style="display:flex") Referenced
                Checkbox(v-model="filterOptions.prevent_multiple_referencing" style="display:flex") Prevent Multiple Referencing
                Checkbox(v-model="filterOptions.ip" style="display:flex") IP

    .iconClick.square(@click="()=>{ !user.email_verified ? false : selectedRecord = JSON.parse(JSON.stringify(createRecordTemplate)); showDetail=true; fileList=[]; }" :class="{'nonClickable' : showDetail || uploading || fetching || !user?.email_verified || currentService.service.active <= 0}")
        //- .material-symbols-outlined.notranslate.fill add_circle
        svg.svgIcon()
            use(xlink:href="@/assets/img/material-icon.svg#icon-add-circle-fill")
        span &nbsp;&nbsp;Create Record

    .iconClick.square(@click="openDeleteRecords=true" :class="{'nonClickable': noSelection || fetching || !user?.email_verified || currentService.service.active <= 0}" )
        //- .material-symbols-outlined.notranslate.fill delete
        svg.svgIcon()
            use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
        span &nbsp;&nbsp;Delete Selected

    .iconClick.square(@click="getPage(true)" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}")
        //- .material-symbols-outlined.notranslate.fill(:class='{loading:fetching}') refresh
        svg.svgIcon(:class='{loading:fetching}')
            use(xlink:href="@/assets/img/material-icon.svg#icon-refresh")
        span &nbsp;&nbsp;Refresh

.recordPart 
    template(v-if="fetching")
        #loading.
            Loading ... &nbsp;
            #[.loader(style="--loader-color:black; --loader-size:12px")]
            
    Table(:key="tableKey" :class="{'nonClickable' : fetching || !user?.email_verified || currentService.service.active <= 0}" resizable)
        template(v-slot:head)
            tr
                th(style='width:60px;')
                    Checkbox(@click.stop v-model='checkedall' @change='checkall' :class='{nonClickable: !listDisplay || !listDisplay?.length}' style="display:inline-block")
                    .resizer
                th.overflow(v-if="filterOptions.table" style='width:160px;')
                    | Table
                    .resizer
                th.overflow(v-if="filterOptions.record_id" style='width:160px;')
                    | Record ID
                    .resizer
                th.overflow(v-if="filterOptions.user_id" style='width:160px;')
                    | User ID
                    .resizer
                //- th.overflow(v-if="filterOptions.subscription" style='width:130px;')
                    | Subscription
                    .resizer
                th.overflow(v-if="filterOptions.reference" style='width:160px;')
                    | Reference
                    .resizer
                th.overflow(v-if="filterOptions.index" style='width:160px;')
                    | Index/Value
                    .resizer
                th.overflow(v-if="filterOptions.tag" style='width:220px;')
                    | Tag
                    .resizer
                th.overflow(v-if="filterOptions.files" style='width:100px;')
                    | Files
                    .resizer
                th(v-if="filterOptions.data" style='width:220px;')
                    | Data
                    .resizer
                th.overflow(v-if="filterOptions.updated" style='width:160px;')
                    | Updated
                    .resizer
                th.overflow(v-if="filterOptions.uploaded" style='width:160px;')
                    | Uploaded
                    .resizer
                th.overflow(v-if="filterOptions.readonly" style='width:100px;')
                    | Read Only
                    .resizer
                th.overflow(v-if="filterOptions.referencing_limit" style='width:140px;')
                    | Referencing Limit
                    .resizer
                th.overflow(v-if="filterOptions.referenced" style='width:110px;')
                    | Referenced
                    .resizer
                th.overflow(v-if="filterOptions.prevent_multiple_referencing" style='width:190px;')
                    | Prevent Multiple Referencing
                    .resizer
                th.overflow(v-if="filterOptions.ip" style='width:160px;')
                    | IP
        template(v-slot:body)
            template(v-if="fetching")
                tr(v-for="i in 10")
                    td(:colspan="colspan")
            template(v-else-if="!listDisplay || listDisplay?.length === 0")
                tr
                    td#noUsers(:colspan="colspan") No Records
                tr(v-for="i in 9")
                    td(:colspan="colspan")
            template(v-else)
                tr.nsrow(v-for="(rc, i) in listDisplay" @click="showDetail=true; selectedRecord=JSON.parse(JSON.stringify(rc))")
                    td
                        Checkbox(@click.stop :modelValue="checked[rc?.record_id] ?? false"  @update:modelValue="(value) => checked[rc?.record_id] = value" @change="checkIfAny")

                    td.overflow(v-if="filterOptions.table") 
                        //- span.material-symbols-outlined.notranslate.fill(v-if="rc.table.access_group == 'private'") vpn_key
                        span
                            svg.svgIcon(v-if="rc.table.access_group == 'private' || rc.table.access_group == 99 || rc.table.access_group === 'admin'" style="fill:black; margin-bottom: 2px")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-vpn-key-fill")
                        //- span.material-symbols-outlined.notranslate.fill(v-if="rc.table.access_group > 0 || rc.table.access_group == 'authorized'") person
                        span
                            svg.svgIcon(v-if="rc.table.access_group == 'authorized' || typeof rc.table.access_group === 'number' && rc.table.access_group > 0" style="fill:black; margin-bottom: 2px")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-person-fill")
                        //- span.material-symbols-outlined.notranslate.fill(v-if="rc.table.access_group == 0 || rc.table.access_group == 'public'") language
                        span
                            svg.svgIcon(v-if="rc.table.access_group == 'public' || rc.table.access_group === 0" style="fill:black; margin-bottom: 2px")
                                use(xlink:href="@/assets/img/material-icon.svg#icon-language")
                        span(style="margin-left: 8px") {{ rc?.table?.name }}
                    td(v-if="filterOptions.record_id")
                        .click.overflow(@click.stop="copyID") {{ rc.record_id }}
                    td(v-if="filterOptions.user_id") 
                        .click.overflow(@click.stop="copyID") {{ rc.user_id }}
                    //- td.overflow(v-if="filterOptions.subscription") {{ rc.table.subscription ? 'Required' : '-' }}
                    td(v-if="filterOptions.reference")
                        .click.overflow(v-if="rc?.reference" @click.stop="copyID") {{ rc?.reference }}
                        template(v-else) -
                    td.overflow(v-if="filterOptions.index") 
                        template(v-if="rc?.index") 
                            span(v-if="typeof(rc?.index?.value) == 'string'") {{ rc?.index?.name }} / "{{ rc?.index?.value }}"
                            span(v-else) {{ rc?.index?.name }} / {{ rc?.index?.value }}
                        template(v-else) -
                    td.overflow(v-if="filterOptions.tag") 
                        template(v-if="rc?.tags" v-for="(tag, index) in rc.tags")
                            span(v-if="rc.tags.length-1 == index") {{ tag }}
                            span(v-else) {{ tag }}
                        template(v-else) -

                    td.overflow(v-if="filterOptions.files") {{ bins[rc.record_id].length }}
                    td.overflow(v-if="filterOptions.data") {{ rc.data }}
                    td.overflow(v-if="filterOptions.updated") {{ rc.updated }}
                    td.overflow(v-if="filterOptions.uploaded") {{ rc.uploaded }}
                    td.overflow(v-if="filterOptions.readonly")
                        //- .material-symbols-outlined.notranslate.fill(v-if="rc.readonly") check_circle
                        svg.svgIcon.black(v-if="rc.readonly")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-check-circle-fill")

                        template(v-else) -
                    td.overflow(v-if="filterOptions.referencing_limit") {{ (rc.source.referencing_limit == null) ? 'Infinite' : rc.source.referencing_limit }}
                    td.overflow(v-if="filterOptions.referenced") {{ rc.referenced_count }}
                    td.overflow(v-if="filterOptions.prevent_multiple_referencing")
                        //- .material-symbols-outlined.notranslate.fill(v-if="rc.source.prevent_multiple_referencing") check_circle
                        svg.svgIcon.black(v-if="rc.source.prevent_multiple_referencing")
                            use(xlink:href="@/assets/img/material-icon.svg#icon-check-circle-fill")
                    td.overflow(v-if="filterOptions.ip") {{ rc.ip }}
                tr(v-for="i in (10 - listDisplay?.length)")
                    td(:colspan="colspan")

    form.detailRecord(:class="{show: showDetail}" @submit.prevent="upload")
        template(v-if="selectedRecord")
            .header(style='padding-right:10px;')
                //- .material-symbols-outlined.notranslate(@click="showDetail=false; selectedRecord=createRecordTemplate; fileList=[];" :class="{nonClickable: fetching}") arrow_back
                svg.svgIcon.black.clickable(@click="showDetail=false; selectedRecord=createRecordTemplate; fileList=[];" :class="{nonClickable: fetching}")
                    use(xlink:href="@/assets/img/material-icon.svg#icon-arrow-back")
                .name {{ selectedRecord?.record_id ? selectedRecord?.record_id : 'Create Record' }}
                template(v-if="uploading")
                    .loader(style="--loader-color:blue; --loader-size:12px; margin: 12px;")
                template(v-else)
                    button.noLine.iconClick.square(type="submit" style='padding:0 14px') SAVE
            .content(:class="{nonClickable: uploading}")
                template(v-if="selectedRecord?.record_id")
                    .row
                        .key(style='font-weight:normal;') RECORD ID:
                        .value {{ selectedRecord?.record_id }}
                        // record_id needed for update
                        input(:value='selectedRecord?.record_id' name='config[record_id]' hidden)
                    .row 
                        .key(style='font-weight:normal;') USER ID:
                        .value {{ selectedRecord?.user_id }}
                        // user_id info needed for uploadRecord()
                        input(:value='selectedRecord?.user_id' name='user_id' hidden)
                    .row 
                        .key(style='font-weight:normal;') UPDATED:
                        .value {{ selectedRecord?.updated }}
                    .row 
                        .key(style='font-weight:normal;') UPLOADED:
                        .value {{ selectedRecord?.uploaded }}
                    .row 
                        .key(style='font-weight:normal;') IP:
                        .value {{ selectedRecord?.ip }}
                    .row 
                        .key(style='font-weight:normal;') REFERENCED:
                        .value {{ selectedRecord?.referenced_count }}

                    hr

                .row 
                    label.key(style='color:black;')
                        | Read Only&nbsp;&nbsp;
                        Checkbox(v-model="selectedRecord_readOnly" name='config[readonly]' style='vertical-align:text-top;')
                
                .row(style="margin-bottom:6px") 
                    .key Table

                .row.indent
                    .key Name
                    .value
                        input.line(v-model="selectedRecord.table.name" name='config[table][name]' placeholder='Only alphanumeric, space, period. (Required)' required)

                .row.indent 
                    .key Access Group 
                    //- .value(style='flex-grow:0')
                    .value(style="display:flex; flex-wrap:wrap; gap:10px;")
                        select(
                            v-model="selectedRecordRecordAccessGroupSelector"
                            :disabled="selectedRecord?.record_id && selectedRecord_private"
                            :name='selectedRecordRecordAccessGroupSelector !== "_NumSel" ? "config[table][access_group]" : null'
                        )
                            option(value="public") Public
                            option(value="authorized") Authorized
                            option(value="private") Private
                            option(value="admin") Admin
                            option(value="_NumSel") Group Number

                        input.line.value(
                            style='width:unset;'
                            v-if='selectedRecordRecordAccessGroupSelector === "_NumSel"'
                            type="number"
                            min="0"
                            name='config[table][access_group]'
                            :disabled="selectedRecord?.record_id && selectedRecord_private"
                            :value="selectedRecord.table.access_group"
                        )

                //- .row.indent(:class="{disabled : selectedRecord.table.access_group == 'public'}")
                    label.key(style='width:unset;color:black;')
                        | Subscription&nbsp;&nbsp;
                        Checkbox(v-model="selectedRecord_subscription" name='config[table][subscription]' :disabled="selectedRecord.table.access_group == 'public'" style='vertical-align:text-top;')

                br

                .row(style="margin-bottom:6px")
                    label.key(style='color:black;')
                        | Index&nbsp;&nbsp;

                .row.indent 
                    .key Name 
                    input.line.value(v-model='index_name' name='config[index][name]' placeholder='Alphanumeric, periods only.' :required="!!index_value && indexType !== 'boolean' || null")

                .row.indent
                    .key Value
                    .value(style="display:flex; flex-wrap:wrap; gap:10px;")
                        select(v-model='indexType')
                            option(value='string' selected) String
                            option(value='number') Number
                            option(value='boolean') Boolean

                        input.line(
                            v-if="indexType !== 'boolean'"
                            v-model="index_value"
                                name='config[index][value]'
                                :step='indexType === "number" ? "any" : "undefined"'
                                :type='indexType' :placeholder='indexType === "string" ? "Alphanumeric, space only." : indexType === "number" ? "Number value (Required)" : "Boolean value"'
                                :required="!!index_name"
                                style="flex-grow:30; width:unset; vertical-align:middle;")
                        template(v-else)
                            label(style='width:unset;display: flex;align-items: center;')
                                input(type='radio' name='config[index][value]' value='true' :checked='index_value === true || index_value === "true" ? true : null' style='margin:0;width:unset;')
                                | &nbsp;True
                            label(style='width:unset;display: flex;align-items: center;')
                                input(type='radio' name='config[index][value]' value='false' :checked='index_value !== true && index_value !== "true" ? true : null' style='margin:0;width:unset;')
                                | &nbsp;False
                br

                .row 
                    .key Tags 
                    .value
                        input.line(v-model="selectedRecord.tags" name='config[tags]' placeholder="Tag1, Tag2, ... Alphanumeric and space only. Separated with comma.")

                br

                .row(style="margin-bottom:6px")
                    .key Reference

                .row.indent 
                    .key Reference ID
                    input.line.value(v-model="selectedRecord.reference" name='config[reference]' placeholder='Record ID to reference' )

                .row.indent 
                    .key Referencing Limit
                    input.line.value(type="number" min="0" placeholder="Infinite" v-model="selectedRecord.source.referencing_limit" name='config[source][referencing_limit]')
                    
                .row.indent 
                    label.key(style='width:unset;color:black;')
                        | Prevent Multiple Referencing&nbsp;&nbsp;
                        Checkbox(v-model="selectedRecord.source.prevent_multiple_referencing" name='config[source][prevent_multiple_referencing]' style='vertical-align:text-top;')

                br

                .row
                    .key(style="margin-bottom: 6px") Data (JSON Object)
                    textarea.value(v-model="selectedRecord_data" @keydown.stop="handleKey" style="width:100%;height:150px;resize: none;tab-size: 2;font-family: monospace;white-space: pre;" name='data'
                        placeholder='{ "key": "value" }')

                br

                .row 
                    .key(style="margin-bottom:6px") Files 
                    .value(style="width:100%;")
                        template(v-if="fileList")
                            .file(v-for="(value, index) in fileList")
                                div(style='display: flex;gap:8px;margin-bottom: 8px;')
                                    //- .material-symbols-outlined.notranslate.fill.removeFile(@click="deleteFile(value, index)" style='padding-top: 4px;') {{value.key && value.filename && !value.add ? "delete" : "do_not_disturb_on"}}
                                    template(v-if="value.key && value.filename && !value.add")
                                        svg.svgIcon.black.clickable(@click="deleteFile(value, index)" style='margin-top: 3px; padding-top: 1px;')
                                            use(xlink:href="@/assets/img/material-icon.svg#icon-delete-fill")
                                    template(v-else)
                                        svg.svgIcon.black.clickable(@click="deleteFile(value, index)" style='margin-top: 3px; padding-top: 1px;')
                                            use(xlink:href="@/assets/img/material-icon.svg#icon-do-not-disturb-on-fill")
                                    div(style='display: flex;flex-wrap: wrap;')
                                        input.line.key(style='width:unset;flex-grow:1;' v-model="value.key" required placeholder="Key name for file" :disabled='value.key && value.filename && !value.add || null')
                                        | &nbsp;&nbsp;
                                        template(v-if='value.key && value.filename && !value.add' :href='value.endpoint')
                                            a.filename.nonClickable(v-if="selectedRecord_private") {{ value?.filename }}
                                            a.filename(v-else :href='value.endpoint' target="_blank") {{ value?.filename }}
                                            
                                        label.filename(v-else) {{ value?.filename || "Choose a file"}}
                                            input(@click.stop type="file" @change="e=>{ value.filename = e.target.files[0].name }" required hidden :name='value.key')
                    
                    .add(:class="{disabled: selectedRecord_private}" @click="addFile" style='margin-top: 1em;')
                        //- .material-symbols-outlined.notranslate.fill add_circle
                        svg.svgIcon
                            use(xlink:href="@/assets/img/material-icon.svg#icon-add-circle-fill")
                        span &nbsp;Add File

br

.tableMenu(v-if="!showDetail" style='display:block;text-align:center;')
    .iconClick.square.arrow(@click="currentPage--;" :class="{'nonClickable': fetching || currentPage === 1 }")
        //- .material-symbols-outlined.notranslate.bold chevron_left
        svg.svgIcon(style="width: 26px; height: 26px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-left")
        span Previous&nbsp;&nbsp;
    | &nbsp;&nbsp;
    .iconClick.square.arrow(@click="currentPage++;" :class="{'nonClickable': fetching || endOfList && currentPage >= maxPage }")
        span &nbsp;&nbsp;Next
        //- .material-symbols-outlined.notranslate.bold chevron_right
        svg.svgIcon(style="width: 26px; height: 26px")
            use(xlink:href="@/assets/img/material-icon.svg#icon-chevron-right")

// delete records
Modal(:open="openDeleteRecords" @close="openDeleteRecords=false")
    h4(style='margin:.5em 0 0; color: var(--caution-color)') Delete Records

    hr

    div(style='font-size:.8rem;')
        p.
            You sure want to delete {{ Object.values(checked).filter(value => value === true).length > 1 ? Object.values(checked).filter(value => value === true).length + ' records' : 'the record'}}?
            #[br]
            This action cannot be undone.

    br

    div(style="display: flex; align-items: center; justify-content: space-between;")
        div(v-if="promiseRunning" style="width:100%; height:44px; text-align:center;")
            .loader(style="--loader-color:blue; --loader-size:12px")
        template(v-else)
            button.noLine.warning(type="button" @click="openDeleteRecords=false;") Cancel 
            button.final.warning(type="button" @click="deleteRecords") Delete

</template>
<script setup lang="ts">
import Code from "@/components/code.vue";
import Table from "@/components/table.vue";
import Checkbox from "@/components/checkbox.vue";
import Select from "@/components/select.vue";
import Modal from "@/components/modal.vue";
import Pager from "@/code/pager";

import type { Ref } from "vue";
import { ref, computed, nextTick, reactive, watch } from "vue";
import { skapi } from "@/code/admin";
import { user } from "@/code/user";
import { devLog } from "@/code/logger"
import { currentService, serviceRecords, serviceBins} from "@/views/service/main";
import { showDropDown } from "@/assets/js/event.js";
import { uploadRecord } from "@/views/service/records/record";

let searchIndex = ref("null");
let searchIndexType = ref("string");
let searchIndexCondition = ref("=");

// table columns
let filterOptions = ref({
    table: true,
    user_id: true,
    // subscription: true,
    reference: true,
    index: true,
    tag: true,
    record_id: true,
    updated: true,
    uploaded: true,
    readonly: true,
    ip: true,
    files: true,
    referencing_limit: true,
    referenced: true,
    prevent_multiple_referencing: true,
    data: true,
});

// ui/ux related
let openDeleteRecords = ref(false);
let promiseRunning = ref(false);
let tableKey = ref(0);
let fetching = ref(false);
let maxPage = ref(0);
let currentPage: Ref<number> = ref(1);
let endOfList = ref(false);
let showDetail = ref(false);
let showAdvanced = ref(false);
let showDes = ref(false);
let hovering = ref(false);

let indexType = ref("string");
let index_name = ref("");
let index_value = ref("");

let colspan =
    Object.values(filterOptions.value).filter((value) => value === true).length + 1;

watch(
    filterOptions,
    (nv) => {
        colspan = Object.values(filterOptions.value).filter((value) => value).length + 1;
        tableKey.value++;
    },
    {
        immediate: true,
        deep: true,
    }
);

watch(currentPage, (n, o) => {
    if (
        n !== o &&
        n > 0 &&
        (n <= maxPage.value || (n > maxPage.value && !endOfList.value))
    ) {
        getPage();
    } else {
        currentPage.value = o;
    }
});

watch(showDetail, (nv) => {
    if (nv) {
        let scrollTarget = document.querySelector(".detailRecord .content");
        let detailRecord = document.querySelector(".detailRecord");
        let targetTop = window.scrollY + detailRecord.getBoundingClientRect().top;
        scrollTarget.scrollTop = 0;
        window.scrollTo(0, targetTop);
    }
});

let pager: Pager = null;
let listDisplay = ref(null);

let bins: {
    [record_id: string]: { [key: string]: any };
} = reactive({});

let searchFormValue = reactive({
    table: {
        access_group: "public",
    },
});

let callParams = {};

let setCallParams = (e) => {
    let toFetch: {
        data: {
            user_id: string;
            config: any;
        };
        files: {
            file: File;
            name: string;
        }[];
    } = skapi.util.extractFormData(e, { ignoreEmpty: true });

    if (!toFetch.data?.table?.name) {
        callParams = {};
    } else {
        Object.assign(toFetch.data.table, {
            access_group: searchFormValue.table.access_group,
        });
        callParams = toFetch.data;
    }

    getPage(true);
};

let getPage = async (refresh?: boolean) => {
    // if (!pager) {
    //     return;
    // }

    if (refresh) {
        endOfList.value = false;
    }

    if(!serviceRecords[currentService.id] || callParams?.table?.name) {
        serviceRecords[currentService.id] = await Pager.init({
            id: "record_id",
            resultsPerPage: 10,
            sortBy: callParams?.index?.name || "record_id",
            order:
                callParams?.index?.name && (callParams?.index?.condition || "").includes("<")
                    ? "desc"
                    : callParams?.table?.name
                    ? "asc"
                    : "desc",
        });
    }

    pager = serviceRecords[currentService.id];

    if ((!refresh && maxPage.value >= currentPage.value) || endOfList.value) {
        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;
        
        return;
    } else if (!endOfList.value || refresh) {
        fetching.value = true;

        let fetchedData = await skapi
            .getRecords(Object.assign({ service: currentService.id }, callParams), {
                fetchMore: !refresh,
            })
            .catch((err) => {
                alert(err);
                fetching.value = false;
                throw err;
            });
        fetchedData.list = fetchedData.list.map((r) => {
            serviceBins[currentService.id][r.record_id] = r?.bin || {};
            delete r.bin;
            return r;
        });

        bins = serviceBins[currentService.id];
        devLog({bins});

        // save endOfList status
        serviceRecords[currentService.id].endOfList = fetchedData.endOfList;
        endOfList.value = serviceRecords[currentService.id].endOfList;

        // insert data in pager
        if (fetchedData.list.length > 0) {
            await pager.insertItems(fetchedData.list);
            // devLog({pager});
        }

        // get page from pager
        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

        if (disp.maxPage > 0 && disp.maxPage < currentPage.value && !disp.list.length) {
            currentPage.value--;
        }

        for (let i in bins) {
            bins[i].length = 0;
            if (Object.keys(bins[i]).length) {
                for (let j in bins[i]) {
                    if (j !== "length") {
                        bins[i].length += bins[i][j].length;
                    }
                }
            }
        }

        fetching.value = false;
    }
};

let init = async () => {
    currentPage.value = 1;

    // setup pagers
    if(serviceRecords[currentService.id] && Object.keys(serviceRecords[currentService.id]).length) {
        pager = serviceRecords[currentService.id];
        bins = serviceBins[currentService.id];
        endOfList.value = serviceRecords[currentService.id].endOfList;

        let disp = pager.getPage(currentPage.value);
        maxPage.value = disp.maxPage;
        listDisplay.value = disp.list;

    } else {
        serviceRecords[currentService.id] = pager;
        serviceBins[currentService.id] = bins;
        getPage(true);
    }
};

init();

let createRecordTemplate = {
    table: {
        name: "",
        access_group: "public",
        subscription: false,
    },
    index: {
        name: "",
        value: "",
    },
    source: {
        referencing_limit: null,
        prevent_multiple_referencing: false,
    },
    reference: "",
    tags: [],
    readonly: false,
};

let wasInitiallyPrivate = ref(false);
let selectedRecord = ref(createRecordTemplate);
let selectedRecord_private = computed(() => {
    return (
        selectedRecord.value?.table?.access_group == "private" &&
        selectedRecord.value?.user_id !== user.user_id &&
        wasInitiallyPrivate.value
    );
});
let selectedRecord_readOnly = ref(false);
let selectedRecord_subscription = ref(false);
let selectedRecord_data = ref({});
let fileList = ref([]);

let selectedRecordRecordAccessGroupSelector = ref("public");

watch(selectedRecordRecordAccessGroupSelector, (nv) => {
    if (nv === "_NumSel") {
        selectedRecord.value.table.access_group = typeof selectedRecord.value.table.access_group === 'number' ? selectedRecord.value.table.access_group : 2;
    }
    else {
        selectedRecord.value.table.access_group = nv;
    }
});

watch(selectedRecord, (nv) => {
    if (nv) {
        devLog({nv});
        deleteFileList.value = [];
        selectedRecord_readOnly.value = nv?.readonly || false;
        selectedRecord_subscription.value = nv?.table?.subscription || false;
        selectedRecord_data.value = JSON.stringify(nv?.data, null, 2) || "";

        wasInitiallyPrivate.value = nv?.table?.access_group === "private" && nv?.user_id === user.user_id;

        selectedRecordRecordAccessGroupSelector.value = typeof selectedRecord.value.table.access_group === 'number' ? "_NumSel" : selectedRecord.value.table.access_group;

        if (Object.keys(bins).includes(nv.record_id)) {
            let normBin = (key, obj) => {
                fileList.value.push({
                    type: "binary",
                    key,
                    filename: obj.filename,
                    endpoint: obj.url,
                    download: () => skapi.getFile(obj.url, { dataType: "download" }),
                });
            };
            for (let k in bins[nv.record_id]) {
                if (k !== "length") {
                    let b = bins[nv.record_id][k];
                    for (let i of b) {
                        normBin(k, i);
                    }
                }
            }
        }

        index_name.value = nv?.index ? nv?.index?.name : "";
        index_value.value = nv?.index ? nv?.index?.value : "";
        indexType.value = typeof index_value.value;
    }
});

let uploading = ref(false);
let upload = async (e: SubmitEvent) => {
    uploading.value = true;

    let remove_bin = [];

    for (let i in deleteFileList.value) {
        remove_bin.push(deleteFileList.value[i].endpoint);
    }

    try {
        let upl = null;
        if (selectedRecord.value?.record_id) {
            upl = await uploadRecord(e, true, remove_bin);
            bins[upl.record_id] = upl?.bin || {}; // move bin data to bins
            delete upl.bin;
            devLog({listDisplay})
            for (let r of listDisplay.value) {
                if (r.record_id == selectedRecord.value.record_id && selectedRecord.value.tags == '') {
                    r.tags = [];
                }
            }
            await pager.editItem(upl);
        } else {
            upl = await uploadRecord(e, false);
            bins[upl.record_id] = upl?.bin || {};
            delete upl.bin;
            await pager.insertItems(upl);
        }
        uploading.value = false;
        showDetail.value = false;
        index_name.value = "";
        index_value.value = "";
        selectedRecord.value = createRecordTemplate;
        fileList.value = [];
        getPage();
    } catch (err: any) {
        uploading.value = false;
        alert(err.message);
        throw err;
    }
};

let deleteRecords = () => {
    promiseRunning.value = true;

    let deleteIds = Object.entries(checked.value)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => key);

    skapi
        .deleteRecords({ service: currentService.id, record_id: deleteIds })
        .then(async (r) => {
            for (let id of deleteIds) {
                for (let i = 0; i < listDisplay.value.length; i++) {
                    if (listDisplay.value[i].record_id == id) {
                        listDisplay.value.splice(i, 1);
                    }
                }
                await pager.deleteItem(id);
            }

            let disp = pager.getPage(currentPage.value);
            maxPage.value = disp.maxPage;
            listDisplay.value = disp.list;

            if (
                disp.maxPage > 0 &&
                disp.maxPage < currentPage.value &&
                !disp.list.length
            ) {
                currentPage.value--;
            }

            checked.value = {};
            checkedall.value = false;
            promiseRunning.value = false;
            openDeleteRecords.value = false;
        });
};

let copyID = (e) => {
    let target = e.currentTarget;
    let copy = target.textContent;
    let doc = document.createElement("textarea");

    doc.textContent = target.textContent;
    document.body.append(doc);
    doc.select();
    document.execCommand("copy");
    doc.remove();

    target.classList.add("clicked");

    setTimeout(() => {
        target.classList.remove("clicked");
    }, 1000);
};

// checks
let checked: any = ref({});
let checkIfAny = (e) => {
    // 아무것도 체크안되어있으면 전체 체크표시 해체
    let chk = e.target.checked;

    if (chk) {
        return;
    }

    let n = checked.value;

    let has = false;
    for (let k in n) {
        if (n[k]) {
            has = true;
            break;
        } else {
            delete n[k];
        }
    }


    if (!has) {
        checkedall.value = false;
    }
};
let checkedall = ref(false);
let checkall = () => {
    if (!checkedall.value) {
        for (let k in checked.value) {
            delete checked.value[k];
        }
    }
    if (listDisplay.value) {
        for (let i in listDisplay.value) {
            checked.value[listDisplay.value[i].record_id] = checkedall.value;
        }
    }
};
let noSelection = computed(() => {
    for (let i in checked.value) {
        if (checked.value[i]) {
            return false;
        }
    }
    return true;
});

// textarea tab key
let handleKey = (e) => {
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    let beforeCursor = e.target.value.slice(0, start);
    let afterCursor = e.target.value.slice(start);

    if (e.key == "Tab") {
        e.preventDefault();

        e.target.value =
            e.target.value.substring(0, start) + "\t" + e.target.value.substring(end);
        e.target.setSelectionRange(start + 1, start + 1);
    } else if (e.key == "Enter") {
        e.preventDefault();

        let indentMatch = beforeCursor.match(/(\n|\s)*$/);
        let startCount = indentMatch.input.split("{").length - 1;
        let endCount = indentMatch.input.split("}").length - 1;

        let currentLineStart = beforeCursor.lastIndexOf("\n") + 1;
        let currentIndentation = beforeCursor.slice(currentLineStart).match(/^\s*/)[0];
        let newIndentation = currentIndentation + "\t";
        let newCursorPosition = beforeCursor.length + newIndentation.length + 1;

        if (
            (beforeCursor.endsWith("{") && afterCursor.startsWith("}")) ||
            (beforeCursor.endsWith("[") && afterCursor.startsWith("]"))
        ) {
            e.target.value =
                beforeCursor +
                "\n" +
                newIndentation +
                "\n" +
                currentIndentation +
                afterCursor;
            e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        } else {
            if (startCount > endCount) {
                e.target.value =
                    beforeCursor +
                    "\n" +
                    currentIndentation +
                    currentIndentation +
                    afterCursor;
                e.target.setSelectionRange(
                    beforeCursor.length + newIndentation.length,
                    beforeCursor.length + newIndentation.length
                );
            }
        }
    } else if (e.key == "{" && e.shiftKey) {
        e.target.value = beforeCursor + "}" + afterCursor;
        e.target.setSelectionRange(start, start);
    } else if (e.key == "[") {
        e.target.value = beforeCursor + "]" + afterCursor;
        e.target.setSelectionRange(start, start);
    }
};

// file
let deleteFileList = ref([]);
let addFile = (e) => {
    fileList.value.push({ add: true, key: "", filename: "" });

    nextTick(() => {
        let scrollTarget = document.querySelector(".detailRecord .content");
        scrollTarget.scrollTop = scrollTarget.scrollHeight;
    });
};
let deleteFile = (item, index) => {
    if (!item.key || !item.filename) {
        fileList.value.splice(index, 1);
    } else {
        deleteFileList.value.push(item);
        fileList.value.forEach((f, i) => {
            if (f.key === item.key && f.filename === item.filename) {
                fileList.value.splice(i, 1);
            }
        });
    }
};
</script>
<style scoped lang="less">
textarea::placeholder {
    opacity: 0.5;
}
.updown {
    background-color: #fff;
    background-color: var(--main-color);
    border-radius: 50%;
    margin-left: 8px;
    cursor: pointer;
    box-shadow: rgba(41, 63, 230, 0.24) 0px 1px 8px;
}
.moreVert {
    .inner {
        padding-top: 0.25rem;
        & > * {
            padding: 0.25rem 0.5rem;
        }
        padding-bottom: 0.25rem;
    }
}
#searchForm {
    // max-width: 700px;
    margin: 0 auto;

    .inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
    }
    // .customSelect {
    //     flex-grow: 1;
    // }
    .search {
        position: relative;
        flex-grow: 50;

        .icon {
            &:hover {
                @media (pointer: fine) {
                    color: var(--main-color) !important;
                }
            }
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            user-select: none;

            &::before {
                display: none;
            }
        }
    }
    .groupWrap {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 6px;
        border-style: hidden;
        cursor: pointer;
        user-select: none;

        .group {
            position: relative;
            height: 44px;
            padding: 10px;
            flex-grow: 1;
            text-align: center;
            background-color: #fff;
            color: rgba(0, 0, 0, 0.4);
            fill: rgba(0, 0, 0, 0.4);

            svg {
                width: 23px;
                height: 23px;
                vertical-align: unset !important;
            }

            &::after {
                position: absolute;
                content: "";
                top: 0;
                left: -1px;
                bottom: 0;
                right: 0;
                border: 1px solid rgba(0, 0, 0, 0.5);
            }

            &:first-child {
                border-radius: 6px 0 0 8px;

                &::after {
                    border-radius: 6px 0 0 8px;
                }
            }
            &:nth-child(2) {
                &::after {
                    border-left: 0;
                }
            }
            &:last-child {
                border-radius: 0 8px 8px 0;

                &::after {
                    border-left: 0;
                    border-radius: 0 8px 8px 0;
                }
            }

            &.active {
                background-color: rgba(41, 63, 230, 0.05);
                color: var(--main-color);
                fill: var(--main-color);

                &::after {
                    border: 1px solid var(--main-color);
                }
            }
        }
    }
    .btn {
        flex-grow: 1;
        width: 140px;
    }
    .advanced {
        font-size: 0.8rem;
        user-select: none;

        .infoBox {
            input {
                outline: 0;
                background-color: rgba(0, 0, 0, 0.05);
            }
        }
    }
}

.tableMenu {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & > * {
        margin-bottom: 8px;
    }
}

tbody {
    tr.nsrow {
        @media (pointer: fine) {
            &:not(.active):hover {
                background-color: rgba(41, 63, 230, 0.05);
            }
        }

        &.active {
            background-color: rgba(41, 63, 230, 0.1);
        }

        &:hover {
            .hide {
                display: block;
            }
        }

        .hide {
            display: none;
        }
    }

    td {
        .click {
            position: relative;
            color: var(--main-color);
            font-weight: 500;

            &::after {
                position: absolute;
                content: "copied!";
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                border-radius: 4px;
                text-align: center;
                background-color: var(--main-color);
                color: #fff;
                display: none;
            }

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }

            &.clicked {
                &::after {
                    display: block;
                }
            }
        }
    }
}

.recordPart {
    position: relative;
    overflow: hidden;
}

#loading {
    position: absolute;
    top: 60px;
    left: 20px;
    height: 60px;
    z-index: 2;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 0.8rem;
}

.detailRecord {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    transform: translateX(110%);
    transition: all 0.3s;

    &.show {
        transform: translateX(0px);
    }

    .header {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 0 20px;
        font-weight: 500;
        background-color: #f0f0f0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, 0.2);

        .material-symbols-outlined {
            cursor: pointer;
        }
        .name {
            flex-grow: 1;
            padding-left: 20px;
        }
        button {
            padding: 0;
            font-size: 0.9rem;
        }
    }
}

.content {
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    font-size: 0.8rem;

    .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 12px;

        &.indent {
            padding-left: 20px;

            .key {
                font-weight: normal;
                width: 150px;
            }
        }
    }
    .key {
        font-weight: 500;
        width: 170px;
    }
    .value {
        flex-grow: 1;
        min-width: 270px;
        margin: 6px 0 6px;
        input {
            width: 100%;
        }
    }
    .file {
        // display: flex;
        // flex-wrap: wrap;
        // align-items: center;
        // margin-bottom: 12px;
        // gap: 10px;

        // .material-symbols-outlined {
        //     cursor: pointer;
        // }
        // input {
        //     width: unset;
        // }
        // .key {
        //     flex-grow: 1;
        // }
        // .value {
        //     flex-grow: 2;

        //     &.flex {
        //         display: flex;
        //         flex-wrap: wrap;
        //         align-items: center;
        //         gap: 10px;

        //         input {
        //             flex-grow: 1;
        //         }
        //     }
        // }
        .removeFile {
            cursor: pointer;
            // @media (pointer: fine) {
            //     &:hover {
            //         color: var(--caution-color);
            //     }
            // }
            // @media (pointer: coarse) {
            //     color: var(--caution-color);
            // }
        }
        .filename {
            display: inline-block;
            vertical-align: middle;
            max-width: 100%;
            min-width: 270px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--main-color);
            @media (pointer: fine) {
                &:hover {
                    text-decoration: underline;
                }
            }
            font-weight: 500;
            cursor: pointer;
            margin-bottom: 4px;
        }
        input.line.key {
            margin-bottom: 4px;
        }
    }
    .add {
        width: 100%;
        text-align: center;
        padding: 6px 0;
        color: var(--main-color);
        background-color: #293fe60d;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }
}
</style>
