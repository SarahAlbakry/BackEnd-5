using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class C_OrderController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/C_Order
        public System.Object GetC_Order()
        {
            //inner join order table with customer
            var result = (from a in db.C_Order
                          join b in db.Customers on a.CustomerID equals b.customerID

                          select new
                          {
                              a.OrderID,
                              a.OrderNo,
                              Customer=b.Name,
                              a.PMehtod,
                              a.GTotal,
                              DeleteOrderItemIDs = "",
                          }).ToList();
            return result;
        }

        // GET: api/C_Order/5
        [ResponseType(typeof(C_Order))]
        public IHttpActionResult GetC_Order(long id)
        {
            //order table
            var order = (from a in db.C_Order
                         where a.OrderID == id

                         select new
                         {
                             a.OrderID,
                             a.OrderNo,
                             a.CustomerID,
                             a.PMehtod,
                             a.GTotal,
                             DeleteOrderItemIDs = "",
                         }).SingleOrDefault();

            //orderItem table with Item table
            var orderDetails = (from a in db.OrderItems
                                join b in db.Items on a.ItemID equals b.ItemID
                                where a.OrderID == id

                                select new
                                {
                                    a.OrderItemID,
                                    a.OrderID,
                                    a.ItemID,
                                    ItemName = b.Name,
                                    a.Quantity,
                                    b.Price,
                                    Total = a.Quantity * b.Price
                                }).ToList();
            return Ok(new { order, orderDetails });
        }

        // PUT: api/C_Order/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutC_Order(long id, C_Order c_Order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != c_Order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(c_Order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!C_OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/C_Order
        [ResponseType(typeof(C_Order))]
        public IHttpActionResult PostC_Order(C_Order c_Order)
        {
            #region post or save data without update

            //try
            //{
            //    //order table
            //    db.C_Order.Add(c_Order);
            //    //orderItem table
            //    foreach (var item in c_Order.OrderItems)
            //    {
            //        db.OrderItems.Add(item);
            //    }

            //    db.SaveChanges();

            //    return Ok();

            //}
            //catch (Exception ex)
            //{

            //    throw ex;
            //}

            #endregion

            //this code about save data and update data in database

            try
            {
                //order table
                //post
                if (c_Order.OrderID == 0)
                    db.C_Order.Add(c_Order);
                //orderItem table (ICollection<OrderItem> orderItem)
                //update
                else
                    db.Entry(c_Order).State = EntityState.Modified;

                //orderItem table
                foreach (var item in c_Order.OrderItems)
                {
                    if (item.OrderItemID == 0)
                        db.OrderItems.Add(item);
                    else
                        db.Entry(item).State = EntityState.Modified;
                }

                //delete rrecord from arr 
                foreach (var id in c_Order.DeleteOrderItemIDs.Split(',').Where(x=> x != ""))
                {
                    OrderItem record = db.OrderItems.Find(Convert.ToInt64(id));
                    db.OrderItems.Remove(record);
                }

                db.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        // DELETE: api/C_Order/5
        [ResponseType(typeof(C_Order))]
        public IHttpActionResult DeleteC_Order(long id)
        {

            C_Order c_Order = db.C_Order.Include(y=>y.OrderItems)
                .SingleOrDefault(x => x.OrderID == id);

            //delete from orderItem table
            foreach (var item in c_Order.OrderItems.ToList())
            {
                db.OrderItems.Remove(item);
            }

            db.C_Order.Remove(c_Order);
            db.SaveChanges();

            return Ok(c_Order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool C_OrderExists(long id)
        {
            return db.C_Order.Count(e => e.OrderID == id) > 0;
        }
    }
}