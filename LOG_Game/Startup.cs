using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LOG_Game.Startup))]
namespace LOG_Game
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
        }
    }
}
