define(["jQuery","paper-checkbox","paper-button","emby-input","paper-item-body","paper-icon-item","paper-icon-button-light"],function(e){return function(t,r,i){function n(e,t){return e&&t?e.ListingProviders.filter(function(e){return e.Id==t})[0]||n():ApiClient.getJSON(ApiClient.getUrl("LiveTv/ListingProviders/Default"))}function o(){Dashboard.showLoadingMsg(),ApiClient.getNamedConfiguration("livetv").then(function(e){n(e,r).then(function(r){t.querySelector(".txtPath").value=r.Path||"",t.querySelector(".txtKids").value=(r.KidsCategories||[]).join("|"),t.querySelector(".txtNews").value=(r.NewsCategories||[]).join("|"),t.querySelector(".txtSports").value=(r.SportsCategories||[]).join("|"),t.querySelector(".txtMovies").value=(r.MovieCategories||[]).join("|"),t.querySelector(".chkAllTuners").checked=r.EnableAllTuners,t.querySelector(".chkAllTuners").checked?t.querySelector(".selectTunersSection").classList.add("hide"):t.querySelector(".selectTunersSection").classList.remove("hide"),l(t,r,e.TunerHosts),Dashboard.hideLoadingMsg()})})}function s(e){var t=e.value;return t?t.split("|"):[]}function a(){Dashboard.showLoadingMsg();var n=r;ApiClient.getNamedConfiguration("livetv").then(function(r){var o=r.ListingProviders.filter(function(e){return e.Id==n})[0]||{};o.Type="xmltv",o.Path=t.querySelector(".txtPath").value,o.MovieCategories=s(t.querySelector(".txtMovies")),o.KidsCategories=s(t.querySelector(".txtKids")),o.NewsCategories=s(t.querySelector(".txtNews")),o.SportsCategories=s(t.querySelector(".txtSports")),o.EnableAllTuners=t.querySelector(".chkAllTuners").checked,o.EnabledTuners=o.EnableAllTuners?[]:e(".chkTuner",t).get().filter(function(e){return e.checked}).map(function(e){return e.getAttribute("data-id")}),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/ListingProviders",{ValidateListings:!0}),data:JSON.stringify(o),contentType:"application/json"}).then(function(){Dashboard.hideLoadingMsg(),i.showConfirmation!==!1&&Dashboard.processServerConfigurationUpdateResult(),Events.trigger(d,"submitted")},function(){Dashboard.hideLoadingMsg(),Dashboard.alert({message:Globalize.translate("ErrorAddingListingsToSchedulesDirect")})})})}function c(e){switch(e=e.toLowerCase()){case"m3u":return"M3U Playlist";case"hdhomerun":return"HDHomerun";case"satip":return"DVB";default:return"Unknown"}}function l(e,t,r){for(var i="",n=0,o=r.length;o>n;n++){var s=r[n];i+="<paper-icon-item>";var a=t.EnableAllTuners||[],l=t.EnableAllTuners||-1!=a.indexOf(s.Id),u=l?" checked":"";i+='<paper-checkbox data-id="'+s.Id+'" class="chkTuner" item-icon '+u+"></paper-checkbox>",i+="<paper-item-body two-line>",i+="<div>",i+=s.FriendlyName||c(s.Type),i+="</div>",i+="<div secondary>",i+=s.Url,i+="</div>",i+="</paper-item-body>",i+="</paper-icon-item>"}e.querySelector(".tunerList").innerHTML=i}function u(t){var r=e(t.target).parents(".xmltvForm")[0];require(["directorybrowser"],function(e){var t=new e;t.show({includeFiles:!0,callback:function(e){if(e){var i=r.querySelector(".txtPath");i.value=e,i.focus()}t.close()}})})}var d=this;d.submit=function(){t.querySelector(".btnSubmitListingsContainer").click()},d.init=function(){i=i||{},i.showCancelButton!==!1?t.querySelector(".btnCancel").classList.remove("hide"):t.querySelector(".btnCancel").classList.add("hide"),i.showSubmitButton!==!1?t.querySelector(".btnSubmitListings").classList.remove("hide"):t.querySelector(".btnSubmitListings").classList.add("hide"),e("form",t).on("submit",function(){return a(),!1}),t.querySelector("#btnSelectPath").addEventListener("click",u),t.querySelector(".chkAllTuners").addEventListener("change",function(e){e.target.checked?t.querySelector(".selectTunersSection").classList.add("hide"):t.querySelector(".selectTunersSection").classList.remove("hide")}),o()}}});