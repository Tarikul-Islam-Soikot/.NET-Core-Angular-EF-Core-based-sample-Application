using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyDreamWebApp.DataAccessLayer.Interface;
using MyDreamWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyDreamWebApp.Controllers
{
    [Route("api/Customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        readonly UserContext _context;
        private ICustomerDA _customerDataAccess;
        public CustomerController(UserContext context, ICustomerDA customerDataAccess)
        {
            this._context = context ?? throw new ArgumentNullException(nameof(context));
            this._customerDataAccess = customerDataAccess;
        }

        // GET: api/<CustomerController>
        [HttpGet]
        [Authorize]
        [Route("GetCustomers")]
        public IActionResult Get()
        {
            try
            {               
                var customers = _customerDataAccess.GetCustomers();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<CustomerController>/5
        [HttpGet("GetCustomerById/{customerId}")]
        [Authorize]
        public IActionResult GetCustomerById(int customerId)
        {
            try
            {
                //var customer = _context.Set<Customer>().SingleOrDefault(c => c.CustomerId == customerId);
                var customer = _customerDataAccess.GetCustomerById(customerId);
                return Ok(customer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<CustomerController>
        [HttpPost]
        [Authorize]
        [Route("Save")]
        public IActionResult Save([FromBody] Customer item)
        {

            try
            {
                var Id = _customerDataAccess.SaveCustomer(item);
                return Ok(Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT api/<CustomerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CustomerController>/5
        [HttpDelete("Delete/{id}")]
        [Authorize]
        public void Delete(long id)
        {
            Customer customer = _context.Set<Customer>().SingleOrDefault(c => c.CustomerId == id);
            _context.Entry(customer).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
