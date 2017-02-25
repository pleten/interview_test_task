using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ssl_web_tests
{
    public class LoginData
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public LoginData(string email, string pass)
        {
            this.Email = email;
            this.Password = pass;
        }

        public LoginData()
        {
            this.Email = "";
            this.Password = "";
        }
    }
}
