---
title: 'Mapping Multiple Primary Keys in Entity Framework'
date: 2018-11-29 17:00:00
---
This tip shows one simple solution to allow multiple primary keys mapping in entities.
<!-- Excerpt End -->

When a datatable has multiple keys, the entity framework by default gets confused for mapping the primary keys. By assigning an `Order` value to the `Column` attribute when mapping the primary keys solves this problem. This `Order` value should be in the same order as these columns appear in the datatable.

```cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LeafyJava.Models
{
    [Table("leafyjava.event")]
    public class Event
    {
        [Key]
        [Column("pub_id", Order = 0)]
        public string PubId { get; set; }
        
        [Key]
        [Column("auth_id", Order = 1)]
        public string AuthId { get; set; }
        
        [Column("description")] 
        public string Description { get; set; }      
    }
}
```

