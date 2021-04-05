using Mailjet.Client;
using Mailjet.Client.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MyDreamWebApp.Controllers
{
    [Route("api/Email")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        public EmailController()
        {

        }

        [HttpGet]
        [Route("SentMail")]
        public void SentMail()
        {
            RunAsync().Wait();
        }

        static async Task RunAsync()
        {
            MailjetClient client = new MailjetClient("c6e75349704777adcf8aeae534ed4b51", "0255e9107d8a415a088be154f0218091");
            MailjetRequest request = new MailjetRequest
            {
                Resource = Send.Resource,
            }
               .Property(Send.FromEmail, "md.tarikul@brainstation23.com")
               .Property(Send.FromName, "Md. Tarikul")
               .Property(Send.Subject, "Your email flight plan!")
               .Property(Send.TextPart, "Dear passenger, welcome to Mailjet! May the delivery force be with you!")
               .Property(Send.HtmlPart, "<h3>Dear passenger, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!<br />May the delivery force be with you!")
               .Property(Send.Recipients, new JArray {
                new JObject {
                 {"Email", "md.tarikul@brainstation23.com"}
                 }
                   });
            MailjetResponse response = await client.PostAsync(request);
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine(string.Format("Total: {0}, Count: {1}\n", response.GetTotal(), response.GetCount()));
                Console.WriteLine(response.GetData());
            }
            else
            {
                Console.WriteLine(string.Format("StatusCode: {0}\n", response.StatusCode));
                Console.WriteLine(string.Format("ErrorInfo: {0}\n", response.GetErrorInfo()));
                Console.WriteLine(string.Format("ErrorMessage: {0}\n", response.GetErrorMessage()));
            }
        }

        //   static async Task RunAsync()
        //   {
        //       MailjetClient client = new MailjetClient("c6e75349704777adcf8aeae534ed4b51", "0255e9107d8a415a088be154f0218091")
        //       {
        //           // Version = ApiVersion.V3_1,
        //       };
        //       MailjetRequest request = new MailjetRequest
        //       {
        //           Resource = Send.Resource,
        //       }
        //        .Property(Send.Messages, new JArray {
        //new JObject {
        // {
        //  "From",
        //  new JObject {
        //   {"Email", "md.tarikul@brainstation23.com"},
        //   {"Name", "Md. Tarikul"}
        //  }
        // }, {
        //  "To",
        //  new JArray {
        //   new JObject {
        //    {
        //     "Email",
        //     "md.tarikul@brainstation23.com"
        //    }, {
        //     "Name",
        //     "Md. Tarikul"
        //    }
        //   }
        //  }
        // }, {
        //  "Subject",
        //  "Greetings from Mailjet."
        // }, {
        //  "TextPart",
        //  "My first Mailjet email"
        // }, {
        //  "HTMLPart",
        //  "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!"
        // }, {
        //  "CustomID",
        //  "AppGettingStartedTest"
        // }
        //}
        //        });
        //       MailjetResponse response = await client.PostAsync(request);
        //       if (response.IsSuccessStatusCode)
        //       {
        //           Console.WriteLine(string.Format("Total: {0}, Count: {1}\n", response.GetTotal(), response.GetCount()));
        //           Console.WriteLine(response.GetData());
        //       }
        //       else
        //       {
        //           Console.WriteLine(string.Format("StatusCode: {0}\n", response.StatusCode));
        //           Console.WriteLine(string.Format("ErrorInfo: {0}\n", response.GetErrorInfo()));
        //           Console.WriteLine(response.GetData());
        //           Console.WriteLine(string.Format("ErrorMessage: {0}\n", response.GetErrorMessage()));
        //       }
        //   }
    }
}
