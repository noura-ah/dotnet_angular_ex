using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ex_1.Models;

public class User
{
    [Key]
    public long Id { get; set; }
    public string? Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}