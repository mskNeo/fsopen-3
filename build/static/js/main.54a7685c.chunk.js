(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{ 14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){'use strict';t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=t(2),l=function(e){return r.a.createElement('div',null,'filter shown with',r.a.createElement('input',{ value:e.filter,onChange:e.handleChange }))},i=function(e){return r.a.createElement('form',{ onSubmit:e.submit },r.a.createElement('div',null,'name: ',r.a.createElement('input',{ value:e.name,onChange:e.nameChange })),r.a.createElement('div',null,'number: ',r.a.createElement('input',{ value:e.num,onChange:e.numChange })),r.a.createElement('div',null,r.a.createElement('button',{ type:'submit' },'add')))},m=function(e){var n=e.people,t=e.filter,a=e.deleteFunc,c=n.filter((function(e){return e.name.toLowerCase().slice(0,t.length)===t.toLowerCase()})).map((function(e){return r.a.createElement('div',{ key:e.id },r.a.createElement('p',null,e.name,' ',e.number,r.a.createElement('button',{ onClick:function(){return a(e.id)} },'delete')))}));return r.a.createElement('div',null,c)};var f=function(e){var n=e.message;return null===n?null:r.a.createElement('div',{ className:n.type },r.a.createElement('h1',null,n.message))},d=t(3),s=t.n(d),h='/api/persons',p={ getAll:function(){return s.a.get(h).then((function(e){return e.data}))},create:function(e){return s.a.post(h,e).then((function(e){return e.data}))},update:function(e,n){return s.a.put(''.concat(h,'/').concat(e),n).then((function(e){return e.data}))},deletePerson:function(e){return s.a.delete(''.concat(h,'/').concat(e)).then((function(e){return e.data}))} },b=(t(36),function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(''),d=Object(o.a)(u,2),s=d[0],h=d[1],b=Object(a.useState)(''),v=Object(o.a)(b,2),E=v[0],g=v[1],w=Object(a.useState)(''),C=Object(o.a)(w,2),j=C[0],O=C[1],k=Object(a.useState)(null),y=Object(o.a)(k,2),S=y[0],A=y[1];Object(a.useEffect)((function(){p.getAll().then((function(e){c(e)}))}),[]);var D=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:'success';A({ message:e,type:n }),setTimeout((function(){A(null)}),5e3)};return r.a.createElement('div',null,r.a.createElement('h2',null,'Phonebook'),r.a.createElement(f,{ message:S }),r.a.createElement(l,{ filter:j,handleChange:function(e){return O(e.target.value)} }),r.a.createElement('h2',null,'add a new'),r.a.createElement(i,{ submit:function(e){e.preventDefault();var n={ name:s,number:E };if(t.find((function(e){return e.name===s}))){if(window.confirm(''.concat(s,' is already added to phonebook, replace the old number with a new one?'))){var a=t.find((function(e){return e.name===s}));p.update(a.id,n).then((function(e){c(t.map((function(n){return n.name!==s?n:e}))),D(''.concat(e.name,' has a new number!')),h(''),g('')})).catch((function(e){console.log(e.response.data),D(''.concat(a.name,' not in server'),'error')}))}}else p.create(n).then((function(e){c(e),D('Added '.concat(n.name)),h(''),g('')})).catch((function(e){console.log(e.response.data),D(''.concat(e.response.data.name),'error')}))},name:s,nameChange:function(e){return h(e.target.value)},num:E,numChange:function(e){return g(e.target.value)} }),r.a.createElement('h2',null,'Numbers'),r.a.createElement(m,{ people:t,filter:j,deleteFunc:function(e){var n=t.find((function(n){return n.id===e}));window.confirm('Delete '.concat(n.name,'?'))&&p.deletePerson(e).then((function(a){c(t.filter((function(n){return n.id!==e}))),D('Deleted '.concat(n.name))})).catch((function(){c(t.filter((function(n){return n.id!==e}))),D(''.concat(n.name,' not found in server'),'error')}))} }))});u.a.render(r.a.createElement(b,null),document.getElementById('root'))} },[[14,1,2]]])
//# sourceMappingURL=main.54a7685c.chunk.js.map