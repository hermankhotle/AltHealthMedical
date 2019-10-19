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
using AltHealthDBLayer.Models;

namespace AltHealthDBLayer.Controllers
{
    public class InvoiceItemController : ApiController
    {
        private AltHealthDBEntities1 db = new AltHealthDBEntities1();

        // GET: api/InvoiceItem
        public IQueryable<InvoiceItem> GetInvoiceItems()
        {
            return db.InvoiceItems;
        }

        // GET: api/InvoiceItem/5
        [ResponseType(typeof(InvoiceItem))]
        public IHttpActionResult GetInvoiceItem(int id)
        {
            InvoiceItem invoiceItem = db.InvoiceItems.Find(id);
            if (invoiceItem == null)
            {
                return NotFound();
            }

            return Ok(invoiceItem);
        }

        // PUT: api/InvoiceItem/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInvoiceItem(int id, InvoiceItem invoiceItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != invoiceItem.InvItemID)
            {
                return BadRequest();
            }

            db.Entry(invoiceItem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceItemExists(id))
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

        // POST: api/InvoiceItem
        [ResponseType(typeof(InvoiceItem))]
        public IHttpActionResult PostInvoiceItem(InvoiceItem invoiceItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.InvoiceItems.Add(invoiceItem);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = invoiceItem.InvItemID }, invoiceItem);
        }

        // DELETE: api/InvoiceItem/5
        [ResponseType(typeof(InvoiceItem))]
        public IHttpActionResult DeleteInvoiceItem(int id)
        {
            InvoiceItem invoiceItem = db.InvoiceItems.Find(id);
            if (invoiceItem == null)
            {
                return NotFound();
            }

            db.InvoiceItems.Remove(invoiceItem);
            db.SaveChanges();

            return Ok(invoiceItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InvoiceItemExists(int id)
        {
            return db.InvoiceItems.Count(e => e.InvItemID == id) > 0;
        }
    }
}