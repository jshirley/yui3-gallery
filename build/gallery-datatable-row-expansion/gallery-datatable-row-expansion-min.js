YUI.add("gallery-datatable-row-expansion",function(a){function b(j){b.superclass.constructor.call(this,j);}b.NAME="DataTableRowExpansionPlugin";b.NS="rowexpander";b.ATTRS={template:{value:"",validator:function(j){return(a.Lang.isString(j)||a.Lang.isFunction(j));}},uniqueIdKey:{value:"",validator:a.Lang.isString}};b.column_key="row-expander";b.row_class="row-expansion";function g(k){var n=this.rowexpander;var j=k.data[n.get("uniqueIdKey")];var m=n.open_rows[j];k.td.addClass("row-toggle");k.td.replaceClass("row-(open|closed)",m?"row-open":"row-closed");k.td.on("click",function(){n.open_rows[j]=!n.open_rows[j];a.later(0,this,function(){this.syncUI();});},this);k.cell.set("innerHTML",'<a class="row-expand-nub" href="javascript:void(0);"></a>');if(m){var r="";for(var l=0;l<=n.col_count.pre;l++){r+='<td class="yui3-datatable-cell pre-row-expansion">&nbsp;</td>';}var q=n.get("template");if(a.Lang.isFunction(q)){var u=q.call(this,k.data);}else{var u=a.Lang.sub(q,k.data);}var t=k.cell.ancestor();var p=a.Lang.sub('<tr class="{c}">'+"{pre}"+'<td colspan="{post}" class="yui3-datatable-cell post-row-expansion">{tmpl}</td>'+"</tr>",{c:t.get("className")+" "+b.row_class,pre:r,post:n.col_count.post,tmpl:u});t.insert(p,"after");}}function f(){function j(k,l){if(l.key==b.column_key){l.nodeFormatter=g;k.found=true;}else{if(l.children){k=a.reduce(l.children,k,j);}else{k[k.found?"post":"pre"]++;}}return k;}this.col_count=a.reduce(this.get("host").get("columns"),{pre:0,post:0,found:false},j);}var d={above:[-1,0],below:[1,0],next:[0,1],prev:[0,-1],previous:[0,-1]};function i(m,j){var l=this.get("container"),s,q;if(m&&l){if(a.Lang.isString(j)){if(d[j]){j=d[j];}else{throw Error("unknown shift in getCell: "+j);}}if(a.Lang.isArray(m)){s=l.get("children").item(0);q=s&&s.get("children").item(m[1]);if(j){j[0]+=m[0];}else{j=[m[0],0];}}else{if(m._node){q=m.ancestor("."+this.getClassName("cell"),true);if(q.ancestor("tr."+b.row_class)){throw Error("getCell cannot be called with an element from an expansion row");}}}if(q&&j){var r=l.get("firstChild.rowIndex");if(a.Lang.isArray(j)){s=q.ancestor();var p=Math.sign(j[0]);if(p!==0){var t=l.get("children");var o=s.get("rowIndex")-r;var n=Math.abs(j[0]);for(var k=0;k<n&&s;k++){o+=p;s=t.item(o);if(s&&s.hasClass(b.row_class)){o+=p;s=t.item(o);}}}o=q.get("cellIndex")+j[1];q=s&&s.get("children").item(o);}}}return(q||null);}function e(k){var j=this.get("container")||null;if(k){k=this._idMap[k.get?k.get("clientId"):k]||k;}return j&&a.one(a.Lang.isNumber(k)?this.getCell([k,0]).ancestor():"#"+k);}function h(){var j=this.get("host").body;if(j instanceof a.DataTable.BodyView){this.orig_getCell=j.getCell;this.orig_getRow=j.getRow;j.getCell=i;j.getRow=e;}}function c(){var j=this.get("host").body;if(this.orig_getCell){j.getCell=this.orig_getCell;}if(this.orig_getRow){j.getRow=this.orig_getRow;}}a.extend(b,a.Plugin.Base,{initializer:function(j){this.open_rows={};this.on("uniqueIdKeyChange",function(){this.open_rows={};});f.call(this);this.afterHostEvent("columnsChange",f);this.afterHostEvent("renderTable",h);},destructor:function(){c.call(this);}});a.namespace("Plugin");a.Plugin.DataTableRowExpansion=b;},"gallery-2012.05.23-19-56",{requires:["datatable","plugin","gallery-funcprog","gallery-node-optimizations","gallery-math"],skinnable:true});