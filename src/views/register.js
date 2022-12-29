import {logout, register} from '../api/users.js';
import { html } from '../library.js';

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit="${onSubmit}" class="login-form">
                <input
                        type="text"
                        name="username"
                        id="register-username"
                        placeholder="username"
                />
                <input
                        type="text"
                        name="email"
                        id="register-email"
                        placeholder="email"
                />
                <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="password"
                />
                <input
                        type="password"
                        name="re-password"
                        id="repeat-password"
                        placeholder="repeat password"
                />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>
`;

export function registerView(ctx){
    ctx.render(registerTemplate(onSubmit));

    function validateEmail(emailInput) {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (mailFormat.test(emailInput) === true) {
            return emailInput;
        } else {
            return alert("Invalid email address!");
        }
    }


    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('re-password').trim();

        const usernameRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[_]).{5,15}/;
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@-_~|]).{6,20}/; // /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@|-|_])[\S]{6,20}$/

        if (username === '' || email === '' || password === '' || repeatPass === '') {
            return alert('All fields are required!');
        }

        if (usernameRegex.test(username) === false){
            return alert('Invalid username!');
        }

        if (!username.includes("_")){
            return alert('Username must contain _ !');
        }

        if (emailRegex.test(email) === false) {
            return alert("Invalid email address!");
        }


        if (password !== repeatPass) {
            return alert("Passwords don't match!");
        }


        if (passwordRegex.test(password) === false){
            return alert("Invalid password!");
        }

        await register(username, email, password);
        ctx.updateNav();
        ctx.page.redirect('/offers');
    }

}



