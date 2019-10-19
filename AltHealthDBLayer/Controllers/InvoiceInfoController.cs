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
    public class InvoiceInfoController : ApiController
    {
        private AltHealthDBEntities1 db = new AltHealthDBEntities1();

        // GET: api/InvoiceInfo
        public System.Object GetInvoiceInfoes()
        {
            //Querying Invoice information table and displaying end-points in Invoice-Info GUI
            var resultInvoiceInfo = (from invtable in db.InvoiceInfoes
                                     join clienttable in db.ClientDatas on invtable.Client_id equals clienttable.Client_id
                                     select new
                                     {
                                         invtable.INVNum,
                                         invtable.INVDate,
                                         Client = clienttable.C_name,
                                         invtable.Consultation,
                                         invtable.TotalSupplements,
                                         invtable.TotalSupplConsultation
                                     }
                                     ).ToList();
            return resultInvoiceInfo;
        }

        // GET: api/InvoiceInfo/5
        [ResponseType(typeof(InvoiceInfo))]
        public IHttpActionResult GetInvoiceInfo(int id)
        {
            //Get Invoice-Info by ID and edit it
            var invoice = (from invoiceinfoTable in db.InvoiceInfoes
                           where invoiceinfoTable.InvID == id

                           select new
                           {
                               invoiceinfoTable.InvID,
                               invoiceinfoTable.INVNum,
                               invoiceinfoTable.INVDate,
                               invoiceinfoTable.Client_id,
                               invoiceinfoTable.Consultation,
                               invoiceinfoTable.TotalSupplements,
                               invoiceinfoTable.TotalSupplConsultation,
                           }).FirstOrDefault();

            var invoiceDetails = (from invItemTable in db.InvoiceItems
                                  join supplemensTable in db.Supplements on invItemTable.Suppl_id equals supplemensTable.Supplier_id
                                  where invItemTable.InvID == id

                                  select new
                                  {
                                      invItemTable.InvID,
                                      invItemTable.InvItemID,
                                      invItemTable.Suppl_id,
                                      Supplement = supplemensTable.Suppl_id,
                                      supplemensTable.Cost_client,
                                      invItemTable.Quantity,
                                      TotalSupplements = invItemTable.Quantity * supplemensTable.Cost_client,

                                  }
                                  ).ToList();

            return Ok(new { invoice, invoiceDetails });
        }

        // PUT: api/InvoiceInfo/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInvoiceInfo(int id, InvoiceInfo invoiceInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != invoiceInfo.InvID)
            {
                return BadRequest();
            }

            db.Entry(invoiceInfo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceInfoExists(id))
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

        // POST: api/InvoiceInfo
        [ResponseType(typeof(InvoiceInfo))]
        public IHttpActionResult PostInvoiceInfo(InvoiceInfo invoiceInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.InvoiceInfoes.Add(invoiceInfo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = invoiceInfo.InvID }, invoiceInfo);
        }

        // DELETE: api/InvoiceInfo/5
        [ResponseType(typeof(InvoiceInfo))]
        public IHttpActionResult DeleteInvoiceInfo(int id)
        {
            InvoiceInfo invoiceInfo = db.InvoiceInfoes.Find(id);
            if (invoiceInfo == null)
            {
                return NotFound();
            }

            db.InvoiceInfoes.Remove(invoiceInfo);
            db.SaveChanges();

            return Ok(invoiceInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InvoiceInfoExists(int id)
        {
            return db.InvoiceInfoes.Count(e => e.InvID == id) > 0;
        }
    }
}