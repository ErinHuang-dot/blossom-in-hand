"use strict";(self["webpackChunkp_blossom"]=self["webpackChunkp_blossom"]||[]).push([[43],{2043:function(t,e,s){s.r(e),s.d(e,{default:function(){return V}});var r=s(6252),a=s(3577);const o={class:"container"},d={class:"row justify-content-center"},l={class:"col-md-10 py-6"},c={class:"list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-center w-100 mt-md-0 mt-4"},n={class:"me-md-7 me-3 position-relative custom-step-line"},i=(0,r._)("span",{class:"text-nowrap"},"填寫資料",-1),b={class:"me-md-7 me-3 position-relative custom-step-line"},p=(0,r._)("span",{class:"text-nowrap"},"建立訂單",-1),m=(0,r._)("span",{class:"text-nowrap text-muted"},"確認付款",-1),u=(0,r._)("div",{class:"row justify-content-center"},[(0,r._)("div",{class:"col-md-10"},[(0,r._)("h3",{class:"fw-bold mb-4 py-3"},"建立訂單")])],-1),_={class:"row justify-content-center pb-7 mb-6"},h={class:"col-md-6"},w={class:"ps-0"},g={class:"border border-top-0 border-start-0 border-end-0 border-bottom mb-3"},x=(0,r._)("span",{class:"d-inline-block text-muted fs-6 mb-2"},"Email",-1),f={class:"border border-top-0 border-start-0 border-end-0 border-bottom mb-3"},v=(0,r._)("span",{class:"d-inline-block text-muted fs-6 mb-2"},"姓名",-1),y={class:"border border-top-0 border-start-0 border-end-0 border-bottom mb-3"},D=(0,r._)("span",{class:"d-inline-block text-muted fs-6 mb-2"},"地址",-1),k={class:"border border-top-0 border-start-0 border-end-0 border-bottom mb-3"},z=(0,r._)("span",{class:"d-inline-block text-muted fs-6 mb-2"},"電話",-1),$={class:"border border-top-0 border-start-0 border-end-0 border-bottom mb-3"},j=(0,r._)("span",{class:"d-inline-block text-muted fs-6 mb-2"},"其他留言",-1),L={key:0},O={key:1},W={class:"text-end mt-4"},C={class:"col-md-4"},q={class:"border border-ad-secondary p-4 mb-4"},E=["src","alt"],H={class:"w-100"},K={class:"d-flex justify-content-between"},M={class:"mb-0 fw-bold"},U={class:"mb-0"},Y={class:"mb-0 fw-bold"},Z={class:"table mt-4 border-top border-bottom text-muted"},A=(0,r._)("th",{scope:"row",class:"border-0 px-0 pt-4 font-weight-normal"},"小計",-1),B={class:"text-end border-0 px-0 pt-4"},F=(0,r._)("th",{scope:"row",class:"border-0 px-0 pt-0 pb-4 font-weight-normal"},"優惠券代碼",-1),G={key:0,class:"text-end border-0 px-0 pt-0 pb-4"},I={key:1,class:"text-end text-ad-warning border-0 px-0 pt-0 pb-4"},J={class:"d-flex justify-content-between mt-4"},N=(0,r._)("p",{class:"mb-0 h4 fw-bold"},"總計",-1),P={class:"mb-0 h4 fw-bold"};function Q(t,e,s,Q,R,S){const T=(0,r.up)("v-loading"),V=(0,r.up)("vue-feather");return(0,r.wg)(),(0,r.iD)("div",o,[(0,r.Wm)(T,{active:R.isLoading},null,8,["active"]),(0,r._)("div",d,[(0,r._)("div",l,[(0,r._)("ul",c,[(0,r._)("li",n,[(0,r.Wm)(V,{type:"check-circle",class:"align-middle me-2"}),i]),(0,r._)("li",b,[(0,r.Wm)(V,{type:"check-circle",class:"align-middle me-2"}),p]),(0,r._)("li",null,[(0,r.Wm)(V,{type:"circle",class:"align-middle me-2 text-muted"}),m])])])]),u,(0,r._)("div",_,[(0,r._)("div",h,[(0,r._)("ul",w,[(0,r._)("li",g,[x,(0,r._)("p",null,(0,a.zw)(R.orderData.user.email),1)]),(0,r._)("li",f,[v,(0,r._)("p",null,(0,a.zw)(R.orderData.user.name),1)]),(0,r._)("li",y,[D,(0,r._)("p",null,(0,a.zw)(R.orderData.user.address),1)]),(0,r._)("li",k,[z,(0,r._)("p",null,(0,a.zw)(R.orderData.user.tel),1)]),(0,r._)("li",$,[j,R.orderData.user.message?((0,r.wg)(),(0,r.iD)("p",L,(0,a.zw)(R.orderData.user.message),1)):((0,r.wg)(),(0,r.iD)("p",O,"無"))])]),(0,r._)("div",W,[(0,r._)("button",{class:"btn btn-accent btn-lg px-6",type:"button",onClick:e[0]||(e[0]=t=>S.payOrder())},"確認付款")])]),(0,r._)("div",C,[(0,r._)("div",q,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(R.orderData.products,(t=>((0,r.wg)(),(0,r.iD)("div",{key:t.id,class:"d-flex mb-2"},[(0,r._)("img",{src:t.product.imageUrl,alt:t.product.title,class:"rounded-1 me-2",style:{width:"48px",height:"48px","object-fit":"cover"}},null,8,E),(0,r._)("div",H,[(0,r._)("div",K,[(0,r._)("p",M,(0,a.zw)(t.product.title),1),(0,r._)("p",U,"$ "+(0,a.zw)(t.total),1)]),(0,r._)("p",Y,"x "+(0,a.zw)(t.qty),1)])])))),128)),(0,r._)("table",Z,[(0,r._)("tbody",null,[(0,r._)("tr",null,[A,(0,r._)("td",B,"$ "+(0,a.zw)(R.orderData.total),1)]),(0,r._)("tr",null,[F,R.orderData.total?((0,r.wg)(),(0,r.iD)("td",G,"未使用")):((0,r.wg)(),(0,r.iD)("td",I,(0,a.zw)(R.orderData.products),1))])])]),(0,r._)("div",J,[N,(0,r._)("p",P,"$ "+(0,a.zw)(Math.round(R.orderData.total)),1)])])])])])}var R={data(){return{orderData:{user:{},message:""},isLoading:!1}},methods:{getOrderData(){const{id:t}=this.$route.params,e=`https://vue3-course-api.hexschool.io/v2/api/erinhuang-lab/order/${t}`;this.$http.get(e).then((t=>{this.orderData=t.data.order})).catch((t=>{console.log(t.data.message)}))},payOrder(){const{id:t}=this.$route.params;this.isLoading=!0;const e=`https://vue3-course-api.hexschool.io/v2/api/erinhuang-lab/pay/${t}`;this.$http.post(e).then((t=>{this.isLoading=!1,this.orderData=t.data.order,alert("res.data.message"),this.$router.push("/checkout/success")})).catch((t=>{console.dir(t.data.message)}))}},mounted(){this.getOrderData()}},S=s(3744);const T=(0,S.Z)(R,[["render",Q]]);var V=T}}]);
//# sourceMappingURL=43.0e87f814.js.map