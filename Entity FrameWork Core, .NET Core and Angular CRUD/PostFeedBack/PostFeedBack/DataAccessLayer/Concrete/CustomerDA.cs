using PostFeebBack.DataAccessLayer.Interface;
using PostFeebBack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostFeebBack.DataAccessLayer.Concrete
{
    public class CustomerDA: ICustomerDA
    {
        private UserContext _context;
        public CustomerDA(UserContext context)
        {
            this._context = context;
        }

        public List<Customer> GetCustomers()
        {
            List<Customer> customers = new List<Customer>();
            try
            {
                customers = _context.Customers.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return customers;
        }
        public Customer GetCustomerById(long customerId)
        {
            Customer customer = new Customer();
            try
            {
                customer = _context.Set<Customer>().SingleOrDefault(c => c.CustomerId == customerId);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return customer;
        }

        public long SaveCustomer(Customer item)
        {
            long Id;
            Customer customer = new Customer();
            bool IsNew = item.CustomerId > 0 ? false : true;

            if (item.CustomerId <= 0)
            {
                customer.FirstName = item.FirstName;
                customer.LastName = item.LastName;
                customer.MobileNo = item.MobileNo;
                customer.CustomerName = $"{item.FirstName} {item.LastName}";
                customer.CreatedBy = 2;
                customer.CreatedDate = DateTime.Now;

                _context.Add(customer);
            }
            else
            {
                var dbCustomer = _context.Customers.FirstOrDefault(x => x.CustomerId.Equals(item.CustomerId));
                dbCustomer.FirstName = item.FirstName;
                dbCustomer.LastName = item.LastName;
                dbCustomer.MobileNo = item.MobileNo;
                dbCustomer.CustomerName = $"{item.FirstName} {item.LastName}";
                dbCustomer.ModifiedBy = 1;
                dbCustomer.ModifiedDate = DateTime.Now;

            }

            _context.SaveChanges();

            Id = (IsNew ? customer.CustomerId: item.CustomerId);
            return Id;
        }
    }
}
