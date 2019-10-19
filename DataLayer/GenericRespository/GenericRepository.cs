using DataLayer.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataLayer.GenericRespository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private AltDBContext context = null;
        private DbSet<T> table = null;

        public GenericRepository()
        {
            //this.context = new AltDBContext();
            //table = context.Set<T>();
        }

        public GenericRepository(AltDBContext context)
        {
            this.context = context;
            table = context.Set<T>();
        }
        public IEnumerable<T> GetAll()
        {
            return table.ToList();
        }
        public T GetByID(object id)
        {
            return table.Find(id);
        }
        public void Insert(T obj)
        {
            table.Add(obj);
        }
        public void Update(T obj)
        {
            table.Attach(obj);
            context.Entry(obj).State = EntityState.Modified;
            Save();
        }
        public void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
            Save();
        }
        public void Save()
        {
            context.SaveChanges();
        }

    }
}
