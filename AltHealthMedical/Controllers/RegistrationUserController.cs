using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DataLayer.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AltHealthMedical.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationUserController : ControllerBase
    {

        private UserManager<RegistrationUser> _usermanger;
        private SignInManager<RegistrationUser> _signInmanger;
        private readonly ApplicationSettings _appSettings;

        
        public RegistrationUserController(UserManager<RegistrationUser> userManger, SignInManager<RegistrationUser> signInManger, IOptions<ApplicationSettings> appSettings)
        {
            _usermanger = userManger;
            _signInmanger = signInManger;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        //POST : api/RegistrationUser/Register
        public async Task<Object> PostRegistrationUser(RegistrationUserModel model)
        {
            model.Role = "Admin";
            var registrationUser = new RegistrationUser()
            {
                UserName = model.UserName,
                FullName = model.FullName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,

            };

            try
            {
                var result = await _usermanger.CreateAsync(registrationUser, model.Password);
                await _usermanger.AddToRoleAsync(registrationUser, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //[EnableCors("AllowOrigin")]
        //POST : /api/RegistrationUser/Login

        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _usermanger.FindByNameAsync(model.UserName);
            if (user != null && await _usermanger.CheckPasswordAsync(user, model.Password))
            {
                //Get role assigned to user
                var role = await _usermanger.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    //Expires = DateTime.UtcNow.AddMinutes(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Jwt_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }
    }

}