import{y as e,m as n}from"../index.f947002b.js";import"./time.daaab1ba.js";import{P as t}from"./index.13576205.js";const o=[];export default function(){return e(()=>{o.forEach(e=>new Function(e)())},[]),n`<${t} ...${{title:"Mapping Multiple Primary Keys in Entity Framework",date:"2018-11-29T17:00:00.000Z"}} summary=${"<p>This tip shows one simple solution to allow multiple primary keys mapping in entities.</p>\n"}>
      <article dangerouslySetInnerHTML=${{__html:'<p>When a datatable has multiple keys, the entity framework by default gets confused for mapping the primary keys. By assigning an <code>Order</code> value to the <code>Column</code> attribute when mapping the primary keys solves this problem. This <code>Order</code> value should be in the same order as these columns appear in the datatable.</p>\n<div class="codeblock">\n  <pre>using System.ComponentModel.DataAnnotations;\nusing System.ComponentModel.DataAnnotations.Schema;\n\nnamespace LeafyJava.Models\n{\n    [Table(&quot;leafyjava.event&quot;)]\n    public class Event\n    {\n        [Key]\n        [Column(&quot;pub_id&quot;, Order = 0)]\n        public string PubId { get; set; }\n\n        [Key]\n        [Column(&quot;auth_id&quot;, Order = 1)]\n        public string AuthId { get; set; }\n\n        [Column(&quot;description&quot;)] \n        public string Description { get; set; }      \n    }\n}</pre>\n</div>'}}/>
    </${t}>`}