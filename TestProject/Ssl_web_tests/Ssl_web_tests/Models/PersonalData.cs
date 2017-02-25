﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ssl_web_tests
{
    public class PersonalData: IEquatable<PersonalData>, IComparable<PersonalData>
    {
        public string FirstName {get; set;}
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneCode { get; set; }
        public string Phone { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Index { get; set; }
        public string Country { get; set; }
        public string SupportPin { get; set; }
        public bool NewsletterSending { get; set; }

        public string FullName { get; set; }
        public string FullPhoneNumber { get; set; }
        public string FullAddress { get; set; }

        public string GetFullName()
        {
            return this.FirstName + " " + this.LastName;
        }

        public string GetFullPhoneNumber()
        {
            return this.PhoneCode + " " + this.Phone;        
        }

        public string GetFullAddress()
        {
            return String.Format("{0}, {1}, {2}, {3}, {4}",this.Street, this.City, this.State, this.Index, this.Country);
        }

        public bool Equals(PersonalData other)
        {
            if (Object.ReferenceEquals(other, null))
            {
                return false;
            }
            if (Object.ReferenceEquals(this, other))
            {
                return true;
            }
            return FirstName == other.FirstName && LastName == other.LastName;

        }

        public int CompareTo(PersonalData other)
        {
            if (Object.ReferenceEquals(other, null))
            {
                return 1;
            }
            if (FirstName.CompareTo(other.FirstName) == 0)
            {
                if (LastName.CompareTo(other.LastName) == 0)
                {
                    return 0;
                }
                else
                {
                    return 1;
                }
            }
            return -1;
        }
    }


}
