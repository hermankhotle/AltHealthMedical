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
    public class ClientDataController : ApiController
    {
        private AltHealthDBEntities1 db = new AltHealthDBEntities1();

        // GET: api/ClientData
        public IQueryable<ClientData> GetClientDatas()
        {
            return db.ClientDatas;
        }

        // GET: api/ClientData/5
        [ResponseType(typeof(ClientData))]
        public IHttpActionResult GetClientData(double id)
        {
            ClientData clientData = db.ClientDatas.Find(id);
            if (clientData == null)
            {
                return NotFound();
            }

            return Ok(clientData);
        }

        // PUT: api/ClientData/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClientData(double id, ClientData clientData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clientData.Client_id)
            {
                return BadRequest();
            }

            db.Entry(clientData).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientDataExists(id))
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

        // POST: api/ClientData
        [ResponseType(typeof(ClientData))]
        public IHttpActionResult PostClientData(ClientData clientData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClientDatas.Add(clientData);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ClientDataExists(clientData.Client_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = clientData.Client_id }, clientData);
        }

        // DELETE: api/ClientData/5
        [ResponseType(typeof(ClientData))]
        public IHttpActionResult DeleteClientData(double id)
        {
            ClientData clientData = db.ClientDatas.Find(id);
            if (clientData == null)
            {
                return NotFound();
            }

            db.ClientDatas.Remove(clientData);
            db.SaveChanges();

            return Ok(clientData);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientDataExists(double id)
        {
            return db.ClientDatas.Count(e => e.Client_id == id) > 0;
        }
    }
}