import { html } from '../library.js';
import { getUserData } from '../util.js';

const homeTemplate = () => html`
    <section id="home">
        <img width="1000" height="600" src="/images/warehouse-building.png" alt="home"/>
    </section>
`;

export function homeView(ctx) {
    if (getUserData()) {
        ctx.page.redirect('/offers'); // TODO: Check if it works
    } else {
        ctx.render(homeTemplate());
    }
}