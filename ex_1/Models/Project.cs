using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ex_1.Models;

public class Project
{
    [Key]
    public long Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
}