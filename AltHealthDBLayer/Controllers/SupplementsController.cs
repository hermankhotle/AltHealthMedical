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
    public class SupplementsController : ApiController
    {
        private AltHealthDBEntities1 db = new AltHealthDBEntities1();

        // GET: api/Supplements
        public IQueryable<Supplement> GetSupplements()
        {
            return db.Supplements;
        }

        // GET: api/Supplements/5
        [ResponseType(typeof(Supplement))]
        public IHttpActionResult GetSupplement(string id)
        {
            Supplement supplement = db.Supplements.Find(id);
            if (supplement == null)
            {
                return NotFound();
            }

            return Ok(supplement);
        }

        // PUT: api/Supplements/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSupplement(string id, Supplement supplement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != supplement.Suppl_id)
            {
                return BadRequest();
            }

            db.Entry(supplement).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplementExists(id))
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

        // POST: api/Supplements
        [ResponseType(typeof(Supplement))]
        public IHttpActionResult PostSupplement(Supplement supplement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Supplements.Add(supplement);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (SupplementExists(supplement.Suppl_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = supplement.Suppl_id }, supplement);
        }

        // DELETE: api/Supplements/5
        [ResponseType(typeof(Supplement))]
        public IHttpActionResult DeleteSupplement(string id)
        {
            Supplement supplement = db.Supplements.Find(id);
            if (supplement == null)
            {
                return NotFound();
            }

            db.Supplements.Remove(supplement);
            db.SaveChanges();

            return Ok(supplement);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SupplementExists(string id)
        {
            return db.Supplements.Count(e => e.Suppl_id == id) > 0;
        }
    }
}