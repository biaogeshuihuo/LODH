using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace LOG_Game.Controllers
{
    public class TestController : Controller
    {
        public string Test(int state)
        {
            var res = "";
            var js = new JavaScriptSerializer();
            if (state == 1)
            {
                res = js.Serialize(new
                {
                    code = 865,
                    data = "Error"
                });
            }
            else
            {
                res = js.Serialize(new
                {
                    code = 103,
                    data = "OK"
                });
            }

            return res;
        }
    }
}