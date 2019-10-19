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
    public class Suppl_InfoController : ApiController
    {
        private AltHealthDBEntities1 db = new AltHealthDBEntities1();

        // GET: api/Suppl_Info
        public IQueryable<Suppl_Info> GetSuppl_Info()
        {
            return db.Suppl_Info;
        }

        // GET: api/Suppl_Info/5
        [ResponseType(typeof(Suppl_Info))]
        public IHttpActionResult GetSuppl_Info(string id)
        {
            Suppl_Info suppl_Info = db.Suppl_Info.Find(id);
            if (suppl_Info == null)
            {
                return NotFound();
            }

            return Ok(suppl_Info);
        }

        // PUT: api/Suppl_Info/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSuppl_Info(string id, Suppl_Info suppl_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != suppl_Info.Supplier_id)
            {
                return BadRequest();
            }

            db.Entry(suppl_Info).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Suppl_InfoExists(id))
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

        // POST: api/Suppl_Info
        [ResponseType(typeof(Suppl_Info))]
        public IHttpActionResult PostSuppl_Info(Suppl_Info suppl_Info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Suppl_Info.Add(suppl_Info);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Suppl_InfoExists(suppl_Info.Supplier_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = suppl_Info.Supplier_id }, suppl_Info);
        }

        // DELETE: api/Suppl_Info/5
        [ResponseType(typeof(Suppl_Info))]
        public IHttpActionResult DeleteSuppl_Info(string id)
        {
            Suppl_Info suppl_Info = db.Suppl_Info.Find(id);
            if (suppl_Info == null)
            {
                return NotFound();
            }

            db.Suppl_Info.Remove(suppl_Info);
            db.SaveChanges();

            return Ok(suppl_Info);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Suppl_InfoExists(string id)
        {
            return db.Suppl_Info.Count(e => e.Supplier_id == id) > 0;
        }
    }
}