using PostFeebBack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostFeebBack.DataAccessLayer.Interface
{
    public interface ICustomerDA
    {
        List<Customer> GetCustomers();
        Customer GetCustomerById(long customerId);
        long SaveCustomer(Customer item);
    }
}
